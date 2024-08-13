import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const { auth } = useAuth();
  const location = useLocation();

  console.log('Ha! Jumped before you could get accessToken!');

  return auth?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );

  // The Outlet component: all the children of requireAuth; components protected by whether or not user is logged in
  // The Navigate component: 'replace' used because we are replacing the address the user was trying to go to with login. The last page they were on is remembered in the navigation history so they can click to go back a page and go back to where they were before they clicked on the protected page that sent them to log in. Try deleting everything in "state...replace" to see what it would be like without this!
};

export default RequireAuth;
