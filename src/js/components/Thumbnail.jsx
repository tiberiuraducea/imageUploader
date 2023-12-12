import { Suspense, useEffect, useState } from 'react';
import { useUploaderContext } from '../context/uploaderContext';
import clsx from 'clsx';
import { Camera } from './Icons';
import Loading from './Loading';

const workerURL = new URL('../workers/imageResizer.worker.js', import.meta.url);

const thumbClasses = clsx([
  'absolute top-0 left-0 h-full w-full',
  'flex items-center justify-center object-cover object-center',
  'bg-gray-1/90'
]);
export const ThumbPlaceholder = () => (
  <div
    className={thumbClasses}>
    <Camera />
  </div>
);

const Thumbnail = ({ file, clickHandler, removeFile, isLast }) => {

  const imageResizerWorker = new Worker(workerURL);

  const { setLoading: setIsLoading } = useUploaderContext();
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsLoading(!isLast);
  }, [isLast]);

  const buttonClasses = clsx([
    'transition-all',
    'absolute bottom-0 left-0 block w-full bg-alert-red/90 text-center text-xs font-medium text-white p-0.5 py-1',
    'hover:bg-alert-red hover:py-1.5'
  ]);

  useEffect(() => {
    const resizeImage = async () => {
      try {
        imageResizerWorker.postMessage({ file });

        imageResizerWorker.addEventListener('message', (event) => {
          const { resizedImageBlob, error } = event.data;
          if (resizedImageBlob) {
            const imageUrl = URL.createObjectURL(resizedImageBlob);
            setThumbnail(imageUrl);
            setLoading(false);
          } else if (error) {
            console.error(error);
          }
        });
      } catch (err) {
        console.error(err);
      }
    };

    resizeImage();

    return () => {
      URL.revokeObjectURL(thumbnail);
      imageResizerWorker.terminate();
    };

  }, [file]);

  if (loading) return <div className={thumbClasses}><Loading /></div>;

  return (
    <>
      <Suspense fallback={<ThumbPlaceholder />}>
        {thumbnail && <img
          className='absolute w-full h-full top-0 left-0 object-cover object-center'
          src={thumbnail}
          alt={`Preview of ${file.name}`}
          onClick={() => clickHandler(file.id)}
          width='126'
          height='126'
        />}
      </Suspense>
      <button
        type='button'
        role='button'
        onClick={() => removeFile(file)}
        className={buttonClasses}
      >
        Remove
      </button>
    </>
  );
};

export default Thumbnail;
