import React from "react";
import styles from "./percentage_response.module.css";

export default function PercentageResponse({ name, response, onChange }) {
  return (
    <div className={styles.percentage_response}>
      <input
        className={styles.input}
        type="number"
        min="0"
        max="100"
        name={name}
        placeholder="Enter here"
        onChange={onChange}
        defaultValue={response && (response * 100).toFixed(2)}
        onWheel={(e) => e.target.blur()}
      />
      <label className={styles.label}>%</label>
    </div>
  );
}
