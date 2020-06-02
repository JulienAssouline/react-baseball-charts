import React from "react";
import { hexbin } from "d3-hexbin";
import { max, mean, median } from "d3-array";
import PropTypes from "prop-types";

import Path from "./primitives/Path";

import { colorScale } from "./utils/scales";

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
}) {
  const { fillValue, type, minMax, colorRange } = fill;

  const hexbinData = hexbin()
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]))
    .radius(r)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

  function binData(data, fillValue, aggregator) {
    function aggregatorFun(check, d) {
      if (check === "mean") return mean(d, (v) => v[fillValue]);
      if (check === "median") return median(d, (v) => v[fillValue]);
    }

    const bins = Object.assign(
      hexbinData(data).map((d) => {
        return {
          x: d.x,
          y: d.y,
          value: aggregatorFun(aggregator, d),
          count: d.length,
        };
      })
    );

    return bins;
  }

  const bins = binData(data, fillValue, aggregator);

  const color = colorScale(type, minMax, colorRange);

  return bins.map((d, i) => (
    <g key={i} style={{ stroke: "#000", strokeOpacity: 0.1 }}>
      <Path
        d={hexbinData.hexagon()}
        transform={`translate(${d.x},${d.y})`}
        style={{
          fill: color ? color(d[fillValue]) : null,
          ...styles,
        }}
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
