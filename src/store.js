import Vuex from "vuex";
import Vue from "vue";
import firebase from "./firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    user: null
  },
  mutations: {
    change(state) {
      console.log("AUTHENICATED");
      console.log(state.user);
      firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        state.user = user;
      });
      console.log(state.user);
    }
  },
  getters: {
    isAuth(state) {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log(user);
        state.user = user;
      });

      return state.user == null ? false : true;
    },
    user: state => state.user
  }
});

export default store;
