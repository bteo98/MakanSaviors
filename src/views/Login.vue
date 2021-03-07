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
                                href="javascript:void(0)"
                                class="md-just-icon md-simple md-white"
                            >
                                <i class="fab fa-facebook"></i>
                            </md-button>
                            <md-button
                                slot="buttons"
                                href="javascript:void(0)"
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
                                    <md-input v-model="password"></md-input>
                                </md-field>
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
import firebase from "../firebase.js";

export default {
    components: {
        LoginCard,
    },
    bodyClass: "login-page",
    data() {
        return {
            email: null,
            password: null,
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
            firebase
                .auth()
                .signInWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    alert("Successfully logged in");
                    this.$router.push("/dashboard");
                })
                .catch((error) => {
                    alert(error.message);
                });
        },
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
