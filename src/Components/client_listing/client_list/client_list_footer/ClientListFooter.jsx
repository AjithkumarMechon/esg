import React from "react";
import styles from "./client_list_footer.module.css";
import Pagination from "../../../pagination/Pagination";

export default function ClientListFooter({
  totalElements,
  totalPages,
  pageNo,
  setPageNo,
}) {
  return (
    <div className={styles.client_list_footer}>
      <p className={styles.text}>
        Total : <span style={{ fontWeight: "700" }}>{totalElements}</span>
      </p>
      <span style={{ marginLeft: "auto" }}>
        <Pagination
          totalPages={totalPages}
          pageNo={pageNo}
          setPageNo={setPageNo}
        />
      </span>
    </div>
  );
}
