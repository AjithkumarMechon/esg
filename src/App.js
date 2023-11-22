import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import GenerateScore from "./pages/GenerateScore";
import RatingModel from "./pages/RatingModel";
import ClientListing from "./pages/ClientListing";
import Login from "./pages/Login";
import ESGInformation from "./pages/EsgInformation";
import { useState } from "react";
import SignUp from "./Components/signUp/SignUp";
import OTPForm from "./Components/password/OtpForm";
import RoleCreate from "./Components/signUp/RoleCreate";
import PasswordCreate from "./Components/password/PasswordCreate";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./Components/password/Forgot";
import ChangePassword from "./Components/password/change";

function App() {
  const [forceUpdate, setForceUpdate] = useState(0);

  function useForceUpdate() {
    setForceUpdate(forceUpdate + 1);
  }

  window.forceUpdate = forceUpdate;
  window.useForceUpdate = useForceUpdate;

  return (
    <>
      <BrowserRouter basename="/esg">
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/createAccount" element={<RoleCreate />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otpForm" element={<OTPForm />} />
          <Route path="/passwordcreate" element={<PasswordCreate />} />
          <Route path="/clientListing" element={<ClientListing />} />
          <Route path="/esgInformation" element={<ESGInformation />} />
          <Route path="/esgModel" element={<RatingModel />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/forgotPassword" element={<ForgotPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/generateScore" element={<GenerateScore />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
