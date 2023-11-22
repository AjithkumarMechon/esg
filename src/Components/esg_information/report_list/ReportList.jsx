import React from "react";
import styles from "./report_list.module.css";
import ReportListHeader from "./report_list_header/ReportListHeader";
import ReportListItem from "./report_list_item/ReportListItem";
import NoData from "../../no_data/NoData";

export default function ReportList({ data, clientId }) {
  return (
    <div className={styles.report_list}>
      <ReportListHeader />
      <div className={styles.report_list_items_div}>
        {data ? (
          [data.reportDetail].map((data, idx) => {
            return (
              <ReportListItem
                key={idx}
                data={data}
                background={
                  idx % 2 ? { background: "#FFF" } : { background: "#FCFBFC" }
                }
                clientId={clientId}
              />
            );
          })
        ) : (
          <NoData />
        )}
      </div>
    </div>
  );
}
