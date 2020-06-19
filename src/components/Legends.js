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

  let alignment;
  let flow;

  if (orient === "vertical") {
    alignment = "alignItems";
    flow = "column";
  } else if (orient === "horizontal") {
    alignment = "justifyContent";
    flow = "row";
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: flow,
        [alignment]: newPos,
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

function CircleLegend({
  position,
  orient,
  uniqueText,
  colors,
  styles,
  width,
  size,
  radius,
}) {
  const color = colorScale("ordinal", uniqueText, colors);

  let newPos = position;
  if (position === "right") {
    newPos = "flex-end";
  }
  if (position === "left") {
    newPos = "flex-start";
  }

  let alignment;
  let flow;

  if (orient === "vertical") {
    alignment = "alignItems";
    flow = "column";
  } else if (orient === "horizontal") {
    alignment = "justifyContent";
    flow = "row";
  }

  return (
    <div
      style={{
        display: "flex",
        flexFlow: flow,
        [alignment]: newPos,
        width,
      }}
    >
      {uniqueText.map((d, i) => (
        <div
          style={{ display: "flex", alignItems: "center", ...styles }}
          key={i}
        >
          <div
            style={{
              width: size.width,
              height: size.height,
              borderRadius: radius,
              backgroundColor: color(d),
            }}
          ></div>
          <div style={{ color: color(d), padding: 5 }}>{d}</div>
        </div>
      ))}
    </div>
  );
}

export { TextLegend, CircleLegend };
