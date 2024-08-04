import { Outlet } from 'react-router-dom';
import DashSidebar from '../components/dashboard/DashSidebar';

function DashLayout() {
  return (
    <div className="max-w-screen absolute inset-0 flex h-screen max-h-screen min-h-screen w-screen">
      <DashSidebar />
      <main className="px-12 pt-12">
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;
