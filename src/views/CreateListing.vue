<template>
	<div class="wrapper">
		<parallax class="section header-filter" :style="headerStyle"> </parallax>
		<div class="main main-raised">
			<div class="section">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
							<h2 class="text-center title">
								Create a New Listing
							</h2>
							<form class="contact-form">
								<div class="md-layout">
									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Listing Name</label>
											<md-input
												v-model="listingName"
												type="text"
												required
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Quantity Available</label>
											<md-input
												v-model="quantity"
												type="text"
												required
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Expiry Date & Time</label>
											<md-input
												v-model="expiry"
												type="text"
												required=""
												onfocus="this.type='datetime-local'"
												onblur="if(this.value==='')this.type='text'"
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Collection Location</label>
											<select v-model="collectionLocation" multiple required>
												<option value="Central">Central</option>
												<option value="East">East</option>
												<option value="North">North</option>
												<option value="South">South</option>
												<option value="West">West</option>
											</select>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Phone Number</label>
											<md-input
												v-model="phoneNumber"
												type="number"
												required
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Telegram Handle</label>
											<md-input
												v-model="telegramHandle"
												type="text"
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Dietary Restriction(s)</label>
											<select v-model="dietaryRestrictions" required multiple>
												<option value="None">None</option>
												<option value="Diabetic">Diabetic</option>
												<option value="Gluten Free">Gluten Free</option>
												<option value="Halal">Halal</option>
												<option value="Kosher">Kosher</option>
												<option value="Lactose Intolerance"
													>Lactose Intolerance</option
												>
												<option value="Peanut Allergy"
													>Peanut Allergies</option
												>
												<option value="Vegetarian">Vegetarian</option>
												<option value="Others">Others</option>
											</select>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<br />
										<input
											id="listingImage"
											type="file"
											v-on:change="onFileChange"
										/>
									</div>
								</div>

								<md-field maxlength="5">
									<label>Remarks</label>
									<md-textarea v-model="remarks" md-autogrow></md-textarea>
								</md-field>

								<div class="md-layout">
									<div class="md-layout-item md-size-33 mx-auto text-center">
										<md-button class="md-success" v-on:click="createListing"
											>Create Listing</md-button
										>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import firebase from "firebase";
var database = firebase.firestore();

export default {
	bodyClass: "landing-page",
	props: {
		header: {
			type: String,
			default: require("@/assets/img/bg7.jpg"),
		},
	},
	data() {
		return {
			UID: null,
			listingName: null,
			quantity: null,
			expiry: null,
			collectionLocation: null,
			phoneNumber: null,
			telegramHandle: null,
			dietaryRestrictions: null,
			remarks: null,
			profile: null,
			file: null,
			currID: null,
			allIDs: null,
			datePosted: new Date(),
		};
	},
	computed: {
		headerStyle() {
			return {
				backgroundImage: `url(${this.header})`,
			};
		},
	},
	methods: {
		getUID: function() {
			this.UID = firebase.auth().currentUser.uid;
		},
		getAllIDs: function() {
			database
				.collection("donationIDs")
				.doc(this.UID)
				.get()
				.then((doc) => {
					this.allIDs = doc.data().imageIDs;
				});
		},
		createListing: function() {
			database
				.collection("donationData")
				.add({
					listingName: this.listingName,
					quantity: this.quantity,
					expiry: this.expiry,
					collectionLocation: this.collectionLocation,
					phoneNumber: this.phoneNumber,
					telegramHandle: this.telegramHandle,
					dietaryRestrictions: this.dietaryRestrictions,
					remarks: this.remarks,
					datePosted: this.datePosted,
					userID: this.UID,
				})
				.then((doc) => {
					this.currID = doc.id;
					this.allIDs.push(this.currID);
					this.updateImageIDs();
					this.pushListingImage();
					this.$router.push("/");
				});
		},
		// when file changes, create image on site
		onFileChange: function(e) {
			this.file = e.target.files[0];
			var reader = new FileReader();
			reader.onload = (ev) => {
				this.profile = ev.target.result;
			};
			reader.readAsDataURL(this.file);
		},
		// when create listing button pressed, push listing image to firebase storage
		pushListingImage: function() {
			var storageRef = firebase.storage().ref(this.UID + "/donationImages/" + this.currID);
			var uploadTask = storageRef.put(this.file);
		},
		updateImageIDs: function() {
			database
				.collection("donationIDs")
				.doc(this.UID)
				.update({
					imageIDs: this.allIDs,
				});
		},
	},
	created() {
		this.getUID();
		this.getAllIDs();
	},
};
</script>

<style lang="scss" scoped>
.md-card-actions.text-center {
	display: flex;
	justify-content: center !important;
}

.contact-form {
	margin-top: 30px;
}

.md-has-textarea + .md-layout {
	margin-top: 15px;
}

.md-select {
	.md-option {
		font-size: 10px;
	}
}

.dropdown {
	display: block;
	font-size: 14px;
	font-family: sans-serif;
	color: #444;
	line-height: 1.5;
	padding: 0.6em 1.4em 0.5em 1.2em;
	width: 100%;
	max-width: 100%; /* useful when width is set to anything other than 100% */
	box-sizing: border-box;
	margin: 0;
	border: 0px solid #aaa;
	box-shadow: 0 1px 0 1px rgba(0, 0, 0, 0.04);
	-moz-appearance: none;
	-webkit-appearance: none;
	appearance: none;
	background-color: #fff;
}
</style>
