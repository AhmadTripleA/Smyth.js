export function getFileType(filename: string): FILETYPES {
    const ext = filename.split(".").pop()?.toLowerCase();
    switch (ext) {
        case "png":
        case "jpg":
        case "jpeg":
        case "gif":
        case "bmp":
        case "webp":
            return FILETYPES.IMAGE;
        case "mp4":
        case "mov":
        case "avi":
        case "mkv":
        case "webm":
            return FILETYPES.VIDEO;
        case "mp3":
        case "wav":
        case "ogg":
        case "aac":
        case "flac":
            return FILETYPES.AUDIO;
        case "pdf":
            return FILETYPES.PDF;
        case "doc":
        case "docx":
        case "txt":
        case "rtf":
        case "odt":
            return FILETYPES.DOCUMENT;
        default:
            throw new Error("Unsupported file type");
    }
}

export function FormatFileName(original: string): string {
    const timestamp = new Date().toISOString().replace(/[-:.TZ]/g, "");
    const fullName = timestamp + "." + original.replace(/\s/g, "-");

    return encodeURIComponent(fullName);
}
