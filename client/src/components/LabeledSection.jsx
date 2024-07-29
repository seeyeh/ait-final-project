import PropTypes from 'prop-types';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils';

const labelVariants = cva('w-fit text-3xl px-1 leading-none', {
  variants: {
    color: {
      light: 'bg-grayscale-5 text-grayscale-60',
      blue: 'bg-blue-light text-blue-dark',
      pink: 'bg-pink-10 text-pink-50',
      green: 'bg-green-20 text-green-80',
      yellow: 'bg-yellow-light text-yellow-dark',
      orange: 'bg-orange-light text-orange-dark'
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
  className,
  containerClassName
}) {
  return (
    <section className={cn('flex flex-col w-fit', containerClassName)}>
      <h2 className={cn(labelVariants({ color }))}>{label}</h2>
      <div
        className={cn(
          'w-full bg-grayscale-5 rounded-r-3xl rounded-bl-3xl p-2 gap-2',
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
  className: PropTypes.string,
  containerClassName: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default LabeledSection;
