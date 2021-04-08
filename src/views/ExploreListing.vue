<template>
	<div class="wrapper" style="min-width: 900px">
		<parallax class="section header-filter" :style="headerStyle"> </parallax>
		<div class="main main-raised" style="min-width: 800px">
			<div class="section">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item">
							<div class="vertical-center header">
								<md-button class="md-success md-top-left" style="margin-top: 17px;"
									><router-link to="/CreateListing" exact>
										Create Listing</router-link
									></md-button>
							</div>
						</div>
						<div class="vertical-center header">
							<div class="md-list md-top-right" style="display: inline-block; float: right; margin-top: 0px;">
                <li class="md-list-item">
									<a href="javascript:void(0)"
									class="md-list-item-router md-list-item-container md-button-clean dropdown">
                  <md-button class="md-icon-button md-transparent" v-on:click="orderDate()">
                    <i class="material-icons">swap_vert</i>
                  </md-button>

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
													<a href="javascript:void(0)" >
													<i class="material-icons">layers</i>
													<p>
														Donor's Rating
													</p>
													</a>
												</li>
												<li>
													<a href="javascript:void(0)" v-on:click="orderDate()">
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

	          <div class="progress-pagination">
							<div class="md-layout">
								<div class="md-layout-item md-size-15 md-xsmall-size-30">
                      <header><strong>Filter By</strong></header>          
											<p>Location</p>
											<div class="flex-column">
												<md-checkbox value="East" v-model="location">East</md-checkbox><span>
												<md-checkbox value="North" v-model="location">North</md-checkbox></span>
												<md-checkbox value="South" v-model="location">South</md-checkbox><span>
												<md-checkbox value="West" v-model="location">West</md-checkbox></span>
												<md-checkbox value="Central" v-model="location">Central</md-checkbox>
											</div>
										<br>
											<p>Food Preference</p>
											<div class="flex-column">
												<md-checkbox value="Halal" v-model="food">Halal</md-checkbox>
												<md-checkbox value="Vegan" v-model="food">Vegan</md-checkbox>
												<md-checkbox value="Vegetarian" v-model="food">Vegetarian</md-checkbox>
												<md-checkbox value="No Eggs" v-model="food">No Eggs</md-checkbox>
												<md-checkbox value="No Peanuts" v-model="food">No Peanuts</md-checkbox>
												<md-checkbox value="No Shellfish" v-model="food">No Shellfish</md-checkbox>
											</div>
										<md-button class="md-raised md-primary" v-on:click="refresh()">Filter</md-button> 
                </div>

                <br>
                {{this.collections}}
								<div class="md-layout-item md-size-85 md-xsmall-size-45">
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
											  style="padding-right: 5%; "
										  >
											  <ExploreCard
												  class="md-layout-item donorcard"
												  :UID="UID"
												  :imgID="imageID"
											  ></ExploreCard>
										  </div>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from "../firebase.js";
import ExploreCard from "./components/ExploreCard";

export default {
  bodyClass: "explore-listing",
  data() {
    return {
      collections: {},
      header: require("@/assets/img/city-profile.jpg"),
      processing: true,
      location: [],
      food: [],
      sortCollection: {},
      desc: true
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

      //To fetch all data

      database
        .collection("donationIDs")
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
    },

    //to fetch the donationID and userID of the donation that meet the filter condition
    refresh: function() {

			var db = firebase.firestore();
      var newCollections = {};
      //filter location only
			if (this.location.length!=0 && this.food.length == 0) {
				var filteredData = db.collection("donationData").where("collectionLocation", "array-contains-any", this.location)
				filteredData.onSnapshot(snapshot => {
					snapshot.forEach(doc => {
            console.log(doc.id + "=>" + doc.data());
            var imagIDs = [];
            if (doc.data().userID in newCollections) {
              newCollections[doc.data()["userID"]].push(doc.id)
            }
            else {
              imagIDs.push(doc.id)
              newCollections[doc.data()["userID"]] = imagIDs 
            }
          });
          this.collections = newCollections;
          console.log(this.collections)
          this.processing = false;
        })
        //filter food only
      } else if (this.food.length > 0 && this.location.length == 0) {
        var item1 = this.food[0];
        var arr = [];
        var arr2 = []; //the final donationID that meet all the filtered restrictions
        //eliminate other donation data which do not meet the first criteria in dietary restriction 
        var filteredData = db.collection("donationData").where("dietaryRestrictions", "array-contains", item1)
				filteredData.onSnapshot(snapshot => {
					snapshot.forEach(doc => {
          console.log(doc.id + "=>" + doc.data());
          arr.push(doc.id)
          });
        });
        if (arr.length != 0 && this.food.length > 1) {
          //if there is data which meet the first criteria, fetch out the dietary restriction field
          for (i = 1; i<arr.length; i++) {
            var docID = arr[i];
            var meetCriteria = [];
            db.collection("donationData").doc(docID).get().then(doc => {
              meetCriteria = doc.dietaryRestrictions;
            })
            var count = 0;
            //check the dietary restrictions that was fetched out if meet all the restriction in this.food, count ++ for every met criteria  
            for ( j = 0; j < this.food.length; j++) {
              for ( k = 0; k < meetingCriteria.length; k ++) {
                if (meetingCriteria[k] == this.food[j]) {
                  count++;
                }
              }
            }
            //check the criteria that have met is same length as the this.food, if yes, the doc id meet all the restrictions in this.food
            if (x == this.food.length) {
              arr2.push(arr[i]);
            }
          }
        }
        //get userID and put the userID and donationID into this.collections
        for (let id = 0; id < arr2.length; id ++) {
          db.collection("donationData")
            .doc(arr2[id])
            .get()
            .then(items => {
              let item = items.data();
              var userid;
              userid = item["userID"];
              if (userid in newCollections) {
                newCollections.push(arr2[id])
              } else {
                newCollections[userid] = new Array(arr2[id]);
              }
            })
        }
        this.collections = newCollections;
        console.log(this.collections);
      } else {
        this.fetchItems();
        console.log(this.collections)
      }
    },
    
    //order the Date in format {{userID:
    /*
    orderDate: function() {
      var db = firebase.firestore();
      db.collection("donationData")
        .orderBy("expiry", "desc")
        .onSnapshot(snapshot => {
          let data = {};
          snapshot.forEach(doc => {
            let docID = [];
            let userid = doc.data().userID;
            if (userid in data) {
              data[userid].push(doc.id);
            } else {
              docID.push(doc.id)
              data[userid] = docID;
            }
          });
          this.collections = data
          console.log(this.collections);
        });
    }
    */
    orderDate: function() {
      var db = firebase.firestore();
      if (this.desc) {
        db.collection("donationData")
          .orderBy("expiry", "desc")
          .onSnapshot(snapshot => {
            let data = {};
            snapshot.forEach(doc => {
              console.log(doc.id + "=>" + doc.data());
              let userid = doc.data().userID;  
              data[doc.id] = userid;
            });
            this.sortCollection = data;
            this.desc = false;
            console.log(this.sortCollection);
          });
      } else {
        db.collection("donationData")
          .orderBy("expiry")
          .onSnapshot(snapshot => {
            let data = {};
            snapshot.forEach(doc => {
              console.log(doc.id + "=>" + doc.data());
              let userid = doc.data().userID;  
              data[doc.id] = userid;
            });
            this.sortCollection = data;
            this.desc = true;
            console.log(this.sortCollection);
          });
      }    
    }   
  },
	created() {
		this.fetchItems();
    this.refresh();
  }
}

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
