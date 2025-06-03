import { IFile, IFileReq } from "../../domain/models/fileTypes";

export interface FileStorageUseCase {
    uploadFile(file: IFileReq): Promise<string>;
    getFile(url: string): Promise<IFile>;
    deleteFile(url: string): Promise<void>;
}
