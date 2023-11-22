import React, { useState, useEffect } from "react";
// import styles from "../styles/esg_information.module.css";
import Page from "../Components/page_template/Page";
import Navbar from "../Components/navbar/Navbar";
import MainSectionTemplate from "../Components/main_section_template/MainSectionTemplate";
import CopyrightBar from "../Components/copyright_bar/CopyrightBar";
import TitleDiv from "../Components/esg_information/title_div/TitleDiv";
import ReportList from "../Components/esg_information/report_list/ReportList";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../Components/loading/Loading";
import Cookies from "js-cookie";

function MainSection() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [financialYear, setFinancialYear] = useState(null);
  const [financialYearCode, setFinancialYearCode] = useState(null);
  const [quarter, setQuarter] = useState(null);
  const [quarterCode, setQuarterCode] = useState(null);
  const [quarterUnitCode, setQuarterUnitCode] = useState("Quarter");
  const [isFilterChanged, setIsFilterChanged] = useState(false);

  useEffect(() => {
    if (!Cookies.get("esg_access_token") || !Cookies.get("esg_primary_user")) {
      navigate("/login");
      return;
    }
    //console.log(location);
    if (!location.state) {
      navigate("/");
      return;
    }
    //console.log("location present");

    fetch(
      `${process.env.REACT_APP_API_URL}api/v1/esgInformation/${location.state.clientId}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: Cookies.get("esg_access_token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        //console.log(data);
        if (data.statusCode === 200) {
          if (data.responseBody.reportDetail) {
            setData(data);
          } else {
            setData({});
          }
          const [fy, q] = data.responseBody.fqLabel.split("-");
          setFinancialYear(fy);
          setQuarter(q);
          setFinancialYearCode(data.responseBody.financialYearId);
          setQuarterCode(data.responseBody.quarterId);
        } else {
          alert(data.message);
        }
        setLoading(false);
      });
  }, [location.state, navigate]);

  useEffect(() => {
    if (isFilterChanged) {
      setLoading(true);

      const fyQuery = financialYearCode
        ? `financialYear=${financialYearCode}`
        : "";
      const quarterQuery = quarterCode ? `quarter=${quarterCode}` : "";
      let queryString = "";
      if (fyQuery && quarterQuery) {
        queryString = `?${fyQuery}&${quarterQuery}`;
      } else if (fyQuery) {
        queryString = `?${fyQuery}`;
      } else if (quarterQuery) {
        queryString = `?${quarterQuery}`;
      }

      //console.log("ClientId", location.state.clientId);

      fetch(
        `${process.env.REACT_APP_API_URL}api/v1/esgInformation/${location.state.clientId}${queryString}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: Cookies.get("esg_access_token"),
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if (data.statusCode === 200) {
            if (data.responseBody.reportDetail) {
              setData(data);
            } else {
              setData({});
            }
          } else {
            alert(data.message);
          }
          setLoading(false);
        });
      setIsFilterChanged(false);
    }
  }, [financialYearCode, quarterCode, location.state, isFilterChanged]);

  if (loading) {
    return <Loading />;
  }

  function handleFilterChange(e) {
    if (e.target.name === "financialYear") {
      if (e.target.value === "Select") {
        setFinancialYear(null);
        setFinancialYearCode(null);
        return;
      }
      setFinancialYearCode(
        Number(e.target.options[e.target.selectedIndex].getAttribute("data-id"))
      );
      setFinancialYear(e.target.value);
      //console.log(e.target.options[e.target.selectedIndex].getAttribute("data-idx"));
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
    if (e.target.name === "quarter") {
      if (e.target.value === "Select") {
        setQuarter(null);
        setQuarterCode(null);
        return;
      }
      setQuarterCode(
        Number(e.target.options[e.target.selectedIndex].getAttribute("data-id"))
      );
      setQuarter(e.target.value);
    }
    setIsFilterChanged(true);
  }

  let fyQuarter = "";
  if (financialYear && quarter) {
    fyQuarter = financialYear + " - " + quarter;
  } else {
    fyQuarter = financialYear || quarter || "";
  }

  return (
    <>
      <TitleDiv
        setIsFilterChanged={setIsFilterChanged}
        quarterUnitCode={quarterUnitCode}
        data={{
          financialYear: financialYear,
          quarter: quarter,
          fyQuarter: fyQuarter,
          clientId: location.state.clientId,
          companyName:
            data?.responseBody?.companyName || location.state.companyName,
        }}
        handleFilterChange={handleFilterChange}
      />
      <ReportList data={data.responseBody} clientId={location.state.clientId} />
    </>
  );
}

export default function ESGInformation() {
  return (
    <Page>
      <Navbar />
      <MainSectionTemplate Component={MainSection} />
      <CopyrightBar />
    </Page>
  );
}
