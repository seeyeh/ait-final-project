import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import Button from '../Button';

import useAuth from '../../hooks/useAuth.js';

import useAxiosPrivate from '../../hooks/useAxiosPrivate.js';
const LOGOUT_URL = '/auth/logout';

const DashSidebar = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate('/dash');
  const axiosPrivate = useAxiosPrivate();

  let goHomeButton = null;
  if (pathname !== '/dash') {
    goHomeButton = (
      <button title="Home" onClick={onGoHomeClicked}>
        Home
      </button>
    );
  }

  const handleLogout = async () => {
    try {
      const response = await axiosPrivate.post(LOGOUT_URL);
      console.log(JSON.stringify(response?.data));
      setAuth({})
      navigate('/login', { replace: true });
    } catch (err) {
      console.log('Logout failed.')
    }
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
      <Button
        onClick={handleLogout}
        className="m-20"
      >
        Logout
      </Button>
      <div className="shadow-glow-lg shadow-pink-medium rounded-3xl w-full h-fit">
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
