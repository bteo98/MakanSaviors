<template>
  <div class="wrapper" style="height: 100vh;">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <login-card header-color="green">
              <h4 slot="title" class="card-title">
                Sign Up
              </h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>email</md-icon>
                <label>Email</label>
                <md-input
                  id="email"
                  v-model="email"
                  type="email"
                  required
                ></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock_outline</md-icon>
                <label>Password</label>
                <md-input
                  id="password"
                  v-model="password"
                  type="password"
                  required
                ></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>lock</md-icon>
                <label>Confirm Password</label>
                <md-input
                  id="confirmPassword"
                  v-model="confirmPassword"
                  type="password"
                  required
                ></md-input>
              </md-field>

              <p slot="description" class="description">
                Have an account? <a href="#/login">Log In</a>
              </p>

              <div slot="errors" class="errors" v-if="errors.length">
                <br />
                <p><b>Please correct the following error(s):</b></p>
                <ul>
                  <li :key="error.id" v-for="error in errors">{{ error }}</li>
                </ul>
              </div>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-on:click="signup"
              >
                Sign Up
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
import firebase from "firebase";

var database = firebase.firestore();
export default {
  components: {
    LoginCard
  },
  bodyClass: "login-page",
  data() {
    return {
      email: null,
      password: null,
      confirmPassword: null,
      errors: []
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/food4.jpg")
    }
  },
  methods: {
    signup: function(e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push("Email required.");
      }
      if (!this.password) {
        this.errors.push("Password required");
      }
      if (this.confirmPassword != this.password) {
        this.errors.push("Confirm password does not match");
      }
      if (!this.errors.length) {
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then(user => {
            try {
              return database
                .collection("users")
                .doc(user.user.uid)
                .set({
                  email: this.email
                });
            } catch (FirebaseAuthException) {
              this.errors.push(FirebaseAuthException);
            }
          })
          .then(() => {
            this.$router.push({
              name: "createaccount",
              params: { email: this.email, uniqueNo: this.password }
            });
          })
          .catch(error => {
            this.errors.push(error);
          });
      }
      e.preventDefault();
    }
  },
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
