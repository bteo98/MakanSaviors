<template>
  <div class="wrapper" style="height: 100vh;">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">Login</h4>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email...</label>
                <md-input v-model="email" type="email"></md-input>
              </md-field>
              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password...</label>
                <md-input type="password" v-model="password"></md-input>
              </md-field>

              <p slot="description" class="description">
                New to MakanSaviors?
                <a href="#/signup">Sign Up</a>
              </p>

              <div slot="errors" class="errors" v-if="errors.length">
                <br />
                <p>
                  <b>Please correct the following error(s):</b>
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
                v-on:click="forgetPassword"
              >
                Forget Password
              </md-button>
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
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      username: null,
      email: null,
      password: null,
      errors: []
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/food5.jpg")
    }
  },
  methods: {
    forgetPassword() {
      this.$router.push("/resetpassword");
    },
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
          .then(user => {
            this.$store.commit("change");
            let path = `/profile/${firebase.auth().currentUser.uid}`;
            this.$router.push({
              path: path
            });
          })
          .catch(error => {
            this.errors.push(error);
          });
      }
    }
  },
  created: function() {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css"></style>
