import { cn } from '@/lib/utils';
import PropTypes from 'prop-types';

function Subsection({ children, className }) {
  return (
    <div className={cn('rounded-2xl bg-white p-3', className)}>{children}</div>
  );
}

Subsection.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.func
  ])
};

export default Subsection;
