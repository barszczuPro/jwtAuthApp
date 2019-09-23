import Vue from "vue";
import * as Auth from "../../api/auth";

export const constans = {
  SET_AUTHENTICATED: "SET_AUTHENTICATED",
  SET_AUTH_USER: "SET_AUTH_USER",
  SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER:
    "SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER",
  SET_USERS_LIST: "SET_USERS_LIST"
};

export const mutations = {
  [constans.SET_AUTH_USER](state, tokens) {
    let dataUser = {
      accessToken: "",
      refreshToken: "",
      sub: "",
      rol: "",
      iat: "",
      exp: ""
    };
    const decodeAccessToken = Auth.decodeJWT(tokens && tokens.accessToken);
    if (decodeAccessToken) {
      dataUser = {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        sub: decodeAccessToken.sub,
        rol: decodeAccessToken.rol,
        iat: decodeAccessToken.iat,
        exp: decodeAccessToken.exp
      };
    }
    state.authUser = dataUser;
  },
  [constans.SET_AUTHENTICATED](state, isAuth) {
    state.isAuthorized = isAuth;
  },
  [constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER](state, payload) {
    state.remainingTokenTime = payload;
  },
  [constans.SET_USERS_LIST](state, payload) {
    Vue.set(state.account, "users", payload.users);
  }
};
