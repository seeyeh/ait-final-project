import PropTypes from 'prop-types';
import { cn } from '../lib/utils';

function Subsection({ children, className }) {
  return (
    <div className={cn('bg-white rounded-2xl p-3', className)}>{children}</div>
  );
}

Subsection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.node)
};

export default Subsection;
