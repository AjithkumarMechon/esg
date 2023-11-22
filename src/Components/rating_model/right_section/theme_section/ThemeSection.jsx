import React from "react";
import styles from "./theme_section.module.css";
import KeyIssueSection from "./key_issue_section/KeyIssueSection";

export default function ThemeSection({
  ThemeTitleIcon,
  themeData,
  getResponse,
  setResponse,
  setComment,
}) {
  return (
    <div className={styles.theme_section}>
      <div className={styles.theme_title_div}>
        <ThemeTitleIcon />
        <p className={styles.theme_title}>{themeData.theme.name}</p>
        {/* <p className={styles.theme_text}>USER ID : </p> */}
      </div>
      <div className={styles.hline}></div>
      <div className={styles.key_issues_div}>
        {themeData.keyIssueThemeMaps.map((keyIssueData) => {
          return (
            <KeyIssueSection
              keyIssueData={keyIssueData}
              getResponse={getResponse}
              setResponse={setResponse}
              setComment={setComment}
            />
          );
        })}
      </div>
    </div>
  );
}
