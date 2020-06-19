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
  width,
  height,
  styles,
  scale,
  fontSize,
  shapeWidth,
}) {
  const { type, minMax, colorRange } = scale;

  const color = colorScale(type, minMax, colorRange);

  const linear = scaleLinear().domain(minMax).range([0, width]);

  const data = color.ticks();

  const gradient = (
    <defs>
      <linearGradient id={`linear-gradient-${data.length}`}>
        {data.map((d, i, array) => (
          <stop
            key={i}
            offset={`${(100 * i) / array.length}%`}
            stopColor={color(d)}
          />
        ))}
      </linearGradient>
    </defs>
  );

  return (
    <>
      <g transform={`translate(${x}, ${y})`}>
        {linear.ticks().map((d, i) => (
          <g key={i}>
            <rect
              x={linear(d)}
              y={height}
              height={height}
              width={shapeWidth}
              fill={color(d)}
            />
            <text
              textAnchor="middle"
              dominantBaseline="middle"
              dy={".80em"}
              dx={shapeWidth / 2}
              x={linear(d)}
              y={height * 2}
            >
              {d}
            </text>
          </g>
        ))}
      </g>
      {/* {gradient}
      <text dy=".71em" x={x} y={height} style={{ fontSize: fontSize }}>
        {minMax[0]}
      </text>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#linear-gradient-${data.length})`}
        style={{ ...styles }}
      />
      <text dy=".71em" x={width} y={height} style={{ fontSize: fontSize }}>
        {minMax[minMax.length - 1]}
      </text> */}
    </>
  );
}

export { TextLegend, CircleLegend, LinearLegend };
