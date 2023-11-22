import React, { useState } from "react";
import styles from "../../styles/dashboard.module.css";
import { ReactComponent as Welcome } from "./Icons/welcomeDashboard.svg";
import { ReactComponent as EntiryMasterB } from "./Icons/entrymasterB.svg";
import { ReactComponent as EntiryMasterW } from "./Icons/entrymasterW.svg";
import { ReactComponent as SecurityMasterB } from "./Icons/securitymasterB.svg";
import { ReactComponent as SecurityMasterW } from "./Icons/securitymasterW.svg";
import { ReactComponent as TransactionMasterB } from "./Icons/transactionmasterB.svg";
import { ReactComponent as TransactionMasterW } from "./Icons/transactionmasterW.svg";
import { ReactComponent as ClentListingB } from "./Icons/clientlistingB.svg";
import { ReactComponent as ClentListingW } from "./Icons/clientlistingW.svg";
import { ReactComponent as ReportsW } from "./Icons/reportsW.svg";
import { ReactComponent as ReportsB } from "./Icons/reportsB.svg";
import { ReactComponent as DataDictionaryW } from "./Icons/datadictionaryW.svg";
import { ReactComponent as DataDictionaryB } from "./Icons/datadictionaryB.svg";
import { ReactComponent as Lastloginclock } from "./Icons/lastloginClock.svg";
import { ReactComponent as Lastlogoutclock } from "./Icons/lastlogoutClock.svg";
import { useNavigate } from "react-router-dom";

const icons = {
  entityMaster: { inactive: EntiryMasterW, active: EntiryMasterB },
  securityMaster: { inactive: SecurityMasterW, active: SecurityMasterB },
  transactionMaster: {
    inactive: TransactionMasterW,
    active: TransactionMasterB,
  },
  clientListing: { inactive: ClentListingW, active: ClentListingB },
  reports: { inactive: ReportsW, active: ReportsB },
  dataDictionary: { inactive: DataDictionaryW, active: DataDictionaryB },
};

export default function DashboardSection() {
  const initialState = {
    entityMaster: false,
    securityMaster: false,
    transactionMaster: false,
    clientListing: false,
    reports: false,
    dataDictionary: false,
  };
  const [isClicked, setIsClicked] = useState(initialState);
  const navigate = useNavigate();
  const lastLogout = localStorage.getItem("lastLogout");
  const lastLogin = localStorage.getItem("lastLogin");
  const [lastloginData, setLastloginData] = useState(
    !lastLogin ? "--  --  --  --  --  --  --" : lastLogin
  );
  const [lastlogoutData, setLastlogoutData] = useState(
    !lastLogout ? "--  --  --  --  --  --  --" : lastLogout
  );

  const handleOptionMouse = (option) => {
    setIsClicked({ ...initialState, [option]: true });
  };

  const handleOptionClick = (option) => {
    if (isClicked[option]) {
      navigate("/" + option);
    } else {
      navigate("");
    }
  };

  return (
    <div
      className={styles.dashboard}
      onMouseOut={() => setIsClicked(initialState)}
    >
      <div className={styles.Welcome}>
        <Welcome className={styles.Welcome_icon} />
        <div className={styles.loginSection}>
          <div className={styles.clockComponent}>
            <Lastloginclock />
          </div>
          <div className={styles.loginInfo}>
            <span>Last Login</span>
            <br />
            <span>{lastloginData}</span>
          </div>
        </div>
        <div className={styles.logoutSection}>
          <div className={styles.clockComponent}>
            <Lastlogoutclock />
          </div>
          <div className={styles.loginInfo}>
            <span>Last Logout</span>
            <br />
            <span>{lastlogoutData}</span>
          </div>
        </div>
      </div>
      <div className={styles.gridContent}>
        {Object.keys(icons).map((key) => (
          <div
            key={key}
            onClick={() => handleOptionClick(key)}
            onMouseOver={() => handleOptionMouse(key)}
            onMouseOut={() => setIsClicked(initialState)}
          >
            {isClicked[key]
              ? React.createElement(icons[key].active, {
                  className: styles.activeIcon,
                })
              : React.createElement(icons[key].inactive, {
                  className: styles.inactiveIcon,
                })}
          </div>
        ))}
      </div>
    </div>
  );
}
