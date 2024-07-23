import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
const Input = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div className={cn('flex flex-col-reverse w-56', className)}>
      <input
        id={id}
        className="peer -mt-1 bg-grayscale-90 text-grayscale-5 border-grayscale-80 p-2 rounded-b-2xl rounded-tr-2xl border-2 w-full focus:outline-none focus:border-grayscale-25 transition-colors"
        {...props}
        ref={ref}
      />
      <label
        htmlFor={id}
        className="w-fit bg-grayscale-80 p-2 pt-1 text-grayscale-5 focus:text-grayscale-5 peer-focus:bg-grayscale-25 peer-focus:text-grayscale-80 transition-colors"
      >
        {header}
      </label>
    </div>
  );
});
Input.displayName = 'Input';
Input.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Input;

// <Input className="bg-white"/>
