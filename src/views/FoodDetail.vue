<template>
  <div class="wrapper">
    <parallax class="section header-filter" :style="headerStyle"> </parallax>
    <div class="main main-raised" style="min-width: 720px;">
      <div class="section">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item">
              <div class="title">
                <h3>Food Information</h3>
              </div>
              <div class="md-layout">
                <div class="md-layout-item md-small-size-100">
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

export default {
  bodyClass: "food-detail",
  data() {
    return {
      donorCollections: [],
      requestCollections: [],
      processing: true,
      header: require("@/assets/img/city-profile.jpg"),
      user: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2"
    };
  },
  components: {
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
      let collect = "donorRequest/" + this.user + "/foodDonated";

      db.collection(collect)
        .orderBy("timeRequested", "desc")
        .onSnapshot(snapshot => {
          this.donorCollections = [];

          snapshot.forEach(doc => {
            let data = {};
            data["foodID"] = doc.id;
            doc = doc.data();
            data["foodName"] = doc.foodName;
            data["saviorID"] = doc.saviorID;
            data["status"] = doc.status;
            data["timeRequested"] = new Date(
              doc.timeRequested.toDate().toLocaleString("en-US")
            );
            data["donorID"] = this.user;
            this.donorCollections.push(data);
            console.log(this.donorCollections);
          });
          this.processing = false;
        });
    },
    requestLiveFetch: function() {
      var db = firebase.firestore();
      let collect = "donorRequest/" + this.user + "/foodRequested";

      db.collection(collect)
        .orderBy("timeRequested", "desc")
        .onSnapshot(snapshot => {
          this.requestCollections = [];

          snapshot.forEach(doc => {
            let data = {};
            data["foodID"] = doc.id;
            console.log(doc.id);
            doc = doc.data();
            data["foodName"] = doc.foodName;
            data["saviorID"] = this.user;
            data["status"] = doc.status;
            data["timeRequested"] = new Date(
              doc.timeRequested.toDate().toLocaleString("en-US")
            );
            data["donorID"] = doc.donorID;
            this.requestCollections.push(data);
            console.log(this.requestCollections);
          });
          this.processing = false;
        });
    }
  },
  mounted() {
    this.donorLiveFetch();
    this.requestLiveFetch();
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
