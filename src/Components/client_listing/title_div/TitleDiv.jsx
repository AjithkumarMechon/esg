import React, { useEffect, useState } from "react";
import styles from "./title_div.module.css";
import { ReactComponent as ClientIcon } from "./icons/client.svg";
import { ReactComponent as DashboardIcon } from "./icons/dashboard.svg";
import { ReactComponent as TasksIcon } from "./icons/tasks.svg";
import { ReactComponent as FiltersIcon } from "./icons/filters.svg";
import { ReactComponent as FiltersWhiteIcon } from "./icons/filters-white.svg";
import Line from "../../line/Line";
import FilterItem from "./filter_item/FilterItem";
import Cookies from "js-cookie";

export default function TitleDiv({
  totalClientCount,
  setSearchText,
  nicCodes,
  setNicCodes,
  esgScoreIds,
  setEsgScoreIds,
  esgRmIds,
  setEsgRmIds,
}) {
  const [industryType, setIndustryType] = useState(null);
  const [esgRatingScore, setEsgRatingScore] = useState(null);
  const [esgRM, setEsgRM] = useState(null);
  const [filtersCount, setFiltersCount] = useState(0);

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "api/v1/industry", {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setIndustryType(data);
      });

    fetch(
      process.env.REACT_APP_API_URL + "api/v1/dropdown?type=ESGRatingScore",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("esg_access_token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setEsgRatingScore(data);
      });

    fetch(process.env.REACT_APP_API_URL + "api/v1/dropdown?type=ESGRM", {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEsgRM(data);
      });
  }, []);

  function handleSearchChange(e) {
    setSearchText(e.target.value);
  }

  function handleClearAll(e) {
    setNicCodes([]);
    setEsgScoreIds([]);
    setEsgRmIds([]);
    setFiltersCount(0);
  }

  return (
    <div className={styles.title_div}>
      <ClientIcon />
      <p className={styles.count_text}>Client Listing ({totalClientCount})</p>
      <div className={styles.right_items}>
        <button type="button" className={styles.dashboard_button}>
          <DashboardIcon />
          <span className={styles.dashboard_button_text}>Dashboard</span>
        </button>
        <button type="button" className={styles.button}>
          <TasksIcon />
          <span className={styles.button_text}>Tasks</span>
        </button>
        <input
          className={styles.search}
          type="text"
          name="client-listing-search"
          placeholder="Search by company name"
          onChange={handleSearchChange}
        />
        <div className={styles.filters_div}>
          <button
            type="button"
            className={styles.button}
            style={filtersCount ? { background: "#1900C0" } : {}}
          >
            {filtersCount ? <FiltersWhiteIcon /> : <FiltersIcon />}
            <span
              className={styles.button_text}
              style={filtersCount ? { color: "white" } : {}}
            >
              Filters{" "}
            </span>
            {filtersCount ? (
              <div className={styles.filters_count}>{filtersCount}</div>
            ) : (
              <></>
            )}
          </button>
          <div className={styles.filters}>
            <p className={styles.filters_title}>
              Filters
              <span className={styles.filters_clear} onClick={handleClearAll}>
                Clear all
              </span>
            </p>
            <Line />
            {industryType && (
              <FilterItem
                id="industry"
                title="Industry"
                itemList={industryType?.responseBody?.map((type) => {
                  let temp = { ...type };
                  temp.name = temp.code + " - " + temp.name.trim();
                  return temp;
                })}
                setList={nicCodes}
                setter={setNicCodes}
                setFiltersCount={setFiltersCount}
              />
            )}
            {esgRatingScore && (
              <FilterItem
                id="esgScore"
                title="ESG Score"
                itemList={esgRatingScore?.responseBody?.ESGRatingScore}
                setList={esgScoreIds}
                setter={setEsgScoreIds}
                setFiltersCount={setFiltersCount}
              />
            )}
            {esgRM && (
              <FilterItem
                id="esgRM"
                title="ESG RM"
                itemList={esgRM?.responseBody?.ESGRM}
                setList={esgRmIds}
                setter={setEsgRmIds}
                setFiltersCount={setFiltersCount}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
