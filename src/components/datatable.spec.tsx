import { render, fireEvent } from "@testing-library/react";
import DataTable from "./datatable";
import GraphContext from "../context/graphContext";

describe("DataTable", () => {
  const updateTable = jest.fn();
  const tableData = [
    { metric: "metric1", lastValue: 1.2, isChecked: false },
    { metric: "metric2", lastValue: 3.4, isChecked: true },
  ];

  const chartData = {
    labels: [],
    datasets: [],
  };

  it("renders table rows based on tableData", () => {
    const { getAllByRole } = render(
      <GraphContext.Provider value={{ tableData, updateTable, chartData }}>
        <DataTable />
      </GraphContext.Provider>
    );
    const rows = getAllByRole("row");
    expect(rows.length).toBe(tableData.length + 1); // +1 for the header row
  });

  it("calls updateTable when a checkbox is clicked", () => {
    const { getByTestId } = render(
      <GraphContext.Provider value={{ tableData, updateTable, chartData }}>
        <DataTable />
      </GraphContext.Provider>
    );
    fireEvent.click(getByTestId("0"));
    expect(updateTable).toHaveBeenCalledWith(0);

    fireEvent.click(getByTestId("all"));
    expect(updateTable).toHaveBeenCalledWith("all");

    fireEvent.click(getByTestId("check-0"));
    expect(updateTable).toHaveBeenCalledWith(0);
  });
});
