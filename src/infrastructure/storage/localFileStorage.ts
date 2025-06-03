import * as fs from 'fs';
import * as path from 'path';
import { FileStoragePort } from '../../application/ports/outband-ports';
import { IFile, IFileReq, FILETYPES } from '../../domain/models/fileTypes';

const PREFIX = process.env.FILE_UPLOAD_PATH;
const BASE_URL = process.env.BASE_URL;

export class LocalFileStorage implements FileStoragePort {
    private basePath = path.resolve(__dirname, `../../../public/${PREFIX}`);

    constructor() {
        if (!fs.existsSync(this.basePath)) {
            fs.mkdirSync(this.basePath, { recursive: true });
        }
    }
 
    public async storeFile(file: IFileReq): Promise<string> {
        const folderPath = path.join(this.basePath, file.type);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }

        const filePath = path.join(folderPath, file.name);
        await fs.promises.writeFile(filePath, file.data);

        // Return a URL-friendly path for frontend access
        return `/${PREFIX}/${file.type}/${file.name}`;
    }

    public async getFile(url: string): Promise<IFile> {
        const urlParts = url.split('/');
        const fileName = urlParts.pop();
        const folderName = urlParts.pop();
        const filePath = path.join(
            this.basePath,
            folderName ?? "",
            fileName ?? ""
        );

        if (!fs.existsSync(filePath)) {
            throw new Error('File not found');
        }

        const stats = await fs.promises.stat(filePath);
        const fileType = path.basename(path.dirname(filePath)) as FILETYPES;

        return {
            id: stats.ino.toString(),
            name: path.basename(filePath),
            url,
            type: fileType,
            size: stats.size,
        };
    }

    async deleteFile(url: string): Promise<void> {
        const filePath = path.join(this.basePath, url);
        if (!fs.existsSync(filePath)) {
            throw new Error('File not found');
        }

        await fs.promises.unlink(filePath);
    }
}