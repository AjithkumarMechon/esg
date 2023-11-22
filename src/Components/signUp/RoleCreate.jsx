import React, { useState } from "react";
import styles from "../../styles/login.module.css";
import { useNavigate } from "react-router-dom";

import { ReactComponent as Above } from "../../Components/signUp/icons/above.svg";
import { ReactComponent as Below } from "../../Components/signUp/icons/below.svg";
import { ReactComponent as Logo } from "../../Components/signUp/icons/logo.svg";
import { ReactComponent as Join_Us } from "../../Components/signUp/icons/join_us.svg";
import investorLogo from "../../Components/signUp/icons/investorlogo_white.svg";
import investorLogoBlue from "../../Components/signUp/icons/investorlogo_blue.svg";
import distributorLogoWhite from "../../Components/signUp/icons/distributorLogo_white.svg";
import distributorLogoBlue from "../../Components/signUp/icons/distributorLogo_blue.svg";
import borrowerLogowhite from "../../Components/signUp/icons/borrowerLogo_white.svg";
import borrowerLogoBlue from "../../Components/signUp/icons/borrowerLogo_blue.svg";
import main_image from "../../Components/signUp/images/main_image.png";
import IdbContent from "./IdbContent";
export default function RoleCreate() {
  const navigate = useNavigate();
  // const [lastClickTime, setLastClickTime] = useState(0);
  const [isClicked, setIsClicked] = useState({
    borrower: false,
    distributor: false,
    investor: false,
  });

  const handleOptionClick = (option) => (e) => {
    e.preventDefault();
    // const currentTime = new Date().getTime();
    switch (option) {
      case "Investor":
        setIsClicked((prev) => ({ ...prev, investor: !prev.investor }));
        // if (currentTime - lastClickTime < 300) {

        navigate("/signup");
        // }
        setIsClicked((prev) => ({
          ...prev,
          distributor: false,
          borrower: false,
        }));
        break;
      case "Distributor":
        setIsClicked((prev) => ({ ...prev, distributor: !prev.distributor }));
        // if (currentTime - lastClickTime < 300) {
        navigate("");
        // }
        setIsClicked((prev) => ({
          ...prev,
          investor: false,
          borrower: false,
        }));
        break;
      case "Borrower":
        setIsClicked((prev) => ({ ...prev, borrower: !prev.borrower }));
        // if (currentTime - lastClickTime < 300) {
        navigate("");
        // }
        setIsClicked((prev) => ({
          ...prev,
          distributor: false,
          investor: false,
        }));
        break;
      default:
        break;
    }

    // setLastClickTime(currentTime);
  };

  const handleSignin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const accountTypes = [
    {
      id: 1,
      type: "Investor",
      src: isClicked.investor ? investorLogoBlue : investorLogo,
      h3_text: "Investor",
      p_text: " Personal account to manage all your activities",
      idb_color_content: {
        backgroundColor: isClicked.investor ? "#1900c0" : "white",
      },
      img_color: { backgroundColor: isClicked.investor ? "white" : "#1900c0" },
      text_color: { color: isClicked.investor ? "white" : "#1900c0" },
    },
    {
      id: 2,
      type: "Distributor",
      src: isClicked.distributor ? distributorLogoBlue : distributorLogoWhite,
      h3_text: "Distributor",
      p_text: "Own or belong to a company, this is for you",
      idb_color_content: {
        backgroundColor: isClicked.distributor ? "#1900c0" : "white",
      },
      img_color: {
        backgroundColor: isClicked.distributor ? "white" : "#1900c0",
      },
      text_color: { color: isClicked.distributor ? "white" : "#1900c0" },
    },
    {
      id: 3,
      type: "Borrower",
      src: isClicked.borrower ? borrowerLogoBlue : borrowerLogowhite,
      h3_text: "Borrower",
      p_text: "Own or belong to a company, this is for you",
      idb_color_content: {
        backgroundColor: isClicked.borrower ? "#1900c0" : "white",
      },
      img_color: { backgroundColor: isClicked.borrower ? "white" : "#1900c0" },
      text_color: { color: isClicked.borrower ? "white" : "#1900c0" },
    },
  ];

  return (
    <div className={styles.page}>
      <span className={styles.above}>
        <Above />
      </span>
      <span className={styles.below}>
        <Below />
      </span>
      <span className={styles.logo}>
        <Logo />
      </span>
      <div className={styles.main_grid}>
        <div className={styles.left}>
          <h1 className={styles.title}>Start your journey</h1>
          <p className={styles.subtitle}>
            Nam elit tincidunt Morbi malesuada hendrerit odio Nunc Donec
            efficitur. Praesent elit sit viverra est. elit nisl. Morbi in luctus
            urna.
          </p>
          <div className={styles.img_div}>
            <img className={styles.main_img} src={main_image} alt="main" />
          </div>
        </div>
        <div className={styles.divider}></div>
        <div className={styles.right}>
          <Join_Us className={styles.join_us} />
          <p className={styles.text_center}>
            To begin this journey, tell us what type of account you’d be opening
          </p>
          <br />
          <form>
            <div className={styles.signup}>
              <div>
                {accountTypes.map((item) => (
                  <IdbContent
                    key={item.id}
                    className={item.className}
                    handleData={handleOptionClick(item.type)}
                    src={item.src}
                    h3_text={item.h3_text}
                    p_text={item.p_text}
                    img_color={item.img_color}
                    idb_color_content={item.idb_color_content}
                    text_color={item.text_color}
                  />
                ))}
              </div>
            </div>
            <p className={styles.text}>
              Already have an account?{" "}
              <span
                className={styles.signup}
                style={{ color: "#1900C0" }}
                onClick={handleSignin}
              >
                Sign in
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
