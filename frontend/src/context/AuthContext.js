import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => localStorage.getItem('jdp'));
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  const login = (authToken) => {
    console.log("enter auth provider login");
    setUser(()=>authToken.phone);
    setToken(()=>authToken);
    localStorage.setItem('token', authToken);
    console.log(authToken, user, token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
