import DashSidebar from '@/components/dashboard/DashSidebar';
import { Outlet } from 'react-router-dom';

function DashLayout() {
  return (
    <div className="max-w-screen absolute inset-0 flex h-screen max-h-screen min-h-screen w-screen">
      <DashSidebar />
      <main className="w-full overflow-auto p-12">
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;
