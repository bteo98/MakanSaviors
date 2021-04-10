<template>
  <div class="wrapper" style="min-width: 900px">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised" style="min-width: 800px">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="vertical-center header">
                <md-button
                  class="md-success md-top-left"
                  style="margin-top: 30px; margin-left: 25px;"
                  v-on:click="pushToCreateListing()"
                >
                  Create New Listing</md-button
                >
                <div
                  class="md-list md-top-right"
                  style="display: inline-block; float: right; margin-top: 0px;"
                >
                  <li class="md-list-item">
                    <a
                      href="javascript:void(0)"
                      class="md-list-item-router md-list-item-container md-button-clean dropdown"
                    >
                      <md-button
                        class="md-icon-button md-success"
                        v-on:click="filter(true)"
                      >
                        <i class="material-icons">swap_vert</i>
                      </md-button>

                    </a>
                  </li>
                </div>
              </div>
            </div>
          </div>

          <div class="progress-pagination">
            <div class="md-layout">
              <div
                class="md-layout-item md-size-15 md-xsmall-size-30 condition"
              >
                <header><strong>Filter By</strong></header>
                <br />
                <medium>Location</medium>
                <div class="flex-column">
                  <md-checkbox value="East" v-model="locationFilter"
                    >East</md-checkbox
                  ><span>
                    <md-checkbox value="North" v-model="locationFilter"
                      >North</md-checkbox
                    ></span
                  >
                  <md-checkbox value="South" v-model="locationFilter"
                    >South</md-checkbox
                  ><span>
                    <md-checkbox value="West" v-model="locationFilter"
                      >West</md-checkbox
                    ></span
                  >
                  <md-checkbox value="Central" v-model="locationFilter"
                    >Central</md-checkbox
                  >
                </div>
                <br />
                <medium>Food Preference</medium>
                <div class="flex-column">
                  <md-checkbox value="Halal" v-model="dietaryFilter"
                    >Halal</md-checkbox
                  >
                  <md-checkbox value="Vegan" v-model="dietaryFilter"
                    >Vegan</md-checkbox
                  >
                  <md-checkbox value="Vegetarian" v-model="dietaryFilter"
                    >Vegetarian</md-checkbox
                  >
                  <md-checkbox value="No Eggs" v-model="dietaryFilter"
                    >No Dairy</md-checkbox
                  >
                  <md-checkbox value="No Peanuts" v-model="dietaryFilter"
                    >No Peanuts</md-checkbox
                  >
                  <md-checkbox value="No Shellfish" v-model="dietaryFilter"
                    >No Shellfish</md-checkbox
                  >
                </div>
                <br />
                <md-button class="md-raised md-success" v-on:click="filter(false)"
                  >Filter</md-button
                >
              </div>
              <br />
              <div class="item-listing">
                <ul id="itemsList" v-if="!processing">
                  <li
                    class="md-layout explore-card"
                    v-for="item in collections"
                    :key="item.foodID"
                  >
                    <div class="md-layout" style="padding-right: 5px;">
                      <ExploreCard
                        class="md-layout-item requestcard"
                        :data="item"
                      ></ExploreCard>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import ExploreCard from "./components/ExploreCard";

export default {
  bodyClass: "explore-listing",
  data() {
    return {
      header: require("@/assets/img/city-profile.jpg"),
      processing: true,
      locationFilter: [],
      dietaryFilter: [],
      collections: [],
      order: "desc",
      desc: true
    };
  },
  components: {
    ExploreCard
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    fetchItems() {
      var db = firebase.firestore();

      db.collection("donationData")
        .where("status", "==", "available")
        .where("userID", "!=", "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2")
        .onSnapshot(snapshot => {
          this.processing = true;
          this.collections = [];
          console.log(this.collections);
          snapshot.forEach(doc => {
            this.processing = true;
            let data = {};

            data["foodID"] = doc.id;
            doc = doc.data();
            data["location"] = doc.collectionLocation;
            data["donorID"] = doc.userID;
            data["expiry"] = new Date(
              doc.expiry.toDate().toLocaleString("en-US")
            );
            data["listingName"] = doc.listingName;
            data["quantity"] = doc.quantity;
            this.collections.push(data);
          });
          console.log("initial");
          console.log(this.collections);
          this.processing = false;
        });
    },
    filter(reverse) {
      this.processing = true;
      var db = firebase.firestore();

      var collect = db
        .collection("donationData")
        .where("status", "==", "available")
        .where("userID", "!=", "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2");

      if (this.locationFilter.length != 0) {
        console.log(this.locationFilter);
        collect = collect.where(
          "collectionLocation",
          "array-contains-any",
          this.locationFilter
        );
      }
      if (this.dietaryFilter.length != 0) {
        console.log(this.dietaryFilter);
        collect = collect.where(
          "dietaryRestrictions",
          "array-contains-any",
          this.dietaryFilter
        );
      }
      if (reverse) {
        this.order = this.order == "desc" ? "asc" : "desc";
      }
      console.log(this.order);
      collect
        .orderBy("userID")
        .orderBy("expiry", this.order)
        .onSnapshot(snapshot => {
          this.collections = [];

          snapshot.forEach(doc => {
            let data = {};

            data["foodID"] = doc.id;
            doc = doc.data();
            data["location"] = doc.collectionLocation;
            data["donorID"] = doc.userID;
            data["expiry"] = new Date(
              doc.expiry.toDate().toLocaleString("en-US")
            );
            data["listingName"] = doc.listingName;
            data["quantity"] = doc.quantity;
            data["dietaryRestrictions"] = doc.dietaryRestrictions;
            this.collections.push(data);
          });
          console.log("filter");
          console.log(this.collections);
          this.processing = false;
        });
    },
    pushToCreateListing: function() {
      let path = `/createlisting`;
      this.$router.replace({
        path: path
      });
    }
  },
  mounted() {
    this.fetchItems();
  }
};
</script>

<style lang="scss" scoped>
.item-listing {
  max-width: 85%;
}

.condition {
  padding-left: 3%;
}

@media screen and (max-width: 1080px) {
  .explore-card {
    margin-left: 50px;
  }
}

ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}
li {
  flex-grow: 1;
  flex-basis: 300px;
  padding: 10px;
  margin: 10px;
}
</style>
