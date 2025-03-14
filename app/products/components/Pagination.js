import React from "react";
import styles from "./_styles/Pagination.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { PRODUCTS_LIST , IMG_PATH} from "@/config/api-path";


const Pagination = ({ totalPages,page }) => {
  return (
    <nav aria-label="Page navigation example">
      <ul className={styles.pagination}>
        {Array(2)
          .fill(1)
          .map((v, i) => {
            const p = i + 1;
            if (p < 1 || p > totalPages) return null;
            const usp = new URLSearchParams(searchParams.toString());
            usp.set("page", p);
            return (
              <li className={styles.li} key={p}>
                <Link className={`${styles.pageButton} ${p === page ? styles.active : ""}`} href={`?page=${p}`} >
                  {p}
                </Link>
              </li>
            );
          })}
      </ul>
    </nav>
  );
};


export default Pagination;

