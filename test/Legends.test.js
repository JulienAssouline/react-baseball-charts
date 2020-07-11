import { render, cleanup } from "@testing-library/react";
import React from "react";
import { colorScale } from "../src/components/utils/scales";
import { extent } from "d3-array";
import StrikeZone from "../src/components/StrikeZone";
import {
  TextLegend,
  CircleLegend,
  LinearLegend,
} from "../src/components/Legends";

afterEach(cleanup);

describe("StrikeZone Legend", () => {
  const w = 500,
    h = 500;

  const margin = {
    top: 40,
    left: 40,
    right: 40,
    bottom: 40,
  };

  const data = [
    { x: -0.076, y: 2.736, value: Math.random() },
    { x: -0.4535, y: 2.6556, value: Math.random(), pitch: "FB" },
    { x: -0.7687, y: 2.5112, value: Math.random(), pitch: "FB" },
    { x: -0.1568, y: 4.4147, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: -0.5278, y: 1.0777, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: -0.0241, y: 2.587, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
    { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
  ];

  const rangeValue = extent(data, (d) => d.value);

  test("legend text", () => {
    const { getByTestId } = render(
      <StrikeZone margin={margin} data={data}>
        <TextLegend
          colors={["red", "blue", "green"]}
          text={["FB", "SL", "CU"]}
          position="center"
          orient="horizontal"
        />
      </StrikeZone>
    );

    expect(getByTestId("legend-text"));
  });

  test("legend circle", () => {
    const { getByTestId } = render(
      <StrikeZone margin={margin} data={data}>
        <CircleLegend
          colors={["red", "blue", "green"]}
          text={["FB", "SL", "CU"]}
          position="center"
          orient="horizontal"
          radius={25}
          size={{ width: 10, height: 10 }}
          styles={{ padding: 5 }}
        />
      </StrikeZone>
    );

    expect(getByTestId("legend-circle"));
  });

  test("legend-linear", () => {
    const { getByTestId } = render(
      <StrikeZone margin={margin} data={data}>
        <LinearLegend
          scale={{
            type: "seqential",
            minMax: [Math.round(rangeValue[0]), Math.round(rangeValue[1])],
            colorRange: ["rgb(230, 236, 246)", "#003da5"],
          }}
          x={0}
          y={-40}
          orient="vertical"
          shapeHeight={20}
          padding={10}
        />
      </StrikeZone>
    );

    expect(getByTestId("legend-linear"));
  });

  test("legend legend horizontal orientation", () => {
    const { getByTestId } = render(
      <StrikeZone margin={margin} data={data}>
        <LinearLegend
          scale={{
            type: "seqential",
            minMax: [Math.round(rangeValue[0]), Math.round(rangeValue[1])],
            colorRange: ["rgb(230, 236, 246)", "#003da5"],
          }}
          x={0}
          y={-40}
          orient="horizontal"
        />
      </StrikeZone>
    );

    expect(getByTestId("legend-linear"));
  });

  test("legend linear incorrect orientation", () => {
    expect(() => {
      render(
        <StrikeZone margin={margin} data={data}>
          <LinearLegend
            scale={{
              type: "seqential",
              minMax: [Math.round(rangeValue[0]), Math.round(rangeValue[1])],
              colorRange: ["rgb(230, 236, 246)", "#003da5"],
            }}
            x={0}
            y={-40}
            orient="long"
          />
        </StrikeZone>
      );
    }).toThrowError(`horizontal and vertical are the only valid orient values`);
  });
});
