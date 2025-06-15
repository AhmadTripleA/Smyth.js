export interface FileStoragePort {
    storeFile(file: IFileRequest): Promise<IFileMeta>;
    getFile(url: string): Promise<IFileMeta>;
    deleteFile(url: string): Promise<void>;
}

export interface ImageProcessingPort {
    processImage(imgBuffer: Buffer): Promise<Buffer>
}