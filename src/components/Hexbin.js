import React, { useContext } from "react";
import { hexbin } from "d3-hexbin";
import PropTypes from "prop-types";

import { TooltipContext } from "../context/TooltipContext";
import Path from "./primitives/Path";

import { binData, aggregatorFun } from "./utils/aggregators";
import { colorScale } from "./utils/scales";
import { handleMouseOut, handleMouseOver } from "./utils/mouseEvents";

function Hexbin({
  r,
  x,
  y,
  styles,
  data,
  xScale,
  yScale,
  margin,
  width,
  height,
  fill = {},
  aggregator,
  aggregateValue,
}) {
  const { setTooltip } = useContext(TooltipContext) || {};

  const { type, minMax, colorRange } = fill;

  const hexbinData = hexbin()
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]))
    .radius(r)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

  const bins = binData(
    hexbinData,
    data,
    aggregateValue,
    aggregatorFun,
    aggregator
  );

  const color = colorScale(type, minMax, colorRange);

  return bins.map((d, i) => (
    <g key={i} style={{ stroke: "#000", strokeOpacity: 0.1 }}>
      <Path
        data-testid="hexbin-path"
        d={hexbinData.hexagon()}
        transform={`translate(${d.x},${d.y})`}
        style={{
          fill: color ? color(d[aggregateValue]) : null,
          ...styles,
        }}
        onMouseOver={(e) => handleMouseOver(e, d, d.x, d.y, setTooltip)}
        onMouseOut={() => handleMouseOut(setTooltip)}
      />
    </g>
  ));
}

Hexbin.propTypes = {
  r: PropTypes.number,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  margin: PropTypes.object,
  width: PropTypes.number,
  height: PropTypes.number,
  aggregator: PropTypes.string,
  fill: PropTypes.object,
};

export default Hexbin;
