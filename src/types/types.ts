export interface DataTableProps {
  data: TableData[];
}

export type LineGraphProps = {
  data: {
    [key: string]: {
      times: string[];
      values: number[];
    };
  };
};

export type SelectIndex = number | "all";

export type ChartDataset = {
  label: string;
  showLine: boolean;
  data: {
    x: string;
    y: number;
  }[];
  borderColor: string;
  borderWidth: number;
  pointBorderWidth: number;
};

export type ChartData = {
  labels: string[];
  datasets: ChartDataset[];
};

export interface TK1Data {
  [key: string]: {
    times: string[];
    values: number[];
  };
}

export interface TableData {
  metric: string;
  lastValue: number;
  isChecked: boolean;
}

export interface GraphData {
  [key: string]: {
    times: string[];
    values: number[];
  };
}

export interface APIResponse {
  current: {
    data: {
      TK1: TK1Data;
    };
  };
  // Adjust this based on the actual API response structure
}
