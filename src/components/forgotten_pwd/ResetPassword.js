/**
 * @fileoverview ResetPassword component
 * @author Alina Dorosh
 */

import { useParams } from "react-router";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEye, faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "../../styles/ResetPassword.module.css";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import ResetPwdSuccess from "./ResetPwdSuccess";
import { useReducer, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  RESET_PWD,
  initialResetPwdState,
  resetPwdReducer,
} from "../../models/reducers/resetPassword.reducer";
import ApiRequest from "../../services/apiRequest";
import { PWD_REGEX } from "../../utils/regExp";

const ResetPassword = () => {
  //State management with useReducer
  const [state, dispatch] = useReducer(resetPwdReducer, initialResetPwdState);
  // get token from url
  const { token } = useParams();

  const navigate = useNavigate();

  //Input validation
  useEffect(() => {
    const result = PWD_REGEX.test(state.newPwd); //Pwd validation returns boolean
    dispatch({ type: RESET_PWD.NEW_PWD_VALIDATION, payload: result });
    const match = state.newPwd === state.matchPwd; //Boolean check if pwd in both fields match
    dispatch({ type: RESET_PWD.PWD_MATCH_VALIDATION, payload: match });
  }, [state.newPwd, state.matchPwd]);

  //If we displayed error and after that any value in dependency array changes,
  //we set error to empty string again
  useEffect(() => {
    dispatch({ type: RESET_PWD.ERROR_MSG, payload: "" });
  }, [state.newPwd, state.matchPwd]);

  //State for password visibility
  const [showPassword, setShowPassword] = useState(false);

  //State for password match visibility
  const [showMatchPassword, setShowMatchPassword] = useState(false);

  //State for successfull password change
  const [success, setSuccess] = useState(false);

  //Function to toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  //Function to toggle password match visibility
  const handleClickShowMatchPassword = () =>
    setShowMatchPassword(!showMatchPassword);

  //Function to handle submit
  const handleSubmitNewPwd = async () => {
       if (
      !state.newPwd ||
      !state.matchPwd ||
      !state.validPwd ||
      !state.validMatch ||
      !token
    )
      return;

    const response = await ApiRequest.resetPassword(
      {
        newPassword: state.newPwd,
      },
      token
    );

    if (response.message === "Password changed successfully") {
      dispatch({
        type: RESET_PWD.RESTORE_STATE,
        payload: initialResetPwdState,
      });
      setSuccess(true);
    } else {
      dispatch({
        type: RESET_PWD.ERROR_MSG,
        payload: "Ha ocurrido un error, intentalo de nuevo mas tarde",
      });
    }
  };
  return (
    <div className={classes["reset-pwd-main-container"]}>
      {success &&
        ReactDOM.createPortal(
          <Modal openModal={success} setOpenModal={setSuccess}>
            <ResetPwdSuccess setSuccess={setSuccess} />
          </Modal>,
          document.querySelector("#modal")
        )}
      <div className={classes.container}>
        <h3>Restablece tu contraseña</h3>
        {state.errMsg && (
          <p className={`${classes.alert} ${classes["alert-red"]} `}>
            <FontAwesomeIcon icon={faInfoCircle} /> {state.errMsg}
          </p>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='password'>
            Contarseña nueva:
            <span className={state.validPwd ? classes.valid : classes.hide}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
            <span
              className={
                state.validPwd || !state.pwd ? classes.hide : classes.invalid
              }
            >
              <FontAwesomeIcon icon={faTimes} />
            </span>
          </label>
          <div className={classes["input-container"]}>
            <input
              type={showPassword ? "text" : "password"}
              id='password'
              value={state.newPwd}
              onChange={(e) =>
                dispatch({
                  type: RESET_PWD.NEW_PWD_INPUT,
                  payload: e.target.value,
                })
              }
              required
              aria-invalid={state.validPwd ? "false" : "true"}
              //Accessability(aria described by element with id "pwdnote" for screenreaders)
              aria-describedby='pwdnote'
              onFocus={() =>
                dispatch({ type: RESET_PWD.NEW_PWD_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: RESET_PWD.NEW_PWD_FOCUS, payload: false })
              }
              placeholder='Contraseña nueva'
              className={classes["reset-password"]}
            />{" "}
            <FontAwesomeIcon
              className={classes["password-visiblity-icon"]}
              icon={showPassword ? faEye : faEyeSlash}
              onClick={handleClickShowPassword}
            />
          </div>
          <p
            id='pwdnote'
            className={
              state.pwdFocus && !state.validPwd
                ? classes.instructions
                : classes.offscreen
            }
          >
            <FontAwesomeIcon icon={faInfoCircle} />
            Introduzca una contraseña segura. Minimo 8 characteres, al menos una
            mayuscula, una minuscula y un caracter especial:
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
          <div className={classes["input-container"]}>
            <input
              type={showMatchPassword ? "text" : "password"}
              value={state.matchPwd}
              id='confirm_pwd'
              onChange={(e) =>
                dispatch({
                  type: RESET_PWD.PWD_MATCH_INPUT,
                  payload: e.target.value,
                })
              }
              required
              aria-invalid={state.validMatch ? "false" : "true"}
              aria-describedby='confirmnote'
              onFocus={() =>
                dispatch({ type: RESET_PWD.PWD_MATCH_FOCUS, payload: true })
              }
              onBlur={() =>
                dispatch({ type: RESET_PWD.PWD_MATCH_FOCUS, payload: false })
              }
              placeholder='Confirma la contraseña'
              className={classes["reset-password"]}
            />{" "}
            <FontAwesomeIcon
              className={classes["password-visiblity-icon"]}
              icon={showMatchPassword ? faEye : faEyeSlash}
              onClick={handleClickShowMatchPassword}
            />
          </div>
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
          <div className={classes["btn-container"]}>
            <Button
              type='button'
              className='cancel'
              buttonTxt='Cancelar'
              onClick={() => navigate("/")}
            />
            <Button
              type='submit'
              disabled={
                !state.newPwd ||
                !state.matchPwd ||
                !state.validPwd ||
                !state.validMatch ||
                !token
              }
              className='submit'
              buttonTxt='Confirmar'
              onClick={() => handleSubmitNewPwd()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
