import React from "react";

import { Line } from "react-chartjs-2";
import "../style/DetailedItem.css";

export default function LineGraph(props) {
  const data = {
    labels: props.dataset,
    datasets: [
      {
        label: "Price History",
        data: props.datapts,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return (
    <div className="Linegraph">
      <Line
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
}
