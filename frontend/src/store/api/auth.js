import { api, authenticationHeader } from "./apiHost";

import jwtDecode from "jwt-decode";

import {
  isValid,
  toDate,
  isBefore,
  differenceInMilliseconds,
  fromUnixTime
} from "date-fns";
import store from "../store";

export const getAccessToken = () => localStorage.getItem("accessToken");
export const getRefreshToken = () => localStorage.getItem("refreshToken");

export function setLocalStorageTokens(tokens) {
  if (tokens.accessToken)
    localStorage.setItem("accessToken", tokens.accessToken);
  if (tokens.refreshToken)
    localStorage.setItem("refreshToken", tokens.refreshToken);
}

export function removeLocalStorageTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function decodeJWT(token) {
  return token && jwtDecode(token);
}

export function getTimeDiff(exp) {
  if (!exp) return false;
  return differenceInMilliseconds(fromUnixTime(Number(exp)), new Date());
}

export function checkTokenValidity(token) {
  try {
    if (!token) {
      return false;
    }
    let expToken = decodeJWT(token).exp;
    const expMoment = toDate(expToken * 1000);
    if (isValid(expMoment)) {
      return isBefore(new Date(), expMoment);
    }
    return true;
  } catch (e) {
    return false;
  }
}

export function isValidAccessToken() {
  return checkTokenValidity(getAccessToken());
}

export async function initializationUserAuthentication() {
  if (checkTokenValidity(getAccessToken())) {
    const data = {
      accessToken: getAccessToken(),
      refreshToken: getRefreshToken()
    };
    return await store.dispatch("auth/authorize", data);
  } else {
    if (checkTokenValidity(getRefreshToken())) {
      return await store
        .dispatch("auth/refreshToken")
        .then(() => {
          return Promise.resolve();
        })
        .catch(e => {
          return Promise.reject(e);
        });
    }
  }
}

// ENDPOINTS
export async function loginInTheApplication(login, password) {
  return await api.post(`/login`, { email: login, password: password });
}

export async function refreshToken(refreshToken) {
  return await api.post(`/refresh`, { refreshToken: `Bearer ${refreshToken}` });
}

export async function registerUsers(data) {
  return await api.post(`/register`, data, { headers: authenticationHeader() });
}

export async function getUsersList() {
  return await api.get(`/users`, { headers: authenticationHeader() });
}
