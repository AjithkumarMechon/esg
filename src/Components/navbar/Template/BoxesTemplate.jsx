import React, { useState } from "react";
import entiryMasterB from "../icons/entityMasterIconB.svg";
import entiryMasterW from "../icons/entityMasterIconW.svg";
import securityMasterB from "../icons/securitymasterIconB.svg";
import securityMasterW from "../icons/securityMasterIconW.svg";
import transactionMasterB from "../icons/transactionMasterIconB.svg";
import transactionMasterW from "../icons/transactionMasterIconW.svg";
import clientListingB from "../icons/clientListingB.svg";
import clientListingW from "../icons/clientListingIconW.svg";
import reportsW from "../icons/reportIconW.svg";
import reportsB from "../icons/reportIconB.svg";
import dataDictionaryW from "../icons/dataIconW.svg";
import dataDictionaryB from "../icons/dataIconB.svg";
import { useNavigate } from "react-router-dom";
import styles from "../../../styles/navbar.module.css";
export default function BoxesTemplate() {
  const initialState = {
    securityMaster: false,
    transactionMaster: false,
    entityMaster: false,
    clientListing: false,
    reports: false,
    dataDictionary: false,
  };

  const [isClicked, setIsClicked] = useState(initialState);
  const navigate = useNavigate();

  const handleOptionMouseHover = (option) => {
    const newIsClicked = { ...initialState, [option]: !isClicked[option] };
    setIsClicked(newIsClicked);
  };
  const handleOptionClick = (option) => {
    if (isClicked[option]) {
      navigate("/" + option);
    } else {
      navigate("");
    }
  };

  const handleBoxMouseout = () => {
    setIsClicked(initialState);
  };
  const accountTypes = [
    {
      id: 1,
      type: "entityMaster",
      src: isClicked.entityMaster ? entiryMasterW : entiryMasterB,
      h3_text: "Entity Master",
      idb_color_content: {
        backgroundColor: isClicked.entityMaster ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.entityMaster ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.entityMaster ? "white" : "#1900c0" },
    },
    {
      id: 2,
      type: "securityMaster",
      src: isClicked.securityMaster ? securityMasterW : securityMasterB,
      h3_text: "Security Master",

      idb_color_content: {
        backgroundColor: isClicked.securityMaster ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.securityMaster ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.securityMaster ? "white" : "#1900c0" },
    },
    {
      id: 3,
      type: "transactionMaster",
      src: isClicked.transactionMaster
        ? transactionMasterW
        : transactionMasterB,
      h3_text: "Transaction Master",

      idb_color_content: {
        backgroundColor: isClicked.transactionMaster ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.transactionMaster ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.transactionMaster ? "white" : "#1900c0" },
    },
    {
      id: 4,
      type: "clientListing",
      src: isClicked.clientListing ? clientListingW : clientListingB,

      h3_text: "Clent Listing",

      idb_color_content: {
        backgroundColor: isClicked.clientListing ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.clientListing ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.clientListing ? "white" : "#1900c0" },
    },
    {
      id: 5,
      type: "reports",
      src: isClicked.reports ? reportsW : reportsB,
      h3_text: "Reports",
      idb_color_content: {
        backgroundColor: isClicked.reports ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.reports ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.reports ? "white" : "#1900c0" },
    },
    {
      id: 6,
      type: "dataDictionary",
      src: isClicked.dataDictionary ? dataDictionaryW : dataDictionaryB,
      h3_text: "Data Dictionary",
      idb_color_content: {
        backgroundColor: isClicked.dataDictionary ? "#1900c0" : "white",
      },

      img_color: {
        backgroundColor: isClicked.dataDictionary ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.dataDictionary ? "white" : "#1900c0" },
    },
  ];

  return (
    <div className={styles.box_body} onMouseLeave={handleBoxMouseout}>
      {accountTypes.map((item) => (
        <div key={item.id}>
          <div
            onMouseEnter={() => handleOptionMouseHover(item.type)}
            onClick={() => handleOptionClick(item.type)}
            style={item.idb_color_content}
            className={styles.box_content_div}
          >
            <div className={styles.box_content}>
              <img
                className={styles.image_logo}
                src={item.src}
                alt={item.h3_text}
              />
            </div>
            <h3 className={styles.h3_text} style={item.text_color}>
              {item.h3_text}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}
