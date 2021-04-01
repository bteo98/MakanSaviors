<template>
  <md-card id="explore-card">
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item">
          <div>
            <img
              v-bind:src="imgRef"
              v-bind:alt="data['foodName']"
              class="rounded"
              :class="{ 'responsive-image': responsive }"
            />
            <div class="text text-description">
              <small class="text-description">Food Description:</small>
              {{ data["foodName"] }}<br />
              <small class="text-description">Donor Name:</small>
              {{
                firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase() +
                  " " +
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1).toLowerCase()
              }}<br />
              <small class="text-description">Time Requested:</small>
              {{ data["timeRequested"].toString().slice(0, 21) }}<br />
            </div>
          </div>
          <md-button
            class="md-success first-button"
            v-on:click="updateStatus('accepted')"
            v-if="data.status == 'pending' && requestView == false"
            >Accept</md-button
          >
          <md-button
            class="md-success"
            v-on:click="updateStatus('declined')"
            v-if="data.status == 'pending' && requestView == false"
            >Decline</md-button
          >
          <badge
            type="success first-button status"
            v-if="data.status == 'accepted'"
            >Accepted</badge
          >
          <badge
            type="warning first-button status"
            v-if="data.status == 'pending' && requestView == true"
            >Pending</badge
          >
          <badge
            type="rose first-button status"
            v-if="data.status == 'declined'"
            >Declined</badge
          >
        </div>
      </div>
    </md-card-content>
  </md-card>
</template>

<script>
import firebase from "../../firebase";
import { Badge } from "@/components";

export default {
  name: "explore-card",
  data() {
    return {
      imgRef: "",
      firstName: "",
      lastName: "",
      responsive: false
    };
  },
  props: {
    data: { type: Object },
    requestView: { type: Boolean }
  },
  methods: {
    fetchItems: function() {
      // get image
      var storage = firebase.storage();
      let imgPath = storage.ref(
        this.data.donorID + "/donationImages/" + this.data.foodID
      );

      imgPath.getDownloadURL().then(url => {
        this.imgRef = url;
      });

      var database = firebase.firestore();

      // get user info
      database
        .collection("users")
        .doc(this.data.saviorID)
        .get()
        .then(items => {
          let item = items.data();

          this.firstName = item["firstName"];
          this.lastName = item["lastName"];
        });
    },
    updateStatus(statusMsg) {
      var database = firebase.firestore();
      let donorCollect = "donorRequest/" + this.data.donorID + "/foodDonated";
      let saviorCollect =
        "donorRequest/" + this.data.donorID + "/foodRequested";

      database
        .collection(donorCollect)
        .doc(this.data.foodID)
        .update({
          status: statusMsg
        })
        .then(() => {
          console.log("Document status updated to false!");
        });

      database
        .collection(saviorCollect)
        .doc(this.data.foodID)
        .update({
          status: statusMsg
        })
        .then(() => {
          console.log("Document status updated to false!");
        });

      database
        .collection("donationData")
        .doc(this.data.foodID)
        .update({
          status: "Unavailable"
        })
        .then(() => {
          console.log("Document status updated to unavailable!");
        });
    },
    onResponsiveInverted() {
      if (window.innerWidth < 600) {
        this.responsive = true;
      } else {
        this.responsive = false;
      }
    }
  },
  components: {
    Badge
  },
  created() {
    this.fetchItems();
  },
  mounted() {
    this.onResponsiveInverted();
    window.addEventListener("resize", this.onResponsiveInverted);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResponsiveInverted);
  }
};
</script>
<style scoped>
.text-description {
  font-size: 15px !important;
}

small,
div {
  font-size: medium;
}

img {
  display: inline-block;
  min-width: 95px;
  width: 20% !important;
  float: left;
  padding-top: 45px;
}

.text {
  display: inline-block;
  max-width: 70%;
  padding: 26px 0;
  padding-left: 30px;
}

#explore-card {
  max-width: 500px !important;
  min-width: 450px !important;
}

.status {
  font-size: small;
  padding: 8px 10px;
}

.md-success {
  margin: 0 5px !important;
}

.first-button {
  margin-left: 125px !important;
}
</style>
