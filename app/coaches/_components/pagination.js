import React from "react";
import styles from "./_styles/pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange = () => {} 
}) => {
  // 轉成number
  const total = +totalPages;
  const current = +currentPage;

  return (
    <div className={styles.pagination}>
      <button
        className={`${styles.pageButton} ${current === 1 ? styles.disabled : ""}`}
        onClick={() => onPageChange(current - 1)}
        disabled={current === 1}
      >
        <FontAwesomeIcon icon={faAngleLeft} />
      </button>

      {[...Array(total)].map((_, index) => {
        const page = index + 1;
        return (
          <button
            key={page}
            className={`${styles.pageButton} ${(current) === page ? styles.active : ""}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );
      })}

      <button
        className={`${styles.pageButton} ${current === total ? styles.disabled : ""}`}
        onClick={() => onPageChange(current + 1)}
        disabled={current === total}
      >
        <FontAwesomeIcon icon={faAngleRight} />
      </button>
    </div>
  );
};

export default Pagination;

