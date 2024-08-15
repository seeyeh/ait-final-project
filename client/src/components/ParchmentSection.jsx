import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

const ParchmentSection = ({ children, header }) => {
  return (
    <div
      className={cn(
        'flex h-fit w-[24rem] flex-col gap-6 rounded-2xl border border-grayscale-25 p-5 shadow-2xl backdrop-blur-[2px] backdrop-brightness-95'
      )}
    >
      <h2 className="text-h5">{header}</h2>
      {children}
    </div>
  );
};

ParchmentSection.propTypes = {
  header: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default ParchmentSection;
