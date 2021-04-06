<template>
  <div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="vertical-center header">
                <md-button
                  class="md-success md-top-left"
                  style="margin-top: 17px;"
                  ><router-link to="/CreateListing" exact>
                    Create Listing</router-link
                  ></md-button
                >
              </div>
            </div>
            <div class="vertical-center header">
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
                            <a href="javascript:void(0)">
                              <i class="material-icons">content_paste</i>
                              <p>
                                Distance
                              </p>
                            </a>
                          </li>
                          <li>
                            <a href="javascript:void(0)">
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

            <div>
              <div>
                <div class="md-layout md-gutter">
                  <div class="md-layout-item md-size-15 filter">
                    <span class="md-title">Filter By</span>
                    <div>
                      {{ this.location.length }}
                      {{ this.collections }}
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
                    </div>
                    <div>
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
                    </div>
                    <md-button
                      class="md-raised md-primary"
                      v-on:click="refresh()"
                      >Filter</md-button
                    >
                  </div>
                  <div class="md-layout-item md-size-60">
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
                            class="md-layout-item donoarcard"
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
    </div>
  </div>
  <!--<div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="vertical-center header">
                <md-button
                  class="md-success md-top-left"
                  style="margin-top: 17px;"
                  ><router-link to="/CreateListing" exact>
                    Create Listing</router-link
                  ></md-button
                >

                <div
                  class="md-list "
                  style="display: inline-block; float: right;"
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
                              <a href="javascript:void(0)">
                                <i class="material-icons">content_paste</i>
                                <p>
                                  Distance
                                </p>
                              </a>
                            </li>
                            <li>
                              <a href="javascript:void(0)">
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

              <div class="md-layout">
                <div>
                  <div class="md-layout md-gutter">
                    <div class="md-layout-item md-size-25 filter">
                      <header><strong>Filter By</strong></header>
                      <div>
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
                      </div>
                      <div>
                        <p>Food Preference</p>
                        <md-checkbox value="Vegan" v-model="food"
                          >Vegan</md-checkbox
                        >
                        <span>
                          <md-checkbox value="Vegetarian" v-model="food"
                            >Vegetarian</md-checkbox
                          > </span
                        ><br />
                        <md-checkbox value="Halal" v-model="food"
                          >Halal</md-checkbox
                        >
                        <span>
                          <md-checkbox value="No Peanuts" v-model="food"
                            >No Peanuts</md-checkbox
                          > </span
                        ><br />
                        <md-checkbox value="No Eggs" v-model="food"
                          >No Eggs</md-checkbox
                        >
                        <md-checkbox value="No Shellfish" v-model="food"
                          >No Shellfish</md-checkbox
                        >
                      </div>
                    </div>
                    <div class="md-layout-item">
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
                              class="md-layout-item donoarcard"
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
            <br /><br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>-->
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
      food: []
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
      /*
      const loc = db.collection('donationIDs');
      const snapshot = await loc.where('collectionLocation' == 'North').get();
      if (snapshot.empty) {
        console.log('No matching documents.');
        return;
      }  

      snapshot.forEach(doc => {
        for (let [name, list] of Object.entries(doc.data())) {
          console.log(doc.id+ '=>'+ list);
          this.collections[doc.id] = list;
        }
      });
      this.processing = false;
  }},
*/
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
    refresh: function() {
      var db = firebase.firestore();
      var imagIDs = [];
      var newCollections = {};
      if (this.location.length != 0) {
        var filteredData = db
          .collection("donationData")
          .where("collectionLocation", "array-contains-any", this.location);
        filteredData.onSnapshot(snapshot => {
          snapshot.forEach(doc => {
            console.log(doc.id + "=>" + doc.data());
            imagIDs.push(doc.id);
          });
          console.log(imagIDs);
        });
      }

      if (this.imagIDs.length != 0) {
        for (iid in imagIDs) {
          var getUID = db
            .collection("donationIDs")
            .where("imageIDs", "array-contains", iid);
          getUID.onSnapshot(snapshot => {
            this.collections = {};
            snapshot.forEach(doc => {
              for (let [name, list] of Object.entries(doc.data())) {
                console.log(doc.id + " => " + list);
                if (this.collections.hasOwnProperty("doc.id")) {
                  this.collections[doc.id].push(iid);
                } else {
                  this.collections[doc.id] = [];
                  this.collections[doc.id].push(iid);
                }
              }
            });
            console.log(this.collections);
          });
          this.processing = false;
        }
      }
    }
  },

  created() {
    this.fetchItems();
    this.refresh();
  }
};
/*
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
    }
  },

  created() {
    this.fetchItems();
  }
};
*/
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

.filter {
  width: 300px;
  color: black;
  float: left;
}
</style>
