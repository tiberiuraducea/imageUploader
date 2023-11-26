/* Dependancies */
import { useState } from 'react';
import axios from 'axios';
/* Components */
import DropzoneWithProgress from './DropzoneWithProgress';
import { Formik } from 'formik';
import * as Yup from 'yup';


const validationSchema = Yup.object().shape({
  images: Yup.array().of(Yup.mixed().required('Please upload an image'))
});

const AlbumForm = () => {

  const [progress, setProgress] = useState(0);

  // Form reset
  const resetForm = () => {
    setProgress(0);
  }
  const onSubmitHandler = (values, callback) => {

    const formData = new FormData();
    values.images.forEach(image => {
      formData.append('images', image);
    });
    try {
      return axios.post('http://localhost:3001/dummyEndpoint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (progressEvent) => {
          setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
      })
    } catch (error) {
      console.error(error);
    }

    callback();

  };
  return (
    <div className="container mx-auto px-4 max-w-[700px]">
      {progress > 0 && <progress value={progress} max='100' className='fixed top-0 left-0 w-full' />}
      {progress}
      <Formik
        initialValues={{
        images: []
      }}
        onSubmit={onSubmitHandler}
        validationSchema={validationSchema}
      >
        {({ values, handleSubmit, setFieldValue, resetForm }) => (
          <form onSubmit={() => { handleSubmit(values, resetForm) }}>
            <label htmlFor='imageZone' className='cursor-pointer'>
              <span className='block rounded-3xl py-3 text-center text-xs bg-stroke-green text-dog-green'>Upload Photos</span>
            </label>
            <DropzoneWithProgress name='images' id='imageZone' setFieldValue={setFieldValue} />

            <button type='submit'>Submit</button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default AlbumForm;