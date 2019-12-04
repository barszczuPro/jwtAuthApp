import Vue from 'vue'
import * as Auth from '../../api/auth'

export const constans = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_AUTH_USER: "SET_AUTH_USER",
  SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER:
    "SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER",
  SET_USERS_LIST: "SET_USERS_LIST"
};

export const mutations = {
  [constans.SET_AUTH_USER](state, tokens) {
    const decodeAccessToken = Auth.decodeJWT(tokens && tokens.accessToken);
    state.auth = {
      accessToken: tokens && tokens.accessToken || "",
      refreshToken: tokens && tokens.refreshToken || "",
      sub: decodeAccessToken && decodeAccessToken.sub || "",
      rol: decodeAccessToken && decodeAccessToken.rol || "",
      iat: decodeAccessToken && decodeAccessToken.iat || "",
      exp: decodeAccessToken && decodeAccessToken.exp || ""
    };
  },
  [constans.SET_AUTHENTICATED](state, isAuth) {
    state.isAuthorized = isAuth;
  },
  [constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER](state, payload) {
    state.tokenRefreshCounterId = payload;
  },
  [constans.SET_USERS_LIST](state, payload) {
    Vue.set(state.account, "users", payload.users);
  }
};

