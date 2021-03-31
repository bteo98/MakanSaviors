import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Toaster from "v-toaster";
import "v-toaster/dist/v-toaster.css";

import MaterialKit from "./plugins/material-kit";

Vue.config.productionTip = false;

Vue.use(MaterialKit);

Vue.use(Toaster, { timeout: 4000 });

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
