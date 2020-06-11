import React, { useContext } from "react";
import PropTypes from "prop-types";

import { TooltipContext } from "../context/TooltipContext";
import Circles from "./primitives/Circles";

import { colorScale } from "./utils/scales";
import { handleMouseOut, handleMouseOver } from "./utils/mouseEvents";

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

  const circles = data.map((d, i) => (
    <Circles
      key={i}
      r={r}
      cx={xScale(d[x])}
      cy={yScale(d[y])}
      style={{ fill: displayColor(color, d[fillValue]), ...styles }}
      onMouseOver={(e) =>
        handleMouseOver(
          e,
          d,
          e.target.cx.animVal.value,
          e.target.cy.animVal.value,
          setTooltip
        )
      }
      onMouseOut={() => handleMouseOut(setTooltip)}
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
