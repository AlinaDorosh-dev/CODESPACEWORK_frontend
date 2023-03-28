/**
 * @fileoverview Header component
 * interface for the header component
 * @author Daniel Vallejo
 * functionality for button "Login/Register"
 * @author Alina Dorosh
 */
import classes from "./Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import logo from "../../assets/img/logo-negro.png";
import { useContext, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router";
import { LoginModalContext } from "../../providers/LoginModalProvider";
import Modal from "../UI/Modal";
import LoginForm from "../login_register_forms/LoginForm";
import RegisterForm from "../login_register_forms/RegisterForm";
import Navbar from "../navbar/Navbar";
import ApiRequest from "../../services/apiRequest";

function Header() {
  //access to modal context
  const {
    onLogin,
    setOnLogin,
    onRegister,
    setOpenLoginModal,
    openLoginModal,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(LoginModalContext);

  //PERSISTANT LOGIN
  //ckeck if there is a remembered user and log him in if there is, using refresh token for authentication and recieve new access token
  useEffect(() => {
    const handleRememberedUser = async () => {
      if (!localStorage.getItem("refreshToken")) return;

      const response = await ApiRequest.refresh(
        localStorage.getItem("refreshToken")
      );
      if (!response.accessToken) return;

      if (response.accessToken) {
        //save tokens in sessionStorage to keep user logged in only for development purposes, in production, token should be saved in state and passed to context
        sessionStorage.setItem("accessToken", response.accessToken);
        sessionStorage.setItem("userId", response.id);
        sessionStorage.setItem("role", response.role);
        setIsAuthenticated(true);
      }
    };
    (async () => handleRememberedUser())();
  });

  const navigate = useNavigate();
  const [role, setRole] = useState("");

  useEffect(() => {
    isAuthenticated ? setRole(sessionStorage.getItem("role")) : setRole("");
  }, [isAuthenticated]);

  const handleClick = () => {
    setOpenLoginModal(true);
    setOnLogin(true);
  };
  return (
    <header className={classes.header}>
      {ReactDOM.createPortal(
        <Modal openModal={openLoginModal} setOpenModal={setOpenLoginModal}>
          {onLogin && <LoginForm />}
          {onRegister && <RegisterForm />}
        </Modal>,
        document.querySelector("#modal")
      )}

      <img className={classes.logo} src={logo} alt='' />

      <Navbar />
      {!isAuthenticated && (
        <div className={classes.btns}>
          <button className={classes.btn} onClick={handleClick}>
            Login / Register
          </button>

          <div className={classes.icon}>
            <FontAwesomeIcon
              icon={faUser}
              role='button'
              onClick={handleClick}
            />
          </div>
        </div>
      )}
      {isAuthenticated && (
        <button
          className={classes["dashboard-btn"]}
          onClick={() => {
            navigate(`${role}s-dashboard`);
          }}
        >
          Mi Dashboard
        </button>
      )}
    </header>
  );
}

export default Header;
