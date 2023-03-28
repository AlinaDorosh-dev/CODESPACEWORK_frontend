export const applyJob = async (jobIdParam) => {
  const token =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");
  const loginId =
    sessionStorage.getItem("userId") || localStorage.getItem("userId");

    console.log(loginId);
    console.log(jobIdParam);

  try {
    const request = await fetch(
      `http://localhost:8000/job/job-single/${loginId}/${jobIdParam}`,
      // `http://localhost:8000/job/job-single/${loginId}/64184cad978feefea3580326`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify({ mensaje: "Solicitud enviada a la oferta." }),
      }
    );
    const response = await request.json();
    console.log(response);
    return response;
  } catch (error) {
      console.log(error);
    throw error;
  }
};
