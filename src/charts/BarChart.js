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
						label: "Amount of food waste ('000 tonnes)",
						backgroundColor: [
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
							"#add8e6",
						],
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
								max: 900,
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
			db.collection("overallData")
				.doc("country")
				.get()
				.then((doc) => {
					var data = doc.data();
					this.datacollection.labels = data["year"];
					// var disposed = doc.data()["disposed"]
					this.datacollection.datasets[0].data = data["generated"];
				})
				.then(() => {
					this.renderChart(this.datacollection, this.options);
				});
		},
	},
	mounted() {
		this.fetchItems();
		// this.renderChart(this.datacollection, this.options);
	},
};
