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
            <div class="text">
              <small>Food Description:</small>
              {{ data["foodName"] }}<br />
              <small>Donor Name:</small>
              {{
                  firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase() +
                  " " +
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1).toLowerCase()
              }}<br />
              <small>Time Requested:</small>
              {{ data['timeRequested'] }}<br />
            </div>
          </div>
          <md-button class="md-success first-button" v-on:click="accept" v-if="data.status == 'pending'">Accept</md-button>
          <md-button class="md-success" v-on:click="decline" v-if="data.status == 'pending'">Decline</md-button>
          <badge type="success first-button status" v-if="data.status == 'true'">Accepted</badge>
          <badge type="rose first-button status" v-if="data.status == 'false'">Declined</badge>
        </div>
      </div>
      <slot name="content"></slot>
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
    data: {type: Object}
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

          this.firstName = item['firstName'];
          this.lastName = item['lastName'];
        });
    },
    accept() {
      var database = firebase.firestore();
      let collect = 'donorRequest/' + this.data.donorID + '/foodDonated';

      database.collection(collect)
        .doc(this.data.foodID)
        .update({
          status: "true"
        })
        .then(() => {
          console.log('Document status updated to true!');
        });
    },
    decline() {
      var database = firebase.firestore();
      let collect = 'donorRequest/' + this.data.donorID + '/foodDonated';
 
      database.collection(collect)
        .doc(this.data.foodID)
        .update({
          status: "false"
        })
        .then(() => {
          console.log('Document status updated to false!');
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
