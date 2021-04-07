<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Let us know you better!</h1>
            <h4>
              You are just a step away from creating your MakanSaviour account.
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="features text-center">
            <h1 class="info-title">Welcome to MakanSaviour!</h1>
            <div class="md-layout">
              <div class="md-layout-item md-medium-size-33 md-small-size-100">
                <div class="info">
                  <h2 class="info-title">
                    Add a profile picture
                  </h2>
                  <div class="icon icon-info">
                    <img
                      :src="profile"
                      alt="Rounded Image"
                      class="img-raised rounded img-fluid"
                    />
                    <br /><br />
                    <input
                      id="profilepic"
                      type="file"
                      v-on:change="onFileChange"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                Personal Information
              </h2>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>First Name</label>
                      <md-input
                        v-model="firstName"
                        type="text"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Last Name</label>
                      <md-input
                        v-model="lastName"
                        type="text"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Telegram Handle</label>
                      <md-input v-model="telegramHandle" type="text"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Preferred Location</label>
                      <select class="dropdown" v-model="preferredLocation">
                        <option value="Central">Central</option>
                        <option value="East">East</option>
                        <option value="North">North</option>
                        <option value="South">South</option>
                        <option value="West">West</option>
                      </select>
                    </md-field>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div id="recaptcha-container"></div>
      <br />

      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                Account Verification
              </h2>
              <p class="text-center">
                In order to protect the security of your account, please add
                your phone number. We will send you a text message with a
                verification code.
              </p>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Phone Number</label>
                      <md-input
                        v-model="phoneNumber"
                        type="number"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Verification Code</label>
                      <md-input
                        v-model="verificationCode"
                        type="text"
                        required
                      ></md-input>
                    </md-field>
                  </div>
                </div>

                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" v-on:click="sendCode"
                      >Send Verification Code</md-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div class="section section-contacts">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                Additional Information
              </h2>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Dietary Restriction(s)</label>
                      <select class="dropdown" v-model="dietaryRestrictions">
                        <option value="None">None</option>
                        <option value="Diabetic">Diabetic</option>
                        <option value="Gluten Free">Gluten Free</option>
                        <option value="Halal">Halal</option>
                        <option value="Kosher">Kosher</option>
                        <option value="Lactose Intolerance"
                          >Lactose Intolerance</option
                        >
                        <option value="Peanut Allergy">Peanut Allergies</option>
                        <option value="Vegetarian">Vegetarian</option>
                        <option value="Others">Others</option>
                      </select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Top 3 Food Categories</label>
                      <select class="dropdown" v-model="foodCategory">
                        <option value="Baking Needs">Baking Needs</option>
                        <option value="Biscuits">Biscuits</option>
                        <option value="Buffet/Bento Boxes"
                          >Buffet/Bento Boxes</option
                        >
                        <option value="Canned Food">Canned Food</option>
                        <option value="Dairy, Chilled, Eggs"
                          >Dairy, Chilled, Eggs</option
                        >
                        <option value="Drinks">Drinks</option>
                        <option value="Frozen Food">Frozen Food</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Meat, Seafood">Meat, Seafood</option>
                        <option value="Rice, Noodles">Rice, Noodles</option>
                        <option value="Seasonings">Seasonings</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Others">Others</option>
                      </select>
                    </md-field>
                  </div>
                </div>

                <md-field maxlength="5">
                  <label>Reason to Donate</label>
                  <md-textarea v-model="reasonDonate" md-autogrow></md-textarea>
                </md-field>

                <md-field maxlength="5">
                  <label>Reason to Save</label>
                  <md-textarea v-model="reasonSave" md-autogrow></md-textarea>
                </md-field>

                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" v-on:click="verifyCode"
                      >Create Account</md-button
                    >
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
var database = firebase.firestore();

export default {
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    }
  },
  data() {
    return {
      UID: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      telegramHandle: null,
      preferredLocation: null,
      dietaryRestrictions: null,
      foodCategory: null,
      reasonDonate: null,
      reasonSave: null,
      profile: require("@/assets/img/faces/unknown.jpg"),
      file: null,
      verificationCode: null,
      appVerifier: "",
      totalRatings: 0,
      numRatings: 0,
      joinDate: new Date()
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    getUID: function() {
      this.UID = firebase.auth().currentUser.uid;
      console.log(this.UID);
    },
    // when file changes, create image on site
    onFileChange: function(e) {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = ev => {
        this.profile = ev.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    // when create account button pressed, push profile pic to firebase storage
    pushProfilePic: function() {
      var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
      var uploadTask = storageRef.put(this.file);
    },
    createIDCollection: function() {
      database
        .collection("donationIDs")
        .doc(this.UID)
        .set({
          imageIDs: []
        });
    },
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
            alert("SMS sent");
          })
          .catch(error => {
            alert("Error ! SMS not sent");
          });
      }
    },
    verifyCode: function() {
      if (this.phoneNumber.length != 8 || this.verificationCode.length != 6) {
        alert("Invalid Phone Number/OTP Format!");
      } else {
        let vm = this;
        let code = this.verificationCode;
        window.confirmationResult
          .confirm(code)
          .then(result => {
            // User signed in successfully.
            var user = result.user;
            user.delete();
            firebase
              .auth()
              .signInWithEmailAndPassword(
                this.$route.params.email,
                this.$route.params.uniqueNo
              );
            database
              .collection("users")
              .doc(this.UID)
              .update({
                firstName: this.firstName,
                lastName: this.lastName,
                phoneNumber: this.phoneNumber,
                telegramHandle: this.telegramHandle,
                preferredLocation: this.preferredLocation,
                dietaryRestrictions: this.dietaryRestrictions,
                foodCategory: this.foodCategory,
                reasonDonate: this.reasonDonate,
                reasonSave: this.reasonSave,
                totalRatings: this.totalRatings,
                numRatings: this.numRatings,
                joinDate: this.joinDate
              })
              .then(() => {
                this.createIDCollection();
                this.pushProfilePic();
                this.$router.push("/");
              });
          })
          .catch(error => {
            alert("Wrong verification code!");
          });
      }
    },
    initReCaptcha: function() {
      setTimeout(() => {
        let vm = this;
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
          "recaptcha-container",
          {
            size: "invisible",
            callback: function(response) {
              // reCAPTCHA solved, allow signInWithPhoneNumber.
              // ...
            },
            "expired-callback": function() {
              // Response expired. Ask user to solve reCAPTCHA again.
              // ...
            }
          }
        );
        //
        this.appVerifier = window.recaptchaVerifier;
      }, 1000);
    }
  },
  created() {
    this.getUID();
    this.initReCaptcha();
  }
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
  display: flex;
  justify-content: center !important;
}

.contact-form {
  margin-top: 30px;
}

.md-has-textarea + .md-layout {
  margin-top: 15px;
}

.md-select {
  .md-option {
    font-size: 10px;
  }
}

.dropdown {
  display: block;
  font-size: 14px;
  font-family: sans-serif;
  color: #444;
  line-height: 1.5;
  padding: 0.6em 1.4em 0.5em 1.2em;
  width: 100%;
  max-width: 100%; /* useful when width is set to anything other than 100% */
  box-sizing: border-box;
  margin: 0;
  border: 0px solid #aaa;
  box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: #fff;
}
</style>
