<template>
  <div class="wrapper">
    <parallax class="section page-header header-filter" :style="headerStyle">
      <div class="container">
        <div class="md-layout">
          <div
            class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100"
          >
            <h1 class="title">Create a New Listing</h1>
            <h4>
              Give your food a new life.
            </h4>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                New Listing
              </h2>
              <form class="contact-form">
                <div class="md-layout">
                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Listing Name</label>
                      <md-input
                        v-model="listingName"
                        type="text"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Quantity Available</label>
                      <md-input
                        v-model="quantity"
                        type="text"
                        required
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Expiry Date & Time</label>
                      <md-input
                        v-model="expiry"
                        type="text"
                        required=""
                        onfocus="this.type='datetime-local'"
                        onblur="if(this.value==='')this.type='text'"
                      ></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Collection Location</label>
                      <md-select v-model="collectionLocation" multiple required>
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
                      <label>Telegram Handle</label>
                      <md-input v-model="telegramHandle" type="text"></md-input>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Dietary Restriction(s)</label>
                      <md-select
                        v-model="dietaryRestrictions"
                        required
                        multiple
                      >
                        <md-option value="None">None</md-option>
                        <md-option value="Diabetic">Diabetic</md-option>
                        <md-option value="Gluten Free">Gluten Free</md-option>
                        <md-option value="Halal">Halal</md-option>
                        <md-option value="Kosher">Kosher</md-option>
                        <md-option value="Lactose Intolerance"
                          >Lactose Intolerance</md-option
                        >
                        <md-option value="Peanut Allergy"
                          >Peanut Allergies</md-option
                        >
                        <md-option value="Vegetarian">Vegetarian</md-option>
                        <md-option value="Others">Others</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <br />
                    <input
                      id="listingImage"
                      type="file"
                      v-on:change="onFileChange"
                    />
                  </div>
                </div>

                <md-field maxlength="5">
                  <label>Remarks</label>
                  <md-textarea v-model="remarks" md-autogrow></md-textarea>
                </md-field>

                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" v-on:click="createListing"
                      >Create Listing</md-button
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
      listingName: null,
      quantity: null,
      expiry: null,
      collectionLocation: null,
      phoneNumber: null,
      telegramHandle: null,
      dietaryRestrictions: null,
      remarks: null,
      profile: null,
      file: null,
      listing: {},
      allListings: null
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
    },
    getAllListings: function() {
      database
        .collection("users")
        .doc(this.UID)
        .get()
        .then(doc => {
          this.allListings = doc.data().allListings;
        });
    },
    createListing: function() {
      this.listing["Name"] = this.listingName;
      this.listing["Quantity"] = this.quantity;
      this.listing["Expiry"] = this.expiry;
      this.listing["CollectionLocation"] = this.collectionLocation;
      this.listing["PhoneNumber"] = this.phoneNumber;
      this.listing["TelegramHandle"] = this.telegramHandle;
      this.listing["DietaryRestriction"] = this.dietaryRestrictions;

      this.allListings.push(this.listing);

      database
        .collection("users")
        .doc(this.UID)
        .update({
          allListings: this.allListings
        })
        .then(() => {
          this.pushListingImage();
          this.$router.push("/landing");
        });
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

    // when create listing button pressed, push listing image to firebase storage
    pushListingImage: function() {
      var storageRef = firebase
        .storage()
        .ref(this.UID + "/listingImages/" + this.listingName);
      var uploadTask = storageRef.put(this.file);
    }
  },
  created() {
    this.getUID();
    this.getAllListings();
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
o
