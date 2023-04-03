import React, { useState } from "react";
import "./index.css";

import { useSearchParams } from "react-router-dom";

import AnalyticsBody from "../../components/molecules/analyticsBody";
import AnalyticsHead from "../../components/molecules/analyticsHead";
import { useGetAnalyticsTableDataQuery } from "../../store/api/analyticsTableData";
import { useGetAppsDataQuery } from "../../store/api/appsData";
import {
  DEFAULT_DATE_RANGE,
  DEFAULT_TABLE_COLUMNS,
} from "../../utils/defaultVariables";

function Analytics() {
  const [tableColumns, setTableColumns] = useState(DEFAULT_TABLE_COLUMNS);
  const [dateRange, setDateRange] = useState(DEFAULT_DATE_RANGE);
  const [searchParams, setSearchParams] = useSearchParams();

  const { data: analyticsTableData, isLoading: isAnalyticsTableDataLoading } =
    useGetAnalyticsTableDataQuery({
      startDate: dateRange[0],
      endDate: dateRange[1],
    });
  const { data: appsData, isLoading: isAppsDataLoading } =
    useGetAppsDataQuery();

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
        isLoading={isAnalyticsTableDataLoading || isAppsDataLoading}
        tableData={analyticsTableData?.data}
        appsData={appsData?.data}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
    </div>
  );
}

export default Analytics;
