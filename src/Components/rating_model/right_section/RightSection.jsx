import React from "react";
import styles from "./right_section.module.css";
import BreadCrumb from "../../bread_crumb/BreadCrumb";
import { ReactComponent as EnvIcon } from "./icons/environment.svg";
import { ReactComponent as SocialIcon } from "./icons/social.svg";
import { ReactComponent as CorporateIcon } from "./icons/corporate.svg";
import ThemeSection from "./theme_section/ThemeSection";
import CompanyTitleDiv from "../../company_title_div/CompanyTitleDiv";

function getIcon(icon) {
  switch (icon) {
    case "Environment":
      return EnvIcon;
    case "Social":
      return SocialIcon;
    case "Corporate Governance":
      return CorporateIcon;
    default:
      return EnvIcon;
  }
}

export default function RightSection({
  data,
  getResponse,
  setResponse,
  setComment,
}) {
  //console.log(data);
  const breadCrumbItems = [
    { title: "Client Listing", href: "/clientListing" },
    {
      title: window.clientName || data.companyName,
      href: "/esgInformation",
      state: {
        clientId: data.clientId,
        companyName: data.companyName,
      },
    },
    { title: "Rating Model", href: "/esgModel" },
  ];

  return (
    <div className={styles.right_section}>
      <BreadCrumb items={breadCrumbItems} />
      <CompanyTitleDiv data={{ ...data, companyName: data.companyName }} />
      <div className={styles.main_div}>
        {data.categoryIndustryMapList.map((categoryData) => {
          return (
            <>
              {categoryData.themeIndustryMaps.map((themeData, idx) => {
                return (
                  <ThemeSection
                    ThemeTitleIcon={getIcon(categoryData.category.name)}
                    themeData={themeData}
                    getResponse={getResponse}
                    setResponse={setResponse}
                    setComment={setComment}
                    key={idx}
                  />
                );
              })}
            </>
          );
        })}
      </div>
    </div>
  );
}
