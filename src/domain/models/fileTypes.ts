export interface IFile {
    id: string;
    name: string;
    url: string;
    type: FILETYPES;
    size: number;
    data?: Buffer;
}
export interface IFileReq {
    name: string;
    type: FILETYPES;
    data: Buffer;
}

export enum FILETYPES {
    IMAGE = "img",
    VIDEO = "vid",
    AUDIO = "aud",
    PDF = "pdf",
    DOCUMENT = "doc",
}
