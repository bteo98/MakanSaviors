<template>
	<div class="wrapper" style="min-width: 900px">
		<parallax class="section header-filter" :style="headerStyle"> </parallax>
		<div class="main main-raised" style="min-width: 800px">
			<div class="section">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item">
							<div class="vertical-center header">
								<md-button
									class="md-success md-top-left"
									style="margin-top: 30px;"
									v-on:click="pushToCreateListing()"
								>
									Create New Listing</md-button
								>
								<div
									class="md-list md-top-right"
									style="display: inline-block; float: right; margin-top: 0px;"
								>
									<li class="md-list-item">
										<a
											href="javascript:void(0)"
											class="md-list-item-router md-list-item-container md-button-clean dropdown"
										>
											<md-button class="md-icon-button md-success" v-on:click="orderDate()">
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
															<a href="javascript:void(0)">
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
						</div>
					</div>

					<div class="progress-pagination">
						<div class="md-layout">
							<div class="md-layout-item md-size-15 md-xsmall-size-30">
								<header><strong>Filter By</strong></header>
								<p>Location</p>
								<div class="flex-column">
									<md-checkbox value="East" v-model="locationFilter">East</md-checkbox
									><span>
										<md-checkbox value="North" v-model="locationFilter">North</md-checkbox></span
									>
									<md-checkbox value="South" v-model="locationFilter">South</md-checkbox
									><span>
										<md-checkbox value="West" v-model="locationFilter">West</md-checkbox></span
									>
									<md-checkbox value="Central" v-model="locationFilter">Central</md-checkbox>
								</div>
								<br />
								<p>Food Preference</p>
								<div class="flex-column">
									<md-checkbox value="Halal" v-model="dietaryFilter">Halal</md-checkbox>
									<md-checkbox value="Vegan" v-model="dietaryFilter">Vegan</md-checkbox>
									<md-checkbox value="Vegetarian" v-model="dietaryFilter">Vegetarian</md-checkbox>
									<md-checkbox value="No Eggs" v-model="dietaryFilter">No Eggs</md-checkbox>
									<md-checkbox value="No Peanuts" v-model="dietaryFilter">No Peanuts</md-checkbox>
									<md-checkbox value="No Shellfish" v-model="dietaryFilter"
										>No Shellfish</md-checkbox
									>
								</div>
								<md-button class="md-raised md-success" v-on:click="filter">Filter</md-button>
							</div>
							<br />
							<div class="item-listing">
								<ul v-if="!processing" id="itemsList">
									<li class="md-layout" v-for="(item, index) in collections" :key="index">
										<div class="md-layout" style="padding-right: 5%;">
											<ExploreCard class="md-layout-item requestcard" :data="item"></ExploreCard>
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
</template>

<script>
import firebase from "../firebase.js";
import ExploreCard from "./components/ExploreCard";

export default {
	bodyClass: "explore-listing",
	data() {
		return {
			header: require("@/assets/img/city-profile.jpg"),
			processing: true,
			locationFilter: [],
			dietaryFilter: [],
			collections: [],
			desc: true,
		};
	},
	components: {
		ExploreCard,
	},
	computed: {
		headerStyle() {
			return {
				backgroundImage: `url(${this.header})`,
			};
		},
	},
	methods: {
		fetchItems() {
			var db = firebase.firestore();

			db.collection("donationData").onSnapshot((snapshot) => {
				this.collections = [];

				snapshot.forEach((doc) => {
					let data = {};

					data["foodID"] = doc.id;
					doc = doc.data();
					data["location"] = doc.collectionLocation;
					data["donorID"] = doc.userID;
					data["expiry"] = new Date(doc.expiry.toDate().toLocaleString("en-US"));
					data["foodName"] = doc.listingName;
					data["quantity"] = doc.quantity;
					this.collections.push(data);
				});
				console.log("initial");
				console.log(this.collections);
				this.processing = false;
			});
		},
		filter() {
			this.processing = true;
			var db = firebase.firestore();

			var collect = db.collection("donationData");

			if (this.locationFilter.length != 0) {
				console.log(this.locationFilter);
				collect = collect.where("collectionLocation", "array-contains-any", this.locationFilter);
			}
			if (this.dietaryFilter.length != 0) {
				console.log(this.dietaryFilter);
				collect = collect.where("dietaryRestrictions", "array-contains-any", this.dietaryFilter);
			}

			collect.onSnapshot((snapshot) => {
				this.collections = [];

				snapshot.forEach((doc) => {
					let data = {};

					data["foodID"] = doc.id;
					doc = doc.data();
					data["location"] = doc.collectionLocation;
					data["donorID"] = doc.userID;
					data["expiry"] = new Date(doc.expiry.toDate().toLocaleString("en-US"));
					data["foodName"] = doc.listingName;
					data["quantity"] = doc.quantity;
					this.collections.push(data);
				});
				console.log("filter");
				console.log(this.collections);
				this.processing = false;
			});
		},
		pushToCreateListing: function() {
			let path = `/createlisting`;
			this.$router.replace({
				path: path,
			});
		},
	},
	created() {
		this.fetchItems();
	},
};
</script>

<style lang="scss" scoped>
.item-listing {
	max-width: 85%;
}

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
