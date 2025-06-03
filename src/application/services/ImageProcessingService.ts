import { ImageProcessingPort } from "../ports/outband-ports";

// handle image processing storage and retrieval
export class ImageProcessingService implements ImageProcessingPort {
    private processor: ImageProcessingPort;

    constructor(processor: ImageProcessingPort){
        this.processor = processor;
    }

    public async processImage(imgBuffer: Buffer): Promise<Buffer> {
        return await this.processor.processImage(imgBuffer);
    }
    
}
