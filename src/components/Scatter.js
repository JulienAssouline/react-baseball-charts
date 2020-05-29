import React from "react";
import Circles from "./primitives/Circles";
import { scaleLinear } from "d3-scale";
import { extent } from "d3-array";
import StrikeZoneBox from "./StrikeZoneBox";

function Scatter({ r, x, y, styles, data, width, height }) {
  const xScale = scaleLinear()
    .domain(extent(data, (d) => d[x]))
    .range([0, width]);

  const yScale = scaleLinear()
    .domain(extent(data, (d) => d[y]))
    .range([height, 0]);

  const circles = data.map((d, i) => (
    <Circles key={i} r={r} cx={xScale(d[x])} cy={yScale(d[y])} style={styles} />
  ));

  return (
    <>
      {circles}
      <StrikeZoneBox xScale={xScale} yScale={yScale} />
    </>
  );
}

export default Scatter;
