import React, { useEffect, useState } from "react";
import "./index.css";

import closeIcon from "../../../assets/images/close-icon.png";
import AnalyticsTableBody from "../../atoms/analyticsTableBody";
import AnalyticsTableHead from "../../atoms/analyticsTableHead";
import Button from "../../common/button";
import Loader from "../../common/loader";
import NoDataDisplay from "../../common/noDataDisplay";

const getParamsFilteredTableData = (tableData, searchParams) => {
  const app_id = searchParams.get("app_id"),
    requests = searchParams.get("requests"),
    responses = searchParams.get("responses"),
    impressions = searchParams.get("impressions"),
    clicks = searchParams.get("clicks"),
    revenue = searchParams.get("revenue"),
    fillRate = searchParams.get("fillRate"),
    ctr = searchParams.get("ctr");
  let filteredTableData = tableData;

  // if url params has this val then filter
  if (app_id) {
    const filteredApps = app_id.split(",");
    filteredTableData = filteredTableData?.filter((data) =>
      filteredApps.includes(data.app_id)
    );
  }
  if (requests) {
    const [min, max] = requests.split(",");
    console.log({ min, max });
    filteredTableData = filteredTableData?.filter(
      (data) => data.requests >= parseInt(min) && data.requests <= parseInt(max)
    );
  }
  if (responses) {
    const [min, max] = responses.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) =>
        data.responses >= parseInt(min) && data.responses <= parseInt(max)
    );
  }
  if (impressions) {
    const [min, max] = impressions.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) =>
        data.impressions >= parseInt(min) && data.impressions <= parseInt(max)
    );
  }
  if (clicks) {
    const [min, max] = clicks.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) => data.clicks >= parseInt(min) && data.clicks <= parseInt(max)
    );
  }
  if (revenue) {
    const [min, max] = revenue.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) => data.revenue >= parseInt(min) && data.revenue <= parseInt(max)
    );
  }
  if (fillRate) {
    const [min, max] = fillRate.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) =>
        (data.requests / data.responses) * 100 >= parseInt(min) &&
        (data.requests / data.responses) * 100 <= parseInt(max)
    );
  }
  if (ctr) {
    const [min, max] = ctr.split(",");
    filteredTableData = filteredTableData?.filter(
      (data) =>
        (data.clicks / data.impressions) * 100 >= parseInt(min) &&
        (data.clicks / data.impressions) * 100 <= parseInt(max)
    );
  }
  return filteredTableData;
};

function AnalyticsBody({
  isLoading,
  tableData,
  tableColumns,
  appsData,
  searchParams,
  setSearchParams,
}) {
  const [filteredData, setFilteredData] = useState();

  const showTable = !isLoading && filteredData && filteredData.length > 0;
  const showNoDataDisplay =
    !isLoading && filteredData && filteredData.length === 0;

  useEffect(() => {
    if (!isLoading)
      setFilteredData(getParamsFilteredTableData(tableData, searchParams));
  }, [isLoading, searchParams, tableData]);

  const clearFilters = () => {
    window.location.href = "/analytics";
  };

  return (
    <div className="analytics-body">
      {filteredData && filteredData.length !== tableData.length && (
        <Button
          onClick={clearFilters}
          type="secondary"
          style={{
            border: "1px solid red",
            color: "red",
            marginBottom: ".5em",
          }}
        >
          Clear Filters
          <img src={closeIcon} alt="closeIcon" width="15px" />
        </Button>
      )}
      {isLoading && <Loader wrapperStyle={{ padding: "4em" }} />}
      {showTable && (
        <table className="analytics-table">
          <AnalyticsTableHead
            tableData={filteredData}
            setTableData={setFilteredData}
            tableColumns={tableColumns}
            appsData={appsData}
            searchParams={searchParams}
            setSearchParams={setSearchParams}
          />
          <AnalyticsTableBody
            tableData={filteredData}
            tableColumns={tableColumns}
            appsData={appsData}
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
