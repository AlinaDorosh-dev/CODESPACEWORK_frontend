/**
 * @fileoverview This file contains the useRedirect custom hook for redirecting user after succesfull login.
 * @author Alina Dorosh
 */

import { useNavigate } from "react-router";
import { useState } from "react";
import jwt_decode from "jwt-decode";
import ApiRequest from "../services/apiRequest";

const useRedirect = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const redirect = async (token) => {
    const decoded = jwt_decode(token);
    const decodedRole = decoded?.UserInfo?.role;
    const decodedId = decoded?.UserInfo?.id;
    if (!decodedRole || !decodedId) return navigate(`/`);

    if (decodedRole === "employer") {
      try {
        setLoading(true);

        //Check if employer has a profile
        const res = await ApiRequest.getEmployerProfile(token);
        setLoading(false);

        //If employer has no profile, redirect to form for create profile
        if (!res.data.companyName) {
          navigate(`/employers-dashboard/profile/${decodedId}`);
        }
        //If employer has a profile, redirect to dashboard
        if (res.data.companyName) {
          navigate(`/employers-dashboard`);
        }
      } catch (error) {
        setError(error);
      }
    } else if (decodedRole === "candidate") {
      try {
        setLoading(true);

        //Check if candidate has a profile
        const res = await ApiRequest.getCandidateProfile(token);

        setLoading(false);

        //If candidate has no profile, redirect to form for create profile
        console.log(res.data);
        if (!res.data.fullName) {
          navigate(`/candidates-dashboard/profile/${decodedId}`);
        }

        //If candidate has a profile, redirect to dashboard
        console.log(res.data.fullName);
        if (res.data.fullName) {
          navigate(`/candidates-dashboard`);
        }
      } catch (error) {
        setError(error.message);
      }
    } else {
      setError("Role not found");
      navigate(`/`);
    }
  };
  return [redirect, error, loading];
};

export default useRedirect;
