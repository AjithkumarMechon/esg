import React, { useEffect, useState } from "react";
// import styles from "../styles/client_listing.module.css";
import Navbar from "../Components/navbar/Navbar";
import CopyrightBar from "../Components/copyright_bar/CopyrightBar";
import TitleDiv from "../Components/client_listing/title_div/TitleDiv";
import ClientList from "../Components/client_listing/client_list/ClientList";
import MainSectionTemplate from "../Components/main_section_template/MainSectionTemplate";
import Page from "../Components/page_template/Page";
import { useNavigate } from "react-router-dom";
import Loading from "../Components/loading/Loading";
import Cookies from "js-cookie";

function MainSection() {
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [companyIds, setCompanyIds] = useState(null);
  const [sortFilter, setSortFilter] = useState(null);
  const [nicCodes, setNicCodes] = useState([]);
  const [esgScoreIds, setEsgScoreIds] = useState([]);
  const [esgRmIds, setEsgRmIds] = useState([]);

  useEffect(() => {
    if (!Cookies.get("esg_access_token") || !Cookies.get("esg_primary_user")) {
      navigate("/login");
      return;
    }

    setPageNo(1);
  }, [
    companyIds,
    nicCodes,
    esgRmIds,
    esgScoreIds,
    sortFilter,
    searchText,
    navigate,
  ]);

  useEffect(() => {
    let body = {
      pageNo,
      searchText,
    };

    if (companyIds) {
      body.companyIds = companyIds;
    }

    if (nicCodes.length) {
      body.nicCodes = nicCodes;
    }

    if (esgScoreIds.length) {
      body.esgScoreIds = esgScoreIds;
    }

    if (esgRmIds.length) {
      body.esgRmIds = esgRmIds;
    }

    if (sortFilter) {
      body.sort = sortFilter;
    }

    fetch(process.env.REACT_APP_API_URL + "api/v1/clientListing", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Cookies.get("esg_access_token"),
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          setData(data);
          setLoading(false);
        }
      });
  }, [
    pageNo,
    sortFilter,
    searchText,
    companyIds,
    nicCodes,
    esgScoreIds,
    esgRmIds,
  ]);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <TitleDiv
        totalClientCount={data?.responseBody?.totalClientCount}
        setSearchText={setSearchText}
        nicCodes={nicCodes}
        setNicCodes={setNicCodes}
        esgScoreIds={esgScoreIds}
        setEsgScoreIds={setEsgScoreIds}
        esgRmIds={esgRmIds}
        setEsgRmIds={setEsgRmIds}
      />
      <ClientList
        data={data.responseBody}
        pageNo={pageNo}
        setPageNo={setPageNo}
        companyIds={companyIds}
        setCompanyIds={setCompanyIds}
        sortFilter={sortFilter}
        setSortFilter={setSortFilter}
      />
    </>
  );
}

export default function ClientListing() {
  return (
    <Page>
      <Navbar />
      <MainSectionTemplate Component={MainSection} />
      <CopyrightBar />
    </Page>
  );
}
