import { scaleLinear, scaleOrdinal, scaleSequential } from "d3-scale";

function colorScale(type, domain, colorRange) {
  if (type === "seqential")
    return scaleSequential().domain(domain).range(colorRange);
  if (type === "linear") return scaleLinear().domain(domain).range(colorRange);
  if (type === "ordinal")
    return scaleOrdinal().domain(domain).range(colorRange);
}

export { colorScale };
