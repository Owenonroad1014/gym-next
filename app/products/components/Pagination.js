import React from "react";
import styles from "./_styles/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";


const Pagination = ({ totalPages,page,searchParams }) => 
  {return (
    <nav aria-label="Page navigation example">
      <ul className={styles.pagination}>

      <li className={styles.li}>
          <Link
            className={`${styles.pageButton} ${page <= 1 ? styles.disabled : ""}`}
            href={page > 1 ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: page - 1 })}` : "#"}
            aria-disabled={page <= 1}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </Link>
        </li>

        {Array(2)
          .fill(1)
          .map((v, i) => {
            const p = i + 1;
            if (p < 1 || p > totalPages) return null;
            const usp = new URLSearchParams(searchParams.toString());
            usp.set("page", p);
            return (
              <li className={styles.li} key={p}>
                <Link className={`${styles.pageButton} ${p === page ? styles.active : ""}`} href={`?${usp}`} >
                  {p}
                </Link>
              </li>
            );
          })}

          <li className={styles.li}>
          <Link
            className={`${styles.pageButton} ${page >= totalPages ? styles.disabled : ""}`}
            href={page < totalPages ? `?${new URLSearchParams({ ...Object.fromEntries(searchParams), page: page + 1 })}` : "#"}
            aria-disabled={page <= 1}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </Link>
        </li>

      </ul>
    </nav>
  );
};


export default Pagination;

