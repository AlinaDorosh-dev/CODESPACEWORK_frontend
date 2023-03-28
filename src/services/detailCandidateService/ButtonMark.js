// //Definir la función que manejará la solicitud de API
// function like(loginId) {
//     // Hacer la solicitud de API para que se agregue a la lista de favoritos(el candidato) por parte de la empresa
//     fetch("http://localhost:8000/candidate/" + loginId + "/watchlist", {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         "auth-token": sessionStorage.getItem("accessToken")
//         ? sessionStorage.getItem("accessToken")
//         : localStorage.getItem("token"),
//       },
//       body: JSON.stringify({
//         // Si es necesario, incluir cualquier dato adicional que deba enviarse con la solicitud
//       })
//     })
//       .then(response => response.json())
//       .then(data => console.log(data))
//       .catch(error => console.error(error));
//   }
  

// export default like;
  