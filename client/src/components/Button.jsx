import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors rounded-full',
  {
    variants: {
      variant: {
        default:
          'bg-grayscale-80 text-grayscale-25 hover:bg-grayscale-5 hover:text-grayscale-80',
        pink: 'bg-pink-40 text-grayscale-90 hover:bg-grayscale-5 hover:text-grayscale-80'
      },
      size: {
        default: 'px-3 h-6 text-base',
        lg: 'px-3 h-7 text-xl'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

const Button = forwardRef(({ variant, size, className, ...props }, ref) => {
  return (
    <button
      className={cn('', buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string
};
Button.displayName = 'Button';

export default Button;
