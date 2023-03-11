import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { account } from "../appwrite";

const getVerified = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const secret = urlParams.get("secret");
  if (userId != null && secret != null) {
    await account.updateVerification(userId, secret);
  }
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.authReducer);
  getVerified();
  return user && user.id != null ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
