import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import cn from '../lib/utils';
const Input = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div>
      <label htmlFor={id} className="input--header">
        {header}
      </label>
      <input
        id={id}
        className={cn('border-pink-10 flex bg-grayscale-90', className)}
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
