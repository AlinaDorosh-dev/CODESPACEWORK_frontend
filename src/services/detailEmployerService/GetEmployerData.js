/**
 * @fileoverview GetEmployerData service
 * @author Juan Dominguez
 * @modified By David Calero
 * @param {*} loginId
 * @returns {Promise}
 *
 */
import { EMPLOYERS_API } from "../../config/urls";

async function GetEmployerData(loginId) {
  let token =
    sessionStorage.getItem("accessToken") ||
    localStorage.getItem("accessToken");
  // let loginId = sessionStorage.getItem("userId");
  // Realizamos la petición a la API para que nos devuelva los datos del candidato descargando el pdf
  try {
    const response = await fetch(` ${EMPLOYERS_API}/${loginId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const responseJson = await response.json();

    return responseJson.data;

    // Aquí se puede manipular los datos obtenidos
  } catch (error) {
    console.error(error);
  }
}

export default GetEmployerData;
