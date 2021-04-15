import { Line } from "vue-chartjs";
import firebase from "../firebase";

export default {
	extends: Line,
	data: function() {
		return {
			datacollection: {
				labels: [],
				datasets: [
					{
						data: [],
						label: "Donation",
						borderColor: "#FC2525",
						pointBackgroundColor: "#FC2525",
						borderWidth: 1,
						pointBorderColor: "#FC2525",
						backgroundColor: null,
					},
					{
						data: [],
						label: "Request",
						borderColor: "#05CBE1",
						pointBackgroundColor: "#05CBE1",
						pointBorderColor: "#05CBE1",
						borderWidth: 1,
						backgroundColor: null,
					},
				],
			},
			options: {
				title: {
					display: true,
					text: "Monthly Amount of Food Saved",
					fontColor: "#212733",
				},
				legend: {
					labels: {
						fontColor: "#212733",
					},
				},
				scales: {
					yAxes: [
						{
							ticks: {
								fontColor: "#212733",
								beginAtZero: true,
								callback: function(value) {
									if (value % 1 === 0) {
										return value;
									}
								},
							},
						},
					],
					xAxes: [
						{
							ticks: {
								fontColor: "#212733",
							},
						},
					],
				},
				responsive: true,
				maintainAspectRatio: false,
			},
		};
	},
	props: {
		UID: {type: String},
	},
	methods: {
		fetchData() {
			var db = firebase.firestore();

			db.collection("users")
				.doc(this.UID)
				.onSnapshot((snapshot) => {
					let doc = snapshot.data();
					let dataset = this.datacollection.datasets;
					let label = this.datacollection.labels;

					let donatedates = Object.entries(doc.donationDates);
					donatedates.sort(function(x, y) {
						return new Date(x[0]) - new Date(y[0]);
					});

					let requestdates = Object.entries(doc.requestDates);
					requestdates.sort(function(x, y) {
						return new Date(x[0]) - new Date(y[0]);
					});
						
					for (let [date, count] of donatedates) {
						label.push(date);
						dataset[0].data.push(count);
					}
					for (let [date, count] of requestdates) {
						dataset[1].data.push(count);
					}
					console.log(this.datacollection);

					this.renderChart(this.datacollection, this.options);
				});
		},
		setBackgroundColor() {
			let gradient1 = this.$refs.canvas.getContext("2d").
				createLinearGradient(0, 0, 0, 450);
			gradient1.addColorStop(0, "rgba(255, 0,0, 0.5)");
			gradient1.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
			gradient1.addColorStop(1, "rgba(255, 0, 0, 0)");

			let gradient2 = this.$refs.canvas.getContext("2d").
				createLinearGradient(0, 0, 0, 450);
			gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
			gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
			gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

			let dataset = this.datacollection.datasets;
			dataset[0].backgroundColor = gradient1;
			dataset[1].backgroundColor = gradient2;
		},
	},
	mounted() {
		this.setBackgroundColor();
		this.fetchData();
	},
};
