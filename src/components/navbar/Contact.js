import React from "react";
import mapsCodespace from "../../assets/Logo/mapsCodespace.png";
import styles from "../../styles/navbarpublic.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faMobileScreen,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Contact = () => {
  return (
    <div className={`${styles.containerall}`}>
      <div className={`${styles["map-container"]}`}>
        <img
          className={`${styles.mapsCode}`}
          src={mapsCodespace}
          alt="CodeSpace Map"
        />
      </div>
      <div className={`${styles.public}`}>
        <h1 className={`${styles.h1Tit}`}>Contacto</h1>
        <ul className={`${styles["contact-info"]}`}>
          <li>
            <FontAwesomeIcon icon={faLocationDot} />
            <span className={`${styles["contact-text"]}`}>
              C. Compositor Lehmberg Ruiz, 13, 29007 Málaga
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faEnvelope} />
            <span className={`${styles["contact-text"]}`}>
              info@codespaceacademy.com
            </span>
          </li>
          <li>
            <FontAwesomeIcon icon={faPhone} />
            <span className={`${styles["contact-text"]}`}>952 300 426</span>
          </li>
          <li>
            <FontAwesomeIcon icon={faMobileScreen} />
            <span className={`${styles["contact-text"]}`}>682 827 017</span>
          </li>
        </ul>
        <div className={`${styles["codespace-link"]}`}>
          <a href="https://codespaceacademy.com/">www.codespaceacademy.com</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;
