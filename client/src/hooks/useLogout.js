import axios from '@/api/axios';
import useAuth from '@/hooks/useAuth';
import { apiRoutes } from '@/lib/routes';

const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    try {
      await axios.post(apiRoutes.logout, {}, { withCredentials: true });
      setAuth(null);
    } catch (err) {
      console.error(err);
    }
  };
  return logout;
};

export default useLogout;
