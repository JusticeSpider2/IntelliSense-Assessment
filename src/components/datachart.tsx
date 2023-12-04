import { useContext } from "react";
import { Scatter } from "react-chartjs-2";
import { GraphContext } from "../context/graphContext";

const DataChart = () => {
  const { chartData } = useContext(GraphContext);
  const options = {
    plugins: {
      legend: {
        onClick: () => {
          // Handle legend click event here
        },
      },
    },
  };

  return <>{chartData && <Scatter data={chartData} options={options} />}</>;
};

export default DataChart;
