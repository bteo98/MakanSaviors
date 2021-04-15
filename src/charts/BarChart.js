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
						borderColor: "black",
						backgroundColor: "rgba(50, 153, 76, 0.7)",
						fill: true,
						data: [],
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
						numbers.push(value);
						cat.push(key);
					});
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
