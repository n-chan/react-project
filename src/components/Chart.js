import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";

function Chart(props) {
  const dates = props.info
    .map(function (item) {
      return new moment(item.date);
    })
    .reverse();
  const positives = props.info.map((item) => item.positive).reverse();

  return (
    <div>
      <Line
        data={{
          labels: dates,
          datasets: [
            {
              data: positives,
              fill: false,
              backgroundColor: "white",
              borderColor: "blue",
            },
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                scaleLabel: {
                  display: true,
                  labelString: "Positives",
                  fontSize: 15,
                },
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            display: false,
          },
          tooltips: {
            titleFontSize: 25,
            bodyFontSize: 25,
          },
        }}
      />
    </div>
  );
}

export default Chart;
