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
                <md-list-item href="#/landing" target="_self">
                    <h3 class="md-title">MakanSaviour</h3>
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
                            <li class="md-list-item" v-if="!showDownload">
                                <a
                                    href="javascript:void(0)"
                                    class="md-list-item-router md-list-item-container md-button-clean dropdown"
                                >
                                    <div class="md-list-item-content">
                                        <drop-down direction="down">
                                            <md-button
                                                slot="title"
                                                class="md-button md-button-link md-white md-simple dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                <i class="material-icons"
                                                    >apps</i
                                                >
                                                <p>Components</p>
                                            </md-button>
                                            <ul
                                                class="dropdown-menu dropdown-with-icons"
                                            >
                                                <li>
                                                    <a href="#/">
                                                        <i
                                                            class="material-icons"
                                                            >layers</i
                                                        >
                                                        <p>All Components</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a
                                                        href="https://demos.creative-tim.com/vue-material-kit/documentation/"
                                                    >
                                                        <i
                                                            class="material-icons"
                                                            >content_paste</i
                                                        >
                                                        <p>Documentation</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </drop-down>
                                    </div>
                                </a>
                            </li>

                            <md-list-item
                                href="https://demos.creative-tim.com/vue-material-kit/documentation/"
                                target="_self"
                                v-if="showDownload"
                            >
                                <i class="material-icons">content_paste</i>
                                <p>Documentation</p>
                            </md-list-item>

                            <md-list-item
                                href="javascript:void(0)"
                                @click="scrollToElement()"
                                v-if="showDownload"
                            >
                                <i class="material-icons">cloud_download</i>
                                <p>Download</p>
                            </md-list-item>

                            <li class="md-list-item" v-else>
                                <a
                                    href="javascript:void(0)"
                                    class="md-list-item-router md-list-item-container md-button-clean dropdown"
                                >
                                    <div class="md-list-item-content">
                                        <drop-down direction="down">
                                            <md-button
                                                slot="title"
                                                class="md-button md-button-link md-white md-simple dropdown-toggle"
                                                data-toggle="dropdown"
                                            >
                                                <i class="material-icons"
                                                    >view_carousel</i
                                                >
                                                <p>Examples</p>
                                            </md-button>
                                            <ul
                                                class="dropdown-menu dropdown-with-icons"
                                            >
                                                <li>
                                                    <a href="#/landing">
                                                        <i
                                                            class="material-icons"
                                                            >view_day</i
                                                        >
                                                        <p>Landing Page</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#/login">
                                                        <i
                                                            class="material-icons"
                                                            >fingerprint</i
                                                        >
                                                        <p>Login Page</p>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="#/profile">
                                                        <i
                                                            class="material-icons"
                                                            >account_circle</i
                                                        >
                                                        <p>Profile Page</p>
                                                    </a>
                                                </li>
                                            </ul>
                                        </drop-down>
                                    </div>
                                </a>
                            </li>

                            <md-list-item
                                href="#/profile"
                                target="_self"
                                v-if="this.$store.getters.isAuth"
                            >
                                <i class="material-icons">account_circle</i>
                                <p>Profile</p>
                            </md-list-item>
                            <md-list-item
                                href="#/login"
                                target="_self"
                                v-if="!this.$store.getters.isAuth"
                            >
                                <i class="material-icons">login</i>
                                <p>Login</p>
                            </md-list-item>
                            <md-list-item
                                href="#/signup"
                                target="_self"
                                v-if="!this.$store.getters.isAuth"
                            >
                                <i class="material-icons">signup</i>
                                <p>Sign Up</p>
                            </md-list-item>
                            <md-list-item
                                href="#/landing"
                                target="_self"
                                v-if="this.$store.getters.isAuth"
                                v-on:click="logout"
                            >
                                <i class="material-icons">logout</i>
                                <p>Logout</p>
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
        MobileMenu,
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
                    "info",
                ].includes(value);
            },
        },
        colorOnScroll: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            extraNavClasses: "",
            toggledClass: false,
        };
    },
    computed: {
        showDownload() {
            const excludedRoutes = ["login", "landing", "profile"];
            return excludedRoutes.every((r) => r !== this.$route.name);
        },
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
                    console.log("Sign Out Successfully");
                })
                .catch((error) => {
                    console.log("ERROR Signing Out");
                });
        },
        notify() {
            setTimeout(() => {
                if (this.$store.getters.isAuth) {
                    var db = firebase.firestore();
                    let collect =
                        "donorRequest/" +
                        this.$store.getters.user.uid +
                        "/foodDonated";
                    
                    db.collection(collect)
                        .onSnapshot((snapshot) => {
                            snapshot.docChanges().forEach((change) => {
                                console.log(change.type);
                                if (change.type === "added") {
                                  let data = change.doc.data();
                                  let saviorName = db.collection('users')
                                                        .doc(data.saviorID)
                                                        .get()
                                                        .firstName;
                                  console.log(saviorName);
                                  let msg = saviorName + " has requested for your donation of " + data.foodName;
                                  console.log(msg);
                                  his.$toaster.success(msg);
                                }
                            });
                        });
                }
            }, 2000);
        },
    },
    mounted() {
        document.addEventListener("scroll", this.scrollListener);
        this.notify();
    },
    beforeDestroy() {
        document.removeEventListener("scroll", this.scrollListener);
    },
};
</script>
