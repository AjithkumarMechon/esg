import React from "react";
import styles from "./main_section_template.module.css";

export default function MainSectionTemplate({ Component }) {
  return (
    <div className={styles.main_section_template}>
      <Component />
    </div>
  );
}
