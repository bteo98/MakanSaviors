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
                      <div class="md-list-item-content">
                        <drop-down direction="down">
                          <md-button
                            slot="title"
                            class="md-button md-button-link md-simple dropdown-toggle"
                            data-toggle="dropdown"
                          >
                            <i class="material-icons">sort</i>
                            <p>Sort By</p>
                          </md-button>
                          <ul class="dropdown-menu dropdown-with-icons">
                            <li>
                              <a
                                href="javascript:void(0)"
                                v-on:click="filter(false, 'expiry')"
                              >
                                <i class="material-icons">today</i>
                                <p>
                                  Expiry Date
                                </p>
                              </a>
                            </li>
                            <li>
                              <a
                                href="javascript:void(0)"
                                v-on:click="filter(false, 'datePosted')"
                              >
                                <i class="material-icons">today</i>
                                <p>
                                  Date posted
                                </p>
                              </a>
                            </li>
                          </ul>
                        </drop-down>
                      </div>
                      <md-button
                        class="md-icon-button md-success"
                        v-if="this.order == 'desc'"
                        v-on:click="filter(true, orderby)"
                      >
                        <i class="material-icons">arrow_downward</i>
                      </md-button>
                      <md-button
                        v-if="this.order == 'asc'"
                        class="md-icon-button md-success"
                        v-on:click="filter(true, orderby)"
                      >
                        <i class="material-icons">arrow_upward</i>
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
                  <md-checkbox value="Contains Dairy" v-model="dietaryNotFilter"
                    >No Dairy</md-checkbox
                  >
                  <md-checkbox
                    value="Contains Peanuts"
                    v-model="dietaryNotFilter"
                    >No Peanuts</md-checkbox
                  >
                  <md-checkbox
                    value="Contains Shellfish"
                    v-model="dietaryNotFilter"
                    >No Shellfish</md-checkbox
                  >
                </div>
                <br />
                <medium>Food Category</medium>
                <div class="flex-column">
                  <md-checkbox value="Bento Boxes" v-model="foodCatFilter"
                    >Bento Boxes</md-checkbox
                  >
                  <md-checkbox value="Canned Food" v-model="foodCatFilter"
                    >Canned Food</md-checkbox
                  >
                  <md-checkbox value="Dairy" v-model="foodCatFilter"
                    >Dairy</md-checkbox
                  >
                  <md-checkbox value="Drinks" v-model="foodCatFilter"
                    >Drinks</md-checkbox
                  >
                  <md-checkbox value="Proteins" v-model="foodCatFilter"
                    >Proteins</md-checkbox
                  >
                  <md-checkbox value="Carbohydrates" v-model="foodCatFilter"
                    >Carbohydrates</md-checkbox
                  >
                  <md-checkbox
                    value="Vegetables and Fruits"
                    v-model="foodCatFilter"
                    >Vegetables / Fruits</md-checkbox
                  >
                  <md-checkbox value="Snacks" v-model="foodCatFilter"
                    >Snacks</md-checkbox
                  >
                </div>
                <br />
                <md-button
                  class="md-raised md-success"
                  v-on:click="filter(false, orderby)"
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
                        class="md-layout-item requestcard mx-auto"
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
      header: require("@/assets/img/food4.jpg"),
      processing: true,
      locationFilter: [],
      dietaryFilter: [],
      dietaryNotFilter: [], // cannot contain
      foodCatFilter: [],
      collections: [],
      order: "asc",
      orderby: "expiry",
      desc: true
    };
  },
  props: {
    user: { type: String }
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
        .orderBy("expiry", this.order)
        .onSnapshot(snapshot => {
          this.processing = true;
          this.collections = [];

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
            data["datePosted"] = new Date(
              doc.datePosted.toDate().toLocaleString("en-US")
            );
            data["listingName"] = doc.listingName;
            data["quantity"] = doc.quantity;
            data["userID"] = this.user;

            if (data.donorID != this.user && data.expiry >= new Date()) {
              this.collections.push(data);
            }
          });

          this.processing = false;
        });
    },
    filter(reverse, orderby) {
      this.processing = true;
      var db = firebase.firestore();
      this.orderby = orderby;

      if (reverse) {
        this.order = this.order == "desc" ? "asc" : "desc";
      }
      var collect = db
        .collection("donationData")
        .where("status", "==", "available")
        .orderBy(orderby, this.order)
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
            data["datePosted"] = new Date(
              doc.datePosted.toDate().toLocaleString("en-US")
            );
            data["listingName"] = doc.listingName;
            data["quantity"] = doc.quantity;
            data["dietaryRestrictions"] = doc.dietaryRestrictions;
            data["userID"] = this.user;

            let restrictCond = true;

            if (this.locationFilter.length != 0) {
              restrictCond = this.arrayContainsAny(
                doc.collectionLocation,
                this.locationFilter,
                true
              );
            }
            if (this.dietaryFilter.length != 0) {
              restrictCond = this.arrayContainsAny(
                doc.dietaryRestrictions,
                this.dietaryFilter,
                true
              );
            }
            if (this.foodCatFilter.length != 0) {
              restrictCond = this.arrayContainsAny(
                doc.foodCategory,
                this.foodCatFilter,
                true
              );
            }
            if (this.dietaryNotFilter.length != 0) {
              restrictCond = this.arrayContainsAny(
                doc.dietaryRestrictions,
                this.dietaryNotFilter,
                true
              );
            }

            if (
              data.donorID != this.user &&
              data.expiry >= new Date() &&
              restrictCond
            ) {
              this.collections.push(data);
            }
          });

          this.processing = false;
        });
    },
    arrayContainsAny(foodRestrictions, filterRestrictions, pos) {
      for (let restriction of filterRestrictions) {
        if (foodRestrictions.includes(restriction)) {
          return pos ? true : false;
        }
      }
      return pos ? false : true;
    },
    pushToCreateListing: function() {
      let path = `/createlisting`;
      this.$router.push({
        path: path
      });
    },
    checkPath() {
      window.onpopstate = event => {
        if (
          this.$route.path == "/login" ||
          this.$route.path == "/createaccount"
        ) {
          let path = `/explorelisting`;
          this.$router.push({
            path: path
          });
        }
      };
    }
  },
  mounted() {
    this.fetchItems();
    this.checkPath();
  }
};
</script>

<style lang="scss" scoped>
@media (min-width: 1200px) {
  .section .container {
    max-width: 1300px;
  }
}

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
