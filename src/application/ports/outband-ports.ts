import { IFile, IFileReq } from "../../domain/models/fileTypes";

export interface FileStoragePort {
    storeFile(file: IFileReq): Promise<string>;
    getFile(url: string): Promise<IFile>;
    deleteFile(url: string): Promise<void>;
}

export interface ImageProcessingPort {
    processImage(imgBuffer: Buffer): Promise<Buffer>
}