import React from "react";

function TextLegend({ uniqueText, colorScale, styles }) {
  return (
    <div>
      {uniqueText.map((d, i) => (
        <div key={i}>{d}</div>
      ))}
    </div>
  );
}

export { TextLegend };
