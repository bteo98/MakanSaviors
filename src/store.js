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
      firebase.auth().onAuthStateChanged(function(user) {
        state.user = user;
      });
    }
  },
  getters: {
    isAuth(state) {
      firebase.auth().onAuthStateChanged(function(user) {
        state.user = user;
      });

      return state.user == null ? false : true;
    },
    user(state) {
      firebase.auth().onAuthStateChanged(function(user) {
        state.user = user;
      });

      return state.user;
    }
  }
});

export default store;
