/**
 * @fileoverview ForgottenPassword component
 * @author Alina Dorosh
 */
import classes from "../../styles/ForgottenPassword.module.css";
import Input from "../UI/Input";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import ForgottenPwdSuccess from "./ForgottenPwdSuccess";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { EMAIL_REGEX } from "../../utils/regExp";
import { useNavigate } from "react-router";
import ApiRequest from "../../services/apiRequest";
const ForgottenPassword = () => {
  const navigate = useNavigate();
  //state management with useState
  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //Input validation
  useEffect(() => {
    const result = EMAIL_REGEX.test(email); //email validation with regex
    setValidEmail(result);
    setErrMsg("");
  }, [email]);

  //Submit handler
  const handleSubmit = async () => {
    if (!validEmail) {
      setErrMsg("Introduce por favor un email válido");
      return;
    }
    const response = await ApiRequest.forgottenPassword({ email });
    if (response.message === "Failed to fetch") {
      setErrMsg("Error de conexión, inténtalo de nuevo más tarde");
      return;
    }

    if (response.message === "Email sent successfully") {
      setEmail("");
      setSuccess(true);
    }
  };

  return (
    <div className={classes["forgotten-pwd-main-container"]}>
      {success &&
        ReactDOM.createPortal(
          <Modal openModal={success} setOpenModal={setSuccess}>
            <ForgottenPwdSuccess success={success} setSuccess={setSuccess} />{" "}
          </Modal>,
          document.querySelector("#modal")
        )}
      <div className={classes.container}>
        <h3>Has olvidado tu contraseña?</h3>
        <p>
          Introduce tu email y te enviaremos un enlace para que puedas cambiarla
        </p>
        {errMsg && (
          <p className={`${classes.alert} ${classes["alert-red"]} `}>
            <FontAwesomeIcon icon={faInfoCircle} /> {errMsg}
          </p>
        )}
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='email'>Email</label>
          <Input
            type='email'
            id='email'
            className='forgot-password'
            placeholder='Email'
            autoFocus={true}
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <div className={classes["btn-container"]}>
            <Button
              type='button'
              className='cancel'
              buttonTxt='Cancelar'
              onClick={() => navigate("/")}
            />
            <Button
              type='submit'
              disabled={!email}
              className='submit'
              buttonTxt='Enviar'
              onClick={() => handleSubmit()}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgottenPassword;
