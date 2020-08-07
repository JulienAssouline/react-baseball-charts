import React from "react";
import { colorScale } from "./utils/scales";
import { scaleLinear } from "d3-scale";
import PropTypes from "prop-types";

function TextLegend({ position, orient, text, colors, styles, width }) {
  const color = colorScale("ordinal", text, colors);

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
      data-testid="legend-text"
      style={{
        display: "flex",
        flexFlow: flow,
        [alignment]: newPos,
        width,
      }}
    >
      {text.map((d, i) => (
        <div style={{ color: color(d), padding: 5, ...styles }} key={i}>
          {d}
        </div>
      ))}
    </div>
  );
}

TextLegend.propTypes = {
  position: PropTypes.string,
  orient: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
  width: PropTypes.number,
};

function CircleLegend({
  position,
  orient,
  text,
  colors,
  styles,
  width,
  size,
  radius,
}) {
  const color = colorScale("ordinal", text, colors);

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
      data-testid="legend-circle"
      style={{
        display: "flex",
        flexFlow: flow,
        [alignment]: newPos,
        width,
      }}
    >
      {text.map((d, i) => (
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

CircleLegend.propTypes = {
  position: PropTypes.string,
  orient: PropTypes.string,
  text: PropTypes.arrayOf(PropTypes.string),
  colors: PropTypes.arrayOf(PropTypes.string),
  styles: PropTypes.object,
  width: PropTypes.number,
  size: PropTypes.object,
  radius: PropTypes.number,
};

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
  ticks,
}) {
  const { type, minMax, colorRange } = scale;

  const color = colorScale(type, minMax, colorRange);

  function scaleRange(orientation) {
    if (orientation === "horizontal") {
      return [0, shapeWidth * 10 + padding];
    } else if (orientation === "vertical") {
      return [shapeHeight * 10 + padding, 0];
    } else
      throw new Error(
        `horizontal and vertical are the only valid orient values`
      );
  }

  const linear = scaleLinear().domain(minMax).range(scaleRange(orient));

  return (
    <>
      <g
        data-testid="legend-linear"
        style={{ ...styles }}
        transform={`translate(${x}, ${y})`}
      >
        {linear.ticks(ticks).map((d, i) => (
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

LinearLegend.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  scale: PropTypes.object,
  fontSize: PropTypes.number,
  styles: PropTypes.object,
  shapeWidth: PropTypes.number,
  padding: PropTypes.number,
  shapeHeight: PropTypes.number,
  orient: PropTypes.string,
};

export { TextLegend, CircleLegend, LinearLegend };
