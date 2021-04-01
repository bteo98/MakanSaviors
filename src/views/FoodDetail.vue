<template>
  <div class="wrapper" style="min-width: 780px;">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised" style="min-width: 720px;">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="title">
                <h3>Food Information</h3>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100">
                  <div v-if="!processing">
                    <img
                      v-bind:src="data['imgRef']"
                      v-bind:alt="data['foodName']"
                      class="rounded"
                      :class="{
                        'responsive-image': responsive
                      }"
                    />
                    <div class="text text-description">
                      <small class="text-description">Food Description:</small>
                      {{ data["foodName"] }}<br />
                      <small class="text-description">Donor Name:</small>
                      {{
                        data["firstName"].charAt(0).toUpperCase() +
                          data["firstName"].slice(1).toLowerCase() +
                          " " +
                          data["lastName"].charAt(0).toUpperCase() +
                          data["lastName"].slice(1).toLowerCase()
                      }}<br />
                      <small class="text-description"
                        >Collection Locaction:</small
                      >
                      {{ data["location"] }}<br />
                      <small class="text-description">Donor Ratings:</small>
                      {{ data["rating"] }}<br />
                      <small class="text-description"
                        >Quantity Avaliable:</small
                      >
                      {{ data["quantity"] }}<br />
                      <small class="text-description">Expiry Date/Time:</small>
                      {{ data["expiry"].toString().slice(0, 21) }}<br />
                    </div>
                  </div>
                  <md-button
                    class="md-success first-button"
                    v-on:click="accept"
                    v-if="data.status == 'pending' && requestView == false"
                    >Accept</md-button
                  >
                  <md-button
                    class="md-success"
                    v-on:click="decline"
                    v-if="data.status == 'pending' && requestView == false"
                    >Decline</md-button
                  >
                  <badge
                    type="success first-button status"
                    v-if="data.status == 'accepted'"
                    >Accepted</badge
                  >
                  <badge
                    type="warning first-button status"
                    v-if="data.status == 'pending' && requestView == true"
                    >Pending</badge
                  >
                  <badge
                    type="rose first-button status"
                    v-if="data.status == 'declined'"
                    >Declined</badge
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /><br /><br />
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";

export default {
  bodyClass: "food-detail",
  data() {
    return {
      donorID: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2",
      foodID: "r8MTer5iLadyXtjMCjCX",
      data: {},
      processing: true,
      header: require("@/assets/img/city-profile.jpg"),
      user: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2"
    };
  },
  components: {},
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    fetchImgData(storage) {
      var storage = firebase.storage();
      let imgPath = storage.ref(
        this.donorID + "/donationImages/" + this.foodID
      );

      imgPath.getDownloadURL().then(url => {
        this.data.imgRef = url;
      });
    },
    fetchUserData(db) {
      db.collection("users")
        .doc(this.donorID)
        .get()
        .then(items => {
          let item = items.data();

          this.data["firstName"] = item["firstName"];
          this.data["lastName"] = item["lastName"];
          this.data["rating"] = item["totalRatings"];
          console.log(this.data);
          this.processing = false;
        });
    },
    fetchFoodData: function(db) {
      db.collection("donationData")
        .doc(this.foodID)
        .onSnapshot(doc => {
          doc = doc.data();
          this.data["foodName"] = doc.listingName;
          this.data["status"] = doc.status;
          this.data["expiry"] = new Date(
            doc.expiry.toDate().toLocaleString("en-US")
          );
          this.data["donorID"] = doc.donorID;
          this.data["quantity"] = doc.quantity;
          this.data["location"] = doc.collectionLocation; // array
          this.data["dietaryRestrictions"] = doc.dietaryRestrictions; // array
          this.data["remarks"] = doc.remarks;
        });
    }
  },
  mounted() {
    var db = firebase.firestore();
    var storage = firebase.storage();

    this.fetchFoodData(db);
    this.fetchImgData(storage);
    this.fetchUserData(db);
  }
};
</script>

<style lang="scss" scoped>
.text-description {
  font-size: 15px;
}

img {
  display: inline-block;
  min-width: 200px;
  width: 20% !important;
  float: left;
  padding-top: 45px;
}

.text {
  display: inline-block;
  max-width: 70%;
  padding: 26px 0;
  padding-left: 30px;
}

#explore-card {
  max-width: 500px !important;
  min-width: 450px !important;
}

.status {
  font-size: small;
  padding: 8px 10px;
}

.md-success {
  margin: 0 5px !important;
}

.first-button {
  margin-left: 125px !important;
}
</style>
