import React from "react";
import "./index.css";

import moment from "moment/moment";

import appIcon from "../../../assets/images/app-icon.png";
import { getUnitNum } from "../../../utils/commonFunctions";

const getUniqueAnalyticsTableRowContent = (tableColumn, tableData) => {
  switch (tableColumn.key) {
    case "app_id":
      return 420;
    case "date":
      return 7;
    case "fillRate": {
      const fillRateListAverage = (
        tableData
          .map((row) => (row.requests / row.responses) * 100)
          .reduce((partialSum, a) => partialSum + a, 0) / tableData.length
      ).toFixed(2);
      return fillRateListAverage;
    }
    case "ctr": {
      const ctrListAverage = (
        tableData
          .map((row) => (row.clicks / row.impressions) * 100)
          .reduce((partialSum, a) => partialSum + a, 0) / tableData.length
      ).toFixed(2);
      return ctrListAverage + "%";
    }
    case "revenue": {
      const revenueListSum = tableData
        .map((row) => row.revenue)
        .reduce((partialSum, a) => partialSum + a, 0);
      return "$" + getUnitNum(revenueListSum);
    }
    case "requests":
    case "responses":
    case "impressions":
    case "clicks": {
      const listSum = tableData
        .map((row) => row[tableColumn.key])
        .reduce((partialSum, a) => partialSum + a, 0);
      return getUnitNum(listSum);
    }
  }
};

const getTableBodyRowContent = (tableColumn, rowData, appNames) => {
  switch (tableColumn.key) {
    case "app_id": {
      const appName = appNames.data.find(
        (app) => app.app_id === rowData.app_id
      ).app_name;
      return (
        <div style={{ display: "flex", gap: "0.5em" }}>
          <img src={appIcon} alt="appIcon" width="24px" />
          {appName}
        </div>
      );
    }
    case "fillRate":
      return ((rowData.requests / rowData.responses) * 100).toFixed(2) + "%";
    case "ctr":
      return ((rowData.clicks / rowData.impressions) * 100).toFixed(2) + "%";
    case "date":
      return moment(rowData.date).format("DD MMM YYYY");
    case "revenue":
      return "$" + rowData.revenue?.toFixed(2);
    case "requests":
    case "responses":
    case "impressions":
    case "clicks":
      return rowData[tableColumn.key];
  }
};

function AnalyticsTableBody({ tableData, tableColumns, appNames }) {
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
                  {getTableBodyRowContent(tableColumn, rowData, appNames)}
                </td>
              )
          )}
        </tr>
      ))}
    </tbody>
  );
}

export default AnalyticsTableBody;
