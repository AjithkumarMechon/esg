import React from "react";
import styles from "./radio_response.module.css";

export default function RadioRespone({ unit, name, checked, response, onChange }) {
  return (
    <div className={styles.radio_response}>
      {unit.code.split("/").map((option, idx) => {
        return (
          <div className={styles.option} key={idx}>
            <input
              id={name + idx}
              className={styles.radio}
              type="radio"
              name={name}
              onChange={onChange}
              value={option}
              defaultChecked={response === option || checked}
            />
            <label htmlFor={name + idx} className={styles.label}>
              {option}
            </label>
          </div>
        );
      })}
    </div>
  );
}
