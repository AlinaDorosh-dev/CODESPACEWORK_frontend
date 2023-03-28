/**
 * @fileoverview This file contains the register form component
 * @author Alina Dorosh
 * */

import classes from "../../styles/RegisterForm.module.css";
import { useState, useEffect, useReducer, useContext } from "react";
import { LoginModalContext } from "../../providers/LoginModalProvider";
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  initialRegisterState,
  REGISTER,
  registerReducer,
} from "../../models/reducers/register.reducer";

import { EMAIL_REGEX, USER_REGEX, PWD_REGEX } from "../../utils/regExp";
import ApiRequest from "../../services/apiRequest";
import Button from "../UI/Button";
import Input from "../UI/Input";
import InfoAlert from "../UI/InfoAlert";
import Loader from "../UI/Spinner/Loader";
import { useNavigate } from "react-router";


const RegisterForm = () => {
  //access modal context
  const { setOnRegister, setOnLogin, openLoginModal, setOpenLoginModal, setIsAuthenticated } =
    useContext(LoginModalContext);

  
  //access reducer
  const [state, dispatch] = useReducer(registerReducer, initialRegisterState);

  const navigate = useNavigate();

  //state to control pending request
  const [pending, setPending] = useState(false);

  // if modal window closed reset state
  useEffect(() => {
    if (!openLoginModal) {
      setOnLogin(false);
      setOnRegister(false);
    }
  }, [openLoginModal]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(state.email); //email validation returns boolean
    dispatch({ type: REGISTER.EMAIL_VALIDATION, payload: result });
  }, [state.email]);

  useEffect(() => {
    const result = USER_REGEX.test(state.userName); //name validation returns boolean
    dispatch({ type: REGISTER.USER_NAME_VALIDATION, payload: result });
  }, [state.userName]);

  useEffect(() => {
    const result = PWD_REGEX.test(state.pwd); //Pwd validation returns boolean
    dispatch({ type: REGISTER.PASSWORD_VALIDATION, payload: result });
    const match = state.pwd === state.matchPwd; //Boolean check if pwd in both fields match
    dispatch({ type: REGISTER.PWD_MATCH_VALIDATION, payload: match });
  }, [state.pwd, state.matchPwd]);

  //If we displayed error and after that any value in dependency array changes,
  //we set error to empty string again
  useEffect(() => {
    dispatch({ type: REGISTER.ERROR_MSG, payload: "" });
  }, [state.userName, state.email, state.pwd, state.matchPwd]);

  //   const navigate = useNavigate(); commented out while routing is not implemented

  //state for successfull registration
  const [success, setSuccess] = useState(false);

  const newUser = {
    userName: state.userName,
    email: state.email,
    password: state.pwd,
    role: state.role,
    registerAt: new Date(),
    lastLogin: new Date(),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //second validation on submit
    const v1 = EMAIL_REGEX.test(state.email);
    const v2 = PWD_REGEX.test(state.pwd);
    const v3 = USER_REGEX.test(state.userName);
    if (!v1 || !v2 || !v3) {
      dispatch({ type: REGISTER.ERROR_MSG, payload: "Invalid Entry" });
      return;
    }
    setPending(true);
    const response = await ApiRequest.register(newUser);

    if (response.status === "success") {
      //If we successfully register a user, we will save the tokens in sessionStorage only for development purposes
      //In production we will use httpOnly cookies
      sessionStorage.setItem("accessToken", response.newUser.accessToken);
      sessionStorage.setItem("refreshToken", response.newUser.refreshToken);
      sessionStorage.setItem("userId", response.newUser.id);
      sessionStorage.setItem("role", response.newUser.role);
      dispatch({
        type: REGISTER.RESTORE_STATE,
        payload: initialRegisterState,
      });
      setSuccess(true);
      setPending(false);
      setOpenLoginModal(false);
      setIsAuthenticated(true);
      if (response.newUser.role === "candidate") {
        navigate(`candidates-dashboard/profile/${response.newUser.id}}`);
      } else if (response.newUser.role === "employer") {
        navigate(`employers-dashboard/profile/${response.newUser.id}}`);
      }
    } else if (
      response.status === 409 ||
      response.message === "This email is already registered"
    ) {
      //If we try to register a user with an already registered email, we will show an alert with error
      dispatch({
        type: REGISTER.ERROR_MSG,
        payload:
          "This email is already registered, you will be redirected to login form",
      });
      setTimeout(() => {
        setOnLogin(true);
        setOnRegister(false);
        setSuccess(false);
      }, 2000);
    } else if (response.message === "Failed to fetch") {
      dispatch({
        type: REGISTER.ERROR_MSG,
        payload: "Conection error. Please reload the app",
      });
    }
  };

  return (
    <>
      <section className={classes["register-form"]}>
        <h5>
          Crea tu cuenta en <br /> CODE SPACE WORKS
        </h5>
        {state.errMsg && (
          <InfoAlert className='alert-red' alertTxt={state.errMsg} />
        )}
        {success && (
          <InfoAlert
            className='alert-green'
            alertTxt='Usuario creado con exito'
          />
        )}
        {
          //If we have pending request we show loader
          pending && <Loader />
        }
        {
          //If we have no pending request we show form
          !pending && (
            <form onSubmit={handleSubmit}>
              <div className={classes.roles}>
                <div
                  className={
                    state.role === "candidate"
                      ? `${classes["active-role"]} ${classes["role-btn"]}`
                      : `${classes["not-active-role"]} ${classes["role-btn"]}`
                  }
                  onClick={() =>
                    dispatch({ type: REGISTER.USER_ROLE, payload: "candidate" })
                  }
                >
                  <FontAwesomeIcon icon={faUser} /> Codespacer
                </div>
                <div
                  className={
                    state.role === "employer"
                      ? `${classes["active-role"]} ${classes["role-btn"]}`
                      : `${classes["not-active-role"]} ${classes["role-btn"]}`
                  }
                  onClick={() =>
                    dispatch({ type: REGISTER.USER_ROLE, payload: "employer" })
                  }
                >
                  <FontAwesomeIcon icon={faBriefcase} /> Partner
                </div>
              </div>
              <label htmlFor='userName'>
                Nombre de usuario:
                <span
                  className={state.validName ? classes.valid : classes.hide}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    state.validName || !state.userName
                      ? classes.hide
                      : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <Input
                type='text'
                placeholder='Nombre de usuario'
                onChange={(e) =>
                  dispatch({
                    type: REGISTER.USER_NAME_INPUT,
                    payload: e.target.value,
                  })
                }
                aria-invalid={state.validName ? "false" : "true"}
                //Accessability(aria described by element with id "uidnote" for screenreaders)
                aria-describedby='namenote'
                onFocus={() =>
                  dispatch({ type: REGISTER.USER_NAME_FOCUS, payload: true })
                }
                onBlur={() =>
                  dispatch({ type: REGISTER.USER_NAME_FOCUS, payload: false })
                }
                value={state.userName}
                id='userName'
              />

              {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
              <p
                id='namenote'
                className={
                  state.userNameFocus && state.userName && !state.validName
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Nombre de usuario tiene que tener al menos 4 letras
              </p>

              <label htmlFor='email'>
                Email:
                <span
                  className={state.validEmail ? classes.valid : classes.hide}
                >
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    state.validEmail || !state.email
                      ? classes.hide
                      : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <Input
                type='email'
                placeholder='Email'
                onChange={(e) =>
                  dispatch({
                    type: REGISTER.EMAIL_INPUT,
                    payload: e.target.value,
                  })
                }
                id='email'
                required
                aria-invalid={state.validEmail ? "false" : "true"}
                //Accessability(aria described by element with id "uidnote" for screenreaders)
                aria-describedby='emailnote'
                onFocus={() =>
                  dispatch({ type: REGISTER.EMAIL_FOCUS, payload: true })
                }
                onBlur={() =>
                  dispatch({ type: REGISTER.EMAIL_FOCUS, payload: false })
                }
                value={state.email}
              />

              {/* This paragraph will be displayed only when input onFocus, at least 1 char is typed and if validation fails */}
              <p
                id='emailnote'
                className={
                  state.emailFocus && state.email && !state.validEmail
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Introduzca un email valido
              </p>

              <label htmlFor='password'>
                Contarseña:
                <span className={state.validPwd ? classes.valid : classes.hide}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span
                  className={
                    state.validPwd || !state.pwd
                      ? classes.hide
                      : classes.invalid
                  }
                >
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <Input
                type='password'
                id='password'
                onChange={(e) =>
                  dispatch({
                    type: REGISTER.PASSWORD_INPUT,
                    payload: e.target.value,
                  })
                }
                required
                aria-invalid={state.validPwd ? "false" : "true"}
                //Accessability(aria described by element with id "pwdnote" for screenreaders)
                aria-describedby='pwdnote'
                onFocus={() =>
                  dispatch({ type: REGISTER.PASSWORD_FOCUS, payload: true })
                }
                onBlur={() =>
                  dispatch({ type: REGISTER.PASSWORD_FOCUS, payload: false })
                }
                value={state.pwd}
                placeholder='Contraseña'
              />

              <p
                id='pwdnote'
                className={
                  state.pwdFocus && !state.validPwd
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Introduzca una contraseña segura. Minimo 8 characteres, al menos
                una mayuscula, una minuscula y un caracter especial:
                <span aria-label='exclamation mark'> ! </span>
                <span aria-label='at symbol'> @ </span>
                <span aria-label='hashtag'> # </span>
                <span aria-label='dollarsign'> $ </span>
                <span aria-label='percent'> % </span>
              </p>

              <label htmlFor='confirm_pwd'>
                Confirma la contraseña:
                <FontAwesomeIcon
                  icon={faCheck}
                  className={
                    state.validMatch && state.matchPwd
                      ? classes.valid
                      : classes.hide
                  }
                />
                <FontAwesomeIcon
                  icon={faTimes}
                  className={
                    state.validMatch || !state.matchPwd
                      ? classes.hide
                      : classes.invalid
                  }
                />
              </label>
              <Input
                type='password'
                id='confirm_pwd'
                onChange={(e) =>
                  dispatch({
                    type: REGISTER.PWD_MATCH_INPUT,
                    payload: e.target.value,
                  })
                }
                value={state.matchPwd}
                required
                aria-invalid={state.validMatch ? "false" : "true"}
                aria-describedby='confirmnote'
                onFocus={() =>
                  dispatch({ type: REGISTER.PWD_MATCH_FOCUS, payload: true })
                }
                onBlur={() =>
                  dispatch({ type: REGISTER.PWD_MATCH_FOCUS, payload: false })
                }
                placeholder='Contraseña'
              />
              <p
                id='confirmnote'
                className={
                  state.matchFocus && !state.validMatch
                    ? classes.instructions
                    : classes.offscreen
                }
              >
                <FontAwesomeIcon icon={faInfoCircle} />
                Las contraseñas introducidas tienen que coincidir.
              </p>
              <Button
                buttonTxt='Registrarse'
                className={
                  !state.validName ||
                  !state.validEmail ||
                  !state.validPwd ||
                  !state.validMatch
                    ? "disabled"
                    : "form-btn"
                }
                disabled={
                  !state.validName ||
                  !state.validEmail ||
                  !state.validPwd ||
                  !state.validMatch
                    ? true
                    : false
                }
              />
              <div className={classes["have-account"]}>
                <p>
                  ¿Ya tienes cuenta?
                  <span
                    className={classes.login}
                    onClick={() => {
                      setOnRegister(false);
                      setOnLogin(true);
                    }}
                  >
                    {" "}
                    Acceder
                  </span>
                </p>
              </div>
            </form>
          )
        }
      </section>
    </>
  );
};

export default RegisterForm;
