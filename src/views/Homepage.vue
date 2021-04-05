<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-smaller header-filter"
      :style="headerStyle"
    >
      <!--header and greenery background-->
      <div class="container">
        <!--style the word at header in white-->
        <div class="md-layout">
          <div>
            <h2>Recommend For You</h2>
          </div>
        </div>
      </div>
    </parallax>
    <div class="main main-raised">
      <div class="section section-basic">
        <div class="container">
          <div id="nav-tabs">
            <div class="md-layout">
              <div
                class="md-layout-item md-size-450 md-small-size-450 md-xsmall-size-100"
              >
                <nav-tabs-card no-label>
                  <template slot="content">
                    <md-tabs class="md-primary" md-alignment="left">
                      <md-tab
                        id="tab-home"
                        md-label="Based on your top 3 food category"
                      >
                        <p>
                          For loop for donation list
                        </p>
                        <ul id="itemsList">
                          <li
                            v-for="(item, index) in this.itemList"
                            :key="index"
                          >
                            <!--<div v-for="(val, key) in item" :key="key">-->
                            Name: {{ item["name"] }} <br />
                            Quantity: {{ item["quantity"] }} <br />
                            Expiry Date: {{ item["expiryDate"]["date"] }}
                            {{ item["expiryDate"]["month"] }}
                            {{ item["expiryDate"]["year"] }}
                            <!--</div>-->
                          </li>
                        </ul>
                      </md-tab>

                      <md-tab id="tab-pages" md-label="Based on your location">
                        <p>
                          Filter through location
                        </p>
                      </md-tab>
                    </md-tabs>
                  </template>
                </nav-tabs-card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { NavTabsCard } from "@/components";
import firebase from "../firebase";

export default {
  components: {
    NavTabsCard
  },
  data() {
    return {
      itemList: []
    };
  },
  bodyClass: "landing-page",
  props: {
    header: {
      type: String,
      default: require("@/assets/img/bg7.jpg")
    },
    teamImg1: {
      type: String,
      default: require("@/assets/img/faces/avatar.jpg")
    },
    teamImg2: {
      type: String,
      default: require("@/assets/img/faces/christian.jpg")
    },
    teamImg3: {
      type: String,
      default: require("@/assets/img/faces/kendall.jpg")
    }
  },
  methods: {
    fetchItems: function() {
      var database = firebase.firestore();
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ];

      database
        .collection("donation")
        .get()
        .then(querySnapShot => {
          querySnapShot.forEach(doc => {
            let item = {
              name: null,
              quantity: null,
              expiryDate: { year: null, month: null, date: null }
            };

            for (let [key, val] of Object.entries(doc.data())) {
              if (key == "name") {
                item[key] = val;
              }
              if (key == "quantity") {
                item[key] = val;
              }
              if (key == "expiryDate") {
                item[key]["year"] = new Date(val.toDate()).getFullYear();
                item[key]["month"] =
                  monthNames[new Date(val.toDate()).getMonth()];
                item[key]["date"] = new Date(val.toDate()).getDate();
              }
            }
            //item=doc.data()
            this.itemList.push(item);
            console.log(doc.data());
          });
        });
    }
  },
  created() {
    this.fetchItems();
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`
      };
    }
  }
};
</script>

<style lang="css" scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
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
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;
}
img {
  width: 135px;
  height: 135px;
}
</style>
