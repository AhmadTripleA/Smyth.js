import sharp from "sharp";
import { ImageProcessingPort } from "../../application/ports/outband-ports";

export class SharpImageProcessing implements ImageProcessingPort {
    processImage(imageBuffer: Buffer): Promise<Buffer> {
        return new Promise((resolve, reject) => {
            sharp(imageBuffer)
                .resize({ width: 860})
                .toBuffer()
                .then((data: Buffer) => resolve(data))
                .catch((error: Error) => reject(error));
        });
    }
}