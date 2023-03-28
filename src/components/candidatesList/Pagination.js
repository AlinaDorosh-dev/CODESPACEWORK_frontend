/**
 * @author: Benjamín Mancera
 * modified:
 */

import { usePagination, DOTS } from "../../utils/usePagination.utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import classes from "./Pagination.module.css";

//import './pagination.scss';
const Pagination = (props) => {
  const {
    onPageChange, //to change the page
    totalCount, //total number of candidates
    siblingCount = 1, //number of pages to show on each side of the current page
    currentPage, //actual page
    pageSize, //number of candidates per page
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  // If there are less than 2 times in pagination range we shall not render the component
  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul className={classes["pagination-container"]}>
      {/* Left navigation arrow */}
      <li
        className={currentPage === 1 ? classes["prev-hidden"] : classes.prev }
        onClick={onPrevious}
      >
        <span>
        <FontAwesomeIcon icon={faArrowLeft} />
        </span>
      </li>
      {paginationRange.map((pageNumber, key) => {
        // If the pageItem is a DOT, render the DOTS unicode character
        if (pageNumber === DOTS) {
          return (
            <li key={key} className={classes["dots"]}>
              &#8230;
            </li>
          );
        }

        // Render our Page Pills
        return (
          <li 
          key={key}
          className={classes["number-container"]} >
            <span
              
              className={
                pageNumber === currentPage
                  ? classes["number-active"]
                  : classes.number
              }
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </span>
          </li>
        );
      })}
      {/*  Right Navigation arrow */}
      <li
        className={
          currentPage === lastPage ? classes["next-hidden"] : classes.next
        }
        onClick={onNext}
      >
        <span>
        <FontAwesomeIcon icon={faArrowRight} />
        </span>
      </li>
    </ul>
  );
};

export default Pagination;
