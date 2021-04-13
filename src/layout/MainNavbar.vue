<template>
  <md-toolbar
    id="toolbar"
    md-elevation="0"
    class="md-transparent md-absolute"
    :class="extraNavClasses"
    :color-on-scroll="colorOnScroll"
  >
    <div class="md-toolbar-row md-collapse-lateral">
      <div class="md-toolbar-section-start">
        <md-list-item href="#/" target="_self">
          <h3 class="md-title">MakanSaviors</h3>
        </md-list-item>
      </div>
      <div class="md-toolbar-section-end">
        <md-button
          class="md-just-icon md-simple md-toolbar-toggle"
          :class="{ toggled: toggledClass }"
          @click="toggleNavbarMobile()"
        >
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
          <span class="icon-bar"></span>
        </md-button>

        <div class="md-collapse">
          <div class="md-collapse-wrapper">
            <mobile-menu nav-mobile-section-start="false">
              <!-- Here you can add your items from the section-start of your toolbar -->
            </mobile-menu>
            <md-list>
              <md-list-item
                v-if="this.$store.getters.isAuth"
                v-on:click="pushToProfile"
              >
                <i
                  class="material-icons"
                  id="mod-profile-icon"
                  style="font-size:20px"
                  >account_circle</i
                >
                <p id="mod-profile-word">PROFILE</p>
              </md-list-item>
              <md-list-item
                v-on:click="pushToLogin"
                v-if="!this.$store.getters.isAuth"
              >
                <i
                  class="material-icons"
                  id="mod-profile-icon"
                  style="font-size:20px"
                  >login</i
                >
                <p id="mod-profile-word">LOGIN</p>
              </md-list-item>
              <md-list-item
                v-on:click="pushToSignUp"
                v-if="!this.$store.getters.isAuth"
              >
                <p id="mod-profile-word">SIGN UP</p>
              </md-list-item>
              <md-list-item
                v-on:click="pushToExplore"
                v-if="this.$store.getters.isAuth"
              >
                <i
                  class="material-icons"
                  id="mod-profile-icon"
                  style="font-size:20px"
                  >explore</i
                >
                <p id="mod-profile-word">EXPLORE LISTINGS</p>
              </md-list-item>
              <md-list-item
                v-on:click="pushToRequest"
                v-if="this.$store.getters.isAuth"
              >
                <i
                  class="material-icons"
                  id="mod-profile-icon"
                  style="font-size:20px"
                  >shopping_bag</i
                >
                <p id="mod-profile-word">REQUESTS</p>
              </md-list-item>
              <md-list-item
                v-if="this.$store.getters.isAuth"
                v-on:click="logout"
              >
                <i
                  class="material-icons"
                  id="mod-profile-icon"
                  style="font-size:20px"
                  >logout</i
                >
                <p id="mod-profile-word">LOGOUT</p>
              </md-list-item>
            </md-list>
          </div>
        </div>
      </div>
    </div>
  </md-toolbar>
</template>

<script>
let resizeTimeout;
function resizeThrottler(actualResizeHandler) {
  // ignore resize events as long as an actualResizeHandler execution is in the queue
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      resizeTimeout = null;
      actualResizeHandler();

      // The actualResizeHandler will execute at a rate of 15fps
    }, 66);
  }
}

import MobileMenu from "@/layout/MobileMenu";
import firebase from "../firebase";

export default {
  components: {
    MobileMenu
  },
  props: {
    type: {
      type: String,
      default: "white",
      validator(value) {
        return [
          "white",
          "default",
          "primary",
          "danger",
          "success",
          "warning",
          "info"
        ].includes(value);
      }
    },
    colorOnScroll: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      extraNavClasses: "",
      toggledClass: false
    };
  },
  computed: {
    showDownload() {
      const excludedRoutes = ["login", "landing", "profile"];
      return excludedRoutes.every(r => r !== this.$route.name);
    }
  },
  methods: {
    bodyClick() {
      let bodyClick = document.getElementById("bodyClick");

      if (bodyClick === null) {
        let body = document.querySelector("body");
        let elem = document.createElement("div");
        elem.setAttribute("id", "bodyClick");
        body.appendChild(elem);

        let bodyClick = document.getElementById("bodyClick");
        bodyClick.addEventListener("click", this.toggleNavbarMobile);
      } else {
        bodyClick.remove();
      }
    },
    toggleNavbarMobile() {
      this.NavbarStore.showNavbar = !this.NavbarStore.showNavbar;
      this.toggledClass = !this.toggledClass;
      this.bodyClick();
    },
    handleScroll() {
      let scrollValue =
        document.body.scrollTop || document.documentElement.scrollTop;
      let navbarColor = document.getElementById("toolbar");
      this.currentScrollValue = scrollValue;
      if (this.colorOnScroll > 0 && scrollValue > this.colorOnScroll) {
        this.extraNavClasses = `md-${this.type}`;
        navbarColor.classList.remove("md-transparent");
      } else {
        if (this.extraNavClasses) {
          this.extraNavClasses = "";
          navbarColor.classList.add("md-transparent");
        }
      }
    },
    scrollListener() {
      resizeThrottler(this.handleScroll);
    },
    scrollToElement() {
      let element_id = document.getElementById("downloadSection");
      if (element_id) {
        element_id.scrollIntoView({ block: "end", behavior: "smooth" });
      }
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$store.commit("change", false);
          this.$router.push({ path: "/" });
        });
    },
    notify() {
      if (this.$store.getters.isAuth) {
        var db = firebase.firestore();
        this.donorNotify(db);
        this.saviorNotify(db);
      }
    },
    donorNotify(db) {
      let donorCollect =
        "donorRequest/" + this.$store.getters.user.uid + "/foodDonated";

      db.collection(donorCollect)
        .where("status", "==", "pending")
        .orderBy("timeRequested", "desc")
        .limit(3)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let data = change.doc.data();

            if (change.type === "added") {
              db.collection("users")
                .doc(data.saviorID)
                .get()
                .then(doc => {
                  doc = doc.data();

                  let msg =
                    doc.firstName +
                    " has requested for your " +
                    data.listingName;

                  this.$toaster.info(msg);
                });
            }
          });
        });
    },
    saviorNotify(db) {
      let saviorCollect =
        "donorRequest/" + this.$store.getters.user.uid + "/foodRequested";

      db.collection(saviorCollect)
        .orderBy("timeRequested", "desc")
        .limit(3)
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
            let data = change.doc.data();

            if (change.type === "modified") {
              db.collection("users")
                .doc(data.donorID)
                .get()
                .then(doc => {
                  doc = doc.data();

                  let msg =
                    doc.firstName +
                    " has " +
                    data.status +
                    " your request for " +
                    data.listingName;

                  if (data.status === "accepted") {
                    this.$toaster.success(msg);
                  } else if (data.status === "declined") {
                    this.$toaster.warning(msg);
                  }
                });
            }
          });
        });
    },
    pushToProfile() {
      let path = `/profile/${this.$store.getters.user.uid}`;
      this.$router.push({
        path: path
      });
    },
    pushToExplore() {
      let path = `/explorelisting/${this.$store.getters.user.uid}`;
      this.$router.push({
        path: path
      });
    },
    pushToRequest() {
      let path = `/requestlisting/${this.$store.getters.user.uid}`;
      this.$router.push({
        path: path
      });
    },
    pushToLogin() {
      let path = `/login`;
      this.$router.push({
        path: path
      });
    },
    pushToSignUp() {
      let path = `/signup`;
      this.$router.push({
        path: path
      });
    }
  },
  mounted() {
    document.addEventListener("scroll", this.scrollListener);
    var self = this;
    setTimeout(function() {
      self.notify();
    }, 4000);
  },
  beforeDestroy() {
    document.removeEventListener("scroll", this.scrollListener);
  }
};
</script>

<style scoped>
#mod-profile-word {
  font-size: 12px;
  margin: 0px 0px 0px 5px;
}

#mod-profile-icon {
  font-size: 20px;
}
</style>
