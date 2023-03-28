/**
 * @author: Benjamín Mancera
 */


//Description: This component is used to wrap all the cards in a container.

import classes from "./CardsContainer.module.css";

function CardsContainer(props) {

  return <div className={classes["card-container"]}>{props.children}</div>;
}

export default CardsContainer;
