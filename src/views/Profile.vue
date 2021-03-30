<template>
	<div class="wrapper">
		<parallax class="section page-header header-filter" :style="headerStyle"></parallax>
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
											Rating: {{ this.avgRatings }} ({{ this.numRatings }}
											Reviews)
											<br />
											Join Date: {{ this.joinDate }}
											<br />
											Region: {{ this.preferredLocation }}
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
							:tab-name="['Reviews']"
							:tab-icon="['favorite']"
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
						</tabs>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {Tabs} from "@/components";
import firebase from "firebase";
var database = firebase.firestore();

export default {
	components: {
		Tabs,
	},
	bodyClass: "profile-page",
	data() {
		return {
			tabPane1: [
				{image: require("@/assets/img/examples/studio-1.jpg")},
				{image: require("@/assets/img/examples/studio-2.jpg")},
				{image: require("@/assets/img/examples/studio-4.jpg")},
				{image: require("@/assets/img/examples/studio-5.jpg")},
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
			profilePic: require("@/assets/img/faces/unknown.jpg"),
			preferredLocation: null,
			joinDate: null,
			rating: null,
			totalRatings: null,
			numRatings: null,
			avgRatings: null,
		};
	},
	props: {
		header: {
			type: String,
			default: require("@/assets/img/city-profile.jpg"),
		},
	},
	computed: {
		headerStyle() {
			return {
				backgroundImage: `url(${this.header})`,
				profile: require("@/assets/img/faces/unknown.jpg"),
				UID: "",
			};
		},
	},
	methods: {
		getUID: function() {
			this.UID = firebase.auth().currentUser.uid;
		},
		getProfilePic: function() {
			var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
			storageRef.getDownloadURL().then((url) => {
				this.profilePic = url;
			});
		},
		getUserData: function() {
			database
				.collection("users")
				.doc(this.UID)
				.get()
				.then((doc) => {
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
					this.totalRatings = data.totalRatings;
					this.numRatings = data.numRatings;
					this.joinDate = this.getDate(data.joinDate);
					this.avgRatings = this.getAvgRatings(this.totalRatings, this.numRatings);
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
		getAvgRatings: function(total, num) {
			if (num == 0) {
				return "";
			} else {
				return (total / num).toFixed(1);
			}
		},
	},
	created() {
		this.getUID();
		this.getProfilePic();
		this.getUserData();
	},
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
