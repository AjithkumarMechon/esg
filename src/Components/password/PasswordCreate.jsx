import React, { useState } from "react";
import { ReactComponent as Above } from "../../Components/signUp/icons/above.svg";
import { ReactComponent as Below } from "../../Components/signUp/icons/below.svg";
import { ReactComponent as Logo } from "../../Components/signUp/icons/logo.svg";
import { ReactComponent as PasswordLogo } from "../../Components/signUp/icons/setpasswordLogo.svg";
import { ReactComponent as Weak } from "../../Components/signUp/icons/weak.svg";
import { ReactComponent as Moderate } from "../../Components/signUp/icons/moderate.svg";
import { ReactComponent as Strong } from "../../Components/signUp/icons/strong.svg";
import { ReactComponent as Initial } from "../../Components/signUp/icons/initial.svg";
import styles from "../../styles/login.module.css";
import stylesPassword from "../../styles/password.module.css";
import { useNavigate } from "react-router-dom";
import main_image from "../../Components/signUp/images/main_image.png";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import usePasswordState from "./Template/passwordState";
import Cookies from "js-cookie";
const PasswordCreate = () => {
  const {
    password,
    setPassword,
    passwordErrors,
    setPasswordErrors,
    strength,
    setStrength,
  } = usePasswordState();
  const [cpassword, setcpassword] = useState("");
  const [inputStyle, setInputStyle] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showcpassword, setShowcpassword] = useState(false);
  const [proceedSave, setProceesSave] = useState(false);
  const [popup, setPopup] = useState(false);

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === cpassword && proceedSave) {
      fetch(`${process.env.REACT_APP_AUTH_URL}v1/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          X_REGISTRATION_ID: Cookies.get("esg_access_x_registrationId"),
        },
        body: JSON.stringify({
          requestId: Cookies.get("esg_access_email"),
          registrationId: Cookies.get("esg_access_x_registrationId"),
          isEnglish: true,
          isDetectLocation: true,
          password: password,
          confirmPassword: cpassword,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.statusCode === 201) {
            navigate("/login");
          } else if (data.statusCode === 409) {
            alert("Already having account");
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
          <PasswordLogo />
          <p className={styles.text_center}>
            Please create a secure password including the following criteria
            below
          </p>
          <form>
            <div className={styles.form_div}>
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
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
                  {showcpassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
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
  );
};

export default PasswordCreate;
