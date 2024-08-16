import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

const ParchmentSection = ({ children, className }) => {
  return (
    <div
      className={cn(
        'flex w-[24rem] flex-col gap-2 rounded-2xl border border-grayscale-25 p-3 shadow-2xl backdrop-blur-[2px] backdrop-brightness-95',
        className
      )}
    >
      {children}
    </div>
  );
};

ParchmentSection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default ParchmentSection;
