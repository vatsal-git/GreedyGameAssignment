import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetAnalyticsTableDataQuery } from "../../services/analyticsTableDataService";
import { useGetAppNamesQuery } from "../../services/appNamesService";
import AnalyticsHeader from "../../components/molecules/analyticsHeader";
import AnalyticsTable from "../../components/molecules/analyticsTable";
import "./index.css";
import {
  DEFAULT_DATE_RANGE,
  DEFAULT_TABLE_COLUMNS,
} from "../../utils/DefaultVariables";
import { sortByKey } from "../../utils/commonFunctions";

function Analytics() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);

  const { data: analyticsTableData, isLoading: isAnalyticsTableDataLoading } =
    useGetAnalyticsTableDataQuery({
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  const { data: appNames, isLoading: isAppNamesLoading } =
    useGetAppNamesQuery();

  return (
    <div className="analytics">
      <AnalyticsHeader
        dateRange={dateRange}
        setDateRange={setDateRange}
        tableColumns={tableColumns.sort((a, b) => sortByKey(a, b, "pos"))}
        setTableColumns={setTableColumns}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <AnalyticsTable
        isLoading={isAnalyticsTableDataLoading}
        tableData={analyticsTableData?.data}
        tableColumns={tableColumns.sort((a, b) => sortByKey(a, b, "pos"))}
        appNames={appNames}
        isAppNamesLoading={isAppNamesLoading}
      />
    </div>
  );
}

export default Analytics;
