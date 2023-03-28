/**
 * @fileoverview  This is a reusable component, that will be used to display a message when there are no cards to display
 * @author Ana Lorenzo
 * @param {string} valor - The value to be displayed in the message
 */
import classes from "./NoCards.module.css";

export const NoCards = ({ valor }) => {
  return (
    <h3 className={classes["job-container"]}>
      <div className={classes["inner-box"]}>
        {`Actualmente no hay ${valor} disponibles`}
      </div>
    </h3>
  );
};
