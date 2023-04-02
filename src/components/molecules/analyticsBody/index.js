import React, { useEffect, useState } from "react";
import "./index.css";

import AnalyticsTableBody from "../../atoms/analyticsTableBody";
import AnalyticsTableHead from "../../atoms/analyticsTableHead";
import Loader from "../../common/loader";
import NoDataDisplay from "../../common/noDataDisplay";

function AnalyticsBody({ isLoading, tableData, tableColumns, appNames }) {
  const [filteredData, setFilteredData] = useState(tableData); // table data to apply filters

  const showTable = !isLoading && filteredData && filteredData.length > 0;
  const showNoDataDisplay =
    !isLoading && filteredData && filteredData.length === 0;

  useEffect(() => {
    if (!isLoading) setFilteredData(tableData);
  }, [isLoading, tableData]);

  return (
    <div className="analytics-body">
      {isLoading && <Loader wrapperStyle={{ padding: "4em" }} />}
      {showTable && (
        <table className="analytics-table">
          <AnalyticsTableHead
            tableData={filteredData}
            setTableData={setFilteredData}
            tableColumns={tableColumns}
          />
          <AnalyticsTableBody
            tableData={filteredData}
            tableColumns={tableColumns}
            appNames={appNames}
          />
        </table>
      )}
      {showNoDataDisplay && (
        <NoDataDisplay extraMsg="Try changing your filters or selecting different date." />
      )}
    </div>
  );
}

export default AnalyticsBody;
