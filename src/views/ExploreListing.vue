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
                  style="margin-top: 30px;"
                  >
                    Create Listing</md-button
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
                      v-on:click="orderDate()"
                    >
                      <i class="material-icons">swap_vert</i>
                    </md-button>

                    <div class="md-list-item-content">
                      <drop-down direction="down">
                        <md-button
                          slot="title"
                          class="md-button md-button-link md-simple dropdown-toggle"
                          data-toggle="dropdown"
                        >
                          <i class="material-icons">apps</i>
                          <p>Sort By</p>
                        </md-button>
                        <ul class="dropdown-menu dropdown-with-icons">
                          <li>
                            <a href="javascript:void(0)">
                              <i class="material-icons">layers</i>
                              <p>
                                Donor's Rating
                              </p>
                            </a>
                          </li>
                          <li>
                            <a
                              href="javascript:void(0)"
                              v-on:click="orderDate()"
                            >
                              <i class="material-icons">content_paste</i>
                              <p>
                                Expiry Date
                              </p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">
                              <i class="material-icons">content_paste</i>
                              <p>
                                Quantity Avaliable
                              </p>
                            </a>
                          </li>
                        </ul>
                      </drop-down>
                    </div>
                  </a>
                </li>
              </div>
              </div>
            </div>
          </div>
        
            <div class="progress-pagination">
              <div class="md-layout">
                <div class="md-layout-item md-size-15 md-xsmall-size-30">
                  <header><strong>Filter By</strong></header>
                  <p>Location</p>
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
                  <p>Food Preference</p>
                  <div class="flex-column">
                    <md-checkbox value="Halal" v-model="foodFilter"
                      >Halal</md-checkbox
                    >
                    <md-checkbox value="Vegan" v-model="foodFilter"
                      >Vegan</md-checkbox
                    >
                    <md-checkbox value="Vegetarian" v-model="foodFilter"
                      >Vegetarian</md-checkbox
                    >
                    <md-checkbox value="No Eggs" v-model="foodFilter"
                      >No Eggs</md-checkbox
                    >
                    <md-checkbox value="No Peanuts" v-model="foodFilter"
                      >No Peanuts</md-checkbox
                    >
                    <md-checkbox value="No Shellfish" v-model="foodFilter"
                      >No Shellfish</md-checkbox
                    >
                  </div>
                  <md-button class="md-raised md-success" v-on:click="refresh()"
                    >Filter</md-button
                  >
                </div>
                <br />
                <div class="item-listing">
                        <ul v-if="!processing" id="itemsList">
                          <li
                            class="md-layout"
                            v-for="(item, index) in collections"
                            :key="index"
                          >
                            <div class="md-layout" style="padding-right: 5%;">
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
      foodFilter: [],
      collections: [],
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
        .onSnapshot(snapshot => {
          this.collections = [];

          snapshot.forEach(doc => {
            let data = {};

            data['foodID'] = doc.id;
            doc = doc.data();
            data['location'] = doc.collectionLocation;
            data['donorID'] = doc.userID;
            data['expiry'] = new Date(
              doc.expiry.toDate().toLocaleString("en-US")
            );
            data['foodName'] = doc.listingName;
            data['quantity'] = doc.quantity;
            this.collections.push(data);
          });
         
          this.processing = false;
      })
    }
  },
  created() {
    this.fetchItems();
  }
};
</script>

<style lang="scss" scoped>
.item-listing {
  max-width: 85%;
}

donorcard {
  padding: 500px 500px !important;
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
