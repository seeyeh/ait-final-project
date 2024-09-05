import { refreshToken } from '@/lib/auth';
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        const accessToken = await refreshToken();
        const { user } = jwtDecode(accessToken);
        setAuth({ accessToken, ...user });
      } catch (e) {
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
