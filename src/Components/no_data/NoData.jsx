import React from "react";
import styles from "./no_data.module.css";
import { ReactComponent as NotesIcon } from "./icons/notes.svg";

export default function NoData() {
  return (
    <div className={styles.no_data}>
      <NotesIcon />
      <p className={styles.title}>No data found</p>
      <p className={styles.text}>No data found. Try adjusting your filter.</p>
    </div>
  );
}
