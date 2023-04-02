import React from "react";
import "./index.css";

function RangeSlider({ value, setValue, min, max }) {
  return (
    <div className="range-slider">
      <div className="range-slider-input-wrapper">
        <input
          type="range"
          value={parseFloat(value[0])}
          min={min}
          max={max}
          className="range-slider-input"
          onInput={(e) => {
            e.target.value < value[1] && setValue([e.target.value, value[1]]);
          }}
        />
        <input
          type="range"
          value={parseFloat(value[1])}
          min={min}
          max={max}
          className="range-slider-input"
          onInput={(e) => {
            e.target.value > value[0] && setValue([value[0], e.target.value]);
          }}
        />
        <svg width="100%" height="24" className="range-slider-input-track">
          <line />
        </svg>
      </div>
      <div className="range-slider-values-wrapper">
        <span>from</span>
        <input
          type="number"
          value={parseFloat(value[0])}
          min={min}
          max={max}
          className="range-slider-values"
          onInput={(e) => {
            e.target.value < value[1] && setValue([e.target.value, value[1]]);
          }}
        />
        <span>to</span>
        <input
          type="number"
          value={parseFloat(value[1])}
          min={min}
          max={max}
          className="range-slider-values"
          onInput={(e) => {
            value[0] < e.target.value && setValue([value[0], e.target.value]);
          }}
        />
      </div>
    </div>
  );
}

export default RangeSlider;
