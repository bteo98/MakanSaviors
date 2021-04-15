import { Radar } from "vue-chartjs";
import firebase from "../firebase";

export default {
  extends: Radar,
  data: function() {
    return {
      datacollection: {
        labels: [],
        datasets: [
          {
            data: [],
            label: "Donation",
            fill: true,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgb(255, 99, 132)",
            pointBackgroundColor: "rgb(255, 99, 132)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(255, 99, 132)"
          },
          {
            data: [],
            label: "Request",
            fill: true,
            backgroundColor: "rgba(54, 162, 235, 0.2)",
            borderColor: "rgb(54, 162, 235)",
            pointBackgroundColor: "rgb(54, 162, 235)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgb(54, 162, 235)"
          }
        ]
      },
      options: {
        title: {
          display: true,
          text: "Monthly Amount of Food Saved"
        },
        elements: {
          line: {
            borderWidth: 1
          }
        },
        scale: {
          ticks: {
            beginAtZero: true,
            callback: function(tick) {
              return tick.toFixed(0);
            }
          }
        },
        tooltips: {
          callbacks: {
            title: function(tooltipItem, data) {
              return data.labels[tooltipItem[0].index];
            }
          }
        },
        responsive: true,
        maintainAspectRatio: false
      }
    };
  },
  props: {
    UID: { type: String }
  },
  methods: {
    fetchData() {
      var db = firebase.firestore();

      db.collection("users")
        .doc(this.UID)
        .onSnapshot(snapshot => {
          let doc = snapshot.data();
          let dataset = this.datacollection.datasets;
          let label = this.datacollection.labels;

          let made = Object.entries(doc.donationMade);
          made.sort(function(x, y) {
            return x[0].localeCompare(y[0]);
          });

          let request = Object.entries(doc.donationRequested);
          request.sort(function(x, y) {
            return x[0].localeCompare(y[0]);
          });

          for (let [item, count] of made) {
            label.push(item);
            dataset[0].data.push(count);
          }
          for (let [item, count] of request) {
            dataset[1].data.push(count);
          }
          this.renderChart(this.datacollection, this.options);
        });
    },
    setBackgroundColor() {
      let gradient1 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      gradient1.addColorStop(0, "rgba(255, 0,0, 0.5)");
      gradient1.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      gradient1.addColorStop(1, "rgba(255, 0, 0, 0)");

      let gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

      let dataset = this.datacollection.datasets;
      dataset[0].backgroundColor = gradient1;
      dataset[1].backgroundColor = gradient2;
    }
  },
  mounted() {
    this.setBackgroundColor();
    this.fetchData();
  }
};
