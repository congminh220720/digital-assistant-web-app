import React from "react";
import { Navigate } from "react-router-dom";
import { getUserToken } from "../../utils/localData";

const auth = false;

function ProtectedRouter({ children }) {
  const isToken = getUserToken();

  return isToken ? children : <Navigate to="/Login" />;
}

export default ProtectedRouter;
