export declare function ensureDirectories(): Promise<void>;
export declare function getVideoInfo(inputPath: string): Promise<{
    duration: number;
    width: number;
    height: number;
    bitrate: string;
}>;
