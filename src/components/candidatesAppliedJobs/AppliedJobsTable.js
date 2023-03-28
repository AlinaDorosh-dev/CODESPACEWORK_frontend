/**
 * @fileoverview This file contains the AppliedJobsTable component. It includes the table that shows all the jobs that the candidate has applied to. It manage the delete function, which allows the candidate to delete his application. The delete function is called from the custom hook useFetchAppliedJobs. The component also manages the visibility of the modal that shows the result of the delete function.
 * @author Alice Marchi
 */

import classes from "./AppliedJobsTable.module.css";
import ReactDOM from "react-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import useFetchAppliedJobs from "../../hooks/useFetchAppliedJobs";
import { reformatDate } from "../../utils/filterDate";
import ModalConfirmation from "./ModalConfirmation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faEye, faTrashCan } from "@fortawesome/free-regular-svg-icons";

function AppliedJobsTable({ data, candidateId, setLoadData, loginId }) {
  const columnNames = ["Oferta", "Fecha Aplicación", "Estado", "Acción"];

  // To control the visibility of the modal, the state visible is used. The function handleVisibility also sets the state of loadData to true, so that the useEffect in the parent component is triggered and the data is fetched again.
  const [visible, setVisible] = useState(false);

  const handleVisibility = () => {
    setVisible(!visible);
    if (visible) {
      setLoadData(true);
    }
  };

  // custom hook that has the functions that make the requests to the backend
  const { deleteAppliedJob, message, error } = useFetchAppliedJobs();

  // handleDelete is the function that is called when the user clicks on the delete button. It receives as parameters the id of the job and the id of the candidate. It calls the deleteAppliedJob function from the custom hook useFetchAppliedJobs.
  const handleDelete = async (jobId, loginId) => {
    await deleteAppliedJob(jobId, loginId);
    handleVisibility();
  };

  const getCompanyLogo = (logo)=>{
    return logo ? 'http://localhost:8000/employer/logo/' + encodeURIComponent(logo) : undefined;
  }

  return (
    <>
      {ReactDOM.createPortal(
        <ModalConfirmation
          visible={visible}
          onClose={handleVisibility}
          message={message}
          error={error}
        />,
        document.querySelector("#modal")
      )}
      <div className={classes["table-container"]}>
        <div className={classes["applied-jobs-table"]}>
          <table>
            <thead>
              <tr>
                {columnNames.map((colName) => (
                  <th key={colName}>{colName}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((job) => (
                <tr key={job._id} className={classes["table-row"]}>
                  <td>
                    <div className={classes["job-block"]}>
                      <span className={classes["company-logo"]}>
                        <img
                          src={getCompanyLogo(job.company?.logo)}
                          alt={"Logo"}
                        />
                      </span>
                      <Link to={`/job/job-single/${job._id}`}>
                        <h4>{job.title}</h4>
                      </Link>
                      <ul className={classes["job-info"]}>
                        <li>
                          <FontAwesomeIcon icon={faBriefcase} />
                          <span className={classes["job-block-icon"]}>
                            {job.company.companyName}
                          </span>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faLocationDot} />
                          <span className={classes["job-block-icon"]}>
                            {`${job.location.city}, ${job.location.country}`}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td>
                    {/* The function is used to change the format of the date */}
                    {reformatDate(
                      job.applicants.find(
                        (candidate) => candidate.applicantId === candidateId
                      ).applicationDate
                    )}
                  </td>
                  <td
                    className={`${
                      job.jobActive ? classes.active : classes.inactive
                    }`}
                  >{`${job.jobActive ? "Activo" : "Inactivo"}`}</td>
                  <td>
                    <ul className={classes["action-list"]}>
                      <li>
                        <Link to={`/job/job-single/${job._id}`}>
                          <button className={classes["icon-button"]}>
                            <FontAwesomeIcon icon={faEye} />
                          </button>
                        </Link>
                      </li>
                      <li>
                        <button
                          className={classes["icon-button"]}
                          onClick={() => {
                            handleDelete(job._id, loginId);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* If the array of data is empty, it shows a message  */}
        {data.length === 0 ? (
          <p className={classes["table-warning"]}>
            No has aplicado a ninguna oferta todavía. ¡Empieza a buscar!
          </p>
        ) : null}
      </div>
    </>
  );
}

export default AppliedJobsTable;
