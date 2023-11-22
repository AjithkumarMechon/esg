import React from "react";
import styles from "./radio.module.css";

export default function Radio({ id, name, title, checked, onChange }) {
  return (
    <div className={styles.radio}>
      <input
        id={id}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        value={title}
      />{" "}
      <label htmlFor={id}>{title}</label>
    </div>
  );
}
