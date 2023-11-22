import React, { useCallback, useEffect, useState } from "react";
import styles from "./edit_report_modal.module.css";
import Modal from "@mui/material/Modal";
import DropdownResponse from "../../../rating_model/right_section/theme_section/key_issue_section/indicator/dropdown_response/DropdownResponse";
import RadioRespone from "../../../rating_model/right_section/theme_section/key_issue_section/indicator/radio_response/RadioResponse";
import Button from "../../../button/Button";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import ModifyModal from "./modify_modal/ModifyModal";

export default function EditReportModal({
  open,
  handleClose,
  clientId,
  reportId,
  prev,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    reportId,
    financialYearName: prev.financialYearName,
    quarterName: prev.quarterName,
    industryName: prev.industryName,
    nicCode: prev.nicCode,
    ddDate: prev.nddDate,
    clientDetailsId: clientId,
    singleUserFlag: true,
    primaryUser: Number(Cookies.get("esg_primary_user")),
  });
  const [nicCode, setNicCode] = useState(data.nicCode);
  const [saveButtonType, setSaveButtonType] = useState("inactive");
  const [financialYearId, setFinancialYearId] = useState(null);
  const [quarterId, setQuarterId] = useState(null);
  const [openChild, setOpenChild] = useState(false);
  const [quarterUnitCode, setQuarterUnitCode] = useState("Quarter");
  const [error, setError] = useState(null);

  const handleOpenChild = () => {
    if (Cookies.get("esg_dont_ask")) {
      handleClick();
    } else {
      setOpenChild(true);
    }
  };
  const handleCloseChild = () => {
    setOpenChild(false);
  };

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
      data[e.target.name] = Number(
        e.target.options[e.target.selectedIndex].getAttribute("data-id")
      );
      data.nicCode =
        e.target.options[e.target.selectedIndex].getAttribute("data-code");
      setNicCode(data.nicCode);
    }
    setData(data);
    checkData();
  }

  function handleDDChange(e) {
    setData({ ...data, ddDate: e.target.value });
    checkData();
  }

  function handleCancel(e) {
    data.industryName = prev.industryName;
    data.nicCode = prev.nicCode;
    data.financialYear = financialYearId;
    data.financialYearName = prev.financialYearName;
    data.quarterName = prev.quarterName;
    data.quarter = quarterId;
    data.ddDate = prev.nddDate;
    setNicCode(prev.nicCode);
    //console.log(data);
    setData({ ...data });
    setError(null);
    handleCloseChild();
    handleClose();
  }

  useEffect(() => {
    fetch(
      process.env.REACT_APP_API_URL + "api/v1/dropdown?type=financialYear",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("esg_access_token"),
        },
      }
    )
      .then((res) => res.json())
      .then((d) => {
        d.responseBody.FinancialYear.forEach((dd, idx) => {
          if (dd.name === prev.financialYearName) {
            if (idx !== 0) {
              //console.log("old");
              setQuarterUnitCode("Quarter_Old");
            } else {
              setQuarterUnitCode("Quarter");
            }
            // data.financialYear = dd.id;
            setFinancialYearId(dd.id);
            // setData({ ...data });
            setData((old) => {
              old.financialYear = dd.id;
              return { ...old };
            });
          }
        });
      });

    fetch(process.env.REACT_APP_API_URL + "api/v1/dropdown?type=quarter", {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
    })
      .then((res) => res.json())
      .then((d) => {
        d.responseBody.Quarter.forEach((dd) => {
          if (dd.name === prev.quarterName) {
            // data.quarter = dd.id;
            setQuarterId(dd.id);
            // setData({ ...data });
            setData((old) => {
              old.quarter = dd.id;
              return { ...old };
            });
          }
        });
      });
  }, [prev.financialYearName, prev.quarterName]);

  function checkData() {
    if (
      data.financialYear &&
      data.quarter &&
      data.industryName &&
      data.ddDate &&
      data.nicCode
    ) {
      setSaveButtonType("active");
    } else {
      setSaveButtonType("inactive");
    }
  }

  const cachedCheckData = useCallback(checkData, [
    data.financialYear,
    data.quarter,
    data.industryName,
    data.ddDate,
    data.nicCode,
  ]);

  useEffect(() => {
    cachedCheckData();
  }, [data, cachedCheckData]);

  function handleClick(e) {
    //console.log(JSON.stringify(data));
    handleCloseChild();
    fetch(process.env.REACT_APP_API_URL + "api/v1/editReport", {
      method: "PUT",
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
          navigate(0);
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
      <div className={styles.edit_report_modal}>
        <p className={styles.title}>Edit Rating Model</p>
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
                id="er-fy-dd"
                unit={{ code: "FinancialYear" }}
                name="financialYear"
                onChange={handleDropdownChange}
                response={data.financialYearName}
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
                id="er-q-dd"
                unit={{ code: quarterUnitCode }}
                name="quarter"
                onChange={handleDropdownChange}
                response={data.quarterName}
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
              id="er-it-dd"
              unit={{ code: "IndustryType" }}
              name="industryId"
              onChange={handleDropdownChange}
              response={data.industryName}
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
            <RadioRespone
              id="su-rr"
              unit={{ code: "Single User" }}
              checked={true}
            />
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
              defaultValue={prev.nddDate}
            />
          </div>
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.footer}>
          <Button title="Cancel" onClick={handleCancel} />
          <Button
            title="Save"
            onClick={handleOpenChild}
            type={saveButtonType}
          />
          <ModifyModal
            open={openChild}
            handleClose={handleCloseChild}
            handleClick={handleClick}
            handleCancel={handleCancel}
          />
        </div>
      </div>
    </Modal>
  );
}
