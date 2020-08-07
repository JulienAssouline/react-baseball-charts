let strikeZoneCoords = {
  top: 3.5,
  left: -0.783,
  bottom: 1.5,
  right: 0.783,
  height: 3.5 - 1.5,
  width: 0.783 - -0.783,
};

strikeZoneCoords = {
  ...strikeZoneCoords,
  topThird: (2 / 3) * strikeZoneCoords.height + strikeZoneCoords.bottom,
  rightThird: strikeZoneCoords.right / 3,
  bottomThird: (1 / 3) * strikeZoneCoords.height + strikeZoneCoords.bottom,
  leftThird: strikeZoneCoords.left / 3,
};

strikeZoneCoords = {
  ...strikeZoneCoords,
  outsideTop:
    strikeZoneCoords.top -
    (strikeZoneCoords.bottomThird - strikeZoneCoords.topThird),
  leftOutside:
    strikeZoneCoords.left +
    (strikeZoneCoords.leftThird - strikeZoneCoords.rightThird),
  outsideBottom:
    strikeZoneCoords.bottom +
    (strikeZoneCoords.bottomThird - strikeZoneCoords.topThird),
  rightOutside:
    strikeZoneCoords.right +
    (strikeZoneCoords.leftThird - strikeZoneCoords.left),
  zoneHeight: strikeZoneCoords.bottomThird - strikeZoneCoords.bottom,
  zoneWidth: strikeZoneCoords.leftThird - strikeZoneCoords.left,
};

function pointInRectCheck(a, b, c, d, [px, py]) {
  function calcTriangleArea([ax, ay], [bx, by], [cx, cy]) {
    const sideA = Math.sqrt(Math.pow(ax - bx, 2) + Math.pow(ay - by, 2));
    const sideB = Math.sqrt(Math.pow(ax - cx, 2) + Math.pow(ay - cy, 2));
    const sideC = Math.sqrt(Math.pow(cx - bx, 2) + Math.pow(cy - by, 2));

    const s = (sideA + sideB + sideC) / 2;
    const area = Math.sqrt(s * (s - sideA) * (s - sideB) * (s - sideC));

    return area;
  }

  const APD = calcTriangleArea(a, [px, py], d);
  const DPC = calcTriangleArea(d, [px, py], c);
  const CPB = calcTriangleArea(c, [px, py], b);
  const PBA = calcTriangleArea([px, py], b, a);

  const sum = APD + DPC + CPB + PBA;

  const recWidth = b[0] - a[0];
  const rectLength = a[1] - c[1];
  const rectArea = recWidth * rectLength;

  let result;

  if (rectArea !== 0) {
    result =
      Math.abs(parseFloat(rectArea).toFixed(3)) ===
      Math.abs(parseFloat(sum).toFixed(3))
        ? true
        : false;
    return result;
  } else return null;
}

function createZones(strikeZoneCoords) {
  const allZoneValues = Object.values(strikeZoneCoords);

  allZoneValues.splice(14, 2);
  allZoneValues.splice(4, 2);

  let xZoneValues = [];
  let yZoneValues = [];

  allZoneValues.forEach((d, i) => {
    if (i % 2 === 0) {
      yZoneValues.push(d);
    } else {
      xZoneValues.push(d);
    }
  });

  xZoneValues = xZoneValues.sort((a, b) => a - b);
  yZoneValues = yZoneValues.sort((a, b) => b - a);

  const completeZones = [];
  let count = 0;
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      count++;
      completeZones.push({
        a: [xZoneValues[i], yZoneValues[j]],
        b: [xZoneValues[i + 1], yZoneValues[j]],
        c: [xZoneValues[i + 1], yZoneValues[j + 1]],
        d: [xZoneValues[i], yZoneValues[j + 1]],
        zone: count,
      });
    }
  }

  return completeZones;
}

export { strikeZoneCoords, pointInRectCheck, createZones };
