import React from "react";

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

function UniqueAnalyticsTableRow({ tableData, tableColumns }) {
  return (
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
  );
}

export default UniqueAnalyticsTableRow;
