import { z, ZodType } from "zod";
import { FILETYPES, IFile, IFileReq } from "../../domain/models/fileTypes";
import { FileStorageUseCase } from "../ports/inbound-ports";
import { FileStoragePort, ImageProcessingPort } from "../ports/outband-ports";
import { FormatFileName } from "../helpers/formatters";
import { ImageProcessingService } from "./ImageProcessingService";

// handle file storage and retrieval
export class FileService implements FileStorageUseCase {
    private fileStorage: FileStoragePort;
    private imageProcessingService: ImageProcessingService;

    constructor(
        imageProcessor: ImageProcessingService,
        fileStorage: FileStoragePort,
    ) {
        this.imageProcessingService = imageProcessor;
        this.fileStorage = fileStorage;
    }

    async uploadFile(file: IFileReq): Promise<string> {
        const validationSchema: ZodType<IFileReq> = z.object({
            name: z.string(),
            type: z.enum([
                FILETYPES.IMAGE,
                FILETYPES.VIDEO,
                FILETYPES.AUDIO,
                FILETYPES.PDF,
                FILETYPES.DOCUMENT,
            ]),
            data: z.instanceof(Buffer),
        });

        file.name = FormatFileName(file.name);
        
        // Process images
        if(file.type == FILETYPES.IMAGE) {
            file.data = await this.imageProcessingService.processImage(file.data);
        }

        // Validate file input
        validationSchema.parse(file);

        const url = await this.fileStorage.storeFile(file);

        return url;
    }

    async getFile(url: string): Promise<IFile> {
        const file = await this.fileStorage.getFile(url);

        return file;
    }

    async deleteFile(url: string): Promise<void> {
        await this.fileStorage.deleteFile(url);
    }
}
