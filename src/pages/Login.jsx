import React, { useEffect, useState } from "react";
import { ReactComponent as Above } from "./../Components/signUp/icons/above.svg";
import { ReactComponent as Below } from "./../Components/signUp/icons/below.svg";
import { ReactComponent as Logo } from "./../Components/signUp/icons/logo.svg";
import { ReactComponent as Signin } from "./../Components/signUp/icons/signin.svg";
import styles from "../styles/login.module.css";
import { useNavigate } from "react-router-dom";
import main_image from "../Components/signUp/images/main_image.png";
import Cookies from "js-cookie";
import { UpdateLastLogin } from "../Components/date_component/date_time_in_out";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputStyle, setInputStyle] = useState({});

  useEffect(() => {
    if (Cookies.get("esg_access_token") && Cookies.get("esg_primary_user")) {
      navigate("/dashboard");
      return;
    }
  }, [navigate]);

  function handleChange(e) {
    const { name, value } = e.target;

    if (name === "email") {
      setEmail(value);
    } else {
      setPassword(value);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(process.env.REACT_APP_AUTH_URL + "auth/authenticate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: email, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.statusCode === 200) {
          Cookies.set("esg_access_token", data.responseBody.accessToken, {
            expires: new Date(data.responseBody.expiresAt),
          });

          fetch(
            process.env.REACT_APP_API_URL + "api/v1/dropdown?type=PrimaryUser",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: data.responseBody.accessToken,
              },
            }
          )
            .then((res) => res.json())
            .then((d) => {
              if (d.statusCode === 200) {
                //console.log(d.responseBody.PrimaryUser[0].id);
                UpdateLastLogin();
                Cookies.set(
                  "esg_primary_user",
                  d.responseBody.PrimaryUser.map((item) => item.id)
                  // d.responseBody.PrimaryUser[0].id
                );
                navigate("/dashboard");
              } else {
                alert(data.message);
              }
            });
        } else {
          setInputStyle({ border: "0.0625rem solid #F91D0A" });
          alert(data.message);
        }
      });
  }
  function handleSignUp(e) {
    e.preventDefault();
    navigate("/createAccount");
  }
  const handleforgot = (e) => {
    e.preventDefault();
    navigate("/forgotPassword");
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
          <Signin />
          <p className={styles.text}>Welcome back, you've been missed!</p>
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
              <p className={styles.label}>
                Password<span style={{ color: "#FF0202" }}>*</span>
              </p>
              <input
                className={styles.input}
                type="password"
                name="password"
                placeholder="Please enter your password"
                value={password}
                onChange={handleChange}
                style={inputStyle}
              />
              <p
                onClick={handleforgot}
                className={styles.fp_text}
                style={{ cursor: "pointer" }}
              >
                Forgot password?
              </p>
              <button onClick={handleSubmit} className={styles.button}>
                Log in
              </button>
            </div>
            <p className={styles.text}>
              Don't have an account?{" "}
              <span
                onClick={handleSignUp}
                style={{ color: "#1900C0", cursor: "pointer" }}
              >
                Sign up
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
