/**
 * @fileoverview This file contains the LoginForm component.
 * @author Alina Dorosh
 */

import Button from '../UI/Button';
import Input from '../UI/Input';
import InfoAlert from '../UI/InfoAlert';
import Loader from '../UI/Spinner/Loader';
import classes from '../../styles/LoginForm.module.css';
import { useContext, useState, useEffect, useRef } from 'react';
import { LoginModalContext } from '../../providers/LoginModalProvider';
import ApiRequest from '../../services/apiRequest';
import { EMAIL_REGEX } from '../../utils/regExp';
import { Link } from 'react-router-dom';
import useRedirect from '../../hooks/useRedirect';

const LoginForm = () => {
    //access to modal context
    const {
        setOnLogin,
        setOnRegister,
        openLoginModal,
        setOpenLoginModal,
        handleClose,
        setIsAuthenticated,
    } = useContext(LoginModalContext);

    //custom hook to redirect user after succesfull login
    const [redirect, error, loading] = useRedirect();

    //reference to focus on error message for accesibility
    const errRef = useRef();

    //state to control inputs
    const [loggedUser, setLoggedUser] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    //state to control pending request
    const [pending, setPending] = useState(false);

    //state to control succesfull login
    const [succesfullLogin, setSuccesfullLogin] = useState(false);

    //state to control error message
    const [errMsg, setErrMsg] = useState('');

    //state to control email validation
    const [validEmail, setValidEmail] = useState(false);

    useEffect(() => {
        const result = EMAIL_REGEX.test(loggedUser.email); //email validation with regex
        setValidEmail(result);
    }, [loggedUser.email]);

    /*   useEffect(() => {
        if (errMsg) errRef.current?.focus(); //focus on error message for accesibility
    }, [errMsg]);
 */
    //if login modal is closed, reset states
    useEffect(() => {
        if (!openLoginModal) {
            setOnLogin(false);
            setOnRegister(false);
        }
    }, [openLoginModal]);

    //any change in loggedUser state, reset error message
    useEffect(() => {
        setErrMsg('');
    }, [loggedUser]);

    const handleLogin = async (e) => {
        e.preventDefault();

        //if email is not valid, show error message, avoid requests to backend
        if (!validEmail) {
            setErrMsg('Inroduce por favor un email válido');
            return;
        }
        setPending(true);
        const response = await ApiRequest.login(loggedUser);
        if (response.message === 'Failed to fetch') {
            setErrMsg('Conection error. Please reload the app');
            setSuccesfullLogin(false);
            setPending(false);
            return;
        }
        if (response.error === 'Wrong email or password') {
            setErrMsg(response.error);
            setSuccesfullLogin(false);
            setPending(false);
            return;
        }
        if (response.accessToken) {
            setSuccesfullLogin(true);
            setPending(false);

            //if remember me is checked, save refresh token in localStorage
            //only for development purposes, in production, refresh token should be saved in httpOnly cookie
            if (loggedUser.rememberMe) {
                localStorage.setItem('refreshToken', response.refreshToken);
            }
            setOpenLoginModal(false);
            setSuccesfullLogin(false);

            //save tokens in sessionStorage to keep user logged in
            //only for development purposes, in production, token should be saved in state and passed to context
            sessionStorage.setItem('accessToken', response.accessToken);
            sessionStorage.setItem('refreshToken', response.refreshToken);
            sessionStorage.setItem('userId', response.id);
            sessionStorage.setItem('role', response.role);

            //reset loggedUser state after succesfull login
            setLoggedUser({
                email: '',
                password: '',
                rememberMe: false,
            });

            //set isAuthenticated to true to access private navbar
            setIsAuthenticated(true);

            //redirect
            redirect(response.accessToken);
            if (error) setErrMsg(error);
        }
    };

    return (
        <>
            {(loading || pending) && <Loader />}
            {!loading && !pending && (
                <form
                    className={classes['login-form']}
                    onSubmit={(e) => e.preventDefault()}
                >
                    <h5>Accede a CODE SPACE WORKS</h5>
                    {errMsg && (
                        <InfoAlert
                            className="alert-red"
                            alertTxt={errMsg}
                            ref={errRef}
                        />
                    )}
                    {succesfullLogin && (
                        <InfoAlert
                            className="alert-green"
                            alertTxt="Signed in successfully"
                        />
                    )}

                    <label htmlFor="email">Email</label>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email"
                        value={loggedUser.email}
                        onChange={(e) => {
                            setLoggedUser({
                                ...loggedUser,
                                email: e.target.value,
                            });
                        }}
                    />
                    <label htmlFor="password">Contraseña</label>

                    <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Contaseña"
                        value={loggedUser.password}
                        onChange={(e) => {
                            setLoggedUser({
                                ...loggedUser,
                                password: e.target.value,
                            });
                        }}
                    />
                    <div className={classes.flex}>
                        <div className={classes.remember}>
                            <input
                                type="checkbox"
                                value={loggedUser.rememberMe}
                                name="rememberMe"
                                onChange={(e) => {
                                    setLoggedUser({
                                        ...loggedUser,
                                        rememberMe: e.target.checked,
                                    });
                                }}
                            />
                            <label htmlFor="rememberMe">Recuérdame</label>
                        </div>

                        <Link to="/forgottenpassword" onClick={handleClose}>
                            Contarseña olvidada?
                        </Link>
                    </div>
                    <Button
                        buttonTxt="Acceder"
                        onClick={handleLogin}
                        disabled={
                            !loggedUser.email || !loggedUser.password
                                ? true
                                : false
                        }
                        className={
                            !loggedUser.email || !loggedUser.password
                                ? 'disabled'
                                : 'form-btn'
                        }
                    />
                    <div className={classes['no-account']}>
                        <p>
                            ¿No tienes cuenta?
                            <span
                                className={classes.register}
                                onClick={() => {
                                    setOnRegister(true);
                                    setOnLogin(false);
                                }}
                            >
                                {' '}
                                Regístrate
                            </span>
                        </p>
                    </div>
                </form>
            )}
        </>
    );
};

export default LoginForm;
