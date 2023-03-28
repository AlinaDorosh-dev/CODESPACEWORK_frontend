import classes from "./DeleteModal.module.css";

function DeleteModal({ isOpen, onClose, setShowDeleteModal, message, status }) {
  return (
    <>
      {isOpen && (
        <div className={classes.modal}>
          <div className={classes.modalContent && status === "Succeeded" ? classes.success : classes.error}>
          <p>{message}</p>
            <div className={classes["button-modal"]}>
              <button onClick={() => {
                setShowDeleteModal(false);
                onClose();
              }}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DeleteModal;