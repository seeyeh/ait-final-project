import { Outlet } from 'react-router-dom';
import DashHeader from '../components/dashboard/DashHeader';
import DashFooter from '../components/dashboard/DashFooter';

const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className="dash-contain">
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};

export default DashLayout;
