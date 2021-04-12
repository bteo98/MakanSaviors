<template>
  <div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
              <h2 class="text-center title">
                Modify Your Listing
              </h2>
              <div
                class="md-layout-item md-medium-size-33 md-small-size-100 mx-auto"
              >
                <div class="info text-center" style="padding: 0px 0 30px">
                  <h4
                    class="info-title"
                    style="font-size: 20px; text-align: center"
                  >
                    Add an image for your listing!
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
                      id="listingpic"
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
                      <md-select
                        class="dropdown"
                        v-model="collectionLocation"
                        multiple
                        required
                      >
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
                      <md-select v-model="dietaryRestrictions" multiple>
                        <md-option value="Halal">Halal</md-option>
                        <md-option value="Vegetarian">Vegetarian</md-option>
                        <md-option value="Vegan">Vegan</md-option>
                        <md-option value="Contains Dairy"
                          >Contains Dairy</md-option
                        >
                        <md-option value="Contains Peanuts"
                          >Contains Peanuts</md-option
                        >
                        <md-option value="Contains Shellfish"
                          >Contains Shellfish</md-option
                        >
                        <md-option value="Others">Others</md-option>
                      </md-select>
                    </md-field>
                  </div>

                  <div class="md-layout-item md-size-50">
                    <md-field>
                      <label>Food Category</label>
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
                </div>

                <md-field maxlength="5">
                  <label>Remarks</label>
                  <md-textarea v-model="remarks" md-autogrow></md-textarea>
                </md-field>

                <div class="md-layout">
                  <div class="md-layout-item md-size-33 mx-auto text-center">
                    <md-button class="md-success" v-on:click="updateListing"
                      >Update Listing</md-button
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
    },
    listingID: { type: String }
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
      foodCategory: null,
      remarks: null,
      file: null,
      listingPic: null,
      imgErr: false,
      unknown: require("@/assets/img/unknown.jpg")
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
        return this.listingPic;
      }
    }
  },
  methods: {
    getListingDetails() {
      database
        .collection("donationData")
        .doc(this.listingID)
        .get()
        .then(doc => {
          var data = doc.data();
          this.listingName = data.listingName;
          this.quantity = data.quantity;
          this.expiry = data.expiry;
          this.collectionLocation = data.collectionLocation;
          this.phoneNumber = data.phoneNumber;
          this.telegramHandle = data.telegramHandle;
          this.dietaryRestrictions = data.dietaryRestrictions;
          this.foodCategory = data.foodCategory;
          this.remarks = data.remarks;
          this.UID = data.userID;
          this.getDate();
          this.getListingPic();
        });
    },

    getListingPic: function() {
      var storageRef = firebase
        .storage()
        .ref(this.UID + "/donationImages/" + this.listingID);
      storageRef.getDownloadURL().then(url => {
        this.listingPic = url;
      });
    },

    updateListingPic: function() {
      if (this.file != null) {
        var storageRef = firebase
          .storage()
          .ref(this.UID + "/donationImages/" + this.listingID);
        var uploadTask = storageRef.put(this.file);
      }
    },

    updateListing() {
      if (this.checkExpiry(this.expiry)) {
        alert("Your food has expired, please key in a valid expiry date.");
      }
      database
        .collection("donationData")
        .doc(this.listingID)
        .update({
          listingName: this.listingName,
          quantity: this.quantity,
          expiry: this.expiry,
          collectionLocation: this.collectionLocation,
          phoneNumber: this.phoneNumber,
          telegramHandle: this.telegramHandle,
          dietaryRestrictions: this.dietaryRestrictions,
          remarks: this.remarks
        })
        .then(() => {
          this.updateListingPic();
          this.pushToProfile();
        });
    },
    pushToProfile() {
      let path = `/profile/${this.UID}`;
      this.$router.push({
        path: path
      });
    },
    // when file changes, create image on site
    onFileChange: function(e) {
      this.file = e.target.files[0];
      var reader = new FileReader();
      reader.onload = ev => {
        this.listingPic = ev.target.result;
      };
      reader.readAsDataURL(this.file);
    },
    getDate: function() {
      var milliseconds = this.expiry.seconds * 1000;
      var dateObj = new Date(milliseconds);
      this.expiry = dateObj.toISOString().slice(0, 16);
    },

    checkExpiry: function(expiryDate) {
      var today = new Date();
      var yy = parseInt(expiryDate.slice(0, 4));
      var mm = parseInt(expiryDate.slice(5, 7)) - 1;
      var dd = parseInt(expiryDate.slice(8, 10));
      var hh = parseInt(expiryDate.slice(11, 13));
      var min = parseInt(expiryDate.slice(14, 16));
      var expiry = new Date(yy, mm, dd, hh, min);
      this.expiry = expiry;
      return expiry < today;
    },
    onImageLoadFailure() {
      this.imgErr = true;
    }
  },
  created() {
    this.getListingDetails();
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
