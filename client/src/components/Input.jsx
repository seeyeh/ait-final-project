import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
const Input = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div className="group mb-5 mr-auto">
      <label
        htmlFor={id}
        className="input--header bg-grayscale-80 p-1 pt-1 pb-[0.35rem] px-2 text-grayscale-5 focus:bg-grayscale-90 focus:text-grayscale-5"
      >
        {header}
      </label>
      <input
        id={id}
        className={cn(
          'bg-grayscale-90 text-grayscale-5 border-grayscale-80 px-2 pt-1 pb-2 mt-[3px] rounded-b-2xl rounded-tr-2xl border-2 w-[15rem] focus:outline-none flex focus:border-grayscale-25 focus:z-10 focus:transition-colors',
          className
        )}
        {...props}
        ref={ref}
        // type={props.type}
        // placeholder={props.placeholder}
        // onChange={props.handleChange} // the parent Form component that holds this Input should be the one holding a formData state and also a function that changes that state
        // name={props.name}
        // value={props.value} // props.value = formData.[whatever the name of the input being updated in formData state in the parent Form component] (e.g. formData.firstName)
      />
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
