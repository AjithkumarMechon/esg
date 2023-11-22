import React from "react";
import styles from "./report_list_item.module.css";
import Button from "../../../button/Button";
import { useNavigate } from "react-router-dom";
import { ReactComponent as RocketIcon } from "./icons/rocket.svg";
import { ReactComponent as EditIcon } from "./icons/edit.svg";
import EditReportModal from "../edit_report_modal/EditReportModal";

export default function ReportListItem({ data, background, clientId }) {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleClick() {
    navigate("/esgModel", { state: { reportId: data.reportId } });
  }

  return (
    <div className={styles.report_list_item} style={background}>
      <p className={styles.left_item}>{data.version}</p>
      <p className={styles.item}>{data.status}</p>
      <p className={styles.item}>{data.createdDate}</p>
      <p className={styles.item}>{data.createdBy}</p>
      <p className={styles.item}>{data.ratingStatus}</p>
      <p className={styles.item}>{data.approvedStatus}</p>
      <p className={styles.right_item}>
        <Button
          Icon={RocketIcon}
          title="Start"
          onClick={handleClick}
          style={{ padding: "0.1875rem 0.625rem" }}
        />
        <Button
          Icon={EditIcon}
          onClick={handleOpen}
          style={{ padding: "0", border: "none" }}
        />
        <EditReportModal
          open={open}
          handleClose={handleClose}
          clientId={clientId}
          reportId={data.reportId}
          prev={data}
        />
      </p>
    </div>
  );
}
