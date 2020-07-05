import { render, fireEvent, cleanup } from "@testing-library/react";
import React from "react";
import StrikeZone from "../src/components/StrikeZone";
import StrikeZoneBox from "../src/components/StrikeZoneBox";
import Hexbin from "../src/components/Hexbin";
import { extent } from "d3-array";
import Tooltip from "../src/components/Tooltip";
import BaseballChartsContainer from "../src/components/BaseballChartsContainer";
import { colorScale } from "../src/components/utils/scales";
import { aggregatorFun } from "../src/components/utils/aggregators";

afterEach(cleanup);

describe("StrikeZone Scatter", () => {
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

  test("should have multiple hexbins", () => {
    const { getAllByTestId } = render(
      <StrikeZone w={w} h={h} margin={margin} data={data}>
        <Hexbin r={10} x="x" y="y" aggregator="mean" aggregateValue="value" />
        <StrikeZoneBox />
      </StrikeZone>
    );

    expect(getAllByTestId("hexbin-path"));
  });

  test("shows the tooltip on mouseOver", () => {
    const rangeValue = extent(data, (d) => d.value);

    const { container, getAllByTestId } = render(
      <BaseballChartsContainer>
        <StrikeZone w={w} h={h} margin={margin} data={data}>
          <Hexbin
            r={10}
            x="x"
            y="y"
            aggregator="mean"
            aggregateValue="value"
            fill={{
              type: "seqential",
              minMax: [rangeValue[0], rangeValue[1]],
              colorRange: ["white", "#003da5"],
            }}
            styles={{ stroke: "blue" }}
          />
          <StrikeZoneBox />
        </StrikeZone>
        <Tooltip labels={({ value }) => <p>{`${value.toFixed(2)}`}</p>} />
      </BaseballChartsContainer>
    );

    const nodes = getAllByTestId("hexbin-path");

    fireEvent.mouseOver(nodes[0]);

    expect(container.querySelector("p")).not.toBeNull();
  });

  test("removes the tooltip on mouseOut", () => {
    const rangeValue = extent(data, (d) => d.value);

    const { container, getAllByTestId } = render(
      <BaseballChartsContainer>
        <StrikeZone w={w} h={h} margin={margin} data={data}>
          <Hexbin
            r={10}
            x="x"
            y="y"
            aggregator="mean"
            aggregateValue="value"
            fill={{
              type: "seqential",
              minMax: [rangeValue[0], rangeValue[1]],
              colorRange: ["white", "#003da5"],
            }}
            styles={{ stroke: "blue" }}
          />
          <StrikeZoneBox />
        </StrikeZone>
        <Tooltip labels={({ value }) => <p>{`${value.toFixed(2)}`}</p>} />
      </BaseballChartsContainer>
    );

    const nodes = getAllByTestId("hexbin-path");

    fireEvent.mouseOut(nodes[0]);

    expect(container.querySelector("p")).toBeNull();
  });

  test("linear colorScale", () => {
    const rangeValue = extent(data, (d) => d.value);

    const minMax = [rangeValue[0], rangeValue[1]];
    const colorRange = ["rgb(255, 255, 255)", "rgb(0, 61, 165)"];

    const scale = colorScale("linear", minMax, colorRange);

    expect(scale(rangeValue[0])).toBe("rgb(255, 255, 255)");
    expect(scale(rangeValue[1])).toBe("rgb(0, 61, 165)");
  });

  test("seqential colorScale", () => {
    const rangeValue = extent(data, (d) => d.value);

    const minMax = [rangeValue[0], rangeValue[1]];
    const colorRange = ["rgb(255, 255, 255)", "rgb(0, 61, 165)"];

    const scale = colorScale("seqential", minMax, colorRange);

    expect(scale(rangeValue[0])).toBe("rgb(255, 255, 255)");
    expect(scale(rangeValue[1])).toBe("rgb(0, 61, 165)");
  });

  test("test aggregators", () => {
    const aggrData = [
      { x: 0.0162, y: 3.9406, value: 1, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 2, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 3, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 4, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 5, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 6, pitch: "FB" },
      { x: 0.0162, y: 3.9406, value: 7, pitch: "FB" },
    ];

    const mean = aggregatorFun("mean", aggrData, "value");
    const median = aggregatorFun("median", aggrData, "value");
    const max = aggregatorFun("max", aggrData, "value");
    const min = aggregatorFun("min", aggrData, "value");
    const sum = aggregatorFun("sum", aggrData, "value");

    expect(mean).toBe(4);
    expect(median).toBe(4);
    expect(max).toBe(7);
    expect(min).toBe(1);
    expect(sum).toBe(28);
  });
});
