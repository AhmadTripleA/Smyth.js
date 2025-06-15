interface IFileMeta {
    id: string;
    name: string;
    url: string;
    base_url: string;
    full_url: string;
    type: FILETYPES;
    size: number;
    data?: Buffer;
}

interface IFileRequest {
    name: string;
    type: FILETYPES;
    data: Buffer;
}

enum FILETYPES {
    IMAGE = "img",
    VIDEO = "vid",
    AUDIO = "aud",
    PDF = "pdf",
    DOCUMENT = "doc",
}
