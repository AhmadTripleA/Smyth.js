export interface FileStorageUseCase {
    uploadFile(file: IFileRequest): Promise<IFileMeta>;
    getFile(url: string): Promise<IFileMeta>;
    deleteFile(url: string): Promise<void>;
}
