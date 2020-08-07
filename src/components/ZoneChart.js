import React from "react";
import { strikeZoneCoords, pointInRectCheck, createZones } from "./utils/zone";
import { nest } from "d3-collection";
import { median, extent } from "d3-array";
import { colorScale } from "./utils/scales";
import { aggregatorFun } from "./utils/aggregators";

function ZoneChart({
  x,
  y,
  styles,
  data,
  xScale,
  yScale,
  fill = {},
  aggregator,
  aggregateValue,
  labels = {},
}) {
  const { type, colorRange } = fill;

  const scaledStrikeZoneCoords = {
    ...strikeZoneCoords,
    zoneHeight:
      yScale(strikeZoneCoords.bottomThird) - yScale(strikeZoneCoords.topThird),
    zoneWidth:
      xScale(strikeZoneCoords.rightThird) - xScale(strikeZoneCoords.leftThird),
  };

  function createZoneGroups(strikeZoneCoords, data) {
    const completeZones = createZones(strikeZoneCoords);

    const dataZone = data.map((d) => {
      let item2 = completeZones.find((zone) =>
        pointInRectCheck(
          zone.a,
          zone.b,
          zone.c,
          zone.d,
          [d[x], d[y]],
          zone.zone
        )
      );
      return item2
        ? {
            ...d,
            zone: {
              zone: item2.zone,
              x: item2.a[0],
              y: item2.a[1],
              width: strikeZoneCoords.zoneWidth,
              height: strikeZoneCoords.zoneHeight,
            },
          }
        : d;
    });

    return dataZone;
  }

  let playDataZone = createZoneGroups(scaledStrikeZoneCoords, data);

  playDataZone = playDataZone.filter((d) => {
    return d.zone !== undefined;
  });

  const zoneGroups = nest()
    .key((d) => d.zone.zone)
    .rollup((v) => {
      return {
        count: v.length,
        [aggregateValue]: aggregatorFun(aggregator, v, aggregateValue),
        x_location: median(v, (d) => d.zone.x),
        y_location: median(v, (d) => d.zone.y),
      };
    })
    .entries(playDataZone);

  const zoneGroupsTruthy = zoneGroups.filter((d) => d.key !== "");

  const color = colorScale(
    type,
    extent(zoneGroupsTruthy, (d) => d.value[aggregateValue]),
    colorRange
  );

  const text = labels.display
    ? zoneGroupsTruthy.map((d, i) => (
        <text
          key={i}
          x={xScale(d.value.x_location)}
          y={yScale(d.value.y_location)}
          dx={scaledStrikeZoneCoords.zoneWidth / 2}
          dy={scaledStrikeZoneCoords.zoneHeight / 2}
          textAnchor="middle"
          dominantBaseline="central"
          style={{ ...labels.styles }}
        >
          {Math.round(d.value.count)}
        </text>
      ))
    : null;

  return (
    <>
      {zoneGroupsTruthy.map((d, i) => (
        <rect
          key={i}
          x={xScale(d.value.x_location)}
          y={yScale(d.value.y_location)}
          width={scaledStrikeZoneCoords.zoneWidth}
          height={scaledStrikeZoneCoords.zoneHeight}
          style={{
            fill: color ? color(d.value[aggregateValue]) : null,
            ...styles,
          }}
        />
      ))}
      {text}
    </>
  );
}

export default ZoneChart;
