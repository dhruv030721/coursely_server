import fs from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import ffmpeg from "fluent-ffmpeg";
import { NextFunction, Request, Response } from "express";
import { Course, getVideoInfo } from "yayinstocks_shared_module";
import { logger } from "yayinstocks_shared_module";

interface ResolutionPreset {
  name: string;
  width: number;
  height: number;
  videoBitrate: string;
  audioBitrate: string;
}

interface MasterPlaylistEntry {
  resolution: string;
  bandwidth: number;
  path: string;
}

interface LectureObject {
  title: string;
  sequence: number;
  video_playback_time: string;
  description: string;
  video_url: string;
}

const resolutionPresets: ResolutionPreset[] = [
  {
    name: "360p",
    width: 640,
    height: 360,
    videoBitrate: "800k",
    audioBitrate: "128k",
  },
  {
    name: "480p",
    width: 854,
    height: 480,
    videoBitrate: "1400k",
    audioBitrate: "128k",
  },
  {
    name: "720p",
    width: 1280,
    height: 720,
    videoBitrate: "2800k",
    audioBitrate: "192k",
  },
  {
    name: "1080p",
    width: 1920,
    height: 1080,
    videoBitrate: "5000k",
    audioBitrate: "256k",
  },
];

function calculateBandwidth(
  videoBitrate: string,
  audioBitrate: string
): number {
  const videoKbps = parseInt(videoBitrate.replace("k", ""));
  const audioKbps = parseInt(audioBitrate.replace("k", ""));
  return (videoKbps + audioKbps) * 1000;
}

async function createMasterPlaylist(
  outputPath: string,
  resolutions: MasterPlaylistEntry[]
): Promise<string> {
  let playlist = "#EXTM3U\n#EXT-X-VERSION:3\n\n";

  for (const resolution of resolutions) {
    playlist += `#EXT-X-STREAM-INF:BANDWIDTH=${resolution.bandwidth},RESOLUTION=${resolution.resolution}\n`;
    playlist += `${resolution.path}\n`;
  }

  await fs.writeFile(outputPath, playlist);

  return outputPath;
}

const processVideoToHLS = async (
  inputPath: string,
  outputDir: string
): Promise<{
  videoId: string;
  resolutions: string[];
  masterPlaylist: string;
}> => {
  const videoId = path.basename(outputDir);
  const masterPlaylist: MasterPlaylistEntry[] = [];
  const startTime = Date.now();

  logger.info("Starting video processing", {
    videoId,
    inputPath,
    outputDir,
  });

  try {
    logger.info(`Getting video information for ${videoId}`);
    const videoInfo = await getVideoInfo(inputPath);

    logger.info("Video info retrieved", {
      videoId,
      duration: videoInfo.duration,
      dimensions: `${videoInfo.width}x${videoInfo.height}`,
      bitrate: videoInfo.bitrate,
    });

    const applicablePresets = resolutionPresets.filter(
      (preset) => preset.height <= videoInfo.height
    );

    logger.info("Applicable presets determined", {
      videoId,
      presets: applicablePresets.map((p) => p.name),
    });

    for (const preset of applicablePresets) {
      const resolutionStartTime = Date.now();
      const resolutionDir = path.join(outputDir, preset.name);
      await fs.mkdir(resolutionDir, { recursive: true });

      const playlistPath = path.join(resolutionDir, "playlist.m3u8");

      logger.info("Starting resolution processing", {
        videoId,
        resolution: preset.name,
        dimensions: `${preset.width}x${preset.height}`,
      });

      try {
        logger.info("");
        logger.info(
          `.............................................. PROCESSING STARTED FOR ${preset.name} ..............................................`
        );
        logger.info("");
        await new Promise<void>((resolve, reject) => {
          ffmpeg(inputPath)
            .addOptions([
              "-c:v libx264",
              "-c:a aac",
              `-b:v ${preset.videoBitrate}`,
              `-b:a ${preset.audioBitrate}`,
              `-vf scale=${preset.width}:${preset.height}`,
              "-preset fast",
              "-g 48",
              "-sc_threshold 0",
              "-hls_time 10",
              "-hls_playlist_type vod",
              "-hls_segment_filename",
              path.join(resolutionDir, "segment_%03d.ts"),
            ])
            .output(playlistPath)
            .on("end", () => {
              const duration = (Date.now() - resolutionStartTime) / 1000;
              logger.info("Resolution processing completed", {
                videoId,
                resolution: preset.name,
                duration: `${duration}s`,
              });
              resolve();
            })
            .on("error", (err: Error) => {
              const duration = (Date.now() - resolutionStartTime) / 1000;
              logger.error("Resolution processing failed", {
                videoId,
                resolution: preset.name,
                error: err.message,
                duration: `${duration}s`,
              });

              reject(err);
            })
            .on("progress", (progress: any) => {
              if (progress.percent && progress.percent % 10 < 1) {
                logger.info(
                  `Processing progress ..................... [${Math.round(
                    progress.percent
                  )}%] ||`,
                  {
                    videoId,
                    resolution: preset.name,
                    percent: Math.round(progress.percent),
                    fps: progress.currentFps,
                    speed: progress.currentKbps,
                  }
                );
              }
            })
            .run();
        });

        masterPlaylist.push({
          resolution: `${preset.width}x${preset.height}`,
          bandwidth: calculateBandwidth(
            preset.videoBitrate,
            preset.audioBitrate
          ),
          path: `${preset.name}/playlist.m3u8`,
        });
      } catch (error: any) {
        logger.error("Failed to process resolution", {
          videoId,
          resolution: preset.name,
          error: error.message,
        });
        throw error;
      }
    }

    // Create master playlist
    logger.info("Creating master playlist", { videoId });
    const masterPlaylistPath = await createMasterPlaylist(
      path.join(outputDir, "master.m3u8"),
      masterPlaylist
    );

    const totalDuration = (Date.now() - startTime) / 1000;
    logger.info("Video processing completed successfully", {
      videoId,
      resolutions: applicablePresets.map((p) => p.name),
      totalDuration: `${totalDuration}s`,
      masterPlaylist: `${videoId}/master.m3u8`,
    });

    return {
      videoId,
      resolutions: applicablePresets.map((p) => p.name),
      masterPlaylist: masterPlaylistPath,
    };
  } catch (error: any) {
    const totalDuration = (Date.now() - startTime) / 1000;
    logger.error("Video processing failed", {
      videoId,
      error: error.message,
      stack: error.stack,
      totalDuration: `${totalDuration}s`,
    });

    throw error;
  }
};

const processVideo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    if (!req.file) {
      res.status(400).json({ success: false, message: "No file uploaded!" });
      return;
    }
    const {
      courseId,
      sectionId,
      lectureTitle,
      lectureSequence,
      lecturePlaybackTime,
      lectureDescription,
    } = req.body;

    const course = await Course.findOne(
      {
        _id: courseId,
        "sections._id": sectionId,
      },
      { "sections.$": 1 }
    );
    if (!course) {
      res.status(404).json({ success: false, message: "Course not found!" });
      return;
    }

    const videoId = uuidv4();
    const inputFilePath = req.file.path;
    const outputDir = path.join("outputs", videoId);

    await fs.mkdir(outputDir, { recursive: true });

    const processingPromise = processVideoToHLS(inputFilePath, outputDir)
      .then(async (result) => {
        await fs.unlink(inputFilePath);
        return result;
      })
      .catch(async (error) => {
        await fs.unlink(inputFilePath);
        throw error;
      });

    const result = await processingPromise;

    const lectureObject: LectureObject = {
      title: lectureTitle,
      sequence: lectureSequence,
      video_playback_time: lecturePlaybackTime,
      description: lectureDescription,
      video_url: result.masterPlaylist,
    };

    await Course.updateOne(
      { _id: courseId, "sections._id": sectionId },
      { $push: { "sections.$.lectures": lectureObject } }
    );

    res.json({
      success: true,
      videoId: result.videoId,
      resolutions: result.resolutions,
      masterPlaylist: result.masterPlaylist,
      message: "Video processed successfully!",
    });
    return;
  } catch (error) {
    logger.error("Error in processVideo controller", {
      error: error instanceof Error ? error.message : "Unknown error",
    });
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
    return;
  }
};

export { processVideo };
