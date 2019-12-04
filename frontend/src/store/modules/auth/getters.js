export default {
  authorizationToken: state => state.isAuthorized,
  expire: state => state.auth && state.auth.exp,
  usersList: state => state.account && state.account.users
};
