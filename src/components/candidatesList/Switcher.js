/**
 * @author: Ana Lorenzo
 * @author: Benjamin Mancera
 * @modified:
 */

import classes from "./Switcher.module.css";
import React from "react";

function Switcher({ handlerSelect, selectedOrder,order }) {
  return (
    <select
    
    value={selectedOrder}
    onChange={(e) => {
      handlerSelect(e);
        }}
    className={classes["form-select"]}
  >
    <option defaultValue="default">
      Ordenar por fecha
    </option>
    <option value="desc">Más recientes</option>
    <option value="asc">Más antiguos</option>
  </select>
);
}
export default Switcher;
