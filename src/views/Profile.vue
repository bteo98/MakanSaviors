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
                    v-bind:src="this.getImage"
                    @error="onImageLoadFailure()"
                    class="img-raised rounded-circle img-fluid"
                  />
                </div>
                <div class="name">
                  <h3 class="title">
                    {{ this.sentenceCase(this.firstName) }}
                    {{ this.sentenceCase(this.lastName) }}
                    <p>
                      Join Date: {{ this.joinDate }}
                      <br />
                      Region: {{ this.preferredLocation }}
                    </p>
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div class="md-layout">
            <div
              class="text md-layout-item diet-restriction text-description ml-auto"
            >
              <h4 style="font-size: 20px; text-align: center">
                Food Categories
              </h4>
              <ul class="md-layout" id="restriction-list">
                <li
                  class="md-layout"
                  v-for="categories in this.foodCategory"
                  :key="categories"
                >
                  <badge
                    class="md-layout-item profile-badges"
                    type="info restrict"
                    >{{ categories }}</badge
                  >
                </li>
              </ul>
            </div>
            <div
              class="text md-layout-item diet-restriction text-description mr-auto"
            >
              <h4 style="font-size: 20px; text-align: center">
                Dietary Restrictions
              </h4>
              <ul class="md-layout" id="restriction-list">
                <li
                  class="md-layout"
                  v-for="restriction in this.dietaryRestrictions"
                  :key="restriction"
                >
                  <badge
                    class="md-layout-item profile-badges"
                    type="info restrict"
                    >{{ restriction }}</badge
                  >
                </li>
              </ul>
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
            <br />
            <md-button
              class="md-success"
              v-show="profileOwnership()"
              v-on:click="pushToModify()"
            >
              Edit Profile
            </md-button>
          </div>

          <div class="profile-tabs mx-auto" style="margin-top: 15px">
            <tabs
              :tab-name="['Donations', 'Saved Listings']"
              :tab-icon="['food_bank', 'favorite']"
              plain
              nav-pills-icons
              color-button="success"
            >
              <template slot="tab-pane-1">
                <div>
                  <ul id="itemsList">
                    <li
                      class="md-layout"
                      v-for="item in this.donations"
                      :key="item"
                    >
                      <div
                        class="md-layout"
                        style="padding-right: 5%; margin-left:2%;"
                      >
                        <ProfileDonationCard
                          class="md-layout-item requestcard mx-auto"
                          :data="item"
                          :requestView="false"
                        ></ProfileDonationCard>
                      </div>
                    </li>
                  </ul>
                </div>
              </template>
              <template slot="tab-pane-2">
                <div>
                  <ul id="itemsList">
                    <li
                      class="md-layout"
                      v-for="(item, index) in savedCollections"
                      :key="index"
                    >
                      <div
                        class="md-layout"
                        style="padding-right: 5%;margin-left:2%;"
                      >
                        <SavedCard
                          class="md-layout-item requestcard mx-auto"
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
  </div>
</template>

<script>
import { Tabs } from "@/components";
import firebase from "firebase";
import ProfileDonationCard from "./components/ProfileDonationCard";
import SavedCard from "./components/SavedCard";
import { Badge } from "@/components";

var database = firebase.firestore();

export default {
  bodyClass: "profile-page",
  data() {
    return {
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
      profilePic: null,
      preferredLocation: null,
      joinDate: null,
      imageIDs: [],
      donations: [],
      savedCollections: [],
      imgErr: false,
      unknown: require("@/assets/img/faces/unknown.jpg")
    };
  },
  components: {
    ProfileDonationCard,
    Tabs,
    Badge,
    SavedCard
  },
  props: {
    header: {
      type: String,
      default: require("@/assets/img/city-profile.jpg")
    },
    userID: { type: String }
  },
  computed: {
    headerStyle() {
      return {
        backgroundImage: `url(${this.header})`,
        profile: require("@/assets/img/faces/unknown.jpg"),
        UID: ""
      };
    },
    getImage() {
      if (this.imgErr) {
        return this.unknown;
      } else {
        return this.profilePic;
      }
    }
  },
  methods: {
    getUID: function() {
      this.UID = this.userID;
    },
    getProfilePic: function() {
      var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
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
          this.firstName = data.firstName;
          this.lastName = data.lastName;
          this.phoneNumber = data.phoneNumber;
          this.telegramHandle = data.telegramHandle;
          this.address = data.address;
          this.dietaryRestrictions = data.dietaryRestrictions;
          this.foodCategory = data.foodCategory;
          this.reasonDonate = data.reasonDonate;
          this.reasonSave = data.reasonSave;
          var locArray = data.preferredLocation;
          var locString = "";
          for (let i = 0; i < locArray.length; i++) {
            locString = locString + locArray[i] + "/ ";
          }
          this.preferredLocation = locString.substring(0, locString.length - 2);
          this.joinDate = this.getDate(data.joinDate);
          this.getImageIDs();
        });
    },
    sentenceCase: function(word) {
      if (word != null) {
        return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
      }
    },
    getDate: function(joinDate) {
      var milliseconds = joinDate.seconds * 1000;
      var dateObj = new Date(milliseconds);
      var date = dateObj.toLocaleDateString("en-GB");
      return date;
    },
    getImageIDs: function() {
      database
        .collection("donationIDs")
        .doc(this.UID)
        .get()
        .then(doc => {
          var data = doc.data();
          this.imageIDs = data.imageIDs;
          this.getDonationDetails();
        });
    },
    getDonationDetails: function() {
      for (let i = 0; i < this.imageIDs.length; i++) {
        var storageRef = firebase
          .storage()
          .ref(this.UID + "/donationImages/" + this.imageIDs[i]);
        storageRef.getDownloadURL().then(url => {
          var donationDict = {};
          donationDict["uid"] = this.UID;
          donationDict["url"] = url;
          donationDict["imageID"] = this.imageIDs[i];
          database
            .collection("donationData")
            .doc(this.imageIDs[i])
            .get()
            .then(doc => {
              donationDict["data"] = doc.data();
              this.donations.push(donationDict);
              this.donations.sort(function(a, b) {
                return b.data.datePosted - a.data.datePosted;
              });
            });
        });
      }
    },
    profileOwnership: function() {
      var currUser = firebase.auth().currentUser.uid;
      return currUser == this.UID;
    },
    pushToModify() {
      let path = `/modifyaccount`;
      this.$router.push({
        path: path
      });
    },
    onImageLoadFailure() {
      this.imgErr = true;
    },
    saveLiveFetch() {
      var db = firebase.firestore();
      let collect = "donorRequest/" + this.UID + "/foodSaved";

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
      });
    },
    checkPath() {
      window.onpopstate = event => {
        console.log(this.$route.path);
        if (
          this.$route.path == "/login" ||
          this.$route.path == "/createaccount"
        ) {
          let path = `/profile/${this.userID}`;
          console.log(path);
          this.$router.push({
            path: path
          });
        }
      };
    }
  },
  created() {
    this.getUID();
    this.getProfilePic();
    this.getUserData();
    this.saveLiveFetch();
  },
  mounted() {
    this.checkPath();
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
    margin-top: 0px;
    padding-bottom: 50px;

    img {
      margin-bottom: 2.142rem;
    }
  }
}

.description {
  color: #3c4858;
}

ProfileDonationCard {
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

.diet-restriction {
  max-width: 500px;
  width: 500px;
}

.restrict {
  font-size: 14px;
  padding: 8px 12px;
}

.profile-badges {
  width: 200px;
}

.md-list-item-button {
  width: 100px !important;
}
</style>
