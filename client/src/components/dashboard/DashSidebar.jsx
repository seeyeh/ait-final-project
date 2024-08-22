import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../hooks/useLogout.js';
import { cn } from '../../lib/utils';
import Button from '../Button';

// import useAxiosPrivate from '../../hooks/useAxiosPrivate.js'; // not used yet, but will be needed when we start making requests to API for data to be displayed

const DashSidebar = () => {
  const logout = useLogout();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const onGoHomeClicked = () => navigate('/dash');

  // // axiosPrivate is used because it's an instance of axios that we've written a bunch of interceptors for in hooks/useAxiosPrivate.js that do the work of attaching necessary headers to first-time requests to the API (e.g. Authorization: "Bearer _____") where the accessToken needs to be attached or else they won't be authorized, and generating new accessTokens if they've expired, all without the user noticing anything
  // const axiosPrivate = useAxiosPrivate(); // not used yet, but will be needed when we start making requests to API for data to be displayed

  let goHomeButton = null;
  if (pathname !== '/dash') {
    goHomeButton = (
      <button
        title="Home"
        onClick={onGoHomeClicked}
      >
        Home
      </button>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <aside
      className={cn(
        'h-screen max-h-screen min-h-screen w-80 min-w-80',
        'no-scrollbar overflow-y-hidden overflow-x-clip',
        'flex flex-col bg-grayscale-5 px-9 py-12'
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
      <div className="h-fit w-full rounded-3xl shadow-glow-lg shadow-pink-medium">
        <Button
          variant="pink"
          hover="lightpink"
          className="w-full justify-start rounded-3xl text-7xl"
        >
          Start
        </Button>
      </div>
    </aside>
  );
};

export default DashSidebar;
