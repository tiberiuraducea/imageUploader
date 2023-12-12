import clsx from 'clsx';
import { inputClasses } from './Input';
import InputError from './InputError';

const Textarea = ({ name, label, value, onChange, error }) => {

  const textareaClasses = clsx([
    'resize-y min-h-[110px]',
    ...inputClasses.split(' ')
  ]);
  const onChangeHandler = (e) => {
    onChange(name, e.target.value);
  };
  return (
    <div className='mb-2'>
      <label htmlFor={name}>
        <span className='block mb-0.5 text-xs text-gray-5'>{label}</span>
        <textarea
          name={name}
          id={name}
          className={textareaClasses}
          value={value}
          onChange={onChangeHandler} />
      </label>
      {error && <InputError>{error}</InputError>}
    </div>
  );
};

export default Textarea;
