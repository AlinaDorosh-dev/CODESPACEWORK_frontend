import style from "../styles/jobDetail.module.css";
import { useEffect, useState } from "react";
import { JobService } from "../services/JobService";
import { JobModel } from "../models/postAJob.model";
import Loader from "../components/UI/Spinner/Loader";
import { useParams } from "react-router";
import JobInfo from "../components/jobDetail/JobInfo.component";
import JobSingleDetail from "../components/jobDetail/JobSingleDetail";
import JobOverview from "../components/jobDetail/JobOverview.component";

function JobDetail() {
  const [loading, setLoading] = useState(true);
  const [jobData, setJobData] = useState();
  const [id, setId] = useState();

  const params = useParams();
  const { jobId } = useParams();

  // console.log("jobid " + jobId);

  useEffect(() => {
    jobInfo();
  }, [jobId]);

  const jobInfo = async () => {
    try {
      const data = await JobService.getById(params.jobId);
      setJobData(data);
      setId(data._id);
      setLoading(false);
      console.log(data);
    } catch (error) {
      return error;
    }
  };

  return (
    <section className={style["job-detail-section"]}>
      <div className={style["upper-box"]}>
        <JobInfo
          jobIdParam={jobId}
          refLogo={jobData?.getCompanyLogo()}
          title={jobData?.title}
          specialty={jobData?.specialtyJob}
          location={jobData?.location}
          registerAt={jobData?.registerAt}
          salary={jobData?.salary}
          workDay={jobData?.workDay}
          jobType={jobData?.jobType}
        />
      </div>
      <div className={style["job-detail-outer"]}>
        <div className={style["row"]}>
          <div className={style["description"]}>
            <h3 className={style["title-h3"]}>Descripción</h3>
            <p>{jobData?.description}</p>
          </div>
          <JobSingleDetail jobData={jobData} />
        </div>
      </div>
    </section>
  );
}

export default JobDetail;

// {`mailto:${infoCandidate.email}`} realiza la función de un href, pero en este caso es para enviar un correo electrónico.
