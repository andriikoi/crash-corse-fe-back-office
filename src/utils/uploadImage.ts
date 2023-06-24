import axios from 'axios';

export const uploadImage = async (image: File, imagePath: string) => {
    const formData = new FormData();
    formData.append('image', image);

    const { data: { url } } = await axios.post('/upload', { name: imagePath, type: image.type });

    if (!url) return;

    await axios.put(url, image, {
        headers: {
            'Content-Type': image.type,
            'Access-Control-Allow-Origin': '*'
        }
    });
}
