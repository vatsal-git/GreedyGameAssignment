import moment from "moment/moment";
import appIcon from "../../../assets/images/app-img.png";

function AnalyticsTableRow({ row, tableColumns, appNames }) {
  return (
    <tr>
      {tableColumns.map((tableColumn, i) => {
        if (tableColumn.isVisible) {
          switch (tableColumn.key) {
            case "app_id":
              const appName = appNames.data.find(
                (app) => app.app_id === row.app_id
              ).app_name;
              return (
                <td
                  key={tableColumn.key}
                  style={{ display: "flex", gap: "0.5em" }}
                >
                  <img src={appIcon} width="24px" />
                  {appName}
                </td>
              );
            case "fillRate":
              return (
                <td key={tableColumn.key}>
                  {((row.requests / row.responses) * 100).toFixed(2)}%
                </td>
              );
            case "ctr":
              return (
                <td key={tableColumn.key}>
                  {((row.clicks / row.impressions) * 100).toFixed(2)}%
                </td>
              );
            case "date":
              return (
                <td key={tableColumn.key}>
                  {moment(row.date).format("DD MMM YYYY")}
                </td>
              );
            case "revenue":
              return <td key={tableColumn.key}>${row.revenue?.toFixed(2)}</td>;
            case "requests":
            case "responses":
            case "impressions":
            case "clicks":
              return <td key={tableColumn.key}>{row.requests}</td>;
          }
        }
      })}
    </tr>
  );
}

export default AnalyticsTableRow;
