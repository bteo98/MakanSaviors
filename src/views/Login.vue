<template>
    <div class="wrapper">
        <div class="section page-header header-filter" :style="headerStyle">
            <div class="container">
                <div class="md-layout">
                    <div
                        class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
                    >
                        <login-card header-color="green">
                            <h4 slot="title" class="card-title">Login</h4>
                            <md-button
                                slot="buttons"
                                class="md-just-icon md-simple md-white"
                                v-on:click="facebookLogin"
                            >
                                <i class="fab fa-facebook"></i>
                            </md-button>
                            <md-button
                                slot="buttons"
                                class="md-just-icon md-simple md-white"
                            >
                                <i class="fab fa-google"></i>
                            </md-button>
                            <md-field class="md-form-group" slot="inputs">
                                <md-icon>email</md-icon>
                                <label>Email...</label>
                                <md-input
                                    v-model="email"
                                    type="email"
                                ></md-input>
                            </md-field>
                            <md-field class="md-form-group" slot="inputs">
                                <md-icon>lock_outline</md-icon>
                                <label>Password...</label>
                                <md-input
                                    type="password"
                                    v-model="password"
                                ></md-input>
                            </md-field>
                            <div
                                slot="errors"
                                class="errors"
                                v-if="errors.length"
                            >
                                <br />
                                <p>
                                    <b
                                        >Please correct the following
                                        error(s):</b
                                    >
                                </p>
                                <ul>
                                    <li :key="error.id" v-for="error in errors">
                                        {{ error }}
                                    </li>
                                </ul>
                            </div>
                            <md-button
                                slot="footer"
                                class="md-simple md-success md-lg"
                                v-on:click="login"
                            >
                                Login
                            </md-button>
                        </login-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { LoginCard } from "@/components";
import { isMobile } from "mobile-device-detect";
import firebase from "../firebase.js";

export default {
    components: {
        LoginCard,
    },
    bodyClass: "login-page",
    data() {
        return {
            username: null,
            email: null,
            password: null,
            errors: [],
        };
    },
    props: {
        header: {
            type: String,
            default: require("@/assets/img/profile_city.jpg"),
        },
    },
    methods: {
        login() {
            this.errors = [];
            if (!this.email) {
                this.errors.push("Email required");
            }
            if (!this.password) {
                this.errors.push("Password required");
            }
            if (!this.errors.length) {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(this.email, this.password)
                    .then((user) => {
                        this.$router.push("/ProfilePage");
                    })
                    .catch((error) => {
                        this.errors.push(error);
                    });
            }
        },
        facebookLogin() {
            var provider = new firebase.auth.FacebookAuthProvider();

            if (isMobile) {
                firebase.auth().signInWithRedirect(provider);
            } else {
                this.facebookSignInPopup(provider);
            }
        },
        facebookSignInPopup(provider) {
            // [START auth_facebook_signin_popup]
            firebase
                .auth()
                .signInWithPopup(provider)
                .then((result) => {
                    /** @type {firebase.auth.OAuthCredential} */
                    var credential = result.credential;

                    // The signed-in user info.
                    var user = result.user;

                    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                    var accessToken = credential.accessToken;
                    console.log("Pop up");
                    console.log(user);
                    // ...
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;

                    // ...
                });
            // [END auth_facebook_signin_popup]
        },
        facebookSignInRedirectResult() {
            // [START auth_facebook_signin_redirect_result]
            firebase
                .auth()
                .getRedirectResult()
                .then((result) => {
                    if (result.credential) {
                        /** @type {firebase.auth.OAuthCredential} */
                        var credential = result.credential;

                        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
                        var token = credential.accessToken;
                        // ...
                        console.log("Redirect Result");
                        console.log(result);
                    }
                    // The signed-in user info.
                    var user = result.user;
                })
                .catch((error) => {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // The email of the user's account used.
                    var email = error.email;
                    // The firebase.auth.AuthCredential type that was used.
                    var credential = error.credential;
                    // ...
                });
            // [END auth_facebook_signin_redirect_result]
        },
    },
    created: function() {
        this.facebookSignInRedirectResult();
    },
    computed: {
        headerStyle() {
            return {
                backgroundImage: `url(${this.header})`,
            };
        },
    },
};
</script>

<style lang="css"></style>
