import PropTypes from 'prop-types';
import { createContext, useState } from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [persist, setPersist] = useState(() => {
    const persistLogin = localStorage.getItem('persist');
    return persistLogin && persistLogin !== 'undefined'
      ? JSON.parse(persistLogin)
      : false;
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export default AuthContext;
