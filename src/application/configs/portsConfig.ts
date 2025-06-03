import { SharpImageProcessing } from "../../infrastructure/processing/SharpImageProcessing";
import { LocalFileStorage } from "../../infrastructure/storage/localFileStorage";
import { FileStoragePort, ImageProcessingPort } from "../ports/outband-ports";
import { FileService } from "../services/FileService";
import { ImageProcessingService } from "../services/ImageProcessingService";

const environment = process.env.NODE_ENV ?? "local";

interface PortsConfig {
    [environment: string]: {
        fileStorage: FileStoragePort;
        imageProcessing: ImageProcessingPort;
    };
}
const configs: PortsConfig = {
    local: {
        fileStorage: new LocalFileStorage(),
        imageProcessing: new SharpImageProcessing(),
    },
    development: {
        fileStorage: new LocalFileStorage(),
        imageProcessing: new SharpImageProcessing(),
    },
    production: {
        fileStorage: new LocalFileStorage(),
        imageProcessing: new SharpImageProcessing(),
    },
};

const env = configs[environment] ?? configs["local"];

export const imageProcessingService = new ImageProcessingService(
    env.imageProcessing
);
export const fileService = new FileService(
    imageProcessingService,
    env.fileStorage,
);