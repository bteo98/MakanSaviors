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
            label: "Amount of food waste (tonnes)",
            borderColor: "#FC2525",
            pointBackgroundColor: "#FC2525",
            borderWidth: 1,
            pointBorderColor: "#FC2525",
            backgroundColor: null,
            data: []
          }
        ]
      },
      options: {
        legend: {
          labels: {
            fontColor: "#212733"
          }
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 400000,
                max: 900000,
                fontColor: "#212733",
                beginAtZero: true,
                callback: function(value) {
                  if (value % 1 === 0) {
                    return value;
                  }
                }
              }
            }
          ],
          xAxes: [
            {
              ticks: {
                fontColor: "#212733"
              }
            }
          ]
        }
      }
    };
  },
  methods: {
    fetchItems() {
      var db = firebase.firestore();
      db.collection("overallData")
        .doc("country")
        .get()
        .then(doc => {
          var data = doc.data();
          this.datacollection.labels = data["year"];
          this.datacollection.datasets[0].data = data["generated"];
        })
        .then(() => {
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

      let dataset = this.datacollection.datasets;
      dataset[0].backgroundColor = gradient1;
    }
  },
  mounted() {
    this.setBackgroundColor();
    this.fetchItems();
  }
};
