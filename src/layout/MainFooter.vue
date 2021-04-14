<template>
	<footer
		class="footer"
		:class="{[`footer-${type}`]: type}"
		:data-background-color="backgroundColor"
	>
		<div class="container">
			<link rel="icon" :src="logo" />
			<div class="copyright">MakanSaviors &copy; {{ year }}</div>
		</div>
	</footer>
</template>
<script>
export default {
	props: {
		backgroundColor: String,
		type: String,
	},
	data() {
		return {
			year: new Date().getFullYear(),
			logo: require("@/assets/img/logo.png"),
		};
	},
};
</script>
<style></style>
