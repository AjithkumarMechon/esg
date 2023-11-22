import React, { useEffect } from "react";
import Navbar from "../Components/navbar/Navbar";
import CopyrightBar from "../Components/copyright_bar/CopyrightBar";
import Page from "../Components/page_template/Page";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import DashboardSection from "../Components/Dashboard/DashboardSection";

export default function Dashboard() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!Cookies.get("esg_access_token") || !Cookies.get("esg_primary_user")) {
      navigate("/login");
      return;
    }
  }, [navigate]);
  return (
    <Page>
      <Navbar />
      <DashboardSection />
      <CopyrightBar />
    </Page>
  );
}
