import React from "react";
import styles from "./button_active.module.css";

export default function ButtonActive({ Icon, title, onClick, style }) {
  return (
    <button
      type="button"
      className={styles.button_active}
      onClick={onClick}
      style={style}
    >
      {Icon && <Icon />}
      {title}
    </button>
  );
}
