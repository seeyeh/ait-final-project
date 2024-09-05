import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Checkbox = forwardRef(({ id, className, label, ...props }, ref) => {
  return (
    <div className={cn('flex flex-row items-center gap-2', className)}>
      <input
        type="checkbox"
        id={id}
        className={cn(
          'max-h-5 min-h-5 min-w-5 max-w-5 appearance-none rounded-lg border-2',
          'bg-white transition-colors',
          'checked:border-green-dark checked:bg-green-light checked:shadow-[0px_0px_25px] checked:shadow-green-light'
        )}
        {...props}
        ref={ref}
      />
      <label
        className="text-h6 text-grayscale-80"
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
});
Checkbox.displayName = 'Checkbox';
Checkbox.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string.isRequired,
  className: PropTypes.string
};

export default Checkbox;
