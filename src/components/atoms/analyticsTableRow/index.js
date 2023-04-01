import React from "react";
import "./index.css";

import moment from "moment/moment";

import appIcon from "../../../assets/images/app-icon.png";

const getTableBodyRowContent = (tableColumn, row, appNames) => {
  switch (tableColumn.key) {
    case "app_id": {
      const appName = appNames.data.find(
        (app) => app.app_id === row.app_id
      ).app_name;
      return (
        <div style={{ display: "flex", gap: "0.5em" }}>
          <img src={appIcon} alt="appIcon" width="24px" />
          {appName}
        </div>
      );
    }
    case "fillRate":
      return ((row.requests / row.responses) * 100).toFixed(2) + "%";
    case "ctr":
      return ((row.clicks / row.impressions) * 100).toFixed(2) + "%";
    case "date":
      return moment(row.date).format("DD MMM YYYY");
    case "revenue":
      return "$" + row.revenue?.toFixed(2);
    case "requests":
    case "responses":
    case "impressions":
    case "clicks":
      return row[tableColumn.key];
  }
};

function AnalyticsTableRow({ row, tableColumns, appNames }) {
  return (
    <tbody>
      <tr className="analytics-table-body-tr">
        {tableColumns.map(
          (tableColumn) =>
            tableColumn.isVisible && (
              <td key={tableColumn.key}>
                {getTableBodyRowContent(tableColumn, row, appNames)}
              </td>
            )
        )}
      </tr>
    </tbody>
  );
}

export default AnalyticsTableRow;
