import React from "react";
import styles from "./client_list_item.module.css";
import { ReactComponent as VAMIcon } from "./icons/vam.svg";
import { ReactComponent as VCPLIcon } from "./icons/vcpl.svg";
// import { ReactComponent as DueIcon } from "./icons/due.svg";
// import { ReactComponent as DueRedIcon } from "./icons/due-red.svg";
import { useNavigate } from "react-router-dom";
import due_img from "./images/due.png";
import due_red_img from "./images/due-red.png";
//import vcpl_img from "./images/vcpl.png";

function getEsgScoreColor(score) {
  if (score === undefined) {
    return "#676767";
  } else if (0 <= score && score <= 20) {
    return "#FF0000";
  } else if (80 <= score && score <= 100) {
    return "#00B050";
  } else {
    return "#676767";
  }
}

function getEsgScoreText(score) {
  if (score === undefined) {
    return "-";
  } else {
    return String(score);
  }
}

export default function ClientListItem({ data, background }) {
  const navigate = useNavigate();

  function handleClick() {
    window.clientName = data.entityName;
    navigate("/esgInformation", {
      state: { clientId: data.clientDetailsId, companyName: data.entityName },
    });
  }

  return (
    <div
      className={styles.client_list_item}
      style={background}
      onClick={handleClick}
    >
      <div className={styles.left_item}>
        {data.vamFlag && <VAMIcon />}
        {data.vcplFlag && <VCPLIcon />}
        {data.nextDueDate && (
          <div className={styles.dd_div}>
            <div name="dd-icon" className={styles.due_icon}>
              {/* {data.imminentFlag ? <DueRedIcon /> : <DueIcon />} */}
              <img
                className={styles.due_img}
                src={data.imminentFlag ? due_red_img : due_img}
                alt="due icon"
                style={{ zIndex: 0, overflow: "visible" }}
              />
            </div>
            <div className={styles.dd}>
              Next DD Due on :{" "}
              <span style={{ color: "#333" }}>{data.nextDueDate}</span>
            </div>
          </div>
        )}
      </div>
      <p className={styles.item}>{data.entityName}</p>
      <p className={styles.item}>{data.nicCode || "NA"}</p>
      <p className={styles.item}>{data.esgScore || "NA"}</p>
      <div className={styles.esg_scores_div}>
        <p
          className={styles.esg_score}
          style={{ color: getEsgScoreColor(data.overallScore) }}
        >
          {getEsgScoreText(data.overallScore) || "-"}
        </p>
        <p
          className={styles.esg_score}
          style={{ color: getEsgScoreColor(data.envScore) }}
        >
          {getEsgScoreText(data.envScore) || "-"}
        </p>
        <p
          className={styles.esg_score}
          style={{ color: getEsgScoreColor(data.socScore) }}
        >
          {getEsgScoreText(data.socScore) || "-"}
        </p>
        <p
          className={styles.esg_score}
          style={{ color: getEsgScoreColor(data.govScore) }}
        >
          {getEsgScoreText(data.govScore) || "-"}
        </p>
      </div>
      <p className={styles.item}>{data.esgRM || "NA"}</p>
      <p className={styles.right_item}>{data.lastUpdatedDate || "NA"}</p>
    </div>
  );
}
