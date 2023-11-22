import React, { useEffect, useState } from "react";
import styles from "./create_report_modal.module.css";
import Modal from "@mui/material/Modal";
import DropdownResponse from "../../rating_model/right_section/theme_section/key_issue_section/indicator/dropdown_response/DropdownResponse";
import RadioRespone from "../../rating_model/right_section/theme_section/key_issue_section/indicator/radio_response/RadioResponse";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function CreateReportModal({
  open,
  handleClose,
  clientId,
  setIsFilterChanged,
}) {
  // const navigate = useNavigate();
  const [data, setData] = useState({
    clientDetailsId: clientId,
    singleUserFlag: true,
    primaryUser: Number(Cookies.get("esg_primary_user")),
  });
  const [nicCode, setNicCode] = useState(null);
  const [saveButtonType, setSaveButtonType] = useState("inactive");
  const [quarterUnitCode, setQuarterUnitCode] = useState("Quarter");
  const [error, setError] = useState(null);

  function handleDropdownChange(e) {
    if (e.target.name === "financialYear") {
      if (
        e.target.options[e.target.selectedIndex].getAttribute("data-idx") !==
        "0"
      ) {
        //console.log("old");
        setQuarterUnitCode("Quarter_Old");
      } else {
        setQuarterUnitCode("Quarter");
      }
    }
    data[e.target.name] =
      e.target.options[e.target.selectedIndex].getAttribute("data-id");
    if (e.target.name === "industryId") {
      data.nicCode =
        e.target.options[e.target.selectedIndex].getAttribute("data-code");
      setNicCode(data.nicCode);
    }
    setData(data);
    //console.log(data);
  }

  function handleDDChange(e) {
    setData({ ...data, ddDate: e.target.value });
  }

  function handleCancel(e) {
    setData({
      clientDetailsId: clientId,
      singleUserFlag: true,
      primaryUser: Number(Cookies.get("esg_primary_user")),
    });
    setError(null);
    handleClose();
  }

  useEffect(() => {
    if (
      data.financialYear &&
      data.quarter &&
      data.industryId &&
      data.ddDate &&
      data.nicCode
    ) {
      setSaveButtonType("active");
      //console.log(JSON.stringify(data));
    } else {
      setSaveButtonType("inactive");
    }
  }, [data]);

  function handleClick(e) {
    // console.log(JSON.stringify(data));
    fetch(process.env.REACT_APP_API_URL + "api/v1/createReport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.statusCode === 200) {
          //navigate(0);
          setIsFilterChanged(true);
          handleCancel();
        } else {
          setError(data.message);
        }
      });
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="create report"
      aria-describedby="create report"
    >
      <div className={styles.create_report_modal}>
        <p className={styles.title}>Create Rating Model</p>
        <div className={styles.outer_div}>
          <div className={styles.middle_div}>
            <div className={styles.inner_div}>
              <p
                className={styles.title}
                style={{ fontWeight: 500, padding: "0.625rem 0" }}
              >
                Select Financial Year
              </p>
              <DropdownResponse
                unit={{ code: "FinancialYear" }}
                name="financialYear"
                onChange={handleDropdownChange}
              />
            </div>
            <div className={styles.inner_div}>
              <p
                className={styles.title}
                style={{ fontWeight: 500, padding: "0.625rem 0" }}
              >
                Select Quarter
              </p>
              <DropdownResponse
                unit={{ code: quarterUnitCode }}
                name="quarter"
                onChange={handleDropdownChange}
              />
            </div>
          </div>
          <div className={styles.inner_div}>
            <p
              className={styles.title}
              style={{ fontWeight: 500, padding: "0.625rem 0" }}
            >
              Select Industry Type
            </p>
            <DropdownResponse
              unit={{ code: "IndustryType" }}
              name="industryId"
              onChange={handleDropdownChange}
              trim={75}
            />
          </div>
          <p className={styles.label} style={{ padding: "0 1.25rem" }}>
            NIC Code :{" "}
            <span style={{ color: "#333", fontWeight: "600" }}>{nicCode}</span>
          </p>
        </div>
        <div className={styles.outer_div2}>
          <div
            className={styles.inner_div}
            style={{ padding: "1.25rem", borderRight: "0.0625rem solid #EEE" }}
          >
            <RadioRespone unit={{ code: "Single User" }} checked={true} />
          </div>
          <div
            className={styles.inner_div}
            style={{
              padding: "0.625rem 1.25rem",
              borderLeft: "0.0625rem solid #EEE",
            }}
          >
            <label className={styles.label}>DD Date</label>
            <input
              className={styles.input}
              type="date"
              name="ddDate"
              onChange={handleDDChange}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.footer}>
          <Button title="Cancel" onClick={handleCancel} />
          <Button title="Save" onClick={handleClick} type={saveButtonType} />
        </div>
      </div>
    </Modal>
  );
}
