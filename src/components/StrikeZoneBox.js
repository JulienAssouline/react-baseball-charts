import React from "react";

export default function StrikeZoneBox({ xScale, yScale }) {
  const strikeZoneCoords = {
    top: 3.5,
    left: -0.783,
    bottom: 1.5,
    right: 0.783,
  };
  return (
    <path
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
