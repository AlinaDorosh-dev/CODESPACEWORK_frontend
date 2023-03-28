async function FetchEmployerJobs() {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": sessionStorage.getItem("accessToken")
        ? sessionStorage.getItem("accessToken")
        : localStorage.getItem("token"),
    },
  };
  const getJobs = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/job/employer-jobs/${sessionStorage.getItem(
          "userId"
        )}`,
        requestOptions
      );
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.log(error.message);
    }
  };

  let datas = await getJobs();
  return datas;
}

export default FetchEmployerJobs;
