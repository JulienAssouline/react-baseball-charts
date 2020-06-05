import React from "react";
import StrikeZone from "../src/components/StrikeZone";
import Scatter from "../src/components/Scatter";
import Hexbin from "../src/components/Hexbin";
import { extent } from "d3-array";
import StrikeZoneBox from "../src/components/StrikeZoneBox";
import Tooltip from "../src/components/Tooltip";
import BaseballChartsContainer from "../src/components/BaseballChartsContainer";

export default {
  title: "StikeZone",
  component: StrikeZone,
};

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
  { x: 0.0162, y: 3.9406, value: Math.random(), pitch: "FB" },
  { x: -0.8115, y: 0.6344, value: Math.random(), pitch: "FB" },
  { x: -1.281, y: 1.125, value: Math.random(), pitch: "FB" },
  { x: -0.2899, y: 1.0073, value: Math.random(), pitch: "FB" },
  { x: -0.6083, y: 1.9745, value: Math.random(), pitch: "FB" },
  { x: 1.1135, y: 1.0827, value: Math.random(), pitch: "FB" },
  { x: 0.5806, y: 2.4802, value: Math.random(), pitch: "FB" },
  { x: 0.1274, y: 2.5551, value: Math.random(), pitch: "FB" },
  { x: 0.3369, y: 2.6498, value: Math.random(), pitch: "FB" },
  { x: 0.6128, y: 2.2717, value: Math.random(), pitch: "FB" },
  { x: 1.3201, y: 2.9786, value: Math.random(), pitch: "FB" },
  { x: 1.139, y: 2.4794, value: Math.random(), pitch: "FB" },
  { x: 0.721, y: 2.4432, value: Math.random(), pitch: "FB" },
  { x: 0.4594, y: 3.0038, value: Math.random(), pitch: "FB" },
  { x: 1.4221, y: 3.9329, value: Math.random(), pitch: "FB" },
  { x: 0.7729, y: 2.4926, value: Math.random(), pitch: "FB" },
  { x: 1.2396, y: 1.3998, value: Math.random(), pitch: "FB" },
  { x: 0.8137, y: 1.9687, value: Math.random(), pitch: "FB" },
  { x: 0.2369, y: 1.9849, value: Math.random(), pitch: "FB" },
  { x: 0.142, y: 1.6816, value: Math.random(), pitch: "FB" },
  { x: 0.1723, y: 2.9141, value: Math.random(), pitch: "FB" },
  { x: -0.9513, y: 2.4315, value: Math.random(), pitch: "FB" },
  { x: -0.2276, y: 1.7573, value: Math.random(), pitch: "FB" },
  { x: 1.2361, y: 1.0125, value: Math.random(), pitch: "FB" },
  { x: 0.6892, y: 1.9969, value: Math.random(), pitch: "FB" },
  { x: 0.5958, y: 2.5337, value: Math.random(), pitch: "FB" },
  { x: 0.3738, y: 3.0335, value: Math.random(), pitch: "FB" },
  { x: 1.2576, y: 3.0768, value: Math.random(), pitch: "FB" },
  { x: 1.0551, y: 1.0408, value: Math.random(), pitch: "FB" },
  { x: 0.0358, y: 1.6886, value: Math.random(), pitch: "FB" },
  { x: 0.7527, y: 3.2971, value: Math.random(), pitch: "FB" },
  { x: -0.18, y: 3.5599, value: Math.random(), pitch: "FB" },
  { x: 0.4117, y: 2.2859, value: Math.random(), pitch: "FB" },
  { x: 1.2998, y: 0.8238, value: Math.random(), pitch: "FB" },
  { x: 1.8054, y: 2.4721, value: Math.random(), pitch: "FB" },
  { x: 2.1369, y: 1.3068, value: Math.random(), pitch: "FB" },
  { x: 1.3342, y: 1.9777, value: Math.random(), pitch: "FB" },
  { x: 0.3671, y: 2.6268, value: Math.random(), pitch: "FB" },
  { x: 0.0082, y: 3.5323, value: Math.random(), pitch: "FB" },
  { x: -1.2971, y: 4.3593, value: Math.random(), pitch: "FB" },
  { x: 0.1155, y: 2.5187, value: Math.random(), pitch: "FB" },
  { x: -1.5467, y: 4.0837, value: Math.random(), pitch: "FB" },
  { x: -0.7271, y: 0.3037, value: Math.random(), pitch: "FB" },
  { x: -0.2742, y: 3.9958, value: Math.random(), pitch: "FB" },
  { x: 0.4611, y: 2.3013, value: Math.random(), pitch: "FB" },
  { x: -0.621, y: 4.0735, value: Math.random(), pitch: "FB" },
  { x: -0.1595, y: 4.4887, value: Math.random(), pitch: "FB" },
  { x: -0.5233, y: 3.749, value: Math.random(), pitch: "FB" },
  { x: 0.1925, y: 4.2684, value: Math.random(), pitch: "FB" },
  { x: 0.7809, y: 1.7819, value: Math.random(), pitch: "FB" },
  { x: -0.684, y: 1.8616, value: Math.random(), pitch: "FB" },
  { x: -0.3056, y: 3.9736, value: Math.random(), pitch: "FB" },
  { x: 1.9121, y: 2.8739, value: Math.random(), pitch: "FB" },
  { x: 0.5859, y: 3.9589, value: Math.random(), pitch: "FB" },
  { x: 0.5745, y: 2.6236, value: Math.random(), pitch: "FB" },
  { x: -0.313, y: 1.7198, value: Math.random(), pitch: "FB" },
  { x: -0.0806, y: 4.4091, value: Math.random() },
  { x: 1.26, y: 3.869, value: Math.random(), pitch: "SL" },
  { x: -0.5939, y: 1.6983, value: Math.random(), pitch: "SL" },
  { x: -0.1545, y: 3.5987, value: Math.random(), pitch: "SL" },
  { x: 1.1269, y: 2.7541, value: Math.random(), pitch: "SL" },
  { x: 0.4784, y: 2.657, value: Math.random(), pitch: "SL" },
  { x: 0.2281, y: -0.0638, value: Math.random(), pitch: "SL" },
  { x: -0.6284, y: 2.4008, value: Math.random(), pitch: "SL" },
  { x: -0.7097, y: 2.6742, value: Math.random(), pitch: "SL" },
  { x: 1.5183, y: 2.8506, value: Math.random(), pitch: "SL" },
  { x: 2.2883, y: 4.7971, value: Math.random(), pitch: "SL" },
  { x: -1.0075, y: 2.4943, value: Math.random(), pitch: "SL" },
  { x: -0.2338, y: 3.5936, value: Math.random(), pitch: "SL" },
  { x: 0.5554, y: 0.2362, value: Math.random(), pitch: "SL" },
  { x: 0.5796, y: 3.1451, value: Math.random(), pitch: "CU" },
  { x: -0.0852, y: 4.4414, value: Math.random(), pitch: "CU" },
  { x: 0.1497, y: 2.7425, value: Math.random(), pitch: "CU" },
  { x: -0.2098, y: 2.9179, value: Math.random(), pitch: "CU" },
  { x: 0.5903, y: 1.5357, value: Math.random(), pitch: "CU" },
  { x: 0.7215, y: 3.3009, value: Math.random(), pitch: "CU" },
  { x: -0.2149, y: 2.5717, value: Math.random(), pitch: "CU" },
  { x: -0.4225, y: 2.4088, value: Math.random(), pitch: "CU" },
  { x: 0.9267, y: 3.8957, value: Math.random(), pitch: "CU" },
  { x: -0.9553, y: 2.6807, value: Math.random(), pitch: "CU" },
  { x: 0.6891, y: 1.9826, value: Math.random(), pitch: "CU" },
  { x: -0.1684, y: 5.1982, value: Math.random(), pitch: "CU" },
  { x: 0.5125, y: 1.5724, value: Math.random(), pitch: "CU" },
  { x: 1.0661, y: 2.7556, value: Math.random(), pitch: "CU" },
  { x: -0.2706, y: 1.6816, value: Math.random(), pitch: "CU" },
  { x: -0.6467, y: 2.6206, value: Math.random(), pitch: "CU" },
  { x: -1.9527, y: -0.6684, value: Math.random(), pitch: "CU" },
  { x: -0.9302, y: 1.0938, value: Math.random(), pitch: "CU" },
  { x: -1.1418, y: 2.8545, value: Math.random(), pitch: "CU" },
  { x: -0.1875, y: 1.3199, value: Math.random(), pitch: "CU" },
  { x: -0.6572, y: 0.6003, value: Math.random(), pitch: "CU" },
  { x: -0.3211, y: 4.0589, value: Math.random(), pitch: "CU" },
  { x: -0.7555, y: 1.742, value: Math.random(), pitch: "CU" },
  { x: -0.1874, y: 3.3371, value: Math.random(), pitch: "CU" },
];

const rangeValue = extent(data, (d) => d.value);

export const Circles = () => (
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
);

export const Hex = () => (
  <StrikeZone w={w} h={h} margin={margin} data={data}>
    <Hexbin
      r={10}
      x="x"
      y="y"
      aggregator="mean"
      fill={{
        type: "seqential",
        minMax: [rangeValue[0], rangeValue[1]],
        fillValue: "value",
        colorRange: ["white", "#003da5"],
      }}
      styles={{ stroke: "blue" }}
    />
    <StrikeZoneBox />
  </StrikeZone>
);

export const HexCircles = () => (
  <StrikeZone w={w} h={h} margin={margin} data={data}>
    <Hexbin
      r={10}
      x="x"
      y="y"
      aggregator="mean"
      fill={{
        type: "seqential",
        minMax: [rangeValue[0], rangeValue[1]],
        fillValue: "value",
        colorRange: ["white", "#003da5"],
      }}
      styles={{ stroke: "blue" }}
    />
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
);

export const TooltipCircle = () => (
  <>
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
      <Tooltip
        labels={({ pitch, value }) =>
          `the pitch was ${pitch} and value was ${value.toFixed(2)}`
        }
        styles={{ border: "3px solid purple" }}
      />
    </BaseballChartsContainer>
  </>
);
