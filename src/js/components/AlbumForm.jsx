/* Dependancies */
import { lazy, useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useUploaderContext } from '../context/uploaderContext';
import { uploadImagesInBatches } from '../services/imageService';
/* Components */
import Input from './Input';
import Textarea from './Textarea.jsx';
import { ArrowBack, LoadingDots, Underline } from './Icons';

const DropzoneWithProgress = lazy(() => import('./DropzoneWithProgress'));

const validationSchema = Yup.object().shape({
  images: Yup.array().of(Yup.mixed().required('Please upload an image')),
  albumName: Yup.string().trim().required('Album name is required'),
  albumDetails: Yup.string().trim()
});

const AlbumForm = () => {

  const { loading, setLoading } = useUploaderContext();
  const [progress, setProgress] = useState(0);
  const onSubmitHandler = async (values) => {
    setLoading(true);

    console.log(values);
    const formData = new FormData();
    values.images.forEach(image => {
      formData.append('images', image);
    });
    try {
      await uploadImagesInBatches(values.images, 24, 64, setProgress, setLoading);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='container mx-auto px-4 max-w-[700px] py-4'>

      <div className='mb-8 block'>
        <button
          className='flex items-center gap-2 text-bold text-gray-5 text-sm '
          onClick={() => history.back()}>
          <span><ArrowBack /></span>
          <span>Back</span>
        </button>
      </div>
      {loading && <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>

                <span className='animate-spin'>
                    <LoadingDots />
                </span>
      </div>}
      {progress > 0 && <progress value={progress} max='100'
                                 className='fixed top-0 left-0 w-full bg-alert-green fill-alex-green' />}

      <h1 className='text-2xl font-bold text-gray-5 text-center flex flex-col items-center mb-8'>
        <span>New Album</span>
        <span className='-mt-[11px]'>
                    <Underline />
                </span>
      </h1>

      <Formik
        initialValues={{
          images: [],
          albumName: '',
          albumDetails: ''
        }}
        onSubmit={async (values) => await onSubmitHandler(values)}
        validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
      >
        {({ setFieldValue, isSubmitting, handleSubmit, touched, errors }) => (

          <form onSubmit={handleSubmit}>
            <Input name='albumName' label='Album Name*' touched={touched.albumName} error={errors.albumName}
                   onChange={setFieldValue} />

            <Textarea name='albumDetails' label='Album Details' onChange={setFieldValue} touched={touched.albumDetails}
                      error={errors.albumDetails} />

            <DropzoneWithProgress name='images' id='imageZone' touched={touched.images}
                                  error={errors.images} setFieldValue={setFieldValue} />
            <button type='submit' disabled={isSubmitting}
                    className='flex group items-center font-medium justify-center gap-2 w-full rounded py-3 text-center text-xs bg-alex-green hover:bg-white transition-colors text-dog-green'>
              <span>Upload & Create</span>
              <span className=''>
                                <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15'
                                     fill='none'>
                                  <path fillRule='evenodd' clipRule='evenodd'
                                        d='M7.49996 2.40658C4.92263 2.40658 2.83329 4.49592 2.83329 7.07325C2.83329 9.65058 4.92263 11.7399 7.49996 11.7399C10.0773 11.7399 12.1666 9.65058 12.1666 7.07325C12.1666 4.49592 10.0773 2.40658 7.49996 2.40658ZM1.66663 7.07325C1.66663 3.85159 4.2783 1.23991 7.49996 1.23991C10.7216 1.23991 13.3333 3.85159 13.3333 7.07325C13.3333 10.2949 10.7216 12.9066 7.49996 12.9066C4.2783 12.9066 1.66663 10.2949 1.66663 7.07325Z'
                                        fill='#254F38' />
                                  <path fillRule='evenodd' clipRule='evenodd'
                                        d='M7.50004 4.15657C7.82221 4.15657 8.08337 4.41774 8.08337 4.7399V6.4899H9.83337C10.1555 6.4899 10.4167 6.75107 10.4167 7.07324C10.4167 7.3954 10.1555 7.65657 9.83337 7.65657H8.08337V9.40657C8.08337 9.72874 7.82221 9.9899 7.50004 9.9899C7.17787 9.9899 6.91671 9.72874 6.91671 9.40657V7.65657H5.16671C4.84454 7.65657 4.58337 7.3954 4.58337 7.07324C4.58337 6.75107 4.84454 6.4899 5.16671 6.4899H6.91671V4.7399C6.91671 4.41774 7.17787 4.15657 7.50004 4.15657Z'
                                        fill='#254F38' />
                                </svg>
                            </span>
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AlbumForm;
