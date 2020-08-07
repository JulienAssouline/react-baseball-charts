import { mean, median, max, min, sum } from "d3-array";

function aggregatorFun(check, d, aggregateValue) {
  if (check === "mean") return mean(d, (v) => v[aggregateValue]);
  if (check === "median") return median(d, (v) => v[aggregateValue]);
  if (check === "max") return max(d, (v) => v[aggregateValue]);
  if (check === "min") return min(d, (v) => v[aggregateValue]);
  if (check === "sum") return sum(d, (v) => v[aggregateValue]);
}

function binData(hexbinData, data, aggregateValue, aggregatorFun, aggregator) {
  const bins = Object.assign(
    hexbinData(data).map((d) => {
      return {
        x: d.x,
        y: d.y,
        [aggregateValue]: aggregatorFun(aggregator, d, aggregateValue),
        count: d.length,
      };
    })
  );

  return bins;
}

function isCount(aggregateValue, d) {
  return aggregateValue === "count" ? d.value.count : d.value[aggregateValue];
}

export { binData, aggregatorFun, isCount };
