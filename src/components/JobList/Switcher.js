/**
 * @fileoverview Switcher component
 * @author Ana Lorenzo
 * @author Benjamín Mancera
 */
import classes from "./Switcher.module.css";
import React from "react";

export const Switcher = ({ handlerSelect, selectedOrder }) => {
  return (
    <select
      value={selectedOrder}
      onChange={(e) => {
        handlerSelect(e);
      }}
      className={classes["form-select"]}
    >
      <option defaultValue="default">Ordenar por fecha </option>
      <option value="newest">Más recientes</option>
      <option value="oldest">Más antiguos</option>
    </select>
  );
};
