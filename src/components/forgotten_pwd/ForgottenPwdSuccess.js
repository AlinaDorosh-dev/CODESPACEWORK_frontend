/**
 * @fileoverview message to dispay
 * in modal when email was sent
 * @author Alina Dorosh
 */
import { useNavigate } from "react-router";
import Button from "../UI/Button";
import classes from "./ForgottenPwdSuccess.module.css";
const ForgottenPwdSuccess = ({ setSuccess }) => {
  const navigate = useNavigate();

  return (
    <div className={classes["md-content-container"]}>
      <h3>Accede a tu coreo para cambiar la contraseña</h3>
      <Button
        type='submit'
        className='submit'
        buttonTxt='OK'
        onClick={() => {
          setSuccess(false);
          navigate("/");
        }}
      />
    </div>
  );
};

export default ForgottenPwdSuccess;
