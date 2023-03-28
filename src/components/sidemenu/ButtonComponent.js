import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import classesDetails from "./ButtonComponent.module.css";

function ButtonComponent(props) {
 return (
    <div onClick={props.handleClick} className={`hamburger ${props.clicked ? "is.active" : ""}`}
    id="hamburger-1">
    <button className={classesDetails["button-styles"]}>
      <FontAwesomeIcon icon={faBars} /> Menu
    </button>
  </div>
 );
}

export default ButtonComponent;
