<template>
  <div class="wrapper" style="min-width: 875px;">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised" style="min-width: 820px;">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="title">
                <h3>Request</h3>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100">
                  <tabs
                    :tab-name="['Donor', 'Savior', 'Saved']"
                    :tab-icon="['dashboard', 'schedule', 'schedule']"
                    plain
                    flex-column
                    nav-pills-icons
                    color-button="success"
                  >
                    <!-- here you can add your content for tab-content -->
                    <template slot="tab-pane-1">
                      <div>
                        <ul v-if="!processing" id="itemsList">
                          <li
                            class="md-layout"
                            v-for="(item, index) in donorCollections"
                            :key="index"
                          >
                            <div class="md-layout" style="padding-right: 5%;">
                              <RequestCard
                                class="md-layout-item requestcard"
                                :data="item"
                                :requestView="false"
                              ></RequestCard>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </template>
                    <template slot="tab-pane-2">
                      <div>
                        <ul v-if="!processing" id="itemsList">
                          <li
                            class="md-layout"
                            v-for="(item, index) in requestCollections"
                            :key="index"
                          >
                            <div class="md-layout" style="padding-right: 5%;">
                              <RequestCard
                                class="md-layout-item requestcard"
                                :data="item"
                                :requestView="true"
                              ></RequestCard>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </template>
                    <template slot="tab-pane-3">
                      <div>
                        <ul v-if="!processing" id="itemsList">
                          <li
                            class="md-layout"
                            v-for="(item, index) in savedCollections"
                            :key="index"
                          >
                            <div class="md-layout" style="padding-right: 5%;">
                              <SavedCard
                                class="md-layout-item requestcard"
                                :data="item"
                              ></SavedCard>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </template>
                  </tabs>
                </div>
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
import RequestCard from "./components/RequestCard";
import SavedCard from "./components/SavedCard";
import { Tabs } from "@/components";

export default {
  bodyClass: "request-listing",
  data() {
    return {
      donorCollections: [],
      requestCollections: [],
      savedCollections: [],
      processing: true,
      header: require("@/assets/img/city-profile.jpg"),
      userID: "JQbHbF7EyxaiA4sejCXmn6mkg8G2"
    };
  },
  components: {
    RequestCard,
    SavedCard,
    Tabs
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  },
  methods: {
    donorLiveFetch: function() {
      var db = firebase.firestore();
      let collect = "donorRequest/" + this.userID + "/foodDonated";

      db.collection(collect)
        .orderBy("timeRequested", "desc")
        .onSnapshot(snapshot => {
          this.donorCollections = [];

          snapshot.forEach(doc => {
            let data = {};
            data["foodID"] = doc.id;
            doc = doc.data();
            data["listingName"] = doc.listingName;
            data["saviorID"] = doc.saviorID;
            data["status"] = doc.status;
            data["timeRequested"] = new Date(
              doc.timeRequested.toDate().toLocaleString("en-US")
            );
            data["donorID"] = this.userID;
            data["userID"] = this.userID;
            this.donorCollections.push(data);
            console.log(this.donorCollections);
          });
          this.processing = false;
        });
    },
    requestLiveFetch: function() {
      var db = firebase.firestore();
      let collect = "donorRequest/" + this.userID + "/foodRequested";

      db.collection(collect)
        .orderBy("timeRequested", "desc")
        .onSnapshot(snapshot => {
          this.requestCollections = [];

          snapshot.forEach(doc => {
            let data = {};
            data["foodID"] = doc.id;
            console.log(doc.id);
            doc = doc.data();
            data["listingName"] = doc.listingName;
            data["saviorID"] = this.userID;
            data["status"] = doc.status;
            data["timeRequested"] = new Date(
              doc.timeRequested.toDate().toLocaleString("en-US")
            );
            data["donorID"] = doc.donorID;
            data["userID"] = this.userID;
            this.requestCollections.push(data);
            console.log(this.requestCollections);
          });
          this.processing = false;
        });
    },
    saveLiveFetch: function() {
      var db = firebase.firestore();
      let collect = "donorRequest/" + this.userID + "/foodSaved";

      db.collection(collect).onSnapshot(snapshot => {
        this.savedCollections = [];

        snapshot.forEach(doc => {
          let data = {};
          data["foodID"] = doc.id;
          console.log(doc.id);
          doc = doc.data();
          data["listingName"] = doc.listingName;
          data["saviorID"] = this.userID;
          data["location"] = doc.location;
          data["quantity"] = doc.quantity;
          data["donorID"] = doc.donorID;
          data["status"] = doc.status;
          data["expiry"] = doc.expiry;
          data["userID"] = this.userID;

          this.savedCollections.push(data);
          console.log(this.savedCollections);
        });
        this.processing = false;
      });
    }
  },
  mounted() {
    this.donorLiveFetch();
    this.requestLiveFetch();
    this.saveLiveFetch();
  }
};
</script>

<style lang="scss" scoped>
requestcard {
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
