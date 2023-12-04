import "./App.css";
import { GraphContextProvider } from "./context/graphContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DataTable from "./components/datatable";
import DataChart from "./components/datachart";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => (
  <GraphContextProvider>
    <DataTable />
    <DataChart />
  </GraphContextProvider>
);

export default App;
