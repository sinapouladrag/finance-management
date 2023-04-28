import React from "react";
import { useSelector } from "react-redux";

function AuthRoute({ children }) {
  const { userInfo } = useSelector((state) => state?.users?.userAuth);
  if (!userInfo?.token) {
    window.location.href = "/login";
  }
  return <div>{children}</div>;
}

export default AuthRoute;
