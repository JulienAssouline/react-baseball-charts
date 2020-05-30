import React from "react";
import Circles from "./primitives/Circles";

function Scatter({ r, x, y, styles, data, xScale, yScale }) {
  const circles = data.map((d, i) => (
    <Circles key={i} r={r} cx={xScale(d[x])} cy={yScale(d[y])} style={styles} />
  ));

  return <>{circles}</>;
}

export default Scatter;
