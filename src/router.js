import Vue from "vue";
import Router from "vue-router";
import firebase from "firebase";
import Index from "./views/Index.vue";
import Landing from "./views/Landing.vue";
import Login from "./views/Login.vue";
import SignUp from "./views/SignUp.vue";
import Profile from "./views/Profile.vue";
import ResetPassword from "./views/ResetPassword.vue";
import MainNavbar from "./layout/MainNavbar.vue";
import MainFooter from "./layout/MainFooter.vue";
import ExploreListing from "./views/ExploreListing.vue";
import RequestListing from "./views/RequestListing.vue";
import CreateAccount from "./views/CreateAccount.vue";
import CreateListing from "./views/CreateListing.vue";
import FoodDetail from "./views/FoodDetail.vue";

import RequestCard from "./views/components/RequestCard.vue";
import ExploreCard from "./views/components/ExploreCard.vue";

Vue.use(Router);

let router = new Router({
  routes: [
    {
      path: "/noticard",
      name: "noticard",
      components: {
        default: RequestCard,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/index",
      name: "index",
      components: {
        default: Index,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/",
      name: "landing",
      components: {
        default: Landing,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 5 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/login",
      name: "login",
      components: {
        default: Login,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/resetpassword",
      name: "resetpassword",
      components: {
        default: ResetPassword,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/signup",
      name: "signup",
      components: {
        default: SignUp,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/createaccount",
      name: "createaccount",
      components: {
        default: CreateAccount,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/profile",
      name: "profile",
      components: {
        default: Profile,
        header: MainNavbar,
        footer: MainFooter
      },
      meta: {
        authRequired: true
      },
      props: {
        header: { colorOnScroll: 200 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/createlisting",
      name: "createlisting",
      components: {
        default: CreateListing,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 }
      }
    },
    {
      path: "/card",
      name: "card",
      components: {
        default: ExploreCard,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 400 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/explorelisting",
      name: "explorelisting",
      components: {
        default: ExploreListing,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 5 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/requestlisting",
      name: "requestlisting",
      components: {
        default: RequestListing,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 5 },
        footer: { backgroundColor: "black" }
      }
    },
    {
      path: "/fooddetail",
      name: "fooddetail",
      components: {
        default: FoodDetail,
        header: MainNavbar,
        footer: MainFooter
      },
      props: {
        header: { colorOnScroll: 5 },
        footer: { backgroundColor: "black" }
      }
    }
  ],
  scrollBehavior: to => {
    if (to.hash) {
      return { selector: to.hash };
    } else {
      return { x: 0, y: 0 };
    }
  }
});

// Navigation Guard
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      console.log(firebase.auth().currentUser);
      next();
    } else {
      alert("You must be logged in to see this page");
      next({
        path: "/landing"
      });
    }
  } else {
    next();
  }
});

export default router;
