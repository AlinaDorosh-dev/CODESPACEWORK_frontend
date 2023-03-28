/**
 * @fileoverview This is the "select-react" component, where the job offers are loaded to be able to select them
 * @author Daniel Sánchez Gonzalez
 */

import Select from "react-select";
import Styles from "./JobSelector.module.css";

function JobSelector(props) {
    return (
        <>
            <Select className={Styles.selector} options={props.options} onChange={props.onChange} placeholder={"Seleccione la oferta que desea revisar"}/>
        </>
    );
}

export default JobSelector;