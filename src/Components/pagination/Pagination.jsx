import React from "react";
import styles from "./pagination.module.css";
import { ReactComponent as ArrowLeftIcon } from "./icons/arrow-left.svg";
import { ReactComponent as ArrowRightIcon } from "./icons/arrow-right.svg";

export default function Pagination({ pageNo = 1, setPageNo, totalPages }) {
  function handlePreviousPage(e) {
    setPageNo(Math.max(pageNo - 1, 1));
  }

  function handleNextPage(e) {
    setPageNo(Math.min(pageNo + 1, totalPages));
  }

  function getPagination(pageNo, totalPages) {
    if (totalPages <= 5) {
      let pages = [];
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    } else {
      if (pageNo <= 3 || pageNo === totalPages) {
        return [1, 2, 3, "dots", totalPages];
      } else if (pageNo === totalPages - 1) {
        return [1, 2, "dots", totalPages - 1, totalPages];
      } else {
        return [1, "dots", pageNo, "dots", totalPages];
      }
    }
  }

  function handleClick(e) {
    const page = Number(e.target.getAttribute("data-page"));
    setPageNo(page);
  }

  return (
    <div className={styles.pagination}>
      <span onClick={handlePreviousPage} style={{ cursor: "pointer" }}>
        {pageNo !== 1 && <ArrowLeftIcon />}
      </span>
      {getPagination(pageNo, totalPages).map((el, idx) => {
        if (el === "dots") {
          return (
            <span key={idx} style={{ color: "#1900c0" }}>
              . . . . . .
            </span>
          );
        } else {
          if (el === pageNo) {
            return (
              <div
                key={idx}
                data-page={el}
                onClick={handleClick}
                className={styles.page_active}
              >
                {el}
              </div>
            );
          } else {
            return (
              <div
                key={idx}
                data-page={el}
                onClick={handleClick}
                className={styles.page}
              >
                {el}
              </div>
            );
          }
        }
      })}
      <span onClick={handleNextPage} style={{ cursor: "pointer" }}>
        {pageNo !== totalPages && <ArrowRightIcon />}
      </span>
    </div>
  );
}
