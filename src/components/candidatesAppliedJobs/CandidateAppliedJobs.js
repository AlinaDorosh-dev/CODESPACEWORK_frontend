/**
 * @fileoverview This file contains the main logic for the candidate apllied jobs page. It includes the select that allows the candidate to filter the job applications by date. It gets the data from the backend using a custom hook. The component uses useEffects, one to get the candidate id when the component is rendered for the first time and another one to get the data from the backend when the component is rendered for the first time or when the user deletes an application from the table. After getting the data from the backend it filters it by date and displays it in the table, a separate component, through a useEffect.
 * @author Alice Marchi
 */

import classes from "./CandidateAppliedJobs.module.css";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import useFetchAppliedJobs from "../../hooks/useFetchAppliedJobs";
import { filterDate } from "../../utils/filterDate";
import AppliedJobsTable from "./AppliedJobsTable";
import Loader from "../UI/Spinner/Loader";
import PageLayoutC from "../sidemenu/PageLayoutC";

function CandidateAppliedJobs() {
  // Label is the text that is displayed in the select and value is used to filter the data
  const options = [
    { label: "Último Mes", value: "Last Month" },
    { label: "Últimos 2 Meses", value: "Last 2 Months" },
    { label: "Últimos 3 Meses", value: "Last 3 Months" },
    { label: "Todas", value: "All" },
  ];

  // Value of the selected option, it's used to filter the data and it's updated when the user selects a new option
  const [selectValue, setSelectValue] = useState(options[0].value);

  const token =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");
  const decoded = jwt_decode(token);
  const loginId = decoded.UserInfo.id;

  const { pending, error, getAppliedJobs, data, getCandidateId, candidateId } =
    useFetchAppliedJobs();

  // loadData is a boolean that is used to control when the component makes the request to the backend, it's set to true when the component is rendered for the first time and to false when the request is made, it's set to true again when the user deletes an application from the table
  const [loadData, setLoadData] = useState(true);

  // filteredData is the data that is displayed in the table, it's updated when the user selects an option in the select
  const [filteredData, setFilteredData] = useState([]);

  // handleChangeSelect is executed when the user selects an option in the select, it updates the value of selectValue and calls the function setFilter that filters the data by date
  const handleChangeSelect = (event) => {
    setSelectValue(event.target.value);
    setFilteredData(filterDate(event.target.value, data, candidateId));
  };

  // get the candidate id when the component is rendered for the first time
  useEffect(() => {
    getCandidateId(loginId);
  }, [loginId]);

  // executed when the component is rendered for the first time, or when the user deletes an application from the table
  useEffect(() => {
    if (loadData) {
      getAppliedJobs(loginId);
      setLoadData(false);
    }
  }, [loadData]);

  useEffect(() => {
    // if loadData is false it means that the request to the backend has been made and the data is loaded
    if (!loadData && candidateId.length > 0) {
      setFilteredData(filterDate(selectValue, data, candidateId));
    }
  }, [data]);

  return (
    <div className={classes["main-wrapper"]}>
      <section className={classes["main-container"]}>
        <div className={classes.header}>
          <h3>Mis Candidaturas</h3>
          <p>¡Revisa todas tus ofertas de empleo!</p>
        </div>
        <div>
         <PageLayoutC/>
        </div>
        {pending && <Loader />}
        <div className={classes["applied-jobs-container"]}>
          {!pending && error === null && (
            <>
              <div className={classes["table-title"]}>
                <h4>Mis Candidaturas</h4>
                <div>
                  <select
                    value={selectValue}
                    onChange={handleChangeSelect}
                    className={classes["select-filter"]}
                  >
                    {options.map((option) => (
                      <option value={option.value} key={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <AppliedJobsTable
                data={filteredData}
                candidateId={candidateId}
                loginId={loginId}
                setLoadData={setLoadData}
              />
            </>
          )}
        </div>
        {/* If there are errors with the fetch*/}
        {!pending && error !== null && (
          <p className={classes["fetch-error"]}>{error}</p>
        )}
      </section>
    </div>
  );
}

export default CandidateAppliedJobs;
