import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useRefreshToken from '../hooks/useRefreshToken';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();

  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    /* We reload the page -> auth state will be empty. So if we do not have an access token, call verifyRefreshToken. */
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // Note for below: if the user does not want persist, the page will jump straight to the children's elements (i.e. RequireAuth). Interestingly though, if the user hasn't logged out and you try to access a protected route, the above useEffects will still run and if there's a valid refreshToken in the cookies, a new accessToken still seems to get generated? But you'll be forced to log in again even though the refresh request passes with no problem. I think it's because the page jumps to the Log In before those refresh requests even finish and the auth state gets updated with an accessToken. So even if you tried going to /dash in your URL bar, it's not like that accessToken gets used because the auth gets cleared again! (b/c the React app restarts and unmounts and remounts?). So the same thing happens once again when you attempt to go to a protected route, even with a valid refreshToken that is capable and WILL (just not quickly enough) generate a new accessToken!

  return (
    <>{!persist ? <Outlet /> : isLoading ? <p>Loading...</p> : <Outlet />}</>
  );

  /* If persist state is marked as true (because there's a 'persist'=true in localStorage), the page will just show loading until loading is done (i.e. an access token has been generated and saved to auth state) before proceeding to children elements (next being RequireAuth if you check the tree) where the accessToken can be verified */
};

export default PersistLogin;
