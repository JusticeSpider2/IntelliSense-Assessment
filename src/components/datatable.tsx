import { memo, useContext, useEffect, useState } from "react";
import { GraphContext } from "../context/graphContext";
import { SelectIndex, TableData } from "../types/types";

interface PureDataTableProps {
  tableData: TableData[];
  updateTable: (index: number | "all") => void;
  isAll: boolean;
}

const PureDataTable = memo((props: PureDataTableProps) => {
  const { tableData, updateTable, isAll } = props;
  const handleChange = (
    ind: SelectIndex,
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.MouseEvent<HTMLTableRowElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    updateTable(ind);
  };
  return (
    <table className="styled-table">
      <thead>
        <tr>
          <th scope="col" className="checkbox-wrapper-1">
            <input
              checked={isAll}
              type="checkbox"
              name="allSelect"
              data-testid="all"
              id="all"
              className="substituted"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("all", e)
              }
            />
            <label htmlFor="all"></label>
          </th>
          <th>Metric Name</th>
          <th>Last Value</th>
        </tr>
      </thead>

      <tbody>
        {tableData.map((item, index) => (
          <tr
            key={index}
            onClick={(e: React.MouseEvent<HTMLTableRowElement>) =>
              handleChange(index, e)
            }
            className={
              "active-row" + (item.isChecked === true ? " selected" : "")
            }
          >
            <td scope="row" className="checkbox-wrapper-1">
              <input
                type="checkbox"
                checked={item.isChecked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleChange(index, e)
                }
                id={`id${index}`}
                data-testid={`check-${index}`}
                className="substituted"
              />
              <label htmlFor={`id${index}`} data-testid={index}></label>
            </td>
            <td>{item.metric}</td>
            <td>{item.lastValue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
});

const DataTable = () => {
  const { tableData, updateTable } = useContext(GraphContext);
  const [isAll, setIsAll] = useState<boolean>(true);
  useEffect(() => {
    const isAllSelected = tableData.every((item) => item.isChecked === true);
    setIsAll(isAllSelected);
  }, [tableData]);
  return (
    <PureDataTable
      tableData={tableData}
      updateTable={updateTable}
      isAll={isAll}
    />
  );
};

export default DataTable;
