import React from "react";
import PropTypes from "prop-types";

import Circles from "./primitives/Circles";

import { colorScale } from "./utils/scales";

function Scatter({ r, x, y, styles, data, xScale, yScale, fill = {} }) {
  const { fillValue, type, domain, colorRange } = fill;

  const color = colorScale(type, domain, colorRange);

  function displayColor(scale, value) {
    if (scale) {
      return value ? scale(value) : "black";
    } else {
      return null;
    }
  }

  const circles = data.map((d, i) => (
    <Circles
      key={i}
      r={r}
      cx={xScale(d[x])}
      cy={yScale(d[y])}
      style={{ fill: displayColor(color, d[fillValue]), ...styles }}
    />
  ));

  return <>{circles}</>;
}

Scatter.propTypes = {
  r: PropTypes.number,
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  styles: PropTypes.object,
  fill: PropTypes.object,
};

export default Scatter;
