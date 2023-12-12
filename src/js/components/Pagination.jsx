import { useEffect, useState } from 'react';
import clsx from 'clsx';

const Pagination = ({ items, itemsPerPage, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState(0);

  useEffect(() => {
    setPages(Math.ceil(items.length / itemsPerPage));
  }, [items, itemsPerPage]);

  const pagButtonClasses = clsx(
    [
      'cursor-pointer transition-colors',
      'border rounded border-stroke-green text-stroke-green p-4 h-9 flex items-center justify-center w-24',
      'hover:border-white hover:text-white hover:fill-white '
    ]
  );

  return (
    <div className='flex flex-row justify-center items-center gap-2.5 mb-2'>
      <div>
        <button
          className={pagButtonClasses}
          type='button'
          role='button'
          aria-label={`Go to page ${currentPage > 1 ? currentPage - 1 : currentPage}`}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 0}>
          <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15' className='fill-current'>
            <path fillRule='evenodd' clipRule='evenodd'
                  d='M7.91675 7.07323C7.91675 7.3954 8.17792 7.65657 8.50008 7.65657L12.5834 7.65657C12.9056 7.65657 13.1667 7.3954 13.1667 7.07323C13.1667 6.75107 12.9056 6.4899 12.5834 6.4899L8.50008 6.4899C8.17792 6.4899 7.91675 6.75107 7.91675 7.07323Z'
                  fill='#CDD383' />
            <path
              d='M1.6711 7.48574C1.44329 7.25794 1.44329 6.88859 1.6711 6.66079L5.75443 2.57746C5.92126 2.41062 6.17217 2.36072 6.39014 2.45101C6.60812 2.5413 6.75024 2.754 6.75024 2.98994V11.1566C6.75024 11.3925 6.60812 11.6052 6.39014 11.6955C6.17217 11.7858 5.92126 11.7359 5.75443 11.5691L1.6711 7.48574Z'
              fill='#CDD383' />
          </svg>
        </button>
      </div>
      <div className={`${pagButtonClasses} select-none`}>
        {currentPage + 1}/{pages}
      </div>
      <div>
        <button
          className={pagButtonClasses}
          type='button'
          role='button'
          aria-label={`Go to page ${currentPage < pages ? currentPage + 1 : currentPage}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === pages - 1}>
          <svg xmlns='http://www.w3.org/2000/svg' width='15' height='15' viewBox='0 0 15 15' className='fill-current'>
            <path fillRule='evenodd' clipRule='evenodd'
                  d='M7.08337 7.07323C7.08337 7.3954 6.82221 7.65657 6.50004 7.65657L2.41671 7.65657C2.09454 7.65657 1.83337 7.3954 1.83337 7.07323C1.83337 6.75107 2.09454 6.4899 2.41671 6.4899L6.50004 6.4899C6.82221 6.4899 7.08337 6.75107 7.08337 7.07323Z'
                  fill='#CDD383' />
            <path
              d='M13.3293 7.48574C13.5571 7.25794 13.5571 6.88859 13.3293 6.66079L9.24593 2.57746C9.0791 2.41062 8.8282 2.36072 8.61022 2.45101C8.39225 2.5413 8.25012 2.754 8.25012 2.98994V11.1566C8.25012 11.3925 8.39225 11.6052 8.61022 11.6955C8.8282 11.7858 9.0791 11.7359 9.24593 11.5691L13.3293 7.48574Z'
              fill='#CDD383' />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
