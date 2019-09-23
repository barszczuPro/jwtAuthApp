import Vue from "vue";
import Vuetify from "vuetify/lib";
import "vuetify/src/styles/main.sass";
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify, {
  iconfont: "md"
});

export default new Vuetify({
  theme: {
    dark: true,
    themes: {
      dark: {
        primary: "#2196F3"
      }
    }
  },
  options: {
    customProperties: true
  },
  icons: {
    iconfont: "md" // default is 'mdi'
  }
});
