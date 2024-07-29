import { Outlet } from 'react-router-dom';
import DashSidebar from '../components/dashboard/DashSidebar';

function DashLayout() {
  return (
    <div className="flex max-w-screen max-h-screen min-h-screen h-screen w-screen absolute inset-0">
      <DashSidebar />
      <main className="px-12 pt-12">
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;
