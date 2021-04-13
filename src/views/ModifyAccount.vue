<template>
  <div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                Modify your account
              </h2>
              <div
                class="md-layout-item md-medium-size-50 md-small-size-100 mx-auto"
              >
                <div class="info text-center" style="padding: 0px 0 30px">
                  <h4
                    class="info-title"
                    style="font-size: 20px; text-align: center"
                  >
                    Modify your profile picture
                  </h4>
                  <div class="icon icon-info text-center">
                    <img
                      v-bind:src="this.getImage"
                      @error="onImageLoadFailure()"
                      class="img-raised rounded img-fluid"
                      style="max-width: 35%"
                    />
                    <br /><br />
                    <input
                      class="text-center"
                      id="profilepic"
                      type="file"
                      v-on:change="onFileChange"
                    />
                  </div>
                </div>
              </div>
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
                      <label>Phone Number</label>
                      <md-input
                        v-model="phoneNumber"
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
                      <md-select multiple v-model="preferredLocation">
                        <md-option value="Central">Central</md-option>
                        <md-option value="East">East</md-option>
                        <md-option value="North">North</md-option>
                        <md-option value="South">South</md-option>
                        <md-option value="West">West</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Dietary Restriction(s)</label>
                      <md-select v-model="dietaryRestrictions" multiple>
                        <md-option value="Halal">Halal</md-option>
                        <md-option value="Vegetarian">Vegetarian</md-option>
                        <md-option value="Vegan">Vegan</md-option>
                        <md-option value="Dairy Allergy"
                          >Lactose Intolerance</md-option
                        >
                        <md-option value="Peanut Allergy"
                          >Peanut Allergies</md-option
                        >
                        <md-option value="Shellfish Allergy"
                          >Shellfish Allergies</md-option
                        >
                        <md-option value="Others">Others</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Top 3 Food Categories</label>
                      <md-select v-model="foodCategory" required multiple>
                        <md-option value="Bento Boxes">Bento Boxes</md-option>
                        <md-option value="Canned Food">Canned Food</md-option>
                        <md-option value="Dairy">Dairy</md-option>
                        <md-option value="Drinks">Drinks</md-option>
                        <md-option value="Proteins">Proteins</md-option>
                        <md-option value="Carbohydrates"
                          >Carbohydrates</md-option
                        >
                        <md-option value="Vegetables and Fruits"
                          >Vegetables/Fruits</md-option
                        >
                        <md-option value="Snacks">Snacks</md-option>
                        <md-option value="Others">Others</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field maxlength="5" style="padding: 5px 0">
                      <label>Reason to Donate</label>
                      <md-textarea
                        v-model="reasonDonate"
                        md-autogrow
                      ></md-textarea>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field maxlength="5" style="padding: 5px 0">
                      <label>Reason to Save</label>
                      <md-textarea
                        v-model="reasonSave"
                        md-autogrow
                      ></md-textarea>
                    </md-field>
                  </div>
                </div>
                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button
                      class="md-success"
                      v-on:click="checkRequiredFields"
                      >Save Changes</md-button
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
      default: require("@/assets/img/fruits4.jpg")
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
      profilePic: null,
      file: null,
      joinDate: new Date(),
      imgErr: false,
      unknown: require("@/assets/img/faces/unknown.jpg")
    };
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    },
    getImage() {
      if (this.imgErr) {
        return this.unknown;
      } else {
        return this.profilePic;
      }
    }
  },
  methods: {
    getUID: function() {
      this.UID = firebase.auth().currentUser.uid;
    },

    getUserData: function() {
      database
        .collection("users")
        .doc(this.UID)
        .get()
        .then(doc => {
          var data = doc.data();
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.phoneNumber = data.phoneNumber;
          this.telegramHandle = data.telegramHandle;
          this.dietaryRestrictions = data.dietaryRestrictions;
          this.foodCategory = data.foodCategory;
          this.reasonDonate = data.reasonDonate;
          this.reasonSave = data.reasonSave;
          this.preferredLocation = data.preferredLocation;
        });
    },

    getProfilePic: function() {
      var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
      storageRef.getDownloadURL().then(url => {
        this.profilePic = url;
      });
    },

    updateProfilePic: function() {
      if (this.file != null) {
        var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
        var uploadTask = storageRef.put(this.file);
      }
    },

    updateProfile: function() {
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
          reasonSave: this.reasonSave
        })
        .then(() => {
          this.updateProfilePic();
          this.pushToProfile();
        });
    },

    // when file changes, create image on site
    onFileChange: function(e) {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = ev => {
        this.imgErr = false;
        this.profilePic = ev.target.result;
      };
      reader.readAsDataURL(this.file);
    },

    pushToProfile() {
      let path = `/profile/${this.UID}`;
      this.$router.push({
        path: path
      });
    },
    onImageLoadFailure() {
      this.imgErr = true;
    },
    checkRequiredFields() {
      if (this.firstName == "") {
        alert("Please enter a first name for your account");
      } else if (this.lastName == "") {
        alert("Please enter a last name for your account");
      } else if (this.phoneNumber == "") {
        alert("Please enter a phone number for your account");
      } else if (this.foodCategory == "" || this.foodCategory.length < 3) {
        alert("Please enter your top 3 food categories");
      } else {
        this.updateProfile();
      }
    }
  },
  created() {
    this.getUID();
    this.getProfilePic();
    this.getUserData();
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
</style>
