import React from "react";
import "./index.css";

import moment from "moment/moment";

import appIcon from "../../../assets/images/app-icon.png";
import { getUnitNum } from "../../../utils/commonFunctions";

const getUniqueAnalyticsTableRowContent = (tableColumn, tableData) => {
  if (tableColumn.key === "app_id") return 420;
  else if (tableColumn.key === "date") return 7;
  else if (tableColumn.key === "fillRate") {
    const fillRateListAverage = (
      tableData
        .map((row) => (row.requests / row.responses) * 100)
        .reduce((partialSum, a) => partialSum + a, 0) / tableData.length
    ).toFixed(2);
    return fillRateListAverage;
  } else if (tableColumn.key === "ctr") {
    const ctrListAverage = (
      tableData
        .map((row) => (row.clicks / row.impressions) * 100)
        .reduce((partialSum, a) => partialSum + a, 0) / tableData.length
    ).toFixed(2);
    return ctrListAverage + "%";
  } else if (tableColumn.key === "revenue") {
    const revenueListSum = tableData
      .map((row) => row.revenue)
      .reduce((partialSum, a) => partialSum + a, 0);
    return "$" + getUnitNum(revenueListSum);
  } else {
    const listSum = tableData
      .map((row) => row[tableColumn.key])
      .reduce((partialSum, a) => partialSum + a, 0);
    return getUnitNum(listSum);
  }
};

const getTableBodyRowContent = (tableColumn, rowData, appsData) => {
  if (tableColumn.key === "app_id") {
    const appName = appsData.find(
      (app) => app.app_id === rowData.app_id
    ).app_name;
    return (
      <div style={{ display: "flex", gap: "0.5em" }}>
        <img src={appIcon} alt="appIcon" width="24px" height="24px" />
        {appName}
      </div>
    );
  } else if (tableColumn.key === "date")
    return moment(rowData.date).format("DD MMM YYYY");
  else if (tableColumn.key === "fillRate")
    return ((rowData.requests / rowData.responses) * 100).toFixed(2) + "%";
  else if (tableColumn.key === "ctr")
    return ((rowData.clicks / rowData.impressions) * 100).toFixed(2) + "%";
  else if (tableColumn.key === "revenue")
    return "$" + rowData.revenue?.toFixed(2);
  else return rowData[tableColumn.key];
};

function AnalyticsTableBody({ tableData, tableColumns, appsData }) {
  return (
    <tbody>
      <tr className="analytics-table-unique-value-row">
        {tableColumns.map(
          (tableColumn) =>
            tableColumn.isVisible && (
              <td key={tableColumn.key}>
                {getUniqueAnalyticsTableRowContent(tableColumn, tableData)}
              </td>
            )
        )}
      </tr>
      {tableData.map((rowData, i) => (
        <tr key={i} className="analytics-table-body-tr">
          {tableColumns.map(
            (tableColumn) =>
              tableColumn.isVisible && (
                <td key={tableColumn.key}>
                  {getTableBodyRowContent(tableColumn, rowData, appsData)}
                </td>
              )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default AnalyticsTableBody;
