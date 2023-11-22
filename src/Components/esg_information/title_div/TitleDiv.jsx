import React from "react";
import styles from "./title_div.module.css";
import { ReactComponent as InformationIcon } from "./icons/information.svg";
import { ReactComponent as FYQIcon } from "./icons/fy-quarter.svg";
import { ReactComponent as CreateIcon } from "./icons/create.svg";
import { ReactComponent as ArrowLeft } from "./icons/arrow-left.svg";
import CreateReportModal from "../create_report_modal/CreateReportModal";
import DropdownResponse from "../../rating_model/right_section/theme_section/key_issue_section/indicator/dropdown_response/DropdownResponse";
import Button from "../../button/Button";

export default function TitleDiv({ quarterUnitCode, data, handleFilterChange, setIsFilterChanged }) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  function handleBackClick() {
    window.history.go(-1);
  }

  return (
    <div className={styles.title_div}>
      <span onClick={handleBackClick}>
        <ArrowLeft />
      </span>
      <InformationIcon />
      <p className={styles.company_name}>
        ESG Information - {data.companyName}
      </p>
      <div className={styles.right_items_div}>
        <div className={styles.right_item}>
          <div className={styles.fyq}>
            <FYQIcon />
            {data.fyQuarter}
          </div>
          <div className={styles.fyq_filter}>
            <div className={styles.fyq_dd}>
              <p className={styles.title}>Financial Year</p>
              <DropdownResponse
                unit={{ code: "FinancialYear" }}
                name="financialYear"
                onChange={handleFilterChange}
                response={data.financialYear}
                noSelect={true}
              />
            </div>
            <div className={styles.fyq_dd}>
              <p className={styles.title}>Quarter</p>
              <DropdownResponse
                unit={{ code: quarterUnitCode }}
                name="quarter"
                onChange={handleFilterChange}
                response={data.quarter}
                noSelect={true}
              />
            </div>
          </div>
        </div>
        <Button
          type="active"
          Icon={CreateIcon}
          title="Create"
          onClick={handleOpen}
        />
      </div>
      <CreateReportModal
        open={open}
        handleClose={handleClose}
        clientId={data.clientId}
        setIsFilterChanged={setIsFilterChanged}
      />
    </div>
  );
}
