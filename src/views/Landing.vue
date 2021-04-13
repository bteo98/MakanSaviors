<template>
	<div class="wrapper">
		<parallax class="section page-header header-filter" :style="headerStyle">
			<div class="container">
				<div class="md-layout header-section">
					<div class="md-layout-item md-size-50 md-small-size-70 md-xsmall-size-100">
						<h1 class="title">Share More.<br />Save More.<br />Waste Less.</h1>
						<h4>
							Whether you are a donor or a saviour, we can all do our part to reduce food waste in
							Singapore.
						</h4>
					</div>
					<img
						class="header-image"
						:src="logo"
						alt="Sharing Care"
						style="float: right; margin: 0px 0px 100px 100px;"
						width="300"
					/>
				</div>
			</div>
		</parallax>
		<div class="main main-raised">
			<div class="section">
				<div class="container">
					<div class="md-layout">
						<div class="md-layout-item md-size-66 md-xsmall-size-100 mx-auto text-center">
							<h2 class="title text-center">We empower you to<br />reduce food waste</h2>
							<h5 class="description">
								We wish to connect individuals with each other so that surplus food can be shared,
								not thrown away. We believe that small actions can lead to big change. Collectively,
								we can reduce food waste as a nation and build a more sustainable future.
							</h5>
						</div>
					</div>
					<div class="features text-center">
						<div class="md-layout">
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="info">
									<div class="icon icon-info">
										<md-icon>connect_without_contact</md-icon>
									</div>
									<h4 class="info-title">Share</h4>
									<p>
										Simply list your surplus food on the webpage or browse through all available
										food listings to select your desired items.
									</p>
								</div>
							</div>
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="info">
									<div class="icon icon-success">
										<md-icon>verified_user</md-icon>
									</div>
									<h4 class="info-title">Verified Users</h4>
									<p>
										Users are verified upon sign up to give you a peace of mind as we work towards a
										zero-waste world
									</p>
								</div>
							</div>
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="info">
									<div class="icon icon-danger">
										<md-icon>security</md-icon>
									</div>
									<h4 class="info-title">Data Protection</h4>
									<p>
										Donate and save with confidence as your data is securely encrypted under 256-bit
										Advanced Encryption standard
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="section">
				<div class="features text-center">
					<h2 class="title text-center">Reviews</h2>
					<div class="md-layout">
						<div class="md-layout-item md-size-66 mx-auto md-small-size-100">
							<div style="padding: 0 15px;">
								<md-card>
									<carousel
										:per-page="1"
										loop
										:speed="700"
										autoplay
										:autoplay-timeout="5000"
										:mouse-drag="false"
										navigationEnabled
										navigationNextLabel="<i class='material-icons'>keyboard_arrow_right</i>"
										navigationPrevLabel="<i class='material-icons'>keyboard_arrow_left</i>"
									>
										<slide>
											<div class="carousel-caption">
												<img
													:src="elizabeth"
													alt="User1"
													style="width:150px; height:150px; border-radius: 50%; padding: 5px;"
												/>
												<h4>
													Sharing food feels amazing! I love meeting different people who come to
													pick-up<br />my food and the interesting conversations that takes place on
													the doorstep <br /><br />-Elizabeth
												</h4>
											</div>
											<img :src="carousel" alt="carousel" class="carousel-background" />
										</slide>
										<slide>
											<div class="carousel-caption">
												<img
													backgroud-image:
													:src="claire"
													alt="User2"
													style="border-radius: 50%; height: 150px; width: 150px; padding: 5px;"
												/>
												<h4>
													MakanSaviors brings people from all walks of life together, to achieve
													a<br />common goal - to reduce food waste and build food sharing
													communities! <br /><br />-Claire
												</h4>
											</div>
											<img :src="carousel" alt="carousel" class="carousel-background" />
										</slide>
										<slide>
											<div class="carousel-caption">
												<img
													:src="steven"
													alt="User3"
													style="width:150px; height:150px; border-radius: 50%; padding: 5px;"
												/>
												<h4>
													Thanks to MakanSaviors, the unused food items at home did not end<br />up
													in the trash and are now with someone who needs them more
													<br /><br />-Steven
												</h4>
											</div>
											<img :src="carousel" alt="carousel" class="carousel-background" />
										</slide>
									</carousel>
								</md-card>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="section text-center mx-auto">
				<div class="container">
					<h2 class="title">Here is our team</h2>
					<div class="team">
						<div class="md-layout">
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="team-player">
									<md-card class="md-card-plain">
										<div class="md-layout-item md-size-50 mx-auto">
											<img
												:src="teamImg1"
												alt="Thumbnail Image"
												class="img-raised rounded-circle img-fluid"
											/>
										</div>
										<h4 class="card-title">
											Bryan Teo
										</h4>

										<md-card-actions class="text-center">
											<md-button
												href="https://www.linkedin.com/in/bryan-teo-8a5340129/"
												class="md-just-icon md-simple"
											>
												<i class="fab fa-linkedin"></i>
											</md-button>
											<md-button href="https://github.com/bteo98" class="md-just-icon md-simple">
												<i class="fab fa-github"></i>
											</md-button>
										</md-card-actions>
									</md-card>
								</div>
							</div>

							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="team-player">
									<md-card class="md-card-plain">
										<div class="md-layout-item md-size-50 mx-auto">
											<img
												:src="teamImg2"
												alt="Thumbnail Image"
												class="img-raised rounded-circle img-fluid"
											/>
										</div>
										<h4 class="card-title">
											Daryl Tan
										</h4>
										<md-card-actions class="text-center">
											<md-button
												href="https://www.linkedin.com/in/tan-daryl/"
												class="md-just-icon md-simple"
											>
												<i class="fab fa-linkedin"></i>
											</md-button>
											<md-button href="https://github.com/daryl-tan" class="md-just-icon md-simple">
												<i class="fab fa-github"></i>
											</md-button>
										</md-card-actions>
									</md-card>
								</div>
							</div>
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="team-player">
									<md-card class="md-card-plain">
										<div class="md-layout-item md-size-50 mx-auto">
											<img
												:src="teamImg3"
												alt="Thumbnail Image"
												class="img-raised rounded-circle img-fluid"
											/>
										</div>
										<h4 class="card-title">
											Alicia Toh
										</h4>
										<md-card-actions class="text-center">
											<md-button
												href="https://www.linkedin.com/in/alicia-toh-43584320b/"
												class="md-just-icon md-simple"
											>
												<i class="fab fa-linkedin"></i>
											</md-button>
											<md-button href="https://github.com/xxalicia" class="md-just-icon md-simple">
												<i class="fab fa-github"></i>
											</md-button>
										</md-card-actions>
									</md-card>
								</div>
							</div>
							<div class="md-layout-item md-medium-size-33 md-small-size-100">
								<div class="team-player">
									<md-card class="md-card-plain">
										<div class="md-layout-item md-size-50 mx-auto">
											<img
												:src="teamImg4"
												alt="Thumbnail Image"
												class="img-raised rounded-circle img-fluid"
											/>
										</div>
										<h4 class="card-title">
											Tan Zhi Qi
										</h4>
										<md-card-actions class="text-center">
											<md-button
												href="https://www.linkedin.com/in/zhi-qi-tan-658378153/"
												class="md-just-icon md-simple"
											>
												<i class="fab fa-linkedin"></i>
											</md-button>
											<md-button href="https://github.com/zhiqitan" class="md-just-icon md-simple">
												<i class="fab fa-github"></i>
											</md-button>
										</md-card-actions>
									</md-card>
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
export default {
	bodyClass: "landing-page",
	props: {
		header: {
			type: String,
			default: require("@/assets/img/food9.jpg"),
		},
		claire: {
			type: String,
			default: require("@/assets/img/faces/claire.jpg"),
		},
		elizabeth: {
			type: String,
			default: require("@/assets/img/faces/elizabeth.jpg"),
		},
		steven: {
			type: String,
			default: require("@/assets/img/faces/steven.jpg"),
		},
		teamImg1: {
			type: String,
			default: require("@/assets/img/faces/card-profile1-square.jpg"),
		},
		teamImg2: {
			type: String,
			default: require("@/assets/img/faces/marc.jpg"),
		},
		teamImg3: {
			type: String,
			default: require("@/assets/img/faces/kendall.jpg"),
		},
		teamImg4: {
			type: String,
			default: require("@/assets/img/faces/christian.jpg"),
		},
	},

	data() {
		return {
			reviews: [],
			carousel: require("@/assets/img/food7.jpg"),
			logo: require("@/assets/img/logo.png"),
		};
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

<style lang="scss" scoped>
.md-card-actions.text-center {
	display: flex;
	justify-content: center !important;
}

.md-has-textarea + .md-layout {
	margin-top: 15px;
}

#feature {
	text-align: left;
	transform: rotate(-90deg);
	position: absolute;
	left: -90px;
	margin-top: 100px;
}

#stories {
	margin-left: 50px;
}

.feedback {
	max-width: 360px;
	margin: 0 auto;
	text-align: center;
	padding: 20px;
	//padding-right: 10px;
	background-color: rgb(236, 233, 233);
	min-width: auto;
}

.carousel-background {
	min-height: 380px !important;
	max-height: 425px !important;
}

@media screen and (max-width: 992px) {
	.header-image {
		display: none;
	}
}
</style>
