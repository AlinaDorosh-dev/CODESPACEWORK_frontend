/**
 * @fileoverview This is a reusable alert component
 * @author Alina Dorosh
 * @param {string} className - Class name to be applied to the alert
 * @param {string} alertTxt - Text to be displayed in the alert
 * @param {object} reference - Reference to the alert
 */

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import classes from "./modulesUI/InfoAlert.module.css";

const InfoAlert = ({ className, alertTxt, reference }) => {
  return (
    <p className={`${classes.alert} ${classes[className]} `} ref={reference}>
      <FontAwesomeIcon icon={faInfoCircle} /> {alertTxt}
    </p>
  );
};

export default InfoAlert;
