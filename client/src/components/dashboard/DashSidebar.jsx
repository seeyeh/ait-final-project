import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from '../Button';

const DashSidebar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate('/dash');

  let goHomeButton = null;
  if (pathname !== '/dash') {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        Home
      </button>
    );
  }
  return (
    <aside
      className={cn(
        'w-80 min-w-80 h-screen max-h-screen min-h-screen',
        'overflow-x-clip overflow-y-hidden no-scrollbar',
        'bg-grayscale-5 flex flex-col py-12 px-9'
      )}
    >
      {goHomeButton}
      <span className="flex-grow" />
      <div className="shadow-glow-lg shadow-pink-40 rounded-3xl w-full h-fit">
        <Button
          variant="pink"
          hover="lightpink"
          className="text-7xl rounded-3xl w-full justify-start"
        >
          Start
        </Button>
      </div>
    </aside>
  );
};

export default DashSidebar;
