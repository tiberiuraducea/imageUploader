import { lazy, useState, useEffect, useCallback, useMemo, Suspense, memo } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
/* Components */
const Pagination = lazy(() => import('./Pagination'));
const ImageGallery = lazy(() => import('./ImageGallery'));

const ThumbPlaceholder = () => {
  return (
    <div className='absolute top-0 left-0 h-full w-full object-cover object-center bg-gray-5' />
  );
};
const DropzoneWithProgress = ({ name, id, setFieldValue }) => {
  // files to be uploaded
  const [files, setFiles] = useState([]);
  // current page
  const [currentPage, setCurrentPage] = useState(0);
  // items per page
  const [itemsPerPage] = useState(28);

  const onDrop = useCallback(acceptedFiles => {
    // Add files to state array. This will also trigger a re-render
    setFiles(prevState => [...prevState, ...acceptedFiles.map(file => Object.assign(file, {
      id: uuidv4(), // Generate a unique id for each file
      preview: URL.createObjectURL(file) // Create a preview for the image
    }))]);
  }, []);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop
  });

  // Create the image thumbnails list
  const thumbs = useMemo(() => {
    const start = itemsPerPage * currentPage;
    const end = itemsPerPage + (itemsPerPage * currentPage);

    if (files.length > 0 && files?.length === start) {
      setCurrentPage(currentPage - 1);
    }

    // Create a slice of the files array to be displayed on the current page without mutating the original array
    const setOfFiles = [...files].slice(start, end);

    return setOfFiles?.map(file => (
      <li key={file.id} className='relative aspect-square overflow-hidden rounded-lg'>
        <Suspense fallback={<ThumbPlaceholder />}>
          <img
            className='absolute top-0 left-0 h-full w-full object-cover object-center'
            src={file.preview}
            alt={`Preview of ${file.name}`}
          />
          <button onClick={() => removeFile(file.id)}
                  className='absolute bottom-0 left-0 block w-full bg-red-700 text-center font-medium text-white p-0.5'>Remove
          </button>
        </Suspense>
      </li>
    ));
  }, [files, currentPage]);

  const removeFile = (id) => {

    // Revoking the data uris to avoid memory leaks
    URL.revokeObjectURL(files.find(file => file.id === id).preview);

    // Remove the file from the state array
    setFiles(files.filter(file => file.id !== id));
  };

  useEffect(() => {
// Make sure to revoke the data uris to avoid memory leaks
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  useEffect(() => {
    setFieldValue(name, files);
  }, [files]);

  return (
    <div>
      <div {...getRootProps()}
           className='flex w-full flex-row flex-wrap items-center justify-center rounded-lg border border-dashed border-teal-700 min-h-[400px] dropzone'
      >
        <input {...getInputProps()} type='file' name={name} id={id} multiple={true} accept='image/*' />
        <p>Drag & drop some images here, or click to select files.</p>
      </div>
      {/* {progress > 0 && <progress value={progress} max="100" className="w-full" />} */}

      <ul className='grid grid-cols-7 items-center gap-y-2 gap-x-2.5'>
        {thumbs}
      </ul>

      {files?.length && <Suspense fallback={<div>loading...</div>}><ImageGallery images={files.map(file => file.preview)} startingIndex={0} /></Suspense>}
      {files?.length &&
        <Suspense fallback={<div>loading...</div>}>
          <Pagination items={files} itemsPerPage={itemsPerPage} currentPage={currentPage}
                    setCurrentPage={setCurrentPage} />
        </Suspense>}
    </div>
  );
};

export default DropzoneWithProgress;