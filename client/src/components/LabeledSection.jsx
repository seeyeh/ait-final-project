import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';
import PropTypes from 'prop-types';

const labelVariants = cva('w-fit text-3xl px-1 leading-none', {
  variants: {
    color: {
      light: 'bg-grayscale-5 text-grayscale-60',
      blue: 'bg-blue-light text-blue-dark',
      pink: 'bg-pink-light text-pink-dark',
      green: 'bg-green-light text-green-dark',
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
    <section className={cn('flex w-fit flex-col', containerClassName)}>
      <h2 className={cn(labelVariants({ color }))}>{label}</h2>
      <div
        className={cn(
          'w-full gap-2 rounded-r-3xl rounded-bl-3xl bg-grayscale-5 p-2',
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export default LabeledSection;
