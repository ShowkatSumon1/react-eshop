import React, { useState } from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({
  currentPage,
  setCurrentPage,
  productPerPage,
  totalProducts,
}) => {
  const totalPages = totalProducts / productPerPage;
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  //// for number in page
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }

  /////// jetake click korbo seta current page hobe.
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  ////// Next pagination
  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };
  ////// Prev pagination
  const paginatePrev = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  return (
    <ul className={styles.pagination}>
      <li
        onClick={paginatePrev}
        className={currentPage === pageNumbers[0] ? styles.hidden : null}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => paginate(number)}
              className={number === currentPage ? styles.active : null}
            >
              {number}
            </li>
          );
        }
      })}

      <li
        onClick={paginateNext}
        className={
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? styles.hidden
            : null
        }
      >
        Next
      </li>
      <p>
        <b className={styles.page}>{`pages ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalPages)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
