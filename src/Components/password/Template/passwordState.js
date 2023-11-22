// PasswordState.js
import { useState } from "react";

const usePasswordState = () => {
  const [password, setPassword] = useState("");
  const [passwordErrors, setPasswordErrors] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    specialChar: false,
    number: false,
  });
  const [strength, setStrength] = useState("Initial");

  return {
    password,
    setPassword,
    passwordErrors,
    setPasswordErrors,
    strength,
    setStrength,
  };
};

export default usePasswordState;
