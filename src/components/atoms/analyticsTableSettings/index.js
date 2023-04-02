import React, { useState } from "react";
import "./index.css";

import Button from "../../common/button";

function AnalyticsTableSettings({
  tableColumns,
  setTableColumns,
  setIsSettingsVisible,
  searchParams,
  setSearchParams,
}) {
  const [dragItem, setDragItem] = useState(null);
  const [newTableColumns, setNewTableColumns] = useState(tableColumns); // for actions only on 'Apply' click
  const [newSearchParams, setNewSearchParams] = useState(searchParams); // for actions only on 'Apply' click

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

  const onCardMouseDown = (e, tableColumn) =>
    setDragItem({ colData: tableColumn, event: e });

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
    if (dragItem) {
      let updatedTableColumns = [...newTableColumns];
      let draggedItem = { ...dragItem.colData, pos: tableColumn.pos };
      let itemDraggedOn = { ...tableColumn, pos: dragItem.colData.pos };
      updatedTableColumns[tableColumn.pos] = draggedItem;
      updatedTableColumns[dragItem.colData.pos] = itemDraggedOn;
      setNewTableColumns(updatedTableColumns);
      clearDragItem();
    }
  };

  const onCloseClick = () => {
    clearDragItem();
    setIsSettingsVisible(false);
  };

  const onApplyClick = () => {
    clearDragItem();
    setTableColumns(newTableColumns);
    setIsSettingsVisible(false);
    setSearchParams(newSearchParams);
  };

  const clearDragItem = () => {
    if (dragItem) {
      dragItem.event.target.style.position = "static";
      dragItem.event.target.style.zIndex = 0;
      setDragItem(null);
    }
  };

  return (
    <div className="analytics-table-settings">
      <h3>Dimensions and Metrics</h3>
      <div
        className="analytics-table-settings-cards-wrapper"
        onMouseLeave={clearDragItem}
      >
        {newTableColumns.map((tableColumn, i) => (
          <div key={i} style={{ width: "200px" }}>
            <div
              key={tableColumn.key}
              className={`analytics-table-settings-card ${
                tableColumn.isVisible
                  ? "analytics-table-settings-card-visible"
                  : "analytics-table-settings-card-not-visible"
              }`}
              onClick={() => onCardClick(tableColumn)}
              onMouseDown={(e) => onCardMouseDown(e, tableColumn)}
              onMouseMove={onCardMouseMove}
              onMouseUp={() => onCardMouseUp(tableColumn)}
            >
              {tableColumn.title}
            </div>
          </div>
        ))}
      </div>
      <div className="analytics-table-settings-action-btn-wrapper">
        <Button type="secondary" onClick={onCloseClick}>
          Close
        </Button>
        <Button type="primary" onClick={onApplyClick}>
          Apply changes
        </Button>
      </div>
    </div>
  );
}

export default AnalyticsTableSettings;
