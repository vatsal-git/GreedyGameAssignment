import React, { useState } from "react";
import "./index.css";

import moment from "moment";

import settingsIcon from "../../../assets/images/settings-icon.png";
import AnalyticsTableSettings from "../../atoms/analyticsTableSettings";
import Button from "../../common/button";
import CustomDateRangePicker from "../../common/dateRangePicker";

function AnalyticsHead({
  dateRange,
  setDateRange,
  searchParams,
  setSearchParams,
  tableColumns,
  setTableColumns,
}) {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const onDateRangeChange = (newDateRange) => {
    const startDate = moment(newDateRange[0]).format("YYYY-MM-DD");
    const endDate = moment(newDateRange[1]).format("YYYY-MM-DD");
    setDateRange([startDate, endDate]);
    searchParams.set("startDate", startDate);
    searchParams.set("endDate", endDate);
    setSearchParams(searchParams);
  };

  return (
    <div className="analytics-head">
      <h2 className="analytics-head-title">Analytics</h2>
      <div className="analytics-head-action-btn-wrapper">
        <CustomDateRangePicker value={dateRange} onChange={onDateRangeChange} />
        <Button
          type="secondary"
          style={{ fontWeight: "bold", fontSize: "15px" }}
          onClick={() => setIsSettingsVisible(true)}
        >
          <img src={settingsIcon} alt="settingsIcon" width="18px" />
          Settings
        </Button>
      </div>
      {isSettingsVisible && (
        <AnalyticsTableSettings
          tableColumns={tableColumns}
          setTableColumns={setTableColumns}
          setIsSettingsVisible={setIsSettingsVisible}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      )}
    </div>
  );
}

export default AnalyticsHead;
