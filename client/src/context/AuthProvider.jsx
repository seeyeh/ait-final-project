import useRefreshToken from '@/hooks/useRefreshToken';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();

  useEffect(() => {
    console.log('rendering:', auth, isLoading);
    const verifyRefreshToken = async () => {
      try {
        const accessToken = await refresh();
        setAuth({ accessToken });
        console.log(auth, isLoading);
      } catch (e) {
        console.log('dick', e);
        setAuth(null);
      } finally {
        setIsLoading(false);
      }
    };
    verifyRefreshToken();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {isLoading ? <p>Loading</p> : children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
