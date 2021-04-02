<template>
  <div class="wrapper" style="min-width: 780px;">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised" style="min-width: 720px;">
      <div class="section">
        <div class="container">
          <div>
            <div>
              <div class="title">
                <h3>Food Information</h3>
              </div>
              <div>
                <div class="md-layout md-small-size-100">
                  <div v-if="!processing">
                    <img
                      v-bind:src="data['imgRef']"
                      v-bind:alt="data['foodName']"
                      class="rounded md-layout-item"
                      :class="{
                        'responsive-image': responsive
                      }"
                    />
                    <div class="text md-layout-item text-description">
                      <h4>
                        <strong>{{ data["foodName"] }}</strong>
                      </h4>
                      <small class="text-description">Donor Name: </small>
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
                      {{ data["location"].join(", ") }}<br />
                      <small class="text-description">Donor Ratings:</small>
                      {{ data["rating"] }}<br />
                      <small class="text-description"
                        >Quantity Avaliable:</small
                      >
                      {{ data["quantity"] }}<br />
                      <small class="text-description">Expiry Date/Time:</small>
                      {{ data["expiry"].toString().slice(0, 21) }}<br />
                      <md-button
                        class="md-success first-button"
                        v-if="isAvailable && !expired"
                        >Request</md-button
                      >
                      <md-button
                        class="md-success"
                        v-if="isAvailable && !expired"
                        >Save</md-button
                      >
                      <badge type="rose first-button status" v-if="!isAvailable"
                        >unavailable</badge
                      >
                      <badge
                        type="rose first-button status"
                        v-if="isAvailable && expired"
                        >expired</badge
                      >
                    </div>
                    <div
                      class="text md-layout-item diet-restriction text-description"
                    >
                      <h4 style="font-size: 20px;">Dietary Restrictions</h4>
                      <ul
                        v-if="!processing"
                        class="md-layout"
                        id="restriction-list"
                      >
                        <li
                          class="md-layout md-layout-item"
                          v-for="(restriction,
                          index) in data.dietaryRestrictions"
                          :key="index"
                        >
                          <div
                            class="md-layout-item"
                            style="padding-bottom: 10px;"
                          >
                            <badge type="info restrict">{{
                              restriction
                            }}</badge>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="details">
                <div class="subtitle">
                  <h4 style="font-size: 25px;">Details</h4>
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
      expired: false,
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
          this.isAvailable = doc.status == "available" ? true : false;
          this.expired =
            new Date(doc.expiry.toDate().toLocaleString("en-US")) <= new Date();
        });
    },
    onResponsiveInverted() {
      if (window.innerWidth < 600) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    } /*,
    userProfile() {
      this.$router.push({
        name: "",
        params: { donorID: this.donorID }
      })
    },
    saveFood() {
    }*/
  },
  mounted() {
    var db = firebase.firestore();
    var storage = firebase.storage();

    this.onResponsiveInverted();
    this.fetchImgData(storage);
    var self = this;
    setTimeout(function() {
      self.fetchFoodData(db);
      self.fetchUserData(db);
    }, 500);
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
  float: left;
}

img {
  display: inline-block;
  min-width: 200px;
  width: 25% !important;
  float: left;
  padding-top: 25px;
}

small {
  padding-right: 10px;
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
  font-size: 15px;
}

.status {
  font-size: 15px;
  padding: 10px 12px;
  margin-top: 40px;
}

.restrict {
  font-size: 14px;
  padding: 8px 12px;
}

.md-success {
  margin-top: 40px;
  margin-right: 40px !important;
}

#restriction-list {
  padding-left: 0;
}

.diet-restriction {
  max-width: 340px;
}

.details {
  padding-top: 40px;
}
</style>
