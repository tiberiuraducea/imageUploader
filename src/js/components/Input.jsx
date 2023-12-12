import clsx from 'clsx';
import InputError from './InputError';

export const inputClasses = clsx([
  'text-xs text-black block w-full bg-gray-6/[0.08] border border-gray-6/[0.08] border-l-orange rounded px-3 py-2 leading-tight',
  'focus:outline-none focus:ring-0 focus:border-orange'
]);
const Input = ({ name, label, error, touched, onChange, ...rest }) => {

  const onChangeHandler = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className='mb-2'>
      <label htmlFor={name}>
        <span className='block mb-0.5 text-xs text-gray-5'>{label}</span>
        <input type='text' name={name} id={name} className={inputClasses} onChange={onChangeHandler} {...rest} />
      </label>
      {touched && error && <InputError>{error}</InputError>}
    </div>
  );
};

export default Input;
