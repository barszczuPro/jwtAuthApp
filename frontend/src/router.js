import Vue from "vue";
import Router from "vue-router";
import auth from "./middleware/auth";
import noAuth from "./middleware/noAuth";

const Layout = () => import("./layout/default.vue");
const Login = () => import("./views/Login.vue");
const Dashboard = () => import("./views/account/Dashboard");
const Account = () => import("./views/account/Account");
const Users = () => import("./views/account/Users");

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      beforeEnter: noAuth
    },
    {
      path: "/app",
      component: Layout,
      beforeEnter: auth,
      children: [
        {
          path: "dashboard",
          name: "dashboard",
          component: Dashboard
        },
        {
          path: "account",
          name: "account",
          component: Account
        },
        {
          path: "users",
          name: "users",
          component: Users
        }
      ]
    }
  ]
});
