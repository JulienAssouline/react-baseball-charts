import React from "react";
import StrikeZoneBox from "./StrikeZoneBox";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";

function StrikeZone({ w, h, margin, data, children }) {
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const { x, y } = children[0].props;

  const xScale = scaleLinear()
    .domain(extent(data, (d) => d[x]))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d[y]))
    .range([height, 0]);

  const newChildren = React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      data,
      width,
      height,
      xScale,
      yScale,
      margin,
      width,
      height,
      ...child.props,
    });
  });

  return (
    <svg width={w} height={h}>
      <g transform={`translate(${margin.left},${margin.top})`}>
        {newChildren}
        <StrikeZoneBox xScale={xScale} yScale={yScale} />
      </g>
    </svg>
  );
}

export default StrikeZone;
