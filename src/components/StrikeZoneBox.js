import React from "react";
import { strikeZoneCoords } from "./utils/zone";

export default function StrikeZoneBox({ xScale, yScale }) {
  return (
    <path
      data-testid="zone"
      d={`M${xScale(strikeZoneCoords.left)}, ${yScale(
        strikeZoneCoords.top
      )} L ${xScale(strikeZoneCoords.right)}, ${yScale(
        strikeZoneCoords.top
      )} L ${xScale(strikeZoneCoords.right)}, ${yScale(
        strikeZoneCoords.bottom
      )} L ${xScale(strikeZoneCoords.left)}, ${yScale(
        strikeZoneCoords.bottom
      )} L ${xScale(strikeZoneCoords.left)}, ${yScale(strikeZoneCoords.top)}`}
      style={{ fill: "none", stroke: "black" }}
    />
  );
}
