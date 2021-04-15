import {Bar} from "vue-chartjs";
import firebase from "../firebase";

export default {
	extends: Bar,
	data: function() {
		return {
			datacollection: {
				labels: [],
				datasets: [
					{
						label: "Number of Listing on MakanSaviors",
						borderWidth: 1,
						borderColor: "rgb(75, 192, 192)",
						backgroundColor: "rgba(54, 162, 235, 0.2)",
						fill: true,
						data: [],
						// barThickness: 70,
					},
				],
			},
			options: {
				legend: {display: false},
				title: {
					display: false,
				},
				responsive: true,
				maintainAspectRatio: false,
				scales: {
					yAxes: [
						{
							ticks: {
								min: 0,
								max: 100,
							},
						},
					],
					xAxes: [
						{
							ticks: {
								fontSize: 11,
							},
						},
					],
				},
			},
		};
	},
	methods: {
		fetchItems() {
			var db = firebase.firestore();
			var dct = {};
			var cat = [];
			var numbers = [];
			db.collection("overallData")
				.doc("website")
				.get()
				.then((doc) => {
					var data = doc.data();
					dct = data["numListings"];
				})
				.then(() => {
					Object.entries(dct).forEach(([key, value]) => {
						cat.push(key);
					});
					cat = cat.sort();
					for (let i = 0; i < cat.length; i++) {
						numbers.push(dct[cat[i]]);
					}
					this.datacollection.labels = cat;
					this.datacollection.datasets[0].data = numbers;
					this.renderChart(this.datacollection, this.options);
				});
		},
	},
	mounted() {
		this.fetchItems();
		// this.renderChart(this.datacollection, this.options);
	},
};
