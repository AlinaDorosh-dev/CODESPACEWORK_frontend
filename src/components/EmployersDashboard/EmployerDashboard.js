import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faMoneyBills,
    faEye,
    faBars,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import classes from './employersDashboard.module.css';
import { Link } from 'react-router-dom';
import FetchEmployerJobs from '../../services/employersDashService/FetchEmployerJobs';
import Loader from '../UI/Spinner/Loader';
import PageLayout from '../../components/sidemenu/PageLayout';
import mokcSkills from '../../utils/mokcSkills';

function EmployerDashboard() {
    //Controlador del fetch
    const [isLoading, setIsLoading] = useState(true);
    const [useJobs, setJobs] = useState([]);
    const [jobReady, setJobReady] = useState();

    // UseEffect mediante las funciones FetchEmployer y loadJobs hace la llamada
    // a la base de datos para renderizar los datos

    useEffect(() => {
        loadJobs();
    }, []);

    async function loadJobs() {
        try {
            const data = await FetchEmployerJobs();
            setJobReady(true);
            setIsLoading(false);
            // Filtrado de la data
            let filterData = data
                .filter((wow) => wow.applicants.length >= 1)
                .sort(
                    (c, d) =>
                        -new Date(
                            c.applicants.at(-1).applicationDate,
                        ).getTime() +
                        new Date(d.applicants.at(-1).applicationDate).getTime(),
                )
                .map((usa) => usa.applicants.at(-1).applicantId)
                .slice(0, 6);
            setJobs(filterData);
        } catch (error) {
            return error;
        }
    }

    // Renderizacion de un componente spinner durante la espera a la
    // llamada de la base de datos
    if (isLoading) {
        return (
            <div className={classes.DivCardsApp}>
                <Loader />
            </div>
        );
    }

    const getCandidatePhoto = (photo) => {
        return photo
            ? 'http://localhost:8000/candidate/photo/' +
                  encodeURIComponent(photo)
            : undefined;
    };

    return (
        <>
            <section className={classes.DivCardsApp}>
                <div className={classes.DivContainer}>
                    <div>
                        <h3>Encuentra el candidato perfecto!</h3>
                        <p>¿Listo para entrar de nuevo?</p>
                    </div>
                    <PageLayout />
                    <div>
                        <div>
                            <h4>Candidatos Recientes</h4>
                        </div>
                        <div>
                            {useJobs.map((uca, i) => {
                                return (
                                    <div className={classes.CardCand} key={i}>
                                        <div>
                                            <img
                                                alt="Candidate"
                                                className={classes.imgCardCand}
                                                src={getCandidatePhoto(
                                                    uca.photo,
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <h4>{uca.fullName}</h4>
                                            <div>
                                                <div>
                                                    <p
                                                        className={
                                                            classes.blueP
                                                        }
                                                    >
                                                        {uca.specialty}
                                                    </p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faLocationDot}
                                                    />
                                                    <p>Málaga</p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faMoneyBills}
                                                    />
                                                    <p>50 $/hora</p>
                                                </div>
                                            </div>
                                            <div>
                                                <p>{mokcSkills(1)}</p>
                                                <p>{mokcSkills(1)}</p>
                                                <p>{mokcSkills(1)}</p>
                                            </div>
                                            <div>
                                                <a
                                                    href={
                                                        uca.socialNetworks
                                                            .github
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.ButtonCardsCand
                                                        }
                                                        icon={faGithub}
                                                    />
                                                </a>
                                                <a
                                                    href={
                                                        uca.socialNetworks
                                                            .linkedin
                                                    }
                                                >
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.ButtonCardsCand
                                                        }
                                                        icon={faLinkedin}
                                                    />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default EmployerDashboard;
