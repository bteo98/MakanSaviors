import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Profile from "./views/Profile.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import CreateAccount from "./views/CreateAccount.vue";

Vue.use(Router);

let router = new Router({
    routes: [
        {
            path: "/",
            name: "index",
            components: {
                default: Index,
                header: MainNavbar,
                footer: MainFooter,
            },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" },
            },
        },
        {
            path: "/landing",
            name: "landing",
            components: {
                default: Landing,
                header: MainNavbar,
                footer: MainFooter,
            },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" },
            },
        },
        {
            path: "/login",
            name: "login",
            components: {
                default: Login,
                header: MainNavbar,
                footer: MainFooter,
            },
            props: {
                header: { colorOnScroll: 400 },
            },
        },
        {
            path: "/signup",
            name: "signup",
            components: {
                default: SignUp,
                header: MainNavbar,
                footer: MainFooter,
            },
            props: {
                header: { colorOnScroll: 400 },
            },
        },
        {
            path: "/createaccount",
            name: "createaccount",
            components: {
                default: CreateAccount,
                header: MainNavbar,
                footer: MainFooter,
            },
            props: {
                header: { colorOnScroll: 400 },
            },
        },
        {
            path: "/profile",
            name: "profile",
            components: {
                default: Profile,
                header: MainNavbar,
                footer: MainFooter,
            },
            meta: {
                authRequired: true,
            },
            props: {
                header: { colorOnScroll: 400 },
                footer: { backgroundColor: "black" },
            },
        },
    ],
    scrollBehavior: (to) => {
        if (to.hash) {
            return { selector: to.hash };
        } else {
            return { x: 0, y: 0 };
        }
    },
});

// Navigation Guard
router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.authRequired)) {
        if (firebase.auth().currentUser) {
            console.log(firebase.auth().currentUser);
            next();
        } else {
            alert("You must be logged in to see this page");
            next({
                path: "/landing",
            });
        }
    } else {
        next();
    }
});

export default router;
