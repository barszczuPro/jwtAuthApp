import * as Axios from "axios";
import * as Auth from "./auth";
import store from "../store";

const apiHost = "http://localhost:4200";

export const authenticationHeader = () => {
  return {
    Authorization: `Bearer ${Auth.getAccessToken()}`
  };
};

export const api = Axios.create({
  baseURL: apiHost,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json"
  }
});

api.interceptors.response.use(
  response => response,
  async error => {
    const { status } = error.response;
    if (status === 401) {
      await store.dispatch("auth/logoutUser", null, { root: true });
    }
    return Promise.reject(error);
  }
);
