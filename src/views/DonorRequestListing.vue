<template>
  <div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="vertical-center header">
                <md-button class="md-success" style="margin-top: 17px;"
                  >Create Listing</md-button
                >
                <div
                  class="md-list"
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
              <div>
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
                      style="padding-right: 5%;"
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
          <br /><br /><br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase.js";
import ExploreCard from "./components/ExploreCard";

export default {
  bodyClass: "quiz-lifestage-page",
  data() {
    return {
      collections: {},
      header: require("@/assets/img/city-profile.jpg"),
      processing: true
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

      database
        .collection("donorImageIDs")
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
