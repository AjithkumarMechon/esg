import React, { useState } from "react";
import { ReactComponent as Above } from "../../Components/signUp/icons/above.svg";
import { ReactComponent as Below } from "../../Components/signUp/icons/below.svg";
import { ReactComponent as Logo } from "../../Components/signUp/icons/logo.svg";
import { ReactComponent as ForgotLogo } from "../../Components/signUp/icons/forgotPassword.svg";
import styles from "../../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import main_image from "../../Components/signUp/images/main_image.png";
import Cookies from "js-cookie";
export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [inputStyle, setInputStyle] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    }
  }
  function handleOTP(e) {
    e.preventDefault();
    if (!email) {
      setInputStyle({ border: "0.0625rem solid #F91D0A" });
      alert("Please enter a valid email address");
      return;
    }
    fetch(`${process.env.REACT_APP_AUTH_URL}v1/users/password/forgot`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        let expiresAt = new Date(data.responseBody.expiresAt);
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);

        Cookies.set(
          "esg_access_x_registrationId",
          data.responseBody.registrationId,
          {
            expires: expiresAt,
          }
        );
        Cookies.set("esg_access_email", email, {
          expires: expiresAt,
        });
        if (data.statusCode === 200) {
          navigate("/otpForm");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error accordingly, e.g., show an error message to the user
      });
  }

  const handleSignin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

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
          <ForgotLogo />
          <p className={styles.forgot_subtitle}>
            Enter the Email associated with your account and we’ll send an email
            with OTP to reset your password
          </p>
          <form>
            <div className={styles.form_div}>
              <p className={styles.label}>
                Email<span style={{ color: "#FF0202" }}>*</span>
              </p>
              <input
                className={styles.input}
                type="email"
                name="email"
                placeholder="Please enter your email"
                value={email}
                onChange={handleChange}
                style={inputStyle}
              />

              <button onClick={handleOTP} className={styles.button}>
                OTP
              </button>
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
