import React from "react";
import "./index.css";

function Loader({ wrapperStyle, loaderStyle }) {
  return (
    <div className="loader-wrapper" style={wrapperStyle}>
      <div className="loader" style={loaderStyle} />
    </div>
  );
}

export default Loader;
