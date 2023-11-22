import React from "react";
import styles from "./number_response.module.css";

export default function NumberResponse({ unit, name, response, onChange }) {
  return (
    <div>
      <input
        className={styles.input}
        type="number"
        min="0"
        name={name}
        placeholder="Enter here"
        onChange={onChange}
        defaultValue={response}
        onWheel={(e) => e.target.blur()}
      />
    </div>
  );
}
