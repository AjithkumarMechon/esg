import React from "react";
import styles from "./inner_list.module.css";

export default function InnerList({ title, active, keyIssueId }) {
  function handleClick(e) {
    const items = document.querySelectorAll('[name="keyIssue_listItem"]');
    items.forEach((item) => {
      item.style.borderLeft = "0.15625rem solid #EEE";
    });
    e.currentTarget.style.borderLeft = "0.15625rem solid #1900C0";
    const id = e.currentTarget.getAttribute("data-keyissueid");
    document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div
      id={keyIssueId + "_label"}
      className={styles.inner}
      style={active ? { borderLeft: "0.15625rem solid #1900C0" } : {}}
      onClick={handleClick}
      name="keyIssue_listItem"
      data-keyissueid={keyIssueId}
    >
      <p className={styles.title}>{title}</p>
    </div>
  );
}
