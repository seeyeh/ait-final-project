import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
const Input = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div className={cn('flex flex-col-reverse w-56', className)}>
      <input
        id={id}
        className={cn(
          'peer bg-white text-grayscale-80 text-h6 transition-colors',
          'w-full h-fit -mt-1 border-[3px] border-white p-2 rounded-r-4xl rounded-bl-3xl',
          'focus:outline-none focus:border-pink-medium'
        )}
        {...props}
        ref={ref}
      />
      <label
        htmlFor={id}
        className="w-fit bg-grayscale-25 p-2 pt-1 text-grayscale-80 text-h6 peer-focus:bg-pink-medium peer-focus:text-white transition-colors"
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
