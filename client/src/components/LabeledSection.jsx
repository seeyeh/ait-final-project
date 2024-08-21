import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

const labelVariants = cva('w-fit text-3xl px-1 leading-none', {
  variants: {
    color: {
      light: 'bg-grayscale-5 text-grayscale-60',
      blue: 'bg-blue-light text-blue-dark',
      pink: 'bg-pink-light text-pink-dark',
      green: 'bg-green-light text-green-dark',
      yellow: 'bg-yellow-light text-yellow-dark',
      orange: 'bg-orange-light text-orange-dark',
      blackBlue: 'bg-grayscale-90 text-blue-light'
    },
    size: {
      xl: 'text-xl'
    }
  },
  defaultVariants: {
    color: 'light'
  }
});

function LabeledSection({
  label,
  children,
  color,
  size,
  className,
  containerClassName
}) {
  return (
    <section className={cn('flex w-full flex-col', containerClassName)}>
      <h2 className={cn(labelVariants({ color, size }))}>{label}</h2>
      <div
        className={cn(
          'w-full gap-2 rounded-r-3xl rounded-bl-3xl bg-grayscale-5 p-3 text-small',
          className
        )}
      >
        {children}
      </div>
    </section>
  );
}

LabeledSection.propTypes = {
  label: PropTypes.string.isRequired,
  color: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default LabeledSection;
