/**
 * @fileoverview This file contains the functions that make the requests to the backend
 * to auth route:  login,register and refresh token
 * to forgotten password route: send email and reset password
 * to employer route: get employer profile
 * to candidate route: get candidate profile
 * @author Alina Dorosh
 */
import jwt_decode from "jwt-decode";
import {
  USERS_API,
  FORGOTTEN_PASSWORD_API,
  EMPLOYERS_API,
  CANDIDATES_API,
} from "../config/urls";

export default class ApiRequest {
  static async register(body) {
    try {
      const response = await fetch(`${USERS_API}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  static async login(body) {
    try {
      const response = await fetch(`${USERS_API}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  static async refresh(refreshToken) {
    try {
      const response = await fetch(`${USERS_API}/refresh`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": refreshToken,
        },
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  static async forgottenPassword(body) {
    try {
      const response = await fetch(`${FORGOTTEN_PASSWORD_API}/send-mail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      let data = await response.json();
      return data;
    } catch (err) {
      return err;
    }
  }

  static async resetPassword(body, token) {
    try {
      const response = await fetch(
        `${FORGOTTEN_PASSWORD_API}/reset-password/${token}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getEmployerProfile(token) {
    const decoded = jwt_decode(token);
    const decodedId = decoded?.UserInfo?.id;
    try {
      const response = await fetch(`${EMPLOYERS_API}/${decodedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }

  static async getCandidateProfile(token) {
    const decoded = jwt_decode(token);
    const decodedId = decoded?.UserInfo?.id;
    try {
      const response = await fetch(`${CANDIDATES_API}/${decodedId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      let data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  }
}
