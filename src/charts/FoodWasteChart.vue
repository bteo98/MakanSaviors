<template>
	<div class="chart">
		<h2 class="title text-center">
			Amount of Food Waste <br />
			Generated in Singapore
		</h2>
		<Chart></Chart>
		<br />
		<p class="text-right">Data taken from nea.gov.sg</p>
	</div>
</template>

<script>
import Chart from "./FoodWasteChart.js";
export default {
	components: {
		Chart,
	},
};
</script>

<style>
.chart {
	padding-bottom: 30px;
}
</style>
