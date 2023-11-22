import React from "react";
import styles from "./bottom_navbar.module.css";
import Button from "../../button/Button";

function BottomNavbar({ buttonType, handleGenerateScore, handleSaveDraft }) {
  return (
    <div className={styles.bottom_navbar}>
      <button
        type="button"
        className={styles.draft_button}
        onClick={handleSaveDraft}
      >
        Save as Draft
      </button>
      <Button
        title="Generate Score"
        type={buttonType}
        onClick={handleGenerateScore}
      />
    </div>
  );
}

export default BottomNavbar;
