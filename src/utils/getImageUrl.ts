export const getImageUrl = (image: File) => {
    if (!image) return '';
    return window.URL.createObjectURL(image);
}
