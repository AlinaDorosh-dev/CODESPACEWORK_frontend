/**
 * @fileoverview  This is a reusable button component
 * @author Alina Dorosh
 * @param {string} buttonTxt - Text to be displayed in the button
 * @param {string} className - Class name to be applied to the button
 * @param {function} onClick - Function to be executed when the button is clicked
 * @param {boolean} disabled - Boolean to disable the button
 */

import classes from './modulesUI/Button.module.css'

const Button = ({buttonTxt, className= "form-btn", onClick, disabled, type}) => {
  return (
    <button className={classes[className]} onClick={onClick} disabled={disabled} type={type}>{buttonTxt}</button>
  )
}

export default Button