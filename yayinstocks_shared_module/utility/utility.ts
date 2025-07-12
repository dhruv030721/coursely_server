import fs from 'fs/promises';
import ffmpeg from 'fluent-ffmpeg';
import { FfprobeData } from 'fluent-ffmpeg';

export async function ensureDirectories(): Promise<void> {
  const dirs = ['uploads', 'outputs'];
  for (const dir of dirs) {
    try {
      await fs.access(dir);
    } catch {
      await fs.mkdir(dir, { recursive: true });
    }
  }
}

export function getVideoInfo(inputPath: string): Promise<{
  duration: number;
  width: number;
  height: number;
  bitrate: string;
}> {
  return new Promise((resolve, reject) => {
    ffmpeg.ffprobe(inputPath, (err: Error | null, metadata: FfprobeData) => {
      if (err) return reject(err);

      const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');

      if (!videoStream || !videoStream.width || !videoStream.height) {
        return reject(new Error('No video stream found or missing resolution info.'));
      }

      resolve({
        duration: metadata.format.duration ?? 0,
        width: videoStream.width,
        height: videoStream.height,
        bitrate: metadata.format.bit_rate?.toString() ?? '0'
      });
    });
  });
}
