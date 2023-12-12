// imageResizerWorker.js

self.addEventListener('message', async (event) => {
  const { file } = event.data;

  const resizeImage = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const dataURL = event.target.result;

        createImageBitmap(file)
          .then((imageBitmap) => {
            const canvas = new OffscreenCanvas(1, 1);
            const ctx = canvas.getContext('2d');
            const maxSize = 252;

            let width = imageBitmap.width;
            let height = imageBitmap.height;

            if (width > height) {
              if (width > maxSize) {
                height *= maxSize / width;
                width = maxSize;
              }
            } else {
              if (height > maxSize) {
                width *= maxSize / height;
                height = maxSize;
              }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(imageBitmap, 0, 0, width, height);

            canvas.convertToBlob({ type: 'image/jpeg', quality: 0.8 })
              .then((blob) => {
                resolve(blob);
              })
              .catch((error) => {
                reject(error);
              });
          })
          .catch((error) => {
            reject(error);
          });
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });

  try {
    const resizedImageBlob = await resizeImage(file);
    self.postMessage({ resizedImageBlob });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});
