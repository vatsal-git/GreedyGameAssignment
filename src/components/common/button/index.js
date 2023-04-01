import React from "react";
import "./index.css";

function Button({ type = "primary", ...props }) {
  return (
    <button {...props} className={`btn btn-${type}`}>
      {props.children}
    </button>
  );
}

export default Button;
