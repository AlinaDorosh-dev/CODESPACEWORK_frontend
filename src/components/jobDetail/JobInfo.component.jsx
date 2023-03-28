import style from "./jobInfo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faBriefcase,
  faLocationDot,
  faSackDollar,
} from "@fortawesome/free-solid-svg-icons";
import Badge from "../Badge.component";
import { applyJob } from "../../services/ApplyAJob.service";
import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

function JobInfo({
  jobIdParams,
  refLogo,
  title,
  specialty,
  location,
  registerAt,
  salary,
  workDay,
  jobType,
}) {
  // const [id, setId] = useState();
  const { jobId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    console.log("jobid jobinfo " + jobId);
    // setId(jobIdParams);
  }, []);

  const [applyMsg, setApplyMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const applyForJob = async () => {
    const result = await applyJob(jobId);
    if (result.status === "Succeeded") {
      setApplyMsg("Se ha aplicado exitosamente");
      setSuccess(true);
    } else {
      setApplyMsg("No se ha podido aplicar, intentalo de nuevo mas tarde");
    }
  };

  // TODO : Terminarlo
  return (
    <div className={style["job-block"]}>
      {success &&
        ReactDOM.createPortal(
          <Modal openModal={success} setOpenModal={setSuccess}>
            <div className={style["md-content-container"]}>
              <h3>{applyMsg}</h3>
              <Button
                type='submit'
                className='submit'
                buttonTxt='OK'
                onClick={() => {
                  setSuccess(false);
                  navigate("/candidates-dashboard/job/job-list");
                }}
              />
            </div>
          </Modal>,
          document.querySelector("#modal")
        )}

      <div className={style["inner-box"]}>
        <div className={style["content"]}>
          <span className={style["job-logo"]}>
            <img
              src={`${refLogo}`}
              alt='Company Logo'
              className={style["company-img"]}
            />
          </span>
          <div>
            <h3 className={style["job-title"]}>{title}</h3>
            <ul className={style["job-info"]}>
              <li>
                <span>
                  <FontAwesomeIcon icon={faBriefcase} />
                  {specialty}
                </span>
              </li>
              <li>
                <span>
                  <FontAwesomeIcon icon={faLocationDot} />
                  {location?.city},{location?.country}
                </span>
              </li>
              {/* <li>
                <span>
                  <FontAwesomeIcon icon={faClock} />
                  {registerAt}
                </span>
              </li> */}
              <li>
                <span>
                  <FontAwesomeIcon icon={faSackDollar} />
                  {salary * 0.8}k - {salary * 1.2}k
                </span>
              </li>
            </ul>
            <div className={style["job-other-info"]}>
              <Badge type='code' text={workDay} />
              &nbsp;
              <Badge type='code' text={jobType} />
            </div>
          </div>
        </div>
        <div className={style["btn-box"]}>
          <button
            onClick={applyForJob}
            className={`${style["theme-btn"]} ${style["btn-style"]}`}
          >
            Aplicar Trabajo
          </button>
        </div>
      </div>
    </div>
  );
}

export default JobInfo;
