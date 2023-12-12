import { LoadingDots } from './Icons';
import clsx from 'clsx';

const Loading = ({ fixed }) => {

  const containerClasses = clsx({
    'flex items-center justify-center w-full': true,
    'fixed top-0 left-0 w-full h-full bg-black/50 z-50 ': fixed
  });

  return (
    <div className={containerClasses}>
                <span className='animate-spin'>
                    <LoadingDots />
                </span>
    </div>
  );
};

export default Loading;
