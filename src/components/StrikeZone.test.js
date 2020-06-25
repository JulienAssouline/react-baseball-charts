import { render } from "@testing-library/react";
import React from "react";
import StrikeZone from "./StrikeZone";
import StrikeZoneBox from "./StrikeZoneBox";

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
      <StrikeZone w={w} h={h} margin={margin} data={data}>
        <StrikeZoneBox />
      </StrikeZone>
    );

    console.log(getByTestId("strike-zone").length);

    expect(getByTestId("strike-zone"));
    expect(getByTestId("zone"));
  });
});
