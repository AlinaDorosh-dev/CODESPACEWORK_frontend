/**
 * @fileoverview This is a reusable modal window component to render in the portal
 * @author Alina Dorosh
 * @param {boolean} openModal - Boolean to open the modal
 * @param {function} setOpenModal - Function to set the openModal state
 * @param {object} children - Children to be rendered in the modal
 */

import classes from "./modulesUI/Modal.module.css";
import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRectangleXmark } from "@fortawesome/free-regular-svg-icons";
const Modal = ({ openModal, setOpenModal, children }) => {
  const modalRef = useRef(null);
  //Close modal when clicking outside
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpenModal(false);
    }
  };
  return (
    <>
      <div
        className={`${classes["md-modal"]} 
        ${classes["md-effect"]} ${openModal && classes["md-show"]}`}
      >
        <div className={classes["md-content"]} ref={modalRef}>
          <FontAwesomeIcon
            icon={faRectangleXmark}
            role='button'
            onClick={() => setOpenModal(false)}
            className={classes.close}
          />

          {children}
        </div>
      </div>
      <div className={classes["md-overlay"]} />
    </>
  );
};

export default Modal;
