import React from "react";
import styles from "./copyright_bar.module.css";

export default function CopyrightBar() {
  return (
    <div className={styles.container}>
      <p className={styles.text}>
        Copyright Ⓒ Vivriti Assest Management. All Rights Reserved
      </p>
    </div>
  );
}
