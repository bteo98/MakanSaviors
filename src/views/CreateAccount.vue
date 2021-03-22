<template>
	<div class="wrapper">
		<parallax class="section page-header header-filter" :style="headerStyle">
			<div class="container">
				<div class="md-layout">
					<div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
						<h1 class="title">Let us know you better!</h1>
						<h4>
							You are just a step away from creating your MakanSaviour account.
						</h4>
					</div>
				</div>
			</div>
		</parallax>
		<div class="main main-raised">
			<div class="section">
				<div class="container">
					<div class="features text-center">
						<h1 class="info-title">Welcome to MakanSaviour!</h1>
						<div class="md-layout">
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="info">
									<h2 class="info-title">
										Add a profile picture
									</h2>
									<div class="icon icon-info">
										<img
											:src="profile"
											alt="Rounded Image"
											class="img-raised rounded img-fluid"
										/>
										<br /><br />
										<input
											id="profilepic"
											type="file"
											v-on:change="onFileChange"
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="section section-contacts">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
							<h2 class="text-center title">
								Personal Information
							</h2>
							<form class="contact-form">
								<div class="md-layout">
									<div class="md-layout-item md-size-50">
										<md-field>
											<label>First Name</label>
											<md-input
												v-model="firstName"
												type="text"
												required
											></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Last Name</label>
											<md-input
												v-model="lastName"
												type="text"
												required
											></md-input>
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
											<label>Preferred Location</label>
											<md-select v-model="preferredLocation" multiple required>
												<md-option value="Central">Central</md-option>
												<md-option value="East">East</md-option>
												<md-option value="North">North</md-option>
												<md-option value="South">South</md-option>
												<md-option value="West">West</md-option>
											</md-select>
										</md-field>
									</div>
									
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>

			<div class="section section-contacts">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
							<h2 class="text-center title">
								Additional Information
							</h2>
							<form class="contact-form">
								<div class="md-layout">
									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Dietary Restriction(s)</label>
											<md-select v-model="dietaryRestrictions" multiple>
												<md-option value="None">None</md-option>
												<md-option value="Diabetic">Diabetic</md-option>
												<md-option value="Gluten Free"
													>Gluten Free</md-option
												>
												<md-option value="Halal">Halal</md-option>
												<md-option value="Kosher">Kosher</md-option>
												<md-option value="Lactose Intolerance"
													>Lactose Intolerance</md-option
												>
												<md-option value="Peanut Allergy"
													>Peanut Allergies</md-option
												>
												<md-option value="Vegetarian">Vegetarian</md-option>
												<md-option value="Others">Others</md-option>
											</md-select>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Top 3 Food Categories</label>
											<md-select v-model="foodCategory" multiple>
												<md-option value="Baking Needs"
													>Baking Needs</md-option
												>
												<md-option value="Biscuits">Biscuits</md-option>
												<md-option value="Buffet/Bento Boxes"
													>Buffet/Bento Boxes</md-option
												>
												<md-option value="Canned Food"
													>Canned Food</md-option
												>
												<md-option value="Dairy, Chilled, Eggs"
													>Dairy, Chilled, Eggs</md-option
												>
												<md-option value="Drinks">Drinks</md-option>
												<md-option value="Frozen Food"
													>Frozen Food</md-option
												>
												<md-option value="Fruits">Fruits</md-option>
												<md-option value="Meat, Seafood"
													>Meat, Seafood</md-option
												>
												<md-option value="Rice, Noodles"
													>Rice, Noodles</md-option
												>
												<md-option value="Seasonings">Seasonings</md-option>
												<md-option value="Vegetables">Vegetables</md-option>
												<md-option value="Others">Others</md-option>
											</md-select>
										</md-field>
									</div>
								</div>

								<md-field maxlength="5">
									<label>Reason to Donate</label>
									<md-textarea v-model="reasonDonate" md-autogrow></md-textarea>
								</md-field>

								<md-field maxlength="5">
									<label>Reason to Save</label>
									<md-textarea v-model="reasonSave" md-autogrow></md-textarea>
								</md-field>

								<div class="md-layout">
									<div class="md-layout-item md-size-33 mx-auto text-center">
										<md-button class="md-success" v-on:click="addUserData"
											>Create Account</md-button
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
			firstName: null,
			lastName: null,
			phoneNumber: null,
			telegramHandle: null,
			preferredLocation: null,
			dietaryRestrictions: null,
			foodCategory: null,
			reasonDonate: null,
			reasonSave: null,
			profile: require("@/assets/img/faces/unknown.jpg"),
			file: null,
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
		addUserData: function() {
			database
				.collection("users")
				.doc(this.UID)
				.update({
					firstName: this.firstName,
					lastName: this.lastName,
					phoneNumber: this.phoneNumber,
					telegramHandle: this.telegramHandle,
					preferredLocation: this.preferredLocation,
					dietaryRestrictions: this.dietaryRestrictions,
					foodCategory: this.foodCategory,
					reasonDonate: this.reasonDonate,
					reasonSave: this.reasonSave,
				})
				.then(() => {
					this.pushProfilePic();
					this.$router.push("/landing");
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

		// when create account button pressed, push profile pic to firebase storage
		pushProfilePic: function() {
			var storageRef = firebase.storage().ref(this.UID + "/profilePicture");
			var uploadTask = storageRef.put(this.file);
		},
	},
	created() {
		this.getUID();
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
</style>
