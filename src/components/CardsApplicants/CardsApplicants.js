/**
 * @fileoverview This is a Home component
 * @author Ismael Boumhir
 */
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBills,
  faEye,
  faBars,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import classes from "./candidateDashboard.module.css";
import { CANDIDATES_URL, REFRESH_URL } from "../../config/urls";
import { Link } from "react-router-dom";
//import Loader from '../'

function CardsApplicants() {
  //Controlador del fetch
  const [isLoading, setIsLoading] = useState(true);
  const [useCardsApp, setCardsApplicants] = useState([]);
  const [error, setError] = useState("");

  // Fetch, llamada a la base de datos para renderizar los datos
  useEffect(() => {
    const token = sessionStorage.getItem("accessToken");
    const refreshToken = sessionStorage.getItem("refreshToken");
    const getAplicants = async () => {
      try {
        const response = await fetch(CANDIDATES_URL, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          },
        });
        const data = await response.json();
        console.log(data);
        if (data) {
          setCardsApplicants(data.data);
          setIsLoading(false);
        }
        //Status que llega de verify token
        if (data.status === 400) {
          //fetch a endpoint de refresh
          fetch(REFRESH_URL, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "auth-token": refreshToken,
            },
          })
            .then((response) => response.json())
            .then((response) => {
              sessionStorage.setItem("accessToken", response.accessToken);
              sessionStorage.setItem("userId", response.id);
              sessionStorage.setItem("role", response.role);
            })
            .catch((error) => {
              return console.log("Error en el refresh");
            });
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAplicants();
  }, []);

  // Forma de renderizar un spinner durante la espera a la
  // llamada de la base de datos
  if (isLoading) {
    return <div className={classes.DivCardsApp}>{/*<Loader/>*/}</div>;
  }

  //Filtrado de ultimos 6 candidatos que han postulado a un trabajo
  const filtroCandidatos = useCardsApp
    .filter((lol) => lol.appliedJobs.length >= 1)
    .sort(
      (c, d) =>
        -new Date(c.appliedJobs.at(-1).appliedDate).getTime() +
        new Date(d.appliedJobs.at(-1).appliedDate).getTime()
    )
    .slice(0, 6);

  return (
    <>
      <section className={classes.DivCardsApp}>
        <div>
          <div>
            <h3>Encuentra el candidato perfecto!</h3>
            <p>¿Listo para entrar de nuevo?</p>
            <div>
              <button>
                <FontAwesomeIcon icon={faBars} /> Menu
              </button>
            </div>
          </div>
          <div>
            <div>
              <h4>Candidatos Recientes</h4>
            </div>
            <div>
              {filtroCandidatos.map((uca, i) => {
                return (
                  <div className={classes.CardCand} key={i}>
                    <div>
                      <img
                        alt="Candidate"
                        className={classes.imgCardCand}
                        src={uca.photo}
                      />
                    </div>
                    <div>
                      <h4>
                        {uca.firstName} {uca.lastName} {uca.secondLastName}
                      </h4>
                      <div>
                        <div>
                          <p className={classes.blueP}>{uca.especiality}</p>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className={classes.IconsCards}
                            icon={faLocationDot}
                          />
                          <p>{uca.location}</p>
                        </div>
                        <div>
                          <FontAwesomeIcon
                            className={classes.IconsCards}
                            icon={faMoneyBills}
                          />
                          <p>{uca.hourlyRate.max} /hora</p>
                        </div>
                      </div>
                      <div>
                        <p>{uca.skills[0]}</p>
                        <p>{uca.skills[1]}</p>
                        <p>{uca.skills[2]}</p>
                      </div>
                      <div>
                        {/*<Link to={uca}>*/}
                        <FontAwesomeIcon
                          className={classes.ButtonCardsCand}
                          icon={faEye}
                        />
                        {/*</Link> */}
                        <a href={uca.socialNetworks.github}>
                          <FontAwesomeIcon
                            className={classes.ButtonCardsCand}
                            icon={faGithub}
                          />
                        </a>
                        <a href={uca.socialNetworks.linkedin}>
                          <FontAwesomeIcon
                            className={classes.ButtonCardsCand}
                            icon={faLinkedin}
                          />
                        </a>
                        {/*<a><FontAwesomeIcon
                          className={classes.ButtonCardsCand}
                          icon={faTrashCan}
                        /></a>*/}
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
export default CardsApplicants;
