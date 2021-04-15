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
            borderWidth: 0.5,
            borderColor: "blue",
            backgroundColor: "rgba(204, 229, 255, 0.3)",
            fill: true,
            data: []
          }
        ]
      },
      options: {
        legend: {
          fontColor: "Black",
          fontSize: 20
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [
            {
              ticks: {
                min: 400000,
                max: 900000
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
    }
  },
  mounted() {
    this.fetchItems();
  }
};
