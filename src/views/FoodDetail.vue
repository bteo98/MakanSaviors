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
                      <h4><strong>{{ data["foodName"] }}</strong></h4>
                      <small class="text-description">Donor Name:        </small>
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
                    <div class="text text-description">
                      <h4>Dietary Restrictions</h4>
                      <ul v-if="!processing" id="itemsList">
                          <li
                            class="md-layout"
                            v-for="(restriction, index) in data.dietaryRestrictions"
                            :key="index"
                          >
                            <div class="md-layout" style="padding-bottom: 10px;">
                              <badge
                                type="info status"
                                >{{ restriction }}</badge
                              >
                            </div>
                          </li>
                        </ul>
                    </div>
                  </div>
                  <md-button
                    class="md-success first-button"
                    style="font-size: 15px;"
                    v-if="isAvailable"
                    >Request</md-button
                  >
                  <md-button
                    class="md-success"
                    style="font-size: 15px;"
                    v-if="isAvailable"
                    >Save</md-button
                  >
                  <badge
                    type="rose first-button status"
                    v-if="!isAvailable"
                    >unavailable</badge
                  >
                </div>
              </div>
              <div class="details">
              <div class="subtitle">
                <h4>Details</h4>
              </div>
              <p class="text-description">
                {{ data.remarks }}
              </p>
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
import { Badge } from "@/components";

export default {
  bodyClass: "food-detail",
  data() {
    return {
      donorID: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2",
      foodID: "r8MTer5iLadyXtjMCjCX",
      data: {},
      isAvailable: false,
      processing: true,
      header: require("@/assets/img/city-profile.jpg"),
      user: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2"
    };
  },
  components: {
    Badge
  },
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
          this.isAvailable = doc.status == 'available' ? true : false;
          console.log(this.data);
        });
    },
    onResponsiveInverted() {
      if (window.innerWidth < 600) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },
  mounted() {
    var db = firebase.firestore();
    var storage = firebase.storage();

    this.onResponsiveInverted();
    this.fetchImgData(storage);
    this.fetchFoodData(db);
    this.fetchUserData(db);
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>

<style lang="scss" scoped>
.text-description {
  font-size: 17px;
}

img {
  display: inline-block;
  min-width: 200px;
  width: 25% !important;
  float: left;
  padding-top: 45px;
}

.text {
  display: inline-block;
  max-width: 70%;
  padding: 26px 0;
  padding-left: 80px;
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
  margin: 0 15px !important;
}

.first-button {
  margin-left: 80px !important;
}
</style>
