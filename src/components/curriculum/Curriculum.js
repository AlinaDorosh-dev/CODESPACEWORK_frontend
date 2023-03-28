import React, { useState, useRef } from 'react';
import jwt_decode from 'jwt-decode';
import classes from '../../styles/Curriculum.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import PageLayoutC from '../sidemenu/PageLayoutC';

function Curriculum() {
    const [file, setFile] = useState(null);
    const RefRedAlert = useRef();
    const RefGreenAlert = useRef();
    let texto = 'Debes insertar un documento válido';
    let texto2 = 'Archivo enviado correctamente';

    const selectedHandler = (e) => {
        setFile(e.target.files[0]);
        if (!e.target.files[0]) {
            eliminarArchivo();
        } else {
            let fileName = e.target.files[0].name;
            const splitName = fileName.split('.');
            const extension = splitName[splitName.length - 1];

            if (
                (fileName && extension === 'pdf') ||
                extension === 'doc' ||
                extension === 'docx'
            ) {
                showName();
            } else {
                RefRedAlert.current.style.display = 'flex';
                RefGreenAlert.current.style.display = 'none';
                setFile(null);
            }
        }
    };

    const eliminarArchivo = () => {
        setFile(null);
        document
            .getElementById('caja-archivo')
            .classList.replace(classes['mostrar'], classes['caja-archivo']);
        RefRedAlert.current.style.display = 'none';
        RefGreenAlert.current.style.display = 'none';
    };

    // Funcion que muestra el nombre del archivo en la caja inferior
    let name;
    const showName = (e) => {
        name = document.getElementById('upload').files[0].name;
        document.getElementById('fileName').innerHTML = name;
        document
            .getElementById('caja-archivo')
            .classList.replace(classes['caja-archivo'], classes['mostrar']);
        RefRedAlert.current.style.display = 'none';
        RefGreenAlert.current.style.display = 'none';
    };

    //Obtener el token y extraer del payload el loginId
    const handleFunctions = () => {
        let token = sessionStorage.getItem('accessToken');
        let decoded = jwt_decode(token);
        let loginId = decoded.UserInfo.id;

        sendHandler(loginId);
    };

    const sendHandler = (loginId) => {
        if (!file) {
            RefRedAlert.current.style.display = 'flex';
            RefGreenAlert.current.style.display = 'none';
            return;
        }
        RefRedAlert.current.style.display = 'none';
        const formdata = new FormData();
        formdata.append('file', file);
        //Guardar el documento en la carpeta files
        fetch('http://localhost:8000/candidate/files/' + loginId, {
            mode: 'no-cors',
            method: 'POST',
            body: formdata,
        })
            .then((res) => res.text())
            .catch((err) => {
                console.error(err);
            });

        document.getElementById('upload').value = null;
        // Una vez se ha subido,elimina la caja inferior del archivo
        eliminarArchivo();
        RefGreenAlert.current.style.display = 'flex';

        return;
    };

    return (
        <section className={classes['curriculum-section']}>
            <div className={classes['contenedor-global']}>
                <div className={classes['container-superior']}>
                    <div className={classes['titulo-principal']}>
                        <h3 className={classes['titulo-principal-h3']}>
                            Gestor de Curriculum!
                        </h3>
                        <div className={classes.texto}>Vamos allá!</div>
                    </div>
                </div>
                <PageLayoutC />
                <div className={classes['contenedor-inferior']}>
                    <h4 className={classes['titulo-inferior-h4']}>
                        Gestor de Curriculum.
                    </h4>
                    <form
                        className={classes['contenedor-cv']}
                        action="/files"
                        method="post"
                        encType="multipart/form-data"
                    >
                        <input
                            type="file"
                            name="avatar"
                            id="upload"
                            onChange={selectedHandler}
                            className={classes['upload-input']}
                            accept=".doc,.docx,application/pdf"
                        />
                        <label
                            className={classes['cv-uploadButton']}
                            htmlFor="upload"
                        >
                            <p className={classes['p-blue']}>
                                Inserta aquí tu archivo.
                            </p>
                            <p className={classes['p2']}>
                                Tamaño máximo de archivo: 5MB. Tipos de archivos
                                permitidos: (.doc, .docx, .pdf)
                            </p>
                            <button
                                onClick={handleFunctions}
                                type="button"
                                className={classes['upload-button']}
                            >
                                Subir Archivo
                            </button>
                            <div
                                ref={RefRedAlert}
                                className={classes['red-alert']}
                            >
                                {texto}
                            </div>
                            <div
                                ref={RefGreenAlert}
                                className={classes['green-alert']}
                            >
                                {texto2}
                            </div>
                        </label>
                    </form>
                    <div id="caja-archivo" className={classes['caja-archivo']}>
                        <span
                            id="fileName"
                            className={classes['titulo-documento']}
                        ></span>
                        <div className={classes['edit-btns']}>
                            <div
                                className={classes['contenedor-trash']}
                                onClick={eliminarArchivo}
                            >
                                <FontAwesomeIcon
                                    icon={faTrashCan}
                                    className={classes['icono-trash']}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Curriculum;
