import React from "react";
import StrikeZoneBox from "./StrikeZoneBox";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import PropTypes from "prop-types";

function StrikeZone({ w = 500, h = 500, margin, data, children }) {
  const width = w - margin.right - margin.left,
    height = h - margin.top - margin.bottom;

  const { x, y } = !children.length ? children.props : children[0].props;

  const xScale = scaleLinear()
    .domain(extent(data, (d) => d[x]))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d[y]))
    .range([height, 0]);

  const newChildren = !children.length
    ? React.cloneElement(children, {
        data,
        width,
        height,
        xScale,
        yScale,
        margin,
        width,
        height,
        ...children.props,
      })
    : React.Children.map(children, (child) => {
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

StrikeZone.propTypes = {
  w: PropTypes.number,
  h: PropTypes.number,
  margin: PropTypes.object,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default StrikeZone;
