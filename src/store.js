import Vuex from "vuex";
import Vue from "vue";

Vue.use(Vuex);

export default new Vuex.Store ({
    state: {
        isAuth: false
    },
    mutations: {
        change(state, auth) {
            console.log("AUTHENICATED");
            console.log(state.isAuth);
            state.isAuth = auth;
            console.log(state.isAuth);
        } 
    },
    getters: {
        isAuth: state => state.isAuth
    }
})