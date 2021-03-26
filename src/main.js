import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

Vue.config.productionTip = false;

const NavbarStore = {
  showNavbar: false
};

Vue.mixin({
  data() {
    return {
      NavbarStore
    };
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount("#app");
