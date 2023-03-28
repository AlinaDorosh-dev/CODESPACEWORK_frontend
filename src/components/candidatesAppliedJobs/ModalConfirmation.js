/**
 * @fileoverview This file contains a modal component, which is used to show a confirmation or an error message when the candidates deletes a job application.
 * @author Alice Marchi
 */

import classes from "./ModalConfirmation.module.css";

function ModalConfirmation({ visible, onClose, message, error }) {
  return (
    <>
      <div className={`${classes.modal} ${visible && classes["modal-show"]}`}>
        <div className={classes["modal-dialog"]}>
          <div
            className={`${classes["modal-content"]} ${
              error !== null
                ? classes["modal-error"]
                : classes["modal-confirmation"]
            }`}
          >
            <div className={classes["modal-body"]}>
              <p>{error !== null ? error : message}</p>
            </div>
            <div className={classes["modal-footer"]}>
              <button className={classes.btn} onClick={onClose}>
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ModalConfirmation;
