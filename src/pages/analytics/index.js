import React, { useState } from "react";

import { useSearchParams } from "react-router-dom";

import AnalyticsBody from "../../components/molecules/analyticsBody";
import AnalyticsHead from "../../components/molecules/analyticsHead";
import { useGetAnalyticsTableDataQuery } from "../../store/api/analyticsTableData";
import { useGetAppNamesQuery } from "../../store/api/appNames";
import {
  DEFAULT_DATE_RANGE,
  DEFAULT_TABLE_COLUMNS,
} from "../../utils/DefaultVariables";
import "./index.css";

function Analytics() {
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: analyticsTableData, isLoading: isAnalyticsTableDataLoading } =
    useGetAnalyticsTableDataQuery({
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  const { data: appNames, isLoading: isAppNamesLoading } =
    useGetAppNamesQuery();

  return (
    <div className="analytics">
      <AnalyticsHead
        dateRange={dateRange}
        setDateRange={setDateRange}
        tableColumns={tableColumns}
        setTableColumns={setTableColumns}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <AnalyticsBody
        tableColumns={tableColumns}
        isLoading={isAnalyticsTableDataLoading || isAppNamesLoading}
        tableData={!isAnalyticsTableDataLoading && analyticsTableData.data}
        appNames={!isAppNamesLoading && appNames}
      />
    </div>
  );
}

export default Analytics;
