import Vue from "vue";
import "./plugins/vuetify";
import vuetify from "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";

import Notifications from "vue-notification";
import { initializationUserAuthentication } from "./store/api/auth";

Vue.use(Notifications);
Vue.config.productionTip = false;

const initAuth = async () => {
  await initializationUserAuthentication();
  new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
  }).$mount("#app");
};

initAuth();
