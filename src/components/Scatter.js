import React, { useContext } from "react";
import PropTypes from "prop-types";

import { TooltipContext } from "../context/TooltipContext";
import Circles from "./primitives/Circles";

import { colorScale } from "./utils/scales";

function Scatter({ r, x, y, styles, data, xScale, yScale, fill = {} }) {
  const { setTooltip } = useContext(TooltipContext) || {};

  const { fillValue, type, domain, colorRange } = fill;

  const color = colorScale(type, domain, colorRange);

  function displayColor(scale, value) {
    if (scale) {
      return value ? scale(value) : "black";
    } else {
      return null;
    }
  }

  function handleMouseOver(e, d) {
    if (setTooltip) {
      setTooltip({
        display: true,
        data: d,
        info: "HELLO WORLD",
        x: e.target.cx.animVal.value + 100,
        y: e.target.cy.animVal.value,
      });
    }
  }

  function handleMouseOut() {
    if (setTooltip) {
      setTooltip({ display: false });
    }
  }

  const circles = data.map((d, i) => (
    <Circles
      key={i}
      r={r}
      cx={xScale(d[x])}
      cy={yScale(d[y])}
      style={{ fill: displayColor(color, d[fillValue]), ...styles }}
      onMouseOver={(e) => handleMouseOver(e, d)}
      onMouseOut={handleMouseOut}
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
