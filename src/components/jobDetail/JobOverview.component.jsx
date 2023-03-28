import {
  faCalendar,
  faHourglassHalf,
} from "@fortawesome/free-regular-svg-icons";
import { faCoins, faLanguage } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./jobOverview.module.css";

// TODO : Terminarlo
function JobOverview(props) {
  return (
    <div className={styles["col-lg-4"]}>
      <div className={styles["content"]}>
        <ul className={styles["jobs-information"]}>
          <li classname={styles["detalle-oferta"]}>
            <FontAwesomeIcon
              icon={faCalendar}
              className={styles["icons-job icon"]}
            />

            <h5>Email:</h5>
            <a href={`mailto:${props.email}`}>{props.email}</a>
          </li>
          <li classname={styles["detalle-oferta"]}>
            <FontAwesomeIcon
              icon={faHourglassHalf}
              className={styles["icons-job icon"]}
            />
            <h5>Bootcamp:</h5>
            <span>
              {props.bootcamp} {props.edition}
            </span>
          </li>
          <li classname={styles["detalle-oferta"]}>
            <FontAwesomeIcon icon={faCoins} className={styles["icons-job"]} />
            <h5>Linkedin:</h5>
            <a
              target="_blank"
              rel="noreferrer"
              href={props.socialNetworks?.linkedin}
            >
              {props.socialNetworks?.linkedin}
            </a>
          </li>
          <li classname={styles["detalle-oferta"]}>
            <FontAwesomeIcon
              icon={faLanguage}
              className={styles["icons-job"]}
            />
            <h5>Idiomas:</h5>
            <span>{props.languages?.join(", ")}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default JobOverview;
