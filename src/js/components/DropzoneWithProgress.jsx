import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDropzone } from 'react-dropzone';
import { getBreakPoint } from '../helpers/getBreakPoint/getBreakPoint';
import { useUploaderContext } from '../context/uploaderContext';
import useMediaQuery from '../hooks/useMediaQuery';
import { Underline } from './Icons';
import Previews from './Previews';
import Loading from './Loading';
/* Components */
const Pagination = lazy(() => import('./Pagination'));
const ImageGallery = lazy(() => import('./ImageGallery'));
const Modal = lazy(() => import('./Modal'));

const DropzoneWithProgress = ({ name, id, error, touched, setFieldValue }) => {

  const tailwindBPWidth = getBreakPoint('md');
  const isMobile = useMediaQuery(`(max-width: ${tailwindBPWidth})`);

  const { setLoading } = useUploaderContext();

  const [startImage, setStartImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  // files to be uploaded
  const [files, setFiles] = useState([]);

  // current page
  const [currentPage, setCurrentPage] = useState(0);
  // items per page
  const [itemsPerPage, setItemsPerPage] = useState(0);

  const onDrop = useCallback(acceptedFiles => {

    setFiles(prevState => [...prevState, ...acceptedFiles.map(file => {
      return Object.assign(file, {
        id: uuidv4()
      });
    })]);
  }, []);


  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop
  });

  const removeFile = (file) => {
    // Remove the file from the state array
    URL.revokeObjectURL(file);
    setFiles(files.filter(item => item.id !== file.id));
  };

  const clickHandler = (imageId) => {
    setStartImage(imageId);
    setOpenModal(true);
  };

  const changePage = (newPage) => {
    setLoading(true);
    setCurrentPage(newPage);
  };

  useEffect(() => {
    setFieldValue(name, files);
  }, [files]);

  useEffect(() => {
    setItemsPerPage(isMobile ? 12 : 20);
  }, [isMobile]);


  const thumbs = useMemo(() => {
    const start = itemsPerPage * currentPage;
    const end = itemsPerPage + (itemsPerPage * currentPage);

    if (files.length > 0 && files?.length === start) {
      setCurrentPage(currentPage - 1);
    }

    if (currentPage > files.length / itemsPerPage) {
      setCurrentPage(0);
    }

    return files.slice(start, end);
  }, [itemsPerPage, files, currentPage]);

  return (
    <div className='mb-2'>
      <div {...getRootProps()}
           className='flex w-full flex-row flex-wrap items-center justify-center rounded-lg border border-dashed border-orange/60 hover:border-orange transition-colors cursor-pointer min-h-[100px] dropzone mb-2'
      >
        <input
          {...getInputProps()}
          type='file'
          name={name}
          id={id}
          multiple={true}
          accept='image/*'
        />
        <p className='text-white text-xs'>Drag & drop some images here, or click the button below.</p>
      </div>

      <label htmlFor={id} className='text-center block w-full mb-2'>
                <span
                  className='bg-stroke-green text-dog-green text-xs py-3 px-8 rounded-full inline-block cursor-pointer'>Upload Photos</span>
      </label>

      {touched && error && <div className='text-xs text-red-500'>{error}</div>}

      {files?.length > 0 && <h2 className='font-bold text-center flex flex-col items-center mb-8 text-gray-5'>
        <span>{files.length} Photos</span>
        <span className='-mt-1.5'>
                    <Underline />
                </span>
      </h2>}

      <Previews files={thumbs} onItemRemove={removeFile} onItemClick={clickHandler} />

      <Modal isOpen={openModal} setIsOpen={setOpenModal}>
        <Suspense fallback={<Loading />}>
          <ImageGallery images={files}
                        startingIndex={[...files].findIndex(file => file.id === startImage)} />
        </Suspense>
      </Modal>

      {files?.length > 0 &&
        <Suspense fallback={<Loading />}>
          <Pagination items={files} itemsPerPage={itemsPerPage} currentPage={currentPage}
                      setCurrentPage={changePage} />
        </Suspense>
      }
    </div>
  );
};

export default DropzoneWithProgress;
