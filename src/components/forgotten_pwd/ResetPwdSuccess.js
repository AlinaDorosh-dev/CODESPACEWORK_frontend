import { useNavigate } from "react-router";
import Button from "../UI/Button";
import classes from "./ForgottenPwdSuccess.module.css";

const ResetPwdSuccess = ({setSuccess}) => {
    const navigate = useNavigate();
    
  return (
    <div className={classes["md-content-container"]}>
      <h3>La contraseña ha sido camiada</h3>
      <p>Puedes acceder a la aplicación con tu contraseña nueva</p>
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
  )
}

export default ResetPwdSuccess