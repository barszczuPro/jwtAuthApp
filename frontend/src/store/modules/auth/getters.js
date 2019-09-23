export default {
  authorizationToken: state => state.isAuthorized,
  expire: state => state.authUser && state.authUser.exp,
  usersList: state => state.account && state.account.users
};
