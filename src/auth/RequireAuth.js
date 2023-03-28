/**
 * @fileoverview This component is used to check if the user has the correct role to access the route
 * @param {string} allowedRole - The role that is allowed to access the route
 * @author Alina Dorosh
 */
import { useNavigate, Outlet } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
const RequireAuth = ({ allowedRole }) => {
  const navigate = useNavigate();
  const [allowAccess, setAllowAccess] = useState(false);
  const token = sessionStorage.getItem("accessToken");

  useEffect(() => {
    if (!token) navigate("/unauthorized", { replace: true });
    if (token) {
      const decoded = jwt_decode(token);
      const decodedRole = decoded?.UserInfo?.role;
      if (
        allowedRole === "both" &&
        (decodedRole === "candidate" || "employer")
      ) {
        setAllowAccess(true);
        return;
      }
      const allow = decodedRole === allowedRole;
      if (!allow) navigate("/unauthorized", { replace: true });
      setAllowAccess(allow);
    }
  }, []);

  return allowAccess && <Outlet />;
};

export default RequireAuth;
