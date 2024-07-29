import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';
import { cva } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center transition-colors rounded-full',
  {
    variants: {
      variant: {
        dark: 'bg-grayscale-80 text-grayscale-25',
        light: 'bg-white text-grayscale-60',
        pink: 'bg-pink-40 text-white'
      },
      size: {
        default: 'px-3 text-base',
        lg: 'px-3 text-2xl'
      },
      hover: {
        gray: 'hover:bg-grayscale-80 hover:text-white',
        lightpink: 'hover:bg-white hover:text-pink-40',
        pink: 'hover:bg-pink-40 hover:text-white'
      }
    },
    defaultVariants: {
      variant: 'light',
      size: 'default',
      hover: 'gray'
    }
  }
);

const Button = forwardRef(
  ({ variant, size, hover, className, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, hover, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  hover: PropTypes.string
};
Button.displayName = 'Button';

export default Button;
