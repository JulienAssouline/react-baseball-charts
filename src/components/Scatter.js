import React from "react";
import Circles from "./primitives/Circles";
import PropTypes from "prop-types";

function Scatter({ r, x, y, styles, data, xScale, yScale }) {
  const circles = data.map((d, i) => (
    <Circles key={i} r={r} cx={xScale(d[x])} cy={yScale(d[y])} style={styles} />
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
};

export default Scatter;
