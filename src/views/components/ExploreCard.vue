<template>
	<md-card id="explore-card">
		<md-card-content>
			<div class="md-layout">
				<div class="md-layout-item">
					<div v-if="!processing">
						<img
							v-bind:src="this.getImage"
							@error="onImageLoadFailure()"
							v-on:click="pushToDetails"
							class="rounded"
							:class="{'responsive-image': responsive}"
						/>
						<div class="text">
							<small>Food Description:</small>
							{{ data["foodName"] }}<br />
							<div class="username">
								<small>Donor Name:</small>
								{{
									data["firstName"].charAt(0).toUpperCase() +
										data["firstName"].slice(1).toLowerCase() +
										" " +
										data["lastName"].charAt(0).toUpperCase() +
										data["lastName"].slice(1).toLowerCase()
								}}<br />
							</div>
							<small>Collection Location:</small>
							{{ data["location"].join(", ") }}<br />
							<small>Quantity Avaliable:</small>
							{{ data["quantity"] }}<br />
							<small class="text-description">Expiry Date/Time:</small>
							{{ data["expiry"].toString().slice(0, 21) }}<br />
						</div>
					</div>
				</div>
			</div>
			<slot name="content"></slot>
		</md-card-content>
	</md-card>
</template>

<script>
import firebase from "../../firebase";

export default {
	name: "explore-card",
	data() {
		return {
			imgRef: "",
			expiryDate: "",
			processing: true,
			responsive: false,
			imgErr: false,
			unknown: require("@/assets/img/unknown.jpg"),
		};
	},
	props: {
		data: {type: Object},
	},
	methods: {
		fetchItems: function() {
			console.log(this.data);
			var storage = firebase.storage();
			let imgPath = storage.ref(this.data.donorID + "/donationImages/" + this.data.foodID);

			imgPath.getDownloadURL().then((url) => {
				this.imgRef = url;
			});

			var database = firebase.firestore();

			database
				.collection("users")
				.doc(this.data.donorID)
				.get()
				.then((doc) => {
					doc = doc.data();
					this.data["firstName"] = doc.firstName;
					this.data["lastName"] = doc.lastName;
					console.log(this.data["firstName"]);
					this.processing = false;
				});
		},
		pushToDetails() {
			let path = `fooddetail/${this.data.donorID}/${this.data.foodID}`;
			this.$router.push({
				path: path,
			});
		},
		onResponsiveInverted() {
			if (window.innerWidth < 600) {
				this.responsive = true;
			} else {
				this.responsive = false;
			}
		},
		onImageLoadFailure() {
			this.imgErr = true;
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

.username {
	cursor: pointer;
}

.username:hover {
	color: #4caf50;
}

img:hover {
	cursor: pointer;
}

.text {
	display: inline-block;
	max-width: 70%;
	padding: 26px 0;
	padding-left: 30px;
}

#explore-card {
	max-width: 450px !important;
	width: 450px !important;
	padding-left: 0%;
}

.text-description {
	font-size: 15px !important;
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
