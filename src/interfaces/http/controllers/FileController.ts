import { Request, Response } from "express";
import { FileService } from "../../../application/services/FileService";
import { IFileReq } from "../../../domain/models/fileTypes";
import { getFileType } from "../../../application/helpers/formatters";

export class FileController {
    private fileService: FileService;

    constructor(service: FileService) {
        this.fileService = service;
    }

    public uploadFile = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!req.file) {
                res.status(400).send("No file uploaded.");
                return;
            }
            const fileReq: IFileReq = {
                data: req.file.buffer,
                name: req.file.originalname,
                type: getFileType(req.file.originalname),
            };

            const url = await this.fileService.uploadFile(fileReq);

            res.status(201).json({ url });
        } catch (error: any) {
            res.status(500).send({ error: error.message ?? "unknown error" });
        }
    };

    public getFile = async (req: Request, res: Response): Promise<void> => {
        try {
            const url = String(req.query.url);
            const file = await this.fileService.getFile(url);

            // const result = await this.fileUploadUseCase.uploadFile({});
            res.status(201).json({ data: file });
        } catch (error) {
            res.status(500).send("Error uploading file.");
        }
    };
}
