import React, { useContext, useState, useLayoutEffect, useRef } from "react";
import { TooltipContext } from "../context/TooltipContext";

function Tooltip({ labels, styles, offset = [70, -10], children }) {
  const { tooltip } = useContext(TooltipContext);
  const [rectWidth, setRectWidth] = useState(null);

  const tooltipRef = useRef(null);
  useLayoutEffect(() => {
    const tooltipSize = tooltipRef.current?.getBoundingClientRect();
    setRectWidth(tooltipSize?.width);
  });

  if (!tooltip.display) return <></>;

  const { x, y, data } = tooltip;

  const left = x ? x + offset[0] : 0 + offset[0];
  const top = y ? y + offset[1] : 0 + offset[1];

  return (
    <div
      ref={(ref) => {
        tooltipRef.current = ref;
      }}
      className="baseball-charts-tooltip-container"
      style={{
        border: "1px solid black",
        display: "inline",
        position: "absolute",
        height: "auto",
        padding: 10,
        width: "auto",
        textAlign: "left",
        backgroundColor: "white",
        left: left,
        top: top,
        ...styles,
      }}
    >
      {labels(data)}
      {children}
    </div>
  );
}

export default Tooltip;
