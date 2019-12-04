import * as Auth from "../../api/auth";
import { constans } from "./mutations";
import router from "./../../../router";
import { getAccessToken } from "../../api/auth";

export const getNewRefreshToken = ({ dispatch }) =>
  new Promise(resolve => {
    return Auth.refreshToken(Auth.getRefreshToken()).then(async response => {
      await dispatch("authorize", response.data);
      return resolve();
    });
  });

export const refreshToken = async ({ commit, dispatch, state }) => {
  await dispatch("clearTimeoutToken");
  const renewalTimeBuffer = 2000;
  const timeDiff = Auth.getTimeDiff(
    state && state.auth && state.auth.exp
  );
  let timeoutCount =
    renewalTimeBuffer < timeDiff ? timeDiff - renewalTimeBuffer : timeDiff;
  if (timeoutCount) {
    const renewalTimeout = setTimeout(() => {
      dispatch("getNewRefreshToken");
    }, timeoutCount);
    commit(constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER, renewalTimeout);
  } else {
    await dispatch("getNewRefreshToken");
  }
};

export const authenticationUser = async ({ dispatch }, { email, password }) => {
  return Auth.loginInTheApplication(email, password).then(async success => {
    await dispatch("authorize", success.data);
  });
};

export const authorize = async ({ commit, dispatch }, tokens) => {
  const accessTokenValid = Auth.checkTokenValidity(tokens && tokens.accessToken)
  commit(constans.SET_AUTHENTICATED, accessTokenValid);
  if(accessTokenValid) {
    commit(constans.SET_AUTH_USER, tokens);
    await Auth.setLocalStorageTokens(tokens);
  }
  return dispatch("refreshToken");
};

export const clearTimeoutToken = ({ commit, state }) => {
  clearTimeout(state.tokenRefreshCounterId);
  commit(constans.SET_ID_REPRESENTING_TOKEN_REFRESH_COUNTER, null);
};

export const logoutUser = async ({ commit, dispatch }) => {
  await dispatch("clearTimeoutToken");
  Auth.removeLocalStorageTokens();
  commit(constans.SET_AUTH_USER, null);
  commit(constans.SET_AUTHENTICATED, false);
  router.push({ name: "login" });
};

export const registerUser = async (ctx, data) => {
  return Auth.registerUsers(data)
    .then(() => {
      return Promise.resolve();
    })
    .catch(err => Promise.reject(err));
};

export const fetchUsersList = async ({ commit }) => {
  return Auth.getUsersList()
    .then(success => {
      commit(constans.SET_USERS_LIST, success.data);
      return Promise.resolve(success.data);
    })
    .catch(err => Promise.reject(err));
};
