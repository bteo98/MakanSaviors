<template>
	<div class="wrapper" style="height: 100vh;">
		<div class="section page-header header-filter" :style="headerStyle">
			<div class="container">
				<div class="md-layout">
					<div
						class="md-layout-item md-size-33 md-small-size-66 md-xsmall-size-100 md-medium-size-40 mx-auto"
					>
						<login-card header-color="green">
							<h4 slot="title" class="card-title">
								Reset Password
							</h4>

							<md-field class="md-form-group" slot="inputs" v-if="!reset">
								<md-icon>email</md-icon>
								<label>Email...</label>
								<md-input v-model="email" type="email"></md-input>
							</md-field>

							<p v-if="!reset" slot="description" class="description">
								Please input your email address
							</p>

							<p v-if="reset" slot="footer-description">
								A verification email has been sent to this email address
								{{ email }}. Please verify it.
							</p>

							<div slot="errors" class="errors" v-if="errors.length && !reset">
								<br />
								<p>
									<b>Please correct the following error(s):</b>
								</p>
								<ul>
									<li :key="error.id" v-for="error in errors">
										{{ error }}
									</li>
								</ul>
							</div>
							<md-button
								slot="footer"
								class="md-simple md-success md-lg"
								v-on:click="resetPassword"
								v-if="!reset"
							>
								Reset
							</md-button>
						</login-card>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import {LoginCard} from "@/components";
import firebase from "../firebase.js";

export default {
	components: {
		LoginCard,
	},
	bodyClass: "login-page",
	data() {
		return {
			email: null,
			reset: false,
			errors: [],
		};
	},
	props: {
		header: {
			type: String,
			default: require("@/assets/img/food5.jpg"),
		},
	},
	methods: {
		resetPassword() {
			var auth = firebase.auth();
			var emailAddress = this.email;
			this.errors = [];
			self = this;

			auth
				.sendPasswordResetEmail(emailAddress)
				.then(function() {
					self.reset = true;
				})
				.catch(function(error) {
					if (error.code == "auth/invalid-email") {
						self.errors.push("Invalid Email Address");
					} else if (error.code == "auth/user-not-found") {
						self.errors.push("No user corresponding to the email address");
					}
				});
		},
	},
	computed: {
		headerStyle() {
			return {
				backgroundImage: `url(${this.header})`,
			};
		},
	},
};
</script>

<style lang="css"></style>
