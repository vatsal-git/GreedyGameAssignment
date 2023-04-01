import React from "react";
import "./index.css";

import { useDispatch } from "react-redux";

import filterIcon from "../../../assets/images/filter-icon.png";
import { openModal } from "../../../store/modal";
import Modal from "../../common/modal";

function AnalyticsTableHead({ tableColumns }) {
  const dispatch = useDispatch();

  const onFilterClick = (key) => dispatch(openModal({ type: key }));

  return (
    <thead>
      <tr className="analytics-table-head-tr">
        {tableColumns.map(
          (tableColumn, i) =>
            tableColumn.isVisible && (
              <td key={i}>
                <img
                  src={filterIcon}
                  height="18px"
                  width="18px"
                  onClick={() => onFilterClick(tableColumn.key)}
                />
                <Modal
                  type={tableColumn.key}
                  title={tableColumn.title}
                  content="content"
                  actions="actions"
                />
                <div>{tableColumn.title}</div>
              </td>
            )
        )}
      </tr>
    </thead>
  );
}

export default AnalyticsTableHead;
