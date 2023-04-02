import React, { useState } from "react";
import "./index.css";

import { useDispatch } from "react-redux";

import filterIcon from "../../../assets/images/filter-icon.png";
import { closeModal, openModal } from "../../../store/modal";
import Button from "../../common/button";
import Modal from "../../common/modal";
import RangeSlider from "../../common/rangeSlider";

const getColumnDataList = (tableData, key) => {
  let columnDataList = [];
  if (key === "fillRate") {
    columnDataList = tableData.map(
      (row) => (row.requests / row.responses) * 100
    );
  } else if (key === "ctr") {
    columnDataList = tableData.map(
      (row) => (row.clicks / row.impressions) * 100
    );
  } else {
    columnDataList = tableData.map((row) => row[key]);
  }
  return columnDataList;
};

function AnalyticsTableHead({ tableData, setTableData, tableColumns }) {
  const dispatch = useDispatch();
  const [rangeSliderVal, setRangeSliderVal] = useState(["0", "100"]);

  const onFilterClick = (key) => {
    const columnDataList = getColumnDataList(tableData, key);
    const minColDataStr = `${Math.min(...columnDataList)}`;
    const maxColDataStr = `${Math.max(...columnDataList)}`;
    setRangeSliderVal([minColDataStr, maxColDataStr]);
    dispatch(openModal({ type: key }));
  };

  const onApplyClick = (key) => {
    let newFilteredData;
    if (key === "app_id") {
      newFilteredData = tableData;
    } else if (key === "fillRate") {
      newFilteredData = tableData.filter(
        (data) =>
          (data.requests / data.responses) * 100 >= rangeSliderVal[0] &&
          (data.requests / data.responses) * 100 <= rangeSliderVal[1]
      );
    } else if (key === "ctr") {
      newFilteredData = tableData.filter(
        (data) =>
          (data.clicks / data.impressions) * 100 >= rangeSliderVal[0] &&
          (data.clicks / data.impressions) * 100 <= rangeSliderVal[1]
      );
    } else {
      newFilteredData = tableData.filter(
        (data) =>
          data[key] >= rangeSliderVal[0] && data[key] <= rangeSliderVal[1]
      );
    }
    setTableData(newFilteredData);
    dispatch(closeModal());
  };

  return (
    <thead>
      <tr className="analytics-table-head-tr">
        {tableColumns.map((tableColumn, i) => {
          return (
            <td key={i}>
              {tableColumn.key !== "date" && ( // all columns except date
                <>
                  <img
                    src={filterIcon}
                    className="analytics-table-head-filter-icon"
                    onClick={() => onFilterClick(tableColumn.key)}
                  />
                  <Modal
                    type={tableColumn.key}
                    title={tableColumn.title}
                    content={
                      tableColumn.key === "app_id" ? ( // all columns except app_id
                        <>Apps List</>
                      ) : (
                        <RangeSlider
                          value={rangeSliderVal}
                          setValue={setRangeSliderVal}
                          min={Math.min(
                            ...getColumnDataList(tableData, tableColumn.key)
                          )}
                          max={Math.max(
                            ...getColumnDataList(tableData, tableColumn.key)
                          )}
                        />
                      )
                    }
                    actions={
                      <Button
                        type="primary"
                        onClick={() => onApplyClick(tableColumn.key)}
                      >
                        Apply
                      </Button>
                    }
                  />
                </>
              )}
              <div>{tableColumn.title}</div>
            </td>
          );
        })}
      </tr>
    </thead>
  );
}

export default AnalyticsTableHead;
