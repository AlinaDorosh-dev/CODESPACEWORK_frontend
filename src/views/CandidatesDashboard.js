import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faLocationDot,
    faMoneyBills,
    faBars,
    faClock,
    faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import classes from '../styles/CandidatesDashboard.module.css';
import FetchUserData from '../services/candidateDashboardFetch/FetchUsersData';
import FetchOfferData from '../services/candidateDashboardFetch/FetchOfferData';
import Loader from '../components/UI/Spinner/Loader';
import PageLayoutC from '../components/sidemenu/PageLayoutC';

function CandidatesDashboard() {
    //Controlador del fetch
    const [isLoading, setIsLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [userReady, setUserReady] = useState(false);
    const [offerData, setOfferData] = useState([]);
    const [offerReady, setOfferReady] = useState(false);

    //Fetch para obtener los datos del usuario
    useEffect(() => {
        setUserData(
            FetchUserData()
                .then((data) => {
                    setUserData(data);
                    setUserReady(true);
                })
                .catch((error) => console.log('Algo ha fallado...')),
        );
    }, []);

    //Fetch para obtener los datos de los empleos
    useEffect(() => {
        if (userReady) {
            setOfferData(
                FetchOfferData(userData._id)
                    .then((data) => {
                        console.log(data);
                        setOfferData(data || []);
                        setOfferReady(true);
                    })
                    .catch((error) => console.log('Algo ha fallado...')),
            );
        }
    }, [userReady]);

    //Controlador de la espera a la llamada de la base de datos
    useEffect(() => {
        if (userReady && offerReady) {
            setIsLoading(false);
        }
    }, [userReady, offerReady]);

    //Forma de renderizar algo durante la espera a la llamada de la base de datos
    if (isLoading) {
        return <Loader />;
    }

    const getEmployerLogo = (logo) => {
        return logo
            ? 'http://localhost:8000/employer/logo/' + encodeURIComponent(logo)
            : undefined;
    };

    return (
        <>
            <section className={classes.DivCardsApp}>
                <div>
                    <div>
                        <h3>Bienvenido, {userData.fullName}!!</h3>
                        <p>¿Listo para seguir donde lo dejaste?</p>
                        <div></div>
                    </div>
                    <PageLayoutC />
                    <div>
                        <div>
                            <h4>Empleos Solicitados Recientemente</h4>
                        </div>
                        <div>
                            {offerData?.map((uca, i) => {
                                return (
                                    <div className={classes.CardEmp} key={i}>
                                        <div>
                                            <img
                                                alt="Company Logo"
                                                className={classes.imgCardEmp}
                                                src={getEmployerLogo(
                                                    uca.company.logo,
                                                )}
                                            />
                                        </div>
                                        <div>
                                            <h4>{uca.title}</h4>
                                            <div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faBriefcase}
                                                    />
                                                    <p>
                                                        {
                                                            uca.company
                                                                .companyName
                                                        }
                                                    </p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faLocationDot}
                                                    />
                                                    <p>
                                                        {uca.location.city},{' '}
                                                        {uca.location.country}
                                                    </p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faClock}
                                                    />
                                                    <p>Hace más de 24h</p>
                                                </div>
                                                <div>
                                                    <FontAwesomeIcon
                                                        className={
                                                            classes.IconsCards
                                                        }
                                                        icon={faMoneyBills}
                                                    />
                                                    <p>{uca.salary}€</p>
                                                </div>
                                            </div>
                                            <div>
                                                <ul>
                                                    <li>{uca.jobType}</li>
                                                    <li>Urgente</li>
                                                </ul>
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
export default CandidatesDashboard;
