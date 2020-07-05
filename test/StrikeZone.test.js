import { render, cleanup, fireEvent } from "@testing-library/react";
import React from "react";
import StrikeZone from "../src/components/StrikeZone";
import StrikeZoneBox from "../src/components/StrikeZoneBox";
import Scatter from "../src/components/Scatter";
import { colorScale } from "../src/components/utils/scales";
import Tooltip from "../src/components/Tooltip";
import BaseballChartsContainer from "../src/components/BaseballChartsContainer";

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

  test("should display zone", () => {
    const { getByTestId } = render(
      <StrikeZone margin={margin} data={data}>
        <StrikeZoneBox />
      </StrikeZone>
    );

    expect(getByTestId("strike-zone"));
    expect(getByTestId("zone"));
  });

  test("should have 16 circles", () => {
    const { getAllByTestId, getByTestId } = render(
      <StrikeZone w={w} h={h} margin={margin} data={data}>
        <Scatter x="x" y="y" styles={{ fill: "black" }} />
        <StrikeZoneBox />
      </StrikeZone>
    );

    expect(getAllByTestId("scatter-circles")).toHaveLength(16);
    expect(getByTestId("zone"));
  });

  test("ordianl colorScale", () => {
    const domain = ["FB", "SL", "CU"];
    const colorRange = ["red", "blue", "green"];

    const scale = colorScale("ordinal", domain, colorRange);

    expect(scale("FB")).toBe("red");
    expect(scale("SL")).toBe("blue");
    expect(scale("CU")).toBe("green");
  });

  test("shows the tooltip on mouseOver", () => {
    const { container, getAllByTestId } = render(
      <BaseballChartsContainer>
        <StrikeZone w={w} h={h} margin={margin} data={data}>
          <Scatter
            r={6}
            x="x"
            y="y"
            fill={{
              type: "ordinal",
              domain: ["FB", "SL", "CU"],
              fillValue: "pitch",
              colorRange: ["red", "blue", "green"],
            }}
            styles={{ stroke: "none" }}
          />
          <StrikeZoneBox />
        </StrikeZone>
        <Tooltip labels={({ value }) => <p>{`${value.toFixed(2)}`}</p>} />
      </BaseballChartsContainer>
    );

    const nodes = getAllByTestId("scatter-circles");

    fireEvent.mouseOver(nodes[0]);

    expect(container.querySelector("p")).not.toBeNull();
  });

  test("removes the tooltip on mouseOut", () => {
    const { container, getAllByTestId } = render(
      <BaseballChartsContainer>
        <StrikeZone w={w} h={h} margin={margin} data={data}>
          <Scatter
            r={6}
            x="x"
            y="y"
            fill={{
              type: "ordinal",
              domain: ["FB", "SL", "CU"],
              fillValue: "pitch",
              colorRange: ["red", "blue", "green"],
            }}
            styles={{ stroke: "none" }}
          />
          <StrikeZoneBox />
        </StrikeZone>
        <Tooltip labels={({ value }) => <p>{`${value.toFixed(2)}`}</p>} />
      </BaseballChartsContainer>
    );

    const nodes = getAllByTestId("scatter-circles");

    fireEvent.mouseOut(nodes[0]);

    expect(container.querySelector("p")).toBeNull();
  });
});
