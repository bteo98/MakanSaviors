<template>
  <md-card id="explore-card">
    <md-card-content>
      <div class="md-layout">
        <div class="md-layout-item">
          <div>
            <img
              v-bind:src="imgRef"
              v-bind:alt="description['name']"
              class="rounded"
              :class="{ 'responsive-image': responsive }"
            />
            <div class="text">
              <small>Food Description:</small>
              {{ description["foodName"] }}<br />
              <small>Donor Name:</small>
              {{
                  firstName.charAt(0).toUpperCase() +
                  firstName.slice(1).toLowerCase() +
                  " " +
                  lastName.charAt(0).toUpperCase() +
                  lastName.slice(1).toLowerCase()
              }}<br />
              <small>Time Requested:</small>
              {{ description['timeRequested'] }}<br />
            </div>
          </div>
          <md-button class="md-success first-button" v-on:click="accept" v-if="!clicked">Accept</md-button>
          <md-button class="md-success" v-on:click="decline" v-if="!clicked">Decline</md-button>
          <badge type="success first-button status" v-if="clicked && accepted">Accepted</badge>
          <badge type="rose first-button status" v-if="clicked && !accepted">Declined</badge>
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
      description: {
        donorID: "r7e0ww5hcAPlEnLBfg4g8T8CTPJ2",
        foodID: "r8MTer5iLadyXtjMCjCX",
        foodName: "Cheese Baked Beans",
        saviorID: "1XSR7CKQnQR92zI1FGf7ajhqWo13",
        status: "pending",
        timeRequested: "March 29, 8pm"
      },
      firstName: "",
      lastName: "",
      clicked: false,
      accepted: false,
      responsive: false
    };
  },
  props: {
    donorID: {type: String},
    foodID: {type: String},
    foodName: {type: String},
    saviorID: {type: String},
    status: {type: String},
    timeRequested: {type: String},
  },
  methods: {
    fetchItems: function() {
      // get image
      var storage = firebase.storage();
      let imgPath = storage.ref(
        this.description.donorID + "/donationImages/" + this.description.foodID
      );

      imgPath.getDownloadURL().then(url => {
        this.imgRef = url;
        console.log(url);
      });

      var database = firebase.firestore();

      // get user info
      database
        .collection("users")
        .doc(this.description.saviorID)
        .get()
        .then(items => {
          let data = items.data();
          console.log(data);
          this.firstName = data['firstName'];
          this.lastName = data['lastName'];
          console.log(this.lastName);
        });
    },
    accept() {
      var database = firebase.firestore();

      let fieldName = this.description.foodID + ".status";

      database.collection('donorRequest')
        .doc(this.description.donorID)
        .update({
          [fieldName]: "true"
        })
        .then(() => {
          this.clicked = true;
          this.accepted = true;
          console.log('Document status updated to true!');
        });
    },
    decline() {
      var database = firebase.firestore();

      let fieldName = this.description.foodID + ".status";

      database.collection('donorRequest')
        .doc(this.description.donorID)
        .update({
          [fieldName]: "false"
        })
        .then(() => {
          this.clicked = true;
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
  padding-top: 12px;
  margin-bottom: 37px;
}

.text {
  display: inline-block;
  max-width: 70%;
  padding: 26px 0;
  padding-left: 30px;
}

#explore-card {
  max-width: 500px !important;
  min-width: 420px !important;
}

.status {
  font-size: small;
  padding: 8px 10px;
}

.md-success {
  margin: 0 10px !important;
}

.first-button {
  margin-left: 30px !important;
}
</style>
