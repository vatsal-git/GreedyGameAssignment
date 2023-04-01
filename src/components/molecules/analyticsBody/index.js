import React from "react";

import AnalyticsTableHead from "../../atoms/analyticsTableHead";
import AnalyticsTableRow from "../../atoms/analyticsTableRow";
import UniqueAnalyticsTableRow from "../../atoms/analyticsTableRow/uniqueAnalyticsTableRow";
import Loader from "../../common/loader";
import NoDataDisplay from "../../common/noDataDisplay";
import "./index.css";

function AnalyticsBody({ isLoading, tableData, tableColumns, appNames }) {
  const showTable = !isLoading && tableData && tableData.length > 0;
  const showNoDataDisplay = !isLoading && tableData && tableData.length === 0;

  return (
    <div className="analytics-body">
      {isLoading && <Loader wrapperStyle={{ padding: "4em" }} />}
      {showTable && (
        <table className="analytics-table">
          <AnalyticsTableHead tableColumns={tableColumns} />
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
        </table>
      )}
      {showNoDataDisplay && (
        <NoDataDisplay extraMsg="Try changing your filters or selecting different date." />
      )}
    </div>
  );
}

export default AnalyticsBody;
