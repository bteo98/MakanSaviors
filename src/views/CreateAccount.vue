<template>
	<div class="wrapper" style="min-width: 900px">
		<parallax class="section header-filter" :style="headerStyle"> </parallax>
		<div class="main main-raised" style="min-width: 800px">
			<div class="section">
				<div class="container">
					<div class="features text-center">
						<h1 class="info-title">Welcome to MakanSaviour!</h1>
						<div class="md-layout">
							<div class="md-layout-item md-medium-size-33 md-small-size-100 mx-auto">
								<div class="info">
									<h2 class="info-title">
										Add a profile picture
									</h2>
									<div class="icon icon-info">
										<img :src="profile" alt="Rounded Image" class="img-raised rounded img-fluid" />
										<br /><br />
										<input id="profilepic" type="file" v-on:change="onFileChange" />
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
											<md-input v-model="firstName" type="text" required></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Last Name</label>
											<md-input v-model="lastName" type="text" required></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Telegram Handle</label>
											<md-input v-model="telegramHandle" type="text"></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Preferred Location</label>
											<md-select multiple v-model="preferredLocation">
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

			<div id="recaptcha-container"></div>
			<br />

			<div class="section section-contacts">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto">
							<h2 class="text-center title">
								Account Verification
							</h2>
							<p class="text-center">
								In order to protect the security of your account, please add your phone number. We
								will send you a text message with a verification code.
							</p>
							<form class="contact-form">
								<div class="md-layout">
									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Phone Number</label>
											<md-input v-model="phoneNumber" type="number" required></md-input>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Verification Code</label>
											<md-input v-model="verificationCode" type="text" required></md-input>
										</md-field>
									</div>
								</div>

								<div class="md-layout">
									<div class="md-layout-item md-size-33 mx-auto text-center">
										<md-button class="md-success" v-on:click="sendCode"
											>Send Verification Code</md-button
										>
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
											<md-select multiple v-model="dietaryRestrictions">
												<md-option value="Halal">Halal</md-option>
												<md-option value="Vegetarian">Vegetarian</md-option>
												<md-option value="Vegan">Vegan</md-option>
												<md-option value="Dairy Allergy">Lactose Intolerance</md-option>
												<md-option value="Peanut Allergy">Peanut Allergies</md-option>
												<md-option value="Shellfish Allergy">Shellfish Allergies</md-option>
												<md-option value="Others">Others</md-option>
											</md-select>
										</md-field>
									</div>

									<div class="md-layout-item md-size-50">
										<md-field>
											<label>Top 3 Food Categories</label>
											<md-select v-model="foodCategory" required multiple>
												<md-option value="Bento Boxes">Bento Boxes</md-option>
												<md-option value="Canned Food">Canned Food</md-option>
												<md-option value="Dairy">Dairy</md-option>
												<md-option value="Drinks">Drinks</md-option>
												<md-option value="Proteins">Proteins</md-option>
												<md-option value="Carbohydrates">Carbohydrates</md-option>
												<md-option value="Vegetables and Fruits">Vegetables/Fruits</md-option>
												<md-option value="Snacks">Snacks</md-option>
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
										<md-button class="md-success" v-on:click="verifyCode">Create Account</md-button>
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
			verificationCode: null,
			appVerifier: "",
			joinDate: new Date(),
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
			console.log(this.UID);
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
		createIDCollection: function() {
			database
				.collection("donationIDs")
				.doc(this.UID)
				.set({
					imageIDs: [],
				});
		},
		sendCode: function() {
			if (this.phoneNumber.length != 8) {
				alert("Invalid Phone Number Format!");
			} else {
				let countryCode = "+65"; //Singapore
				let phoneNumber = countryCode + this.phoneNumber;
				let appVerifier = this.appVerifier;

				firebase
					.auth()
					.signInWithPhoneNumber(phoneNumber, appVerifier)
					.then((confirmationResult) => {
						// SMS sent. Prompt user to type the code from the message, then sign the
						// user in with confirmationResult.confirm(code).
						window.confirmationResult = confirmationResult;
						alert("SMS sent");
					})
					.catch((error) => {
						alert("Error ! SMS not sent");
					});
			}
		},
		verifyCode: function() {
			if (this.phoneNumber.length != 8 || this.verificationCode.length != 6) {
				alert("Invalid Phone Number/OTP Format!");
			} else {
				let vm = this;
				let code = this.verificationCode;
				window.confirmationResult
					.confirm(code)
					.then((result) => {
						// User signed in successfully.
						var user = result.user;
						user.delete();
						firebase
							.auth()
							.signInWithEmailAndPassword(this.$route.params.email, this.$route.params.uniqueNo);
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
								joinDate: this.joinDate,
							})
							.then(() => {
								this.createIDCollection();
								this.pushProfilePic();
								this.$router.push("/");
							});
					})
					.catch((error) => {
						alert("Wrong verification code!");
					});
			}
		},
		initReCaptcha: function() {
			setTimeout(() => {
				let vm = this;
				window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier("recaptcha-container", {
					size: "invisible",
					callback: function(response) {
						// reCAPTCHA solved, allow signInWithPhoneNumber.
						// ...
					},
					"expired-callback": function() {
						// Response expired. Ask user to solve reCAPTCHA again.
						// ...
					},
				});
				//
				this.appVerifier = window.recaptchaVerifier;
			}, 1000);
		},
	},
	created() {
		this.getUID();
		this.initReCaptcha();
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

img {
	width: 50%;
}
</style>
