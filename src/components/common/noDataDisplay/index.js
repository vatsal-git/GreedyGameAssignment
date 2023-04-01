import React from "react";
import "./index.css";

import noDataImg from "../../../assets/images/no-data-img.svg";

function NoDataDisplay({ extraMsg }) {
  return (
    <div className="no-data-display">
      <img src={noDataImg} alt="noDataImg" width="223px" />
      <div className="no-data-display-content">
        Hey! Something's off!
        <br />
        We couldn't display the given data.
        <br />
        <span>{extraMsg}</span>
      </div>
    </div>
  );
}

export default NoDataDisplay;
