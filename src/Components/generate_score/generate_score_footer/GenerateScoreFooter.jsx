import React from "react";
import styles from "./generate_score_footer.module.css";
import Button from "../../button/Button";

export default function GenerateScoreFooter() {
  function handleBack() {
    window.history.go(-1);
  }
  return (
    <div className={styles.footer}>
      <div className={styles.buttons_div}>
        <Button title="Back" onClick={handleBack} />
      </div>
    </div>
  );
}
