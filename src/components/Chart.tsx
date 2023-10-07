import React from "react";
import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(...registerables);

const labels = ["March", "April", "May", "June", "July", "August", "September"];

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Thousands of Exchanges per Carrier per Month",
    },
  },
};

const data = {
  labels,
  datasets: [
    {
      label: "Orange",
      data: labels.map(() => (Math.random() * 10) + 1),
      borderColor: "rgb(255, 102, 0)",
      backgroundColor: "rgba(255, 102, 0, 0.5)",
    },
    {
      label: "Telefonica",
      data: labels.map(() => (Math.random() * 10) + 1),
      borderColor: "rgb(0, 53, 148)",
      backgroundColor: "rgba(0, 53, 148, 0.5)",
    },
    {
      label: "Vodafone",
      data: labels.map(() => (Math.random() * 10) + 1),
      borderColor: "rgb(206, 17, 38)",
      backgroundColor: "rgba(206, 17, 38, 0.5)",
    },
  ],
};

export const Chart = () => {
  return (
    <div
      style={{
        border: "2px solid #0e6efd",
        borderRadius: "10px",
        padding: "15px",
      }}
    >
      <Line
        options={options}
        data={data}
        style={{ width: "800px", height: "auto" }}
      />
    </div>
  );
};
