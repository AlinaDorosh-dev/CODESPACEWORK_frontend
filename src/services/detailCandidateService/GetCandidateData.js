/**
 * @fileoverview GetCandidateData service
 * @author Juan Dominguez
 * @modified 15/03/2022 by Alina Dorosh
 * @param {*} loginId
 * @returns {Promise}
 *
 */
import { CANDIDATES_API } from "../../config/urls";

async function GetCandidateData(loginId) {
  let token = sessionStorage.getItem("accessToken");
  // Realizamos la petición a la API para que nos devuelva los datos del candidato descargando el pdf
  try {
    const response = await fetch(` ${CANDIDATES_API}/${loginId}`, {
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

export default GetCandidateData;
