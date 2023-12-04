import React, {
  createContext,
  useState,
  useEffect,
  PropsWithChildren,
} from "react";
import {
  TableData,
  APIResponse,
  GraphData,
  ChartData,
  ChartDataset,
  SelectIndex,
} from "../types/types";
import { getRandomColor } from "../utils/randomColor";

const makeScatter = (values: number[], times: string[]) => {
  return values.map((value, ind) => {
    return { x: times[ind], y: value };
  });
};

const buildChartData = (data: GraphData): ChartData => {
  const labels: string[] = [];
  const datasets: ChartDataset[] = [];

  Object.keys(data).forEach((key) => {
    data[key].times.forEach((time) => {
      if (!labels.includes(time)) labels.push(time);
    });

    const dataset: ChartDataset = {
      label: key,
      data: makeScatter(data[key].values, data[key].times),
      borderColor: getRandomColor(),
      borderWidth: 3,
      showLine: true,
      pointBorderWidth: 10,
    };

    datasets.push(dataset);
  });
  return { labels, datasets };
};

export interface GraphContextProps {
  tableData: TableData[];
  chartData: ChartData;
  updateTable: (index: number | "all") => void;
}

export const GraphContext = createContext<GraphContextProps>(
  {} as GraphContextProps
);

export const GraphContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [chartAllData, setChartAllData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  // const [chartSelectedData, setChartSelectedData] = useState<ChartData>({
  //   labels: [],
  //   datasets: [],
  // });

  const processData = (data: APIResponse): TableData[] => {
    return Object.entries(data.current.data.TK1)
      .filter(([key]) => key.startsWith("TK1_"))
      .map(([key, value]) => {
        return {
          isChecked: true,
          metric: key,
          lastValue: value.values[value.values.length - 1],
        };
      });
  };

  const processGraphData = (data: APIResponse): ChartData => {
    const formattedData: GraphData = {};

    Object.entries(data.current.data.TK1)
      .filter(([key]) => key.startsWith("TK1_"))
      .forEach(([key, value]) => {
        formattedData[key] = {
          times: value.times,
          values: value.values,
        };
      });

    return buildChartData(formattedData);
  };

  useEffect(() => {
    fetch("https://reference.intellisense.io/thickenernn/v1/referencia")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((d: APIResponse) => {
        setTableData(processData(d));
        setChartAllData(processGraphData(d));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const updateTable = (index: SelectIndex) => {
    const newTableData = [...tableData];
    if (index === "all") {
      const isCheckedAll: boolean = newTableData.every(
        (item) => item.isChecked
      );
      newTableData.forEach((item) => {
        item.isChecked = !isCheckedAll;
      });
    } else newTableData[index].isChecked = !newTableData[index].isChecked;
    setTableData(newTableData);
  };

  const getSelectedChart = (): ChartData => {
    return {
      datasets: chartAllData?.datasets?.filter(
        (_, ind) => tableData[ind]?.isChecked
      ),
      labels: chartAllData?.labels,
    };
  };

  return (
    <GraphContext.Provider
      value={{
        tableData,
        chartData: getSelectedChart(),
        updateTable,
      }}
    >
      {children}
    </GraphContext.Provider>
  );
};

export default GraphContext;
