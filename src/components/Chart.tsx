import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(...registerables);

const chartData = {
  labels: ["Vodafone", "Telefonica", "Sprint", "T-Mobile", "02", "Orange"],
  datasets: [
    {
      label: "GB of Data exchanged per Carrier",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const chartOptions = {
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const Chart = () => {
  return (
    <div style={{
      border: "2px solid #0e6efd",
      borderRadius: "10px",
      padding: "15px",
    }}>
      <Bar
        data={chartData}
        options={chartOptions}
        width={100}
        height={50}
        style={{ width: "800px", height: "auto" }}
      />
    </div>
  );
};
