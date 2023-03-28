import classes from "./DeleteModal.module.css";

function GetJobsModal({ isOpen, status }) {
  return (
    <>
      {isOpen && (
        <div className={classes['modal-get']}>
          <div className={classes['modalContent-get'] && status !== "Succeeded" ? classes.error : ''}>
          <p>Ha ocurrido un error, por favor inténtelo de nuevo más tarde.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default GetJobsModal;