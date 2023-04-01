import { useState } from "react";
import moment from "moment";
import CustomDateRangePicker from "../../atoms/customDateRangePicker";
import CustomButton from "../../atoms/customButton";
import AnalyticsTableSettings from "../../atoms/analyticsTableSettings";
import settingsIcon from "../../../assets/images/settings.png";
import "./index.css";

function AnalyticsHeader({
  dateRange,
  setDateRange,
  searchParams,
  setSearchParams,
  tableColumns,
  setTableColumns,
}) {
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const onDateRangeChange = (newDateRange) => {
    setDateRange([
      moment(newDateRange[0]).format("YYYY-MM-DD"),
      moment(newDateRange[1]).format("YYYY-MM-DD"),
    ]);

    searchParams.set("startDate", moment(newDateRange[0]).format("YYYY-MM-DD"));
    searchParams.set("endDate", moment(newDateRange[1]).format("YYYY-MM-DD"));
    setSearchParams(searchParams);
  };

  return (
    <div className="analyticsHeader">
      <h2>Analytics</h2>
      <div className="actionButtonWrapper">
        <CustomDateRangePicker value={dateRange} onChange={onDateRangeChange} />
        <CustomButton
          content={
            <>
              <img src={settingsIcon} alt="icon" width="18px" /> Settings
            </>
          }
          onClick={() => setIsSettingsVisible(true)}
          style={{ fontWeight: "bold", fontSize: "15px" }}
        />
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

export default AnalyticsHeader;
