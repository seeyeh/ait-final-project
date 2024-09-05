import DashSidebar from '@/components/dashboard/DashSidebar';
import { Outlet } from 'react-router-dom';

function DashLayout() {
  return (
    <div className="max-w-screen absolute inset-0 flex h-screen max-h-screen min-h-screen w-screen">
      <DashSidebar />
      <main className="px-12 pt-12">
        <Outlet />
      </main>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px]"></div>
    </div>
  );
}

export default DashLayout;
