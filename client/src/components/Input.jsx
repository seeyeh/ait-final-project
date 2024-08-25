import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';
const Input = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div className={cn('flex w-56 flex-col-reverse', className)}>
      <input
        id={id}
        className={cn(
          'peer bg-white text-h6 text-grayscale-80 transition-colors',
          '-mt-1 h-fit w-full rounded-r-4xl rounded-bl-3xl border-[3px] border-white p-2',
          'focus:border-pink-medium focus:outline-none'
        )}
        {...props}
        ref={ref}
      />
      <label
        htmlFor={id}
        className="w-fit text-ellipsis text-nowrap bg-grayscale-25 p-2 pt-1 text-h6 text-grayscale-80 transition-colors peer-focus:bg-pink-medium peer-focus:text-white"
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
