import React, { useEffect, useRef, useState } from "react";
import { ReactComponent as Above } from "../../Components/signUp/icons/above.svg";

import { ReactComponent as Below } from "../../Components/signUp/icons/below.svg";
import { ReactComponent as Logo } from "../../Components/signUp/icons/logo.svg";
import { ReactComponent as OTP } from "../../Components/signUp/icons/OTP.svg";
import styles from "../../styles/login.module.css";
import stylesOtp from "../../styles/otp.module.css";
import { useNavigate } from "react-router-dom";
import main_image from "../../Components/signUp/images/main_image.png";
import Cookies from "js-cookie";
const OTPForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleOTP = (index, e) => {
    const value = e.target.value;
    const newInputs = [...otp];
    newInputs[index] = value;
    setOtp(newInputs);
    setSubmitDisabled(true);
    if (index < inputRefs.length - 1 && value !== "") {
      inputRefs[index + 1].current.focus();
    }
    // Check if OTP has been fully entered
    if (index === inputRefs.length - 1 && value !== "") {
      const fullOTP = newInputs.join("");
      if (fullOTP.length === 4) {
        setSubmitDisabled(false);
      }
    }
  };

  const [OtpTime, setOtpTime] = useState(30);
  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const handleSignin = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  function handleSubmit(e) {
    e.preventDefault();
    let otpValidate = Number(otp.join(""));
    fetch(`${process.env.REACT_APP_AUTH_URL}v1/auth/otp/validate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        X_REGISTRATION_ID: Cookies.get("esg_access_x_registrationId"),
      },
      body: JSON.stringify({
        requestId: Cookies.get("esg_access_email"),
        otp: otpValidate,
        applicationType: "string",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200 || data.statusCode === 201) {
          navigate("/passwordcreate");
        } else {
          alert("Please enter valid otp");
        }
      });
  }

  function handleResendOtp(e) {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_AUTH_URL}v1/auth/resend`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        X_REGISTRATION_ID: Cookies.get("esg_access_x_registrationId"),
      },
      body: JSON.stringify({
        requestId: Cookies.get("esg_access_email"),
        temporaryAccess: true,
        id: "string",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 201) {
          alert("OTP resend sucessfully");
          setOtpTime(30);
        }
      });
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setOtpTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [OtpTime]);
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
          <OTP />
          <p className={styles.text}>
            Create an account to start the journey with us
          </p>
          <form>
            <div className={styles.form_div}>
              <p style={{ fontSize: "0.7rem", marginLeft: "1rem" }}>
                OTP<span style={{ color: "red" }}>*</span>{" "}
              </p>
              {otp.map((input, index) => (
                <input
                  className={stylesOtp.otp_textbox}
                  key={index}
                  type="password"
                  maxLength="1"
                  value={input}
                  ref={inputRefs[index]}
                  onKeyDown={(e) => {
                    if (
                      !(
                        (e.key >= "0" && e.key <= "9") ||
                        e.key === "Backspace" ||
                        e.key === "Delete" ||
                        e.key === "ArrowLeft" ||
                        e.key === "ArrowRight"
                      )
                    ) {
                      e.preventDefault();
                    }
                  }}
                  onChange={(e) => handleOTP(index, e)}
                />
              ))}

              {OtpTime !== 0 ? (
                <p className={styles.text}>
                  Already have an account?{" "}
                  <span
                    className={styles.signup}
                    style={{ color: "#1900C0" }}
                    onClick={handleSignin}
                  >
                    00 : {formatTime(OtpTime)}
                  </span>
                </p>
              ) : (
                <button onClick={handleResendOtp} className={stylesOtp.button}>
                  Resend
                </button>
              )}
              {/* {submitDisabled && (
                <p style={{ color: "red" }}>Please enter OTP correctly</p>
              )} */}
              <button
                onClick={handleSubmit}
                className={styles.button}
                disabled={submitDisabled}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
