import React, { useState } from "react";
import "./index.css";

import { useDispatch } from "react-redux";

import filterIcon from "../../../assets/images/filter-icon.png";
import { closeModal, openModal } from "../../../store/modal";
import Button from "../../common/button";
import Modal from "../../common/modal";
import RangeSlider from "../../common/rangeSlider";
import SearchList from "../../common/searchList";

const getColumnDataList = (tableData, key) => {
  let columnDataList = [];
  if (key === "fillRate") {
    columnDataList = tableData.map((row) =>
      parseInt((row.requests / row.responses) * 100)
    );
  } else if (key === "ctr") {
    columnDataList = tableData.map((row) =>
      parseInt((row.clicks / row.impressions) * 100)
    );
  } else if (key === "app_id") {
    columnDataList = tableData.map((row) => row[key]);
  } else {
    columnDataList = tableData.map((row) => parseInt(row[key]));
  }
  return columnDataList;
};

const getAppDataListForSearchList = (appsData) =>
  appsData.map((item) => ({
    title: item.app_name,
    subtitle: item.app_id,
    selected: false,
  }));

function AnalyticsTableHead({
  tableData,
  setTableData,
  tableColumns,
  appsData,
  searchParams,
  setSearchParams,
}) {
  const dispatch = useDispatch();
  const [rangeSliderVal, setRangeSliderVal] = useState(["0", "0"]);
  const [filteredAppsData, setFilteredAppsData] = useState(
    getAppDataListForSearchList(appsData)
  );

  const onFilterClick = (key) => {
    if (key === "app_id") {
      const appsColumn = getColumnDataList(tableData, key);
      const newFilteredAppsData = filteredAppsData.filter((appData) =>
        appsColumn.includes(appData.subtitle)
      );
      setFilteredAppsData(newFilteredAppsData);
    } else {
      const columnDataList = getColumnDataList(tableData, key);
      const minColDataStr = `${Math.min(...columnDataList)}`;
      const maxColDataStr = `${Math.max(...columnDataList)}`;
      setRangeSliderVal([minColDataStr, maxColDataStr]);
    }
    dispatch(openModal({ type: key }));
  };

  const onApplyClick = (key) => {
    let newFilteredData, newSearchParams;
    if (key === "app_id") {
      const selectedApps = filteredAppsData
        .filter((appData) => appData.selected)
        .map((appData) => appData.subtitle);
      newFilteredData = tableData.filter((data) =>
        selectedApps.includes(data[key])
      );
      newSearchParams = selectedApps.join(",");
    } else if (key === "fillRate") {
      newFilteredData = tableData.filter(
        (data) =>
          (data.requests / data.responses) * 100 >= rangeSliderVal[0] &&
          (data.requests / data.responses) * 100 <= rangeSliderVal[1]
      );
      newSearchParams = `${rangeSliderVal[0]},${rangeSliderVal[1]}`;
    } else if (key === "ctr") {
      newFilteredData = tableData.filter(
        (data) =>
          (data.clicks / data.impressions) * 100 >= rangeSliderVal[0] &&
          (data.clicks / data.impressions) * 100 <= rangeSliderVal[1]
      );
      newSearchParams = `${rangeSliderVal[0]},${rangeSliderVal[1]}`;
    } else {
      newFilteredData = tableData.filter(
        (data) =>
          data[key] >= rangeSliderVal[0] && data[key] <= rangeSliderVal[1]
      );
      newSearchParams = `${rangeSliderVal[0]},${rangeSliderVal[1]}`;
    }

    searchParams.set(key, newSearchParams);
    setSearchParams(searchParams);
    setTableData(newFilteredData);
    dispatch(closeModal());
  };

  const onListItemClick = (item) => {
    const newFilteredAppsData = filteredAppsData.map((appData) => {
      if (appData.subtitle === item.subtitle) {
        return { ...appData, selected: !appData.selected };
      }
      return appData;
    });
    setFilteredAppsData(newFilteredAppsData);
  };

  return (
    <thead>
      <tr className="analytics-table-head-tr">
        {tableColumns.map(
          (tableColumn, i) =>
            tableColumn.isVisible && (
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
                      actions={
                        <Button
                          type="primary"
                          onClick={() => onApplyClick(tableColumn.key)}
                        >
                          Apply
                        </Button>
                      }
                    >
                      {tableColumn.key === "app_id" ? (
                        <SearchList
                          list={filteredAppsData}
                          onListItemClick={onListItemClick}
                        />
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
                      )}
                    </Modal>
                  </>
                )}
                <div>{tableColumn.title}</div>
              </td>
            )
        )}
      </tr>
    </thead>
  );
}

export default AnalyticsTableHead;
