import Thumbnail from './Thumbnail';
import { memo } from 'react';

const Previews = ({ files, onItemClick, onItemRemove }) => {

  if (!files.length) return null;

  return (
    <ul className='grid grid-cols-3 lg:grid-cols-5 items-center gap-y-2 gap-x-2.5 mb-2'>
      {files?.map((file, index) => (
        <li key={file.id} className='relative aspect-square overflow-hidden rounded-lg'>
          <Thumbnail file={file} clickHandler={onItemClick} removeFile={onItemRemove}
                     isLast={files.length - 1 === index} />
        </li>
      ))}
    </ul>
  );
};
export default memo(Previews);
