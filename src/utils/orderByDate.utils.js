/**
 * @author Benjamín Mancera
 * @author Ana Lorenzo
 * @param {*} datos gets the data from the API
 * @param {*} order gets the order selected by the user
 * @returns data ordered by date
 */
export const orderByDate = (datos, order) => {
  let newOrder;
  if (order === "newest") {
    newOrder = datos.data.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  } else if (order === "oldest") {
    newOrder = datos.data.sort((a, b) => {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });
  } else {
    newOrder = datos.data;
  }
  return newOrder;
};
