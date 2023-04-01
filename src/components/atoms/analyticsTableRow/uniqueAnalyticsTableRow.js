import { getUnitNum } from "../../../utils/commonFunctions";

function UniqueAnalyticsTableRow({ tableData, tableColumns }) {
  return (
    <tr>
      {tableColumns.map((tableColumn) => {
        if (tableColumn.isVisible) {
          switch (tableColumn.key) {
            case "app_id":
              return <td key={tableColumn.key}>420</td>;
            case "date":
              return <td key={tableColumn.key}>7</td>;
            case "fillRate":
              const fillRateListAverage = (
                tableData
                  .map((row) => (row.requests / row.responses) * 100)
                  .reduce((partialSum, a) => partialSum + a, 0) /
                tableData.length
              ).toFixed(2);
              return <td key={tableColumn.key}>{fillRateListAverage}%</td>;
            case "ctr":
              const ctrListAverage = (
                tableData
                  .map((row) => (row.clicks / row.impressions) * 100)
                  .reduce((partialSum, a) => partialSum + a, 0) /
                tableData.length
              ).toFixed(2);
              return <td key={tableColumn.key}>{ctrListAverage}%</td>;
            case "revenue":
              const revenueListSum = tableData
                .map((row) => row.revenue)
                .reduce((partialSum, a) => partialSum + a, 0);
              return (
                <td key={tableColumn.key}>${getUnitNum(revenueListSum)}</td>
              );
            case "requests":
            case "responses":
            case "impressions":
            case "clicks":
              const listSum = tableData
                .map((row) => row[tableColumn.key])
                .reduce((partialSum, a) => partialSum + a, 0);
              return <td key={tableColumn.key}>{getUnitNum(listSum)}</td>;
          }
        }
      })}
    </tr>
  );
}

export default UniqueAnalyticsTableRow;
