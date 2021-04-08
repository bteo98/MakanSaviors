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
                  style="margin-top: 17px;"
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
                    <md-checkbox value="East" v-model="location"
                      >East</md-checkbox
                    ><span>
                      <md-checkbox value="North" v-model="location"
                        >North</md-checkbox
                      ></span
                    >
                    <md-checkbox value="South" v-model="location"
                      >South</md-checkbox
                    ><span>
                      <md-checkbox value="West" v-model="location"
                        >West</md-checkbox
                      ></span
                    >
                    <md-checkbox value="Central" v-model="location"
                      >Central</md-checkbox
                    >
                  </div>
                  <br />
                  <p>Food Preference</p>
                  <div class="flex-column">
                    <md-checkbox value="Halal" v-model="food"
                      >Halal</md-checkbox
                    >
                    <md-checkbox value="Vegan" v-model="food"
                      >Vegan</md-checkbox
                    >
                    <md-checkbox value="Vegetarian" v-model="food"
                      >Vegetarian</md-checkbox
                    >
                    <md-checkbox value="No Eggs" v-model="food"
                      >No Eggs</md-checkbox
                    >
                    <md-checkbox value="No Peanuts" v-model="food"
                      >No Peanuts</md-checkbox
                    >
                    <md-checkbox value="No Shellfish" v-model="food"
                      >No Shellfish</md-checkbox
                    >
                  </div>
                  <md-button class="md-raised md-primary" v-on:click="refresh()"
                    >Filter</md-button
                  >
                </div>

                <br />
                {{ this.sortCollection }}
                <div class="md-layout-item md-size-85 md-xsmall-size-45">
                  <ul v-if="!processing" id="itemsList">
                    <li
                      class="md-layout"
                      v-for="(imageIDs, UID, index) in collections"
                      :key="index"
                    >
                      <div
                        class="md-layout"
                        v-for="(imageID, index) in imageIDs"
                        :key="index"
                        style="padding-right: 5%; "
                      >
                        <ExploreCard
                          class="md-layout-item donorcard"
                          :UID="UID"
                          :imgID="imageID"
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
      collections: {},
      header: require("@/assets/img/city-profile.jpg"),
      processing: true,
      location: [],
      food: [],
      sortCollection: {},
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
    fetchItems: function() {
      var database = firebase.firestore();

      //To fetch all data
      database
        .collection("donationIDs")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            for (let [name, list] of Object.entries(doc.data())) {
              console.log(doc.id + " => " + list);
              this.collections[doc.id] = list;
            }
          });
          this.processing = false;
        });
    },
    orderDate: function() {
      var db = firebase.firestore();
      if (this.desc) {
        db.collection("donationData")
          .orderBy("expiry", "desc")
          .onSnapshot(snapshot => {
            let data = {};
            snapshot.forEach(doc => {
              console.log(doc.id + "=>" + doc.data());
              let userid = doc.data().userID;
              data[doc.id] = userid;
            });
            this.sortCollection = data;
            this.desc = false;
            console.log(this.sortCollection);
          });
      } else {
        db.collection("donationData")
          .orderBy("expiry")
          .onSnapshot(snapshot => {
            let data = {};
            snapshot.forEach(doc => {
              console.log(doc.id + "=>" + doc.data());
              let userid = doc.data().userID;
              data[doc.id] = userid;
            });
            this.sortCollection = data;
            this.desc = true;
            console.log(this.sortCollection);
          });
    }
  },
  created() {
    this.fetchItems();
    this.refresh();
  }
  }
};
</script>

<style lang="scss" scoped>
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
