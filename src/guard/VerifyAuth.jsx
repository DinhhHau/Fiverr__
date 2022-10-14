import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, getStore } from "../util/setting";

const VerifyAuth = ({ children }) => {
  const isSignined = getStore(ACCESS_TOKEN);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignined) {
      // toastService.showToast("warning", "Invalid token", "Please login !");
      alert("Please login !");
      navigate("/login");
    }
  }, [isSignined]);

  return <>{children}</>;
};

export default VerifyAuth;
