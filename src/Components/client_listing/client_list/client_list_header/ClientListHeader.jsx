import React, { useEffect, useState } from "react";
import styles from "./client_list_header.module.css";
import { ReactComponent as FiltersIcon } from "./icons/filters.svg";
import { ReactComponent as SortIcon } from "./icons/sort.svg";
import Line from "../../../line/Line";
import Radio from "./Radio/Radio";
import utils from "../../../../utils/utils";
import Cookies from "js-cookie";

function mapSortFilter(sortFilter) {
  if (sortFilter === "ASC") {
    return "Ascending";
  }
  if (sortFilter === "DESC") {
    return "Descending";
  }
  if (sortFilter === "Ascending") {
    return "ASC";
  }
  if (sortFilter === "Descending") {
    return "DESC";
  }
}

export default function ClientListHeader({
  companyIds,
  setCompanyIds,
  sortFilter,
  setSortFilter,
}) {
  const [vamVcplFilters, setVamVcplFilters] = useState({});

  useEffect(() => {
    fetch(process.env.REACT_APP_API_URL + "api/v1/dropdown?type=Company", {
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.statusCode === 200) {
          setCompanyIds(data.responseBody.Company[0].id);
          setVamVcplFilters(data);
        } else {
          alert(data.message);
        }
      });
  }, [setCompanyIds]);

  const sortFilters = ["Ascending", "Descending"];

  function handleSortClear(e) {
    setSortFilter(null);
  }

  function handleFilterChange(e) {
    const { name, value } = e.target;

    if (name === "vam-vcpl-filter") {
      setCompanyIds(utils.getDDId(vamVcplFilters, "Company", value));
    } else {
      setSortFilter(mapSortFilter(value));
    }
  }

  return (
    <div className={styles.client_list_header}>
      <div className={styles.left_item}>
        <div className={styles.filters_div}>
          <button type="button" className={styles.button}>
            <FiltersIcon />
            <span className={styles.button_text}>Filters</span>
          </button>
          <div className={styles.filters}>
            <p className={styles.filters_title}>Filters</p>
            <Line />
            {vamVcplFilters?.responseBody?.Company.map((filter, idx) => {
              return (
                <Radio
                  title={filter.name}
                  name="vam-vcpl-filter"
                  id={"vam-vcpl-filter" + filter.name}
                  onChange={handleFilterChange}
                  checked={companyIds === filter.id}
                  key={idx}
                />
              );
            })}
          </div>
        </div>
        <div className={styles.filters_div}>
          <button type="button" className={styles.button}>
            <SortIcon />
          </button>
          <div className={styles.filters}>
            <p className={styles.filters_title}>
              Sort by{" "}
              <span className={styles.clear} onClick={handleSortClear}>
                Clear
              </span>
            </p>
            <Line />
            {sortFilters.map((filter, idx) => {
              return (
                <Radio
                  key={idx}
                  title={filter}
                  name="sort-filter"
                  id={"sort-filter-" + filter}
                  onChange={handleFilterChange}
                  checked={filter === mapSortFilter(sortFilter)}
                />
              );
            })}
          </div>
        </div>
      </div>
      <p className={styles.item}>Entity Name</p>
      <p className={styles.item}>NIC Code</p>
      <p className={styles.item}>ESG Rating</p>
      <div className={styles.esg_score_item}>
        <p className={styles.esg_score_title}>ESG Score</p>
        <div className={styles.esg_score_subtitles_div}>
          <p className={styles.esg_score_subtitle}>Total</p>
          <p className={styles.esg_score_subtitle}>ENV</p>
          <p className={styles.esg_score_subtitle}>SOC</p>
          <p className={styles.esg_score_subtitle}>GOV</p>
        </div>
      </div>
      <p className={styles.item}>ESG RM</p>
      <p className={styles.right_item}>Last updated date</p>
    </div>
  );
}
