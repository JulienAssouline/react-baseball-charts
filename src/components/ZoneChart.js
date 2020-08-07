import React from "react";
import { strikeZoneCoords, pointInRectCheck, createZones } from "./utils/zone";
import { nest } from "d3-collection";
import { median, extent } from "d3-array";
import { colorScale } from "./utils/scales";
import { aggregatorFun } from "./utils/aggregators";
import PropTypes from "prop-types";

function isCount(aggregateValue, d) {
  return aggregateValue === "count" ? d.value.count : d.value[aggregateValue];
}

function ZoneChart({
  x,
  y,
  styles,
  data,
  xScale,
  yScale,
  fill = {},
  aggregator,
  aggregateValue = "count",
  labels = {},
}) {
  const { type, minMax, colorRange } = fill;

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
        [aggregateValue]: aggregatorFun(aggregator, v, aggregateValue),
        count: v.length,
        x_location: median(v, (d) => d.zone.x),
        y_location: median(v, (d) => d.zone.y),
      };
    })
    .entries(playDataZone);

  const zoneGroupsTruthy = zoneGroups.filter((d) => d.key !== "");

  const color = colorScale(
    type,
    !minMax
      ? extent(zoneGroupsTruthy, (d) => isCount(aggregateValue, d))
      : minMax,
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
          {Math.round(isCount(aggregateValue, d))}
        </text>
      ))
    : null;

  const zoneRects = zoneGroupsTruthy.map((d, i) => (
    <rect
      key={i}
      x={xScale(d.value.x_location)}
      y={yScale(d.value.y_location)}
      width={scaledStrikeZoneCoords.zoneWidth}
      height={scaledStrikeZoneCoords.zoneHeight}
      style={{
        fill: color ? color(isCount(aggregateValue, d)) : null,
        ...styles,
      }}
    />
  ));

  return (
    <>
      {zoneRects}
      {text}
    </>
  );
}

ZoneChart.propTypes = {
  x: PropTypes.string.isRequired,
  y: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  xScale: PropTypes.func,
  yScale: PropTypes.func,
  aggregator: PropTypes.string,
  aggregateValue: PropTypes.string,
  labels: PropTypes.object,
  fill: PropTypes.object,
};

export default ZoneChart;
