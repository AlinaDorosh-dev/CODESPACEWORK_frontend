/**
 * @fileoverview context for login modal window with states and functions to control it
 * @author Alina Dorosh
 */

import { createContext, useState } from "react";

export const LoginModalContext = createContext(null);

const LoginModalProvider = ({ children }) => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [onRegister, setOnRegister] = useState(false);
  const [onLogin, setOnLogin] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(sessionStorage.getItem("accessToken"));

  const handleClose = () => {
    setOpenLoginModal(false);
    setOnRegister(false);
    setOnLogin(false);
  };
  
  return (
    <LoginModalContext.Provider
      value={{
        openLoginModal,
        setOpenLoginModal,
        onRegister,
        setOnRegister,
        onLogin,
        setOnLogin,
        handleClose,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </LoginModalContext.Provider>
  );
};

export default LoginModalProvider;
