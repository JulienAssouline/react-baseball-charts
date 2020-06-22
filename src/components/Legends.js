import React from "react";
import { colorScale } from "./utils/scales";
import { scaleLinear } from "d3-scale";

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

function LinearLegend({
  x,
  y,
  styles,
  scale,
  fontSize = 10,
  shapeWidth = 20,
  padding = 40,
  shapeHeight = 20,
  orient = "horizontal",
}) {
  const { type, minMax, colorRange } = scale;

  const color = colorScale(type, minMax, colorRange);

  function scaleRange(orientation) {
    if (orientation === "horizontal") {
      return [0, shapeWidth * 10 + padding];
    } else if (orientation === "vertical") {
      return [shapeHeight * 10 + padding, 0];
    } else return null;
  }

  const linear = scaleLinear().domain(minMax).range(scaleRange(orient));

  return (
    <>
      <g style={{ ...styles }} transform={`translate(${x}, ${y})`}>
        {linear.ticks().map((d, i) => (
          <g key={i}>
            <rect
              x={orient === "horizontal" ? linear(d) : shapeWidth}
              y={orient === "horizontal" ? shapeHeight : linear(d)}
              height={shapeHeight}
              width={shapeWidth}
              fill={color(d)}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dy={".80em"}
              dx={shapeWidth / 2}
              x={orient === "horizontal" ? linear(d) : shapeWidth * 2}
              y={orient === "horizontal" ? shapeHeight * 2 : linear(d)}
              style={{ fontSize: fontSize }}
            >
              {d}
            </text>
          </g>
        ))}
      </g>
    </>
  );
}

export { TextLegend, CircleLegend, LinearLegend };
