/**
 * @fileoverview Asynchronous function to get all jobs associated with an employer
 * @author Daniel Sánchez Gonzalez
 */

import { EMPLOYER_JOBS } from "../../config/urls";

async function FetchJobs(id) {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': sessionStorage.getItem('accessToken')
          ? sessionStorage.getItem('accessToken')
          : localStorage.getItem('token'),
      },
    };
  
    const getDatas = async (id) => {
      const response = await fetch(`${EMPLOYER_JOBS}/employer-jobs/${id}`, requestOptions);
      const data = await response.json();
      return data;
    };
  
    try {
      let datas = await getDatas(id);
      return datas;
    } catch (error) {
      throw new Error('Error fetching job data');
      return error;
    }
  }
  
  export default FetchJobs;



