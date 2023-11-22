import React from "react";
import styles from "./button.module.css";

export default function Button({ Icon, title, onClick, style, type }) {
  function getStyles(type) {
    switch (type) {
      case "normal":
        return styles.normal;
      case "active":
        return styles.active;
      case "inactive":
        return styles.inactive;
      default:
        return styles.normal;
    }
  }

  return (
    <button
      type="button"
      className={getStyles(type)}
      onClick={onClick}
      style={style}
      disabled={type === "inactive"}
    >
      {Icon && <Icon />}
      {title}
    </button>
  );
}
