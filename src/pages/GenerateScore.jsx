import React from "react";
// import styles from "../styles/generate_score.module.css";
import Navbar from "../Components/navbar/Navbar";
import MainSectionTemplate from "../Components/main_section_template/MainSectionTemplate";
import CopyrightBar from "../Components/copyright_bar/CopyrightBar";
import Page from "../Components/page_template/Page";
import CompanyTitleDiv from "../Components/company_title_div/CompanyTitleDiv";
import ScoreSection from "../Components/generate_score/score_section/ScoreSection";
import GenerateScoreFooter from "../Components/generate_score/generate_score_footer/GenerateScoreFooter";
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";

function MainSection() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!Cookies.get("esg_access_token") || !Cookies.get("esg_primary_user")) {
    navigate("/login");
    return;
  }

  if (!location.state) {
    navigate("/");
    return;
  }

  const data = location.state.d;
  //console.log(location.state);

  return (
    <>
      <CompanyTitleDiv
        data={{
          companyName: data.responseBody.Name,
          nicCode: data.responseBody["NIC-Code"],
          financialYear: location.state.financialYear,
          quarter: location.state.quarter,
          industryType: location.state.industryType
        }}
      />
      <ScoreSection data={data.responseBody} />
      <GenerateScoreFooter />
    </>
  );
}

export default function GenerateScore() {
  return (
    <Page>
      <Navbar />
      <MainSectionTemplate Component={MainSection} />
      <CopyrightBar />
    </Page>
  );
}
