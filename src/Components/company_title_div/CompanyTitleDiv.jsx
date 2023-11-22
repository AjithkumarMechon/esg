import React from "react";
import styles from "./company_title_div.module.css";
import { ReactComponent as IndustryIcon } from "./icons/industry.svg";
import { ReactComponent as FYQIcon } from "./icons/fy-quarter.svg";
import { ReactComponent as IndustryTypeIcon } from "./icons/industry-type.svg";

export default function CompanyTitleDiv({ data }) {
  return (
    <div className={styles.title_div}>
      <IndustryIcon />
      <p className={styles.company_name} title={data.companyName}>
        {data.companyName.substring(0, 35) +
          (data.companyName.length > 35 ? " . . . " : "")}
      </p>
      <div className={styles.right_items_div}>
        <div className={styles.right_item}>
          <FYQIcon />
          {data.financialYear} - {data.quarter}
        </div>
        <div className={styles.right_item} title={data.industryType}>
          <IndustryTypeIcon />
          {data.nicCode} -{" "}
          {data.industryType.substring(0, 55) +
            (data.industryType.length > 55 ? " . . . " : "")}
        </div>
      </div>
    </div>
  );
}
