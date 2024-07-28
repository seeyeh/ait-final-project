import { useNavigate, useLocation } from 'react-router-dom';

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
    <aside className="w-80 flex flex-col py-12 px-9">
      {goHomeButton}
      <p>Dash Sidebar</p>
    </aside>
  );
};

export default DashSidebar;
