import React from "react";
import styles from "./modify_modal.module.css";
import Modal from "@mui/material/Modal";
import Button from "../../../../button/Button";
import { ReactComponent as WarningIcon } from "./icons/warning.svg";
import Line from "../../../../line/Line";
import Cookies from "js-cookie";

export default function ModifyModal({
  open,
  handleClose,
  handleCancel,
  handleClick,
}) {
  function handleChange(e) {
    const { checked } = e.target;

    if (checked) {
      Cookies.set("esg_dont_ask", "true");
    } else {
      Cookies.remove("esg_dont_ask");
    }
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modify report warning"
      aria-describedby="modify report warning"
    >
      <div className={styles.modify_modal}>
        <div className={styles.container}>
          <p className={styles.title}>
            <WarningIcon /> Modify Request
          </p>
          <p className={styles.subtitle}>
            Are you sure you want to modify the existing input?
          </p>
        </div>
        <Line />
        <div className={styles.footer}>
          <div className={styles.dont_ask_div}>
            <input
              type="checkbox"
              id="dont-ask-again"
              onChange={handleChange}
            />
            <label htmlFor="dont-ask-again" className={styles.dont_ask_text}>
              Don't ask me again
            </label>
          </div>
          <Button title="No" onClick={handleCancel} />
          <Button title="Yes" type="active" onClick={handleClick} />
        </div>
      </div>
    </Modal>
  );
}
