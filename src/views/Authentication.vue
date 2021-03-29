<template>
  <div class="wrapper">
    <div class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
          >
            <div id="recaptcha-container"></div><br>
            <login-card header-color="green">
              <h4 slot="title" class="card-title">
                Account Authentication
              </h4>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>phone</md-icon>
                <label>Phone Number</label>
                <md-input
                  id="phoneNumber"
                  v-model="phoneNumber"
                  type="text"
                  required
                ></md-input>
              </md-field>

              <md-field class="md-form-group" slot="inputs">
                <md-icon>verified_user</md-icon>
                <label>Verification Code</label>
                <md-input
                  id="verificationCode"
                  v-model="verificationCode"
                  type="text"
                  required
                ></md-input>
              </md-field>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-on:click="sendCode"
              >
                Send Code
              </md-button>

              <md-button
                slot="footer"
                class="md-simple md-success md-lg"
                v-on:click="verifyCode"
              >
                Verify Code
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
      phoneNumber: null,
      verificationCode: null,
      appVerifier: ""
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/profile_city.jpg")
    }
  },
  methods: {
    sendCode: function() { 
      if (this.phoneNumber.length != 8) {
        alert("Invalid Phone Number Format!");
      } else {
        let countryCode = "+65"; //Singapore
        let phoneNumber = countryCode + this.phoneNumber;
        let appVerifier = this.appVerifier;

        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(confirmationResult => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            alert("SMS sent")
          })
          .catch(error => {
            alert("Error ! SMS not sent")
          });
      }
    },
    verifyCode: function() {
      if(this.phoneNumber.length != 8 || this.verificationCode.length != 6) {
        alert("Invalid Phone Number/OTP Format!");
      } else {
        let vm = this;
        let code = this.verificationCode;
        window.confirmationResult.confirm(code).then(result => {
          // User signed in successfully.
          var user = result.user;
          vm.$router.push({ path:"/createaccount" })
        }).catch(error => {
            // User couldn't sign in (bad verification code?)
            // ...
        });
      }
    },
    initReCaptcha: function() {
      setTimeout(() => {
        let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
          "size": "invisible",
          "callback": function(response) {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
            // ...
          },
          "expired-callback": function() {
            // Response expired. Ask user to solve reCAPTCHA again.
            // ...
          }
        });
        //
        this.appVerifier =  window.recaptchaVerifier
      }, 1000)
    }
  },
  created() {
    this.initReCaptcha();
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
