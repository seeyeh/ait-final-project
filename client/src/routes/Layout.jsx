import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <>
      {/* <div className="text-xl text-white">[Layout]</div> */}
      <Outlet />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:20px_20px]" />
    </>
  );
}

export default Layout;
