import React from "react";
import { colorScale } from "../components/utils/scales";
function TextLegend({ position, orient, uniqueText, colors, styles, width }) {
  const color = colorScale("ordinal", uniqueText, colors);

  let newPos = position;
  if (position === "right") {
    newPos = "flex-end";
  }
  if (position === "left") {
    newPos = "flex-start";
  }

  const alignMent = orient === "column" ? "alignItems" : "justifyContent";

  return (
    <div
      style={{
        display: "flex",
        flexFlow: orient,
        [alignMent]: newPos,
        width,
      }}
    >
      {uniqueText.map((d, i) => (
        <div style={{ color: color(d), padding: 5, ...styles }} key={i}>
          {d}
        </div>
      ))}
    </div>
  );
}

export { TextLegend };
