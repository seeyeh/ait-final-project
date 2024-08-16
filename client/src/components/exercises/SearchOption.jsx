import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { cn } from '../../lib/utils';

const SearchOption = forwardRef(({ id, index, className, ...props }, ref) => {
  return (
    <button
      id={id}
      className={cn(
        'flex w-full justify-start rounded-2xl border border-grayscale-5 p-3 text-h5 transition-colors hover:border hover:border-black hover:bg-grayscale-5',
        className
      )}
      key={index}
      ref={ref}
      {...props}
    ></button>
  );
});
SearchOption.displayName = 'SearchOption';
SearchOption.propTypes = {
  id: PropTypes.string,
  index: PropTypes.string,
  className: PropTypes.string
};

export default SearchOption;
