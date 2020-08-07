import { mean, median, max, min, sum } from "d3-array";

function aggregatorFun(check, d, aggregateValue) {
  if (check === "mean") return mean(d, (v) => v[aggregateValue]);
  if (check === "median") return median(d, (v) => v[aggregateValue]);
  if (check === "max") return max(d, (v) => v[aggregateValue]);
  if (check === "min") return min(d, (v) => v[aggregateValue]);
  if (check === "sum") return sum(d, (v) => v[aggregateValue]);
}

export { aggregatorFun };
