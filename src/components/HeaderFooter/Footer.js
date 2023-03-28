import classes from "./Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className={classes.footer}>
      <p>
        <FontAwesomeIcon icon={faCopyright} /> 2023 Made with 
        <FontAwesomeIcon className={classes.heart} icon={faHeart} /> by FULL
        STACK WEB DEVELOPMENT, 11 EDITION. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
