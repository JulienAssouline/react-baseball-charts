import React from "react";
import { extent, mean, max } from "d3-array";
import { hexbin } from "d3-hexbin";

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
}) {
  const hexbinData = hexbin()
    .x((d) => xScale(d[x]))
    .y((d) => yScale(d[y]))
    .radius(r)
    .extent([
      [margin.left, margin.top],
      [width - margin.right, height - margin.bottom],
    ]);

  const bins = Object.assign(
    hexbinData(data).map((d) => {
      return {
        x: d.x,
        y: d.y,
        count: d.length,
      };
    })
  );

  return bins.map((d, i) => (
    <g key={i} style={{ stroke: "#000", strokeOpacity: 0.1 }}>
      <path
        d={hexbinData.hexagon()}
        transform={`translate(${d.x},${d.y})`}
        style={styles}
      />
    </g>
  ));
}

export default Hexbin;
