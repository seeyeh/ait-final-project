import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    /* We reload the page -> auth state will be empty. So if we do not have an access token, call verifyRefreshToken. */
    !(auth?.accessToken) ? verifyRefreshToken() : setIsLoading(false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (<>{isLoading ? <p>Loading...</p> : <Outlet />}</>);
};

export default PersistLogin;
