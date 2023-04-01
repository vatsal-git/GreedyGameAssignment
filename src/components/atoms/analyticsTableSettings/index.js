import { useState } from "react";
import CustomButton from "../customButton";
import "./index.css";
import { getAllSearchParams } from "../../../utils/commonFunctions";

function AnalyticsTableSettings({
  tableColumns,
  setTableColumns,
  setIsSettingsVisible,
  searchParams,
  setSearchParams,
}) {
  const [dragItem, setDragItem] = useState(null);
  const [newTableColumns, setNewTableColumns] = useState(tableColumns);
  const [newSearchParams, setNewSearchParams] = useState(searchParams);

  const onCardClick = (tableColumn) => {
    if (tableColumn.key === "app_id" || tableColumn.key === "date") return; // don't make app_id and date columns invisible

    if (!tableColumn.isVisible) newSearchParams.delete(tableColumn.key);
    else newSearchParams.set(tableColumn.key, !tableColumn.isVisible);
    setNewSearchParams(newSearchParams);

    setNewTableColumns(
      newTableColumns.map((column) => {
        if (column.key === tableColumn.key)
          return {
            ...column,
            isVisible: !column.isVisible,
          };
        else return column;
      })
    );
  };

  const onCardMouseMove = (e) => {
    if (dragItem) {
      e.preventDefault();
      dragItem.event.target.style.position = "absolute";
      dragItem.event.target.style.zIndex = 999;
      dragItem.event.target.style.top = window.event.clientY + 1 + "px";
      dragItem.event.target.style.left = window.event.clientX - 1 + "px";
    }
  };

  const onCardMouseUp = (tableColumn) => {
    let new1 = { ...tableColumn, pos: dragItem.colData.pos };
    let new2 = { ...dragItem.colData, pos: tableColumn.pos };
    let tmp = [...newTableColumns];
    tmp[dragItem.colData.pos] = new1;
    tmp[tableColumn.pos] = new2;
    setNewTableColumns(tmp);
    dragItem.event.target.style.position = "static";
    dragItem.event.target.style.zIndex = 0;
    setDragItem(null);
  };

  return (
    <div
      className="analyticsTableSettings"
      onMouseLeave={() => {
        if (dragItem) {
          dragItem.event.target.style.position = "static";
          setDragItem(null);
        }
      }}
    >
      <h3>Dimensions and Metrics</h3>
      <div className="cardsWrapper">
        {newTableColumns.map((tableColumn, i) => {
          return (
            <div key={i} style={{ width: "200px" }}>
              <div
                key={tableColumn.key}
                className={`card ${
                  newTableColumns[i].isVisible
                    ? "cardVisible"
                    : "cardNotVisible"
                }`}
                onClick={() => onCardClick(tableColumn)}
                onMouseDown={(e) =>
                  setDragItem({ colData: tableColumn, event: e })
                }
                onMouseMove={onCardMouseMove}
                onMouseUp={() => onCardMouseUp(tableColumn)}
              >
                {tableColumn.title}
              </div>
            </div>
          );
        })}
      </div>
      <div className="actionButtonWrapper">
        <CustomButton
          content="Close"
          style={{ color: "#136FED" }}
          onClick={() => setIsSettingsVisible(false)}
        />
        <CustomButton
          content="Apply"
          style={{ backgroundColor: "#136FED", color: "#ffffff" }}
          onClick={() => {
            setTableColumns(newTableColumns);
            setIsSettingsVisible(false);
            setSearchParams(newSearchParams);
          }}
        />
      </div>
    </div>
  );
}

export default AnalyticsTableSettings;
