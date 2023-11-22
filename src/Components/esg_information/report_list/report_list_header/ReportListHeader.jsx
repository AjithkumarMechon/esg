import React from "react";
import styles from "./report_list_header.module.css";

export default function ReportListHeader() {
  return (
    <div className={styles.report_list_header}>
      <p className={styles.report_list_header_left_item}>Version</p>
      <p className={styles.report_list_header_item}>Status</p>
      <p className={styles.report_list_header_item}>Create Date</p>
      <p className={styles.report_list_header_item}>Created by</p>
      <p className={styles.report_list_header_item}>Rating Status</p>
      <p className={styles.report_list_header_item}>ESG Status</p>
      <p className={styles.report_list_header_right_item}>Actions</p>
    </div>
  )
}