import React from "react";

function StrikeZone({ w, h, margin, data, children }) {
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  return (
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {React.cloneElement(children, {
          data,
          width,
          height,
          ...children.props,
        })}
        {/*  */}
      </g>
    </svg>
  );
}

export default StrikeZone;
