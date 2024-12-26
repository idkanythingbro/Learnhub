export const adjustAspectRatio = async (file, minRatio, maxRatio) => {
    return new Promise(async (resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = async () => {
            const width = img.width;
            const height = img.height;
            const aspectRatio = width / height;
            if (aspectRatio < minRatio || aspectRatio > maxRatio) {
                //convert adjust height width and convert this ratio
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                const response = await fetch(dataUrl);
                const blob = await response.blob();
                const newFile = new File([blob], file.name, { type: 'image/jpeg' });
                resolve(newFile);
            } else {
                resolve(file);
            }
        };
        img.onerror = () => {
            reject(new Error('Failed to load image'));
        };
    });
};