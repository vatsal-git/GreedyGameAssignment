import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import calenderImg from "../../../assets/images/calendar.png";
import "./index.css";
import moment from "moment";

function CustomDateRangePicker({ value, onChange, ...props }) {
  return (
    <div className="customDateRangePicker">
      <DateRangePicker
        onChange={onChange}
        value={value}
        clearIcon={null}
        calendarIcon={
          <div className="customDateRangePickerIcon">
            <img src={calenderImg} alt="icon" width="18px" height="18px" />
            {moment(value[0]).format("MMM DD")}
            {" - "}
            {moment(value[1]).format("MMM DD, YYYY")}
          </div>
        }
        maxDate={new Date()}
        {...props}
      />
    </div>
  );
}

export default CustomDateRangePicker;
