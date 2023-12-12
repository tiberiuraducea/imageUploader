import { Dialog } from '@headlessui/react';
import clsx from 'clsx';

const Modal = ({ isOpen, setIsOpen, children }) => {
  const buttonClasses = clsx([
    'absolute top-1 right-2 text-3xl text-white p-4 w-10 h-10 leading-none flex items-center justify-center'
  ]);
  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <Dialog.Overlay className='fixed inset-0 z-1 bg-black/90' onClick={() => setIsOpen(false)} />
      <Dialog.Panel className='fixed inset-0 flex items-center justify-center'>
        {children}
        <button
          onClick={() => setIsOpen(false)}
          className={buttonClasses}
        >
          <span className='sr-only'>Close modal</span>
          <span>&times;</span>
        </button>
      </Dialog.Panel>
    </Dialog>
  );
};

export default Modal;
