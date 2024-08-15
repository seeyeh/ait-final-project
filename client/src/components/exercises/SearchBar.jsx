import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';
import Button from '../Button';

const SearchBar = forwardRef(({ id, className, header, ...props }, ref) => {
  // props needed: header, type, placeholder, handleChange, name, value
  return (
    <div
      className={cn(
        'flex bg-grayscale-5 text-h6 text-grayscale-80 transition-colors',
        'h-fit w-full rounded-4xl border-2 border-grayscale-5 p-2',
        'focus-within:border-blue-light'
      )}
    >
      <input
        id={id}
        className={cn(
          'h-fit w-full bg-grayscale-5',
          'focus:border-blue-light focus:outline-none'
        )}
        {...props}
        ref={ref}
      />
      <Button>Search!</Button>
    </div>
  );
});
SearchBar.displayName = 'Input';
SearchBar.propTypes = {
  id: PropTypes.string,
  header: PropTypes.string.isRequired,
  className: PropTypes.string,
  labelHidden: PropTypes.boolean
};

export default SearchBar;
