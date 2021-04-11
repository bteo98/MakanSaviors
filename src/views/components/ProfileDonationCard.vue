<template>
	<md-card id="explore-card">
		<md-card-content>
			<div class="md-layout">
				<div class="md-layout-item">
					<i class="material-icons close" v-on:click="deleteListing">delete_outline</i>
					<div>
						<img
							v-bind:src="this.getImage"
							@error="onImageLoadFailure()"
							v-on:click="pushToDetails"
							class="rounded"
							:class="{'responsive-image': responsive}"
						/>
						<div class="text text-description">
							<small class="text-description">Food Description:</small>
							{{ this.data["data"].listingName }}<br />
							<small class="text-description">Donor Name:</small>
							{{
								firstName.charAt(0).toUpperCase() +
									firstName.slice(1).toLowerCase() +
									" " +
									lastName.charAt(0).toUpperCase() +
									lastName.slice(1).toLowerCase()
							}}<br />
							<small class="text-description">Expiry:</small>
							{{ this.getDate(this.data["data"]["expiry"]) }}<br />
							<small class="text-description">Posted:</small>
							{{ this.getDate(this.data["data"]["datePosted"]) }}<br />
						</div>
					</div>
					<badge
						type="rose first-button status"
						v-if="this.checkExpiry(this.data['data']['expiry']) == 'expired'"
						>Expired</badge
					>
				</div>
			</div>
		</md-card-content>
	</md-card>
</template>

<script>
import firebase from "../../firebase";
import {Badge} from "@/components";

export default {
	name: "explore-card",
	data() {
		return {
			imgRef: "",
			firstName: "",
			lastName: "",
			responsive: false,
			imgErr: false,
			unknown: require("@/assets/img/unknown.jpg"),
		};
	},
	props: {
		data: {type: Object},
		requestView: {type: Boolean},
	},
	methods: {
		fetchItems: function() {
			// get image
			this.imgRef = this.data["url"];
			var database = firebase.firestore();
			// get user info
			database
				.collection("users")
				.doc(this.data["uid"])
				.get()
				.then((items) => {
					let item = items.data();
					this.firstName = item["firstName"];
					this.lastName = item["lastName"];
				});
		},

		onResponsiveInverted() {
			if (window.innerWidth < 600) {
				this.responsive = true;
			} else {
				this.responsive = false;
			}
		},
		getDate: function(inputDate) {
			var milliseconds = inputDate.seconds * 1000;
			var dateObj = new Date(milliseconds);
			return dateObj.toString().slice(0, 21);
		},
		checkExpiry: function(expiryDate) {
			var today = new Date();
			var expiryDate = new Date(expiryDate.seconds * 1000);
			if (expiryDate < today) {
				return "expired";
			} else {
				return "safe";
			}
		},
		onImageLoadFailure() {
			this.imgErr = true;
		},
		pushToDetails() {
			let path = `/fooddetail/${this.data.uid}/${this.data.imageID}`;
			this.$router.push({
				path: path,
			});
		},
		deleteListing() {
			var db = firebase.firestore();

			let saveRequest = "donorRequest/" + this.UID + "/foodSaved";
			db.collection(saveRequest)
				.doc(this.data.foodID)
				.delete();
		},
	},
	computed: {
		getImage() {
			if (this.imgErr) {
				return this.unknown;
			} else {
				return this.imgRef;
			}
		},
	},
	components: {
		Badge,
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
	},
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

.close {
	float: right;
}

.close:hover {
	color: #f44336;
	cursor: pointer;
}
</style>
