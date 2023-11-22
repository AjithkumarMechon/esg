import React from "react";
import styles from "./key_issue_section.module.css";
import Indicator from "./indicator/Indicator";

export default function KeyIssueSection({
  keyIssueData,
  getResponse,
  setResponse,
  setComment,
}) {
  return (
    <div
      className={styles.key_issue}
      id={"keyIssue_" + keyIssueData.keyIssue.id}
    >
      <div className={styles.key_issue_title_div}>
        <p className={styles.key_issue_title}>{keyIssueData.keyIssue.name}</p>
      </div>
      <div className={styles.indicator_header}>
        <div className={styles.indicator_header_item}>Indicators</div>
        <div className={styles.indicator_header_item}>Response</div>
        <div className={styles.indicator_header_item}>Comments</div>
      </div>
      {keyIssueData.indicatorKeyIssueMap.map((indicatorData) => {
        return (
          <Indicator
            indicatorData={indicatorData}
            getResponse={getResponse}
            setResponse={setResponse}
            setComment={setComment}
          />
        );
      })}
    </div>
  );
}
