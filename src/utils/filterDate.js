/**
 * @fileoverview This file contains the function to filter the jobs by date and a function to reformat the date, they both are used in the CandidateAppledJobs component
 * @author: Alice Marchi
 */

/**
 *
 * @param {string} selectValue is the value of the select element
 * @param {string} data is the array of jobs loaded from the backend
 * @param {string} id candidate id
 * @returns an array of jobs filtered by date
 */

export const filterDate = (selectValue, data, candidateId) => {
  const today = new Date();

  const prevMonth = new Date(
    today.getFullYear(),
    today.getMonth() - 1,
    today.getDate()
  );
  const prevTwoMonths = new Date(
    today.getFullYear(),
    today.getMonth() - 2,
    today.getDate()
  );
  const prevThreeMonths = new Date(
    today.getFullYear(),
    today.getMonth() - 3,
    today.getDate()
  );


  const filterJobsByDate = (startDate, endDate, data) => {
    return data.filter((data) => {
      return (
        +new Date(
          data.applicants.find(
            (candidate) => candidate.applicantId === candidateId
          ).applicationDate
        ) >= startDate &&
        +new Date(
          data.applicants.find(
            (candidate) => candidate.applicantId === candidateId
          ).applicationDate
        ) <= endDate
      );
    });
  };

  let filteredData;

  switch (selectValue) {
    case "Last Month":
      filteredData = filterJobsByDate(prevMonth, today, data);
      break;
    case "Last 2 Months":
      filteredData = filterJobsByDate(prevTwoMonths, today, data);
      break;
    case "Last 3 Months":
      filteredData = filterJobsByDate(prevThreeMonths, today, data);
      break;
    case "All":
      filteredData = data;
      break;
    default:
      filteredData = filterJobsByDate(prevMonth, today, data);
  }

  // Sort the data by date, from the most recent to the oldest
  const sortedFilteredData = filteredData.sort((a, b) => {
    const dateA = new Date(
      a.applicants.find(
        (candidate) => candidate.applicantId === candidateId
      ).applicationDate
    );
    const dateB = new Date(
      b.applicants.find(
        (candidate) => candidate.applicantId === candidateId
      ).applicationDate
    );
    return dateB - dateA;
  });

  return sortedFilteredData;
};

/**
 *
 * @param {string} date is the date to be formatted
 * @returns the date formatted
 */
export const reformatDate = (date) => {
  const currentDate = new Date(date);
  const options = {
    dateStyle: "medium",
  };
  return currentDate.toLocaleDateString("es-ES", options);
};
