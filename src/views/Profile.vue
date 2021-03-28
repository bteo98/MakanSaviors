<template>
  <div class="wrapper">
    <parallax
      class="section page-header header-filter"
      :style="headerStyle"
    ></parallax>
    <div class="main main-raised">
      <div class="section profile-content">
        <div class="container">
          <div class="md-layout">
            <div class="md-layout-item md-size-50 mx-auto">
              <div class="profile">
                <div class="avatar">
                  <img
                    :src="this.profilePic"
                    alt="Circle Image"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">
                    {{ this.sentenceCase(this.firstName) }}
                    {{ this.sentenceCase(this.lastName) }}
                    <p>
                      Rating:
                      <br />
                      Join Date:
                      <br />
                      Region:
                    </p>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="description text-center">
            <h4>
              What inspires me to donate:
              <p>{{ this.reasonDonate }}</p>
            </h4>
            <br />
            <h4>
              What motivates me to save:
              <p>{{ this.reasonSave }}</p>
            </h4>
          </div>
          <div class="profile-tabs">
            <tabs
              :tab-name="['Listings', 'Requests', 'Reviews']"
              :tab-icon="['camera', 'palette', 'favorite']"
              plain
              nav-pills-icons
              color-button="success"
            >
              <!-- here you can add your content for tab-content -->
              <template slot="tab-pane-1">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <img :src="tabPane1[0].image" class="rounded" />
                    <img :src="tabPane1[1].image" class="rounded" />
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <img :src="tabPane1[3].image" class="rounded" />
                    <img :src="tabPane1[2].image" class="rounded" />
                  </div>
                </div>
              </template>
              <template slot="tab-pane-2">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <img :src="tabPane2[0].image" class="rounded" />
                    <img :src="tabPane2[1].image" class="rounded" />
                    <img :src="tabPane2[2].image" class="rounded" />
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <img :src="tabPane2[3].image" class="rounded" />
                    <img :src="tabPane2[4].image" class="rounded" />
                  </div>
                </div>
              </template>
              <template slot="tab-pane-3">
                <div class="md-layout">
                  <div class="md-layout-item md-size-25 ml-auto">
                    <img :src="tabPane3[0].image" class="rounded" />
                    <img :src="tabPane3[1].image" class="rounded" />
                  </div>
                  <div class="md-layout-item md-size-25 mr-auto">
                    <img :src="tabPane3[2].image" class="rounded" />
                    <img :src="tabPane3[3].image" class="rounded" />
                    <img :src="tabPane3[4].image" class="rounded" />
                  </div>
                </div>
              </template>
            </tabs>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Tabs } from "@/components";
import firebase from "firebase";
var database = firebase.firestore();

export default {
  components: {
    Tabs
  },
  bodyClass: "profile-page",
  data() {
    return {
      tabPane1: [
        { image: require("@/assets/img/examples/studio-1.jpg") },
        { image: require("@/assets/img/examples/studio-2.jpg") },
        { image: require("@/assets/img/examples/studio-4.jpg") },
        { image: require("@/assets/img/examples/studio-5.jpg") }
      ],
      tabPane2: [
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/cynthia-del-rio.jpg") },
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/clem-onojegaw.jpg") }
      ],
      tabPane3: [
        { image: require("@/assets/img/examples/mariya-georgieva.jpg") },
        { image: require("@/assets/img/examples/studio-3.jpg") },
        { image: require("@/assets/img/examples/clem-onojeghuo.jpg") },
        { image: require("@/assets/img/examples/olu-eletu.jpg") },
        { image: require("@/assets/img/examples/studio-1.jpg") }
      ],
      //userName: null,
      UID: null,
      firstName: null,
      lastName: null,
      phoneNumber: null,
      telegramHandle: null,
      address: null,
      dietaryRestrictions: null,
      foodCategory: null,
      reasonDonate: null,
      reasonSave: null,
      profilePic: require("@/assets/img/faces/unknown.jpg")
    };
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
        profile: require("@/assets/img/faces/unknown.jpg"),
        UID: ""
      };
    }
  },
  methods: {
    getUID: function() {
      this.UID = firebase.auth().currentUser.uid;
    },
    getProfilePic: function() {
      var storageRef = firebase.storage().ref("/profilePictures/" + this.UID);
      storageRef.getDownloadURL().then(url => {
        this.profilePic = url;
      });
    },
    getUserData: function() {
      database
        .collection("users")
        .doc(this.UID)
        .get()
        .then(doc => {
          var data = doc.data();
          //this.userName = data.username;
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.phoneNumber = data.phoneNumber;
          this.telegramHandle = data.telegramHandle;
          this.address = data.address;
          this.dietaryRestrictions = data.dietaryRestrictions;
          this.foodCategory = data.foodCategory;
          this.reasonDonate = data.reasonDonate;
          this.reasonSave = data.reasonSave;
        });
    },
    sentenceCase: function(word) {
      return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
    }
  },
  created() {
    this.getUID();
    this.getProfilePic();
    this.getUserData();
  }
};
</script>

<style lang="scss" scoped>
.section {
  padding: 0;
}

.profile-tabs::v-deep {
  .md-card-tabs .md-list {
    justify-content: center;
  }

  [class*="tab-pane-"] {
    margin-top: 3.213rem;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}
</style>
