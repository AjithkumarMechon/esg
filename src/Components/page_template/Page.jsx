import React from "react";
import styles from "./page.module.css";

export default function Page(props) {
  return (
    <div className={styles.page} style={props.style}>
      {props?.children && props.children.length
        ? props.children.map((child) => child)
        : props.children}
    </div>
  );
}
