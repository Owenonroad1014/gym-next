import React from "react";
import styles from "./_styles/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageButton} ${currentPage === 1 ? styles.disabled : ""}`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`${styles.pageButton} ${currentPage === page ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabled : ""}`}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;

