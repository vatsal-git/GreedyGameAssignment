import Loader from "../../atoms/loader";
import AnalyticsTableRow from "../../atoms/analyticsTableRow";
import filterIcon from "../../../assets/images/filter-filled-tool-symbol.png";
import UniqueAnalyticsTableRow from "../../atoms/analyticsTableRow/uniqueAnalyticsTableRow";
import "./index.css";

function AnalyticsTable({
  isLoading,
  tableData,
  tableColumns,
  appNames,
  isAppNamesLoading,
}) {
  return (
    <div className="analyticsBody">
      <table className="analyticsTable">
        <thead>
          <tr>
            {tableColumns.map(
              (tableColumn, i) =>
                tableColumn.isVisible && (
                  <td key={i}>
                    <div className="thead-td-wrapper">
                      <img src={filterIcon} height="18px" width="18px" />
                      {tableColumn.title}
                    </div>
                  </td>
                )
            )}
          </tr>
        </thead>
        <tbody>
          {isLoading && isAppNamesLoading && (
            <tr>
              <td colSpan={9}>
                <Loader wrapperStyle={{ padding: "5em 0" }} />
              </td>
            </tr>
          )}
          {!isLoading && !isAppNamesLoading && tableData && (
            <>
              <UniqueAnalyticsTableRow
                tableData={tableData}
                tableColumns={tableColumns}
              />
              {tableData.map((row, i) => (
                <AnalyticsTableRow
                  key={i + row.date}
                  row={row}
                  tableColumns={tableColumns}
                  appNames={appNames}
                />
              ))}
            </>
          )}
          {!isLoading && tableData && tableData.length === 0 && (
            <tr>
              <td colSpan={9} style={{ fontWeight: "bold" }}>
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default AnalyticsTable;
