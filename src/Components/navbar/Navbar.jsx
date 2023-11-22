import React, { useEffect, useState } from "react";
import { useJwt } from "react-jwt";
import { ReactComponent as LogoutIcon } from "./icons/logout.svg";
import { ReactComponent as LogoutIconB } from "./icons/logoutb.svg";
import { ReactComponent as PasswordIconB } from "./icons/passwordIconb.svg";
import { ReactComponent as PasswordIconW } from "./icons/passwordIconw.svg";
import { ReactComponent as BoxesIcon } from "../../logo/boxesIcon.svg";
import { ReactComponent as Logo } from "../../logo/logo.svg";

import styles from "../../styles/navbar.module.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Line from "../line/Line";
// import Button from "../button/Button";
import BoxesTemplate from "./Template/BoxesTemplate";
import { UpdateLastLogout } from "../date_component/date_time_in_out";

function Navbar() {
  const navigate = useNavigate();
  const [userLetter, setUserLetter] = useState("R");
  const [username, setUsername] = useState("");
  const [isLogout, setisLogout] = useState(false);
  const [isPassword, setisPassword] = useState(false);
  const { decodedToken } = useJwt(Cookies.get("esg_access_token"));

  useEffect(() => {
    setUserLetter(decodedToken?.username.charAt(0).toUpperCase());
    setUsername(decodedToken?.username);
  }, [decodedToken]);

  function handleHomeClick() {
    navigate("/");
  }

  const lastLogin = localStorage.getItem("entryLogin");
  const [perfectlogin, setperfectLogin] = useState(lastLogin);
  function updateperfectLogin() {
    setperfectLogin(lastLogin);
    localStorage.setItem("lastLogin", perfectlogin);
  }

  function handleLogout(e) {
    Object.keys(Cookies.get()).forEach(function (cookieName) {
      var neededAttributes = {
        // Here you pass the same attributes that were used when the cookie was created
        // and are required when removing the cookie
      };
      Cookies.remove(cookieName, neededAttributes);
      UpdateLastLogout();
      updateperfectLogin();
    });
    navigate("/login");
  }
  const [isVisible, setIsVisible] = useState(false);
  const handleClick = () => {
    setIsVisible(!isVisible);
  };

  const handleChangePassword = () => {
    navigate("/changePassword");
  };
  return (
    <div className={styles.navbar}>
      <span onClick={handleClick}>
        <div className={styles.boxes_icon}>
          <BoxesIcon />
        </div>
        <div className={styles.boxes_popup}>
          <div className={styles.boxesTemplate_div}>
            <BoxesTemplate />
          </div>
        </div>
      </span>
      <span onClick={handleHomeClick}>
        <Logo />
      </span>
      <div className={styles.right_items_div}>
        <div className={styles.profile_div}>
          <div className={styles.profile_letter}>{userLetter}</div>
          <div className={styles.profile_popup}>
            <div className={styles.inner_div}>
              <div className={styles.profile_letter}>{userLetter}</div>
              <p className={styles.username}>{username}</p>
            </div>
            <Line />
            <span
              className={styles.change_password}
              onMouseOver={() => setisPassword(true)}
              onMouseOut={() => setisPassword(false)}
            >
              {isPassword ? <PasswordIconW /> : <PasswordIconB />}

              <p onClick={handleChangePassword}>Change Password</p>
            </span>
            <Line />

            <span
              title="Logout"
              type="button"
              className={styles.logout}
              onMouseOver={() => setisLogout(true)}
              onMouseOut={() => setisLogout(false)}
              onClick={handleLogout}
            >
              {isLogout ? <LogoutIcon /> : <LogoutIconB />}
              <p>Logout</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
