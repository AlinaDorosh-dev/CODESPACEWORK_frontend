/**
 * @author Sebastian Gonzalez
 */
import React, { useState } from 'react';
import styles from '../styles/ChangePassword.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import PageLayoutC from '../components/sidemenu/PageLayoutC';
import PageLayout from '../components/sidemenu/PageLayout';

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const userID = sessionStorage.getItem('userId');
    const accessToken = sessionStorage.getItem('accessToken');

    const URL = `http://localhost:8000/auth/changePassword/${userID}`;
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'oldPassword') {
            setOldPassword(value);
        } else if (name === 'newPassword') {
            setNewPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
    };

    const toggleShowPassword = () => setShowPassword(!showPassword);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Validate the new password
        const regex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,24}$/;
        if (!regex.test(newPassword)) {
            setErrorMessage(
                'La nueva contraseña requiere una letra mayúscula, una minúscula, un número, un carácter especial y tener de 8 a 24 caracteres.',
            );
            return;
        }
        // Make sure the new password matches the confirmation password
        if (newPassword !== confirmPassword) {
            setErrorMessage(
                'La nueva contraseña y la contraseña de confirmación no coinciden.',
            );
            return;
        }
        try {
            // Send a PATCH request to the API endpoint to update the password
            const response = await fetch(URL, {
                method: 'PATCH',
                body: JSON.stringify({ oldPassword, newPassword }),
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': accessToken,
                },
            });

            if (response.ok) {
                setSuccessMessage('Contraseña actualizada correctamente.');
            }

            if (!response.ok) {
                throw new Error('Error al actualizar la contraseña.');
            }

            // Clear the form and error message
            setOldPassword('');
            setNewPassword('');
            setConfirmPassword('');
            setErrorMessage('');
        } catch (error) {
            setErrorMessage(error.message);
        }
    };
    return (
        <section className={styles['ch-password-dashboard']}>
            <div className={styles['ch-password-dashboard-outer']}>
                <div className={styles['ch-password-title-box']}>
                    <h3>Cambio de Contraseña!</h3>
                    <div className={styles['top-title-text']}>
                        ¿Listo para volver a entrar?
                    </div>
                </div>

                <PageLayoutC />
                <PageLayout />
                {/* <Button /> */}

                <div className={styles['ch-password-container']}>
                    <div className={styles['ch-password-container-title']}>
                        <h4>Cambio de Contraseña</h4>
                    </div>

                    <div className={styles['ch-password-content']}>
                        <form
                            className={styles['ch-password-content-form']}
                            onSubmit={handleSubmit}
                        >
                            <div className={styles['row-content']}>
                                <div className={styles['ch-password-input']}>
                                    <label htmlFor="oldPassword">
                                        Contraseña antigua
                                    </label>
                                    <input
                                        type="text"
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={oldPassword}
                                        onChange={handleChange}
                                        autoCapitalize="none"
                                        autoComplete="current-password"
                                        autoCorrect="off"
                                        required
                                    />
                                </div>

                                <div className={styles['ch-password-input']}>
                                    <label htmlFor="newPassword">
                                        Nueva contraseña
                                    </label>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="newPassword"
                                        name="newPassword"
                                        value={newPassword}
                                        onChange={handleChange}
                                        autoCapitalize="none"
                                        autoComplete="new-password"
                                        autoCorrect="off"
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={toggleShowPassword}
                                        style={{
                                            float: 'right',
                                            marginRight: '11px',
                                            marginTop: '-37px',
                                            position: 'relative',
                                            zIndex: 2,
                                            color: '#2c7a7b',
                                        }}
                                    />
                                </div>
                                <div className={styles['ch-password-input']}>
                                    <label htmlFor="confirmPassword">
                                        Confirmar contraseña
                                    </label>
                                    <input
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={handleChange}
                                        autoCapitalize="none"
                                        autoComplete="new-password"
                                        autoCorrect="off"
                                        required
                                    />
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        onClick={toggleShowPassword}
                                        style={{
                                            float: 'right',
                                            marginRight: '11px',
                                            marginTop: '-37px',
                                            position: 'relative',
                                            zIndex: 2,
                                            color: '#2c7a7b',
                                        }}
                                    />
                                </div>
                                <div className={styles['ch-password-btn']}>
                                    <button
                                        type="submit"
                                        className={
                                            styles['ch-password-btn-style']
                                        }
                                    >
                                        Actualizar
                                    </button>
                                    {errorMessage && <p>{errorMessage}</p>}
                                    {successMessage && <p>{successMessage}</p>}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ChangePassword;
