export function getImageExtFromURL(url: string) {
    const isJPEG = url.includes('jpg');
    const isPNG = url.includes('png');
    const isGIF = url.includes('gif');
    if (isJPEG) {
        return 'jpeg';
    }
    if (isPNG) {
        return 'png';
    }
    if (isGIF) {
        return 'gif';
    }
    return 'jpeg';
}