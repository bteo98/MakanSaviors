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
                    :tab-name="['As Donor', 'As Savior']"
                    :tab-icon="['call_made', 'call_received']"
                    plain
                    flex-column
                    nav-pills-icons
                    color-button="success"
                  >
                    <template slot="tab-pane-1" style="padding-left: 10px">
                      <div v-if="!this.processing">
                        <ul id="itemsList">
                          <li
                            class="md-layout"
                            v-for="item in donorCollections"
                            :key="item.foodID"
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
                      <div v-if="!this.processing">
                        <ul id="itemsList">
                          <li
                            class="md-layout"
                            v-for="item in requestCollections"
                            :key="item.foodID"
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
import { Tabs } from "@/components";

export default {
  bodyClass: "request-listing",
  data() {
    return {
      donorCollections: [],
      requestCollections: [],
      savedCollections: [],
      processing: true,
      header: require("@/assets/img/food4.jpg")
    };
  },
  props: {
    userID: { type: String }
  },
  components: {
    RequestCard,
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
          this.processing = true;
          this.donorCollections = [];

          snapshot.forEach(doc => {
            this.processing = true;
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
            data["foodCategory"] = doc.foodCategory;

            this.donorCollections.push(data);
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
          this.processing = true;
          this.requestCollections = [];

          snapshot.forEach(doc => {
            this.processing = true;
            let data = {};
            data["foodID"] = doc.id;
            doc = doc.data();
            data["listingName"] = doc.listingName;
            data["saviorID"] = this.userID;
            data["status"] = doc.status;
            data["timeRequested"] = new Date(
              doc.timeRequested.toDate().toLocaleString("en-US")
            );
            data["donorID"] = doc.donorID;
            data["userID"] = this.userID;
            data["foodCategory"] = doc.foodCategory;

            this.requestCollections.push(data);
          });
          this.processing = false;
        });
    },

    checkPath() {
      window.onpopstate = event => {
        if (
          this.$route.path == "/login" ||
          this.$route.path == "/createaccount"
        ) {
          let path = `/requestlisting`;

          this.$router.push({
            path: path
          });
        }
      };
    }
  },
  mounted() {
    this.donorLiveFetch();
    this.requestLiveFetch();
    this.saveLiveFetch();
    this.checkPath();
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
