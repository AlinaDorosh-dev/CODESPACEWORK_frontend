/**
 * @fileoverview This file contains the functions that make the requests to the backend to get all jobs
 * @author Ana Lorenzo
 * @author Benjamín Mancera
 */
export const fetchCards = async (url) => {
  try {
    const request = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem("accessToken")
          ? sessionStorage.getItem("accessToken")
          : localStorage.getItem("accessToken"),
      },
    });
    const datos = await request.json();
    return {
      datos,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
