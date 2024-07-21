import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      {/* <div className="text-xl text-white">[Layout]</div> */}
      <Outlet />
    </>
  );
}

export default Layout;
