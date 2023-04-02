import React from "react";
import "./index.css";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import moment from "moment";

import calenderIcon from "../../../assets/images/calendar-icon.png";

const getCalenderContent = (value) => {
  const startDate = moment(value[0]).format("MMM DD");
  const endDate = moment(value[1]).format("MMM DD, YYYY");
  return (
    <div className="custom-date-range-picker-icon">
      <img src={calenderIcon} alt="calenderIcon" width="18px" />
      {startDate} - {endDate}
    </div>
  );
};

function CustomDateRangePicker({ value, onChange, ...props }) {
  return (
    <DateRangePicker
      className="custom-date-range-picker"
      value={value}
      onChange={onChange}
      maxDate={new Date()}
      clearIcon={null}
      calendarIcon={getCalenderContent(value)}
      {...props}
    />
  );
}

export default CustomDateRangePicker;
