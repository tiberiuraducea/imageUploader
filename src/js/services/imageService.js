import axios from 'axios';

export const uploadImagesInBatches = async (images, batchSize = 12, maxRetries = 3, updateProgress, setLoading) => {
  let failedPromises = [...images];
  let retries = 0;


  while (failedPromises.length > 0 && (maxRetries === 0 || retries < maxRetries)) {
    const uploadBatch = failedPromises.slice(0, batchSize);
    const uploadPromises = [];

    let index = 0;
    for (const image of uploadBatch) {
      index++;
      const promise = axios.post('http://localhost:3001/dummyEndpoint', { image }, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          console.log(`${index} Uploading ${image}:`, Math.round((progressEvent.loaded * 100) / progressEvent.total));
          updateProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      })
        .then((response) => {
          console.log(`${index} Image ${image} uploaded. Response:`, response.data);
        })
        .catch((error) => {
          console.error(`${index} Failed to upload ${image}:`, error.message);
          return image;
        });

      uploadPromises.push(promise);
    }

    const settledPromises = await Promise.allSettled(uploadPromises);

    failedPromises = settledPromises
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason);

    retries++;
  }

  if (failedPromises.length === 0) {
    console.log('All images uploaded or retried successfully.');
  } else {
    console.log('Reached maximum retry attempts or some images failed repeatedly.');
  }

  setLoading(false);
};
