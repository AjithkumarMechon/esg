import React, { useState } from "react";
import { ReactComponent as CgPassword } from "../../Components/signUp/icons/changePassword.svg";
import { ReactComponent as Weak } from "../../Components/signUp/icons/weak.svg";
import { ReactComponent as Moderate } from "../../Components/signUp/icons/moderate.svg";
import { ReactComponent as Strong } from "../../Components/signUp/icons/strong.svg";
import { ReactComponent as Initial } from "../../Components/signUp/icons/initial.svg";
import styles from "../../styles/login.module.css";
import stylesPassword from "../../styles/password.module.css";
import { useNavigate } from "react-router-dom";
import main_image from "../../Components/signUp/images/SecurityLogo.svg";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import usePasswordState from "./Template/passwordState";

import Navbar from "../navbar/Navbar";
import Page from "../page_template/Page";
import CopyrightBar from "../copyright_bar/CopyrightBar";
import Cookies from "js-cookie";
const ChangePassword = () => {
  const {
    password,
    setPassword,
    passwordErrors,
    setPasswordErrors,
    strength,
    setStrength,
  } = usePasswordState();
  const [cpassword, setcpassword] = useState("");
  const [popuptext, setpopuptext] = useState(false);
  const [oldpassword, setoldpassword] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [showoldpassword, setShowoldpassword] = useState(false);
  const [proceedSave, setProceesSave] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === cpassword) {
      fetch(process.env.REACT_APP_AUTH_URL + "v1/users/password/reset", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("esg_access_token")}`,
        },
        body: JSON.stringify({
          oldpassword: oldpassword,
          newpassword: cpassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 200) {
            setpopuptext(true);
            navigate("/dashboard");
          } else {
            alert("old password not match");
          }
        });
    }
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = new RegExp(
      "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    );
    const moderateRegex = new RegExp("^(?=.*[a-zA-Z])(?=.*[0-9])(?=.{6,})");
    if (password.length === 0) {
      setStrength("Initial");
    } else if (strongRegex.test(password)) {
      setStrength("Strong");
    } else if (moderateRegex.test(password)) {
      setStrength("Moderate");
    } else {
      setStrength("Weak");
    }
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPopup(true);
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
    const isPasswordValid = validatePassword(newPassword);
    const noErrors = Object.values(passwordErrors).every((error) => !error);
    if (isPasswordValid && noErrors) {
      setProceesSave(true);
    } else {
      setProceesSave(false);
    }
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,20}$/;
    const lengthValid = password.length >= 8 && password.length <= 20;
    const lowercaseValid = /[a-z]/.test(password);
    const uppercaseValid = /[A-Z]/.test(password);
    const specialCharValid = /[!@#$%^&*]/.test(password);
    const numberValid = /\d/.test(password);

    setPasswordErrors({
      length: !lengthValid,
      lowercase: !lowercaseValid,
      uppercase: !uppercaseValid,
      specialChar: !specialCharValid,
      number: !numberValid,
    });

    return (
      passwordRegex.test(password) &&
      lengthValid &&
      lowercaseValid &&
      uppercaseValid &&
      specialCharValid &&
      numberValid
    );
  };
  const totalcondition =
    passwordErrors.length ||
    passwordErrors.lowercase ||
    passwordErrors.number ||
    passwordErrors.specialChar ||
    passwordErrors.uppercase;

  const ErrorText = password && (
    <div>
      <ul>
        {totalcondition && <h6>Password requirement :</h6>}
        {passwordErrors.number && <li>Must contain at least one number</li>}
        {passwordErrors.specialChar && (
          <li>Must contain at least one special character</li>
        )}
        {passwordErrors.uppercase && (
          <li>Must contain at least one uppercase letter</li>
        )}
        {passwordErrors.lowercase && (
          <li>Must contain at least one lowercase letter</li>
        )}
        {passwordErrors.length && (
          <li>Password must be 8 to 20 characters long</li>
        )}
      </ul>
    </div>
  );
  const handleBack = () => {
    navigate("/dashboard");
  };

  return (
    <Page>
      <Navbar />
      <div className={styles.securitypage}>
        <div className={styles.securitypagesbox}>
          <span onClick={handleBack} className={styles.backbutton}>
            Back to Home
          </span>
          <div className={styles.main_grid_security}>
            <div className={styles.left}>
              <div className={styles.img_div}>
                <img
                  className={styles.main_img_security}
                  src={main_image}
                  alt="main"
                />
              </div>
            </div>
            <div className={styles.Securitydivider}></div>
            <div className={styles.right}>
              <CgPassword />
              <p className={styles.text_center}></p>
              <form>
                <div className={styles.form_div}>
                  <p className={styles.label}>
                    Old Password<span style={{ color: "#FF0202" }}>*</span>
                  </p>
                  <div className={stylesPassword.inputContainer}>
                    <input
                      className={` ${stylesPassword.input}`}
                      type={showoldpassword ? "text" : "password"}
                      name="cpassword"
                      placeholder="Please enter your password"
                      value={oldpassword}
                      onChange={(e) => setoldpassword(e.target.value)}
                      style={inputStyle}
                    />
                    <span
                      className={stylesPassword.togglePassword}
                      onClick={() => setShowoldpassword((prev) => !prev)}
                    >
                      {showoldpassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                  <p className={styles.label}>
                    Password<span style={{ color: "#FF0202" }}>*</span>
                  </p>

                  <div className={stylesPassword.inputContainer}>
                    <input
                      className={` ${stylesPassword.input}`}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Please enter your password"
                      value={password}
                      onChange={handlePassword}
                      style={inputStyle}
                    />
                    <span
                      className={stylesPassword.togglePassword}
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>

                  <p className={styles.label}>
                    Confirm Password<span style={{ color: "#FF0202" }}>*</span>
                  </p>
                  <div className={stylesPassword.inputContainer}>
                    <input
                      className={` ${stylesPassword.input}`}
                      type={showcpassword ? "text" : "password"}
                      name="cpassword"
                      placeholder="Please enter your password"
                      value={cpassword}
                      onChange={(e) => setcpassword(e.target.value)}
                      style={inputStyle}
                    />
                    <span
                      className={stylesPassword.togglePassword}
                      onClick={() => setShowcpassword((prev) => !prev)}
                    >
                      {showcpassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </span>
                  </div>
                  {strength === "Strong" && (
                    <Strong style={{ width: "100%", marginTop: "0.5rem" }} />
                  )}
                  {strength === "Initial" && (
                    <Initial
                      style={{
                        width: "100%",
                        marginBottom: "1rem",
                        marginTop: "0.5rem",
                      }}
                    />
                  )}
                  {strength === "Moderate" && (
                    <Moderate style={{ width: "100%", marginTop: "0.5rem" }} />
                  )}
                  {strength === "Weak" && (
                    <Weak style={{ width: "100%", marginTop: "0.5rem" }} />
                  )}
                  <button
                    onClick={handleSubmit}
                    className={styles.button}
                    style={{ marginTop: "0" }}
                  >
                    Sign Up
                  </button>
                </div>
              </form>
              {popup && (
                <div className={stylesPassword.popup_menu}>
                  {totalcondition && <div>{ErrorText}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
        {popuptext && <div>thankyou</div>}
      </div>
      <CopyrightBar />
    </Page>
  );
};

export default ChangePassword;
