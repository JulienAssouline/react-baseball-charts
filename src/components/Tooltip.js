import React, { useContext, useState, useLayoutEffect, useRef } from "react";
import { TooltipContext } from "../context/TooltipContext";

function Tooltip({ labels, styles, offset = [70, null], children }) {
  const { tooltip } = useContext(TooltipContext);
  const [rectWidth, setRectWidth] = useState(null);

  const tooltipRef = useRef(null);
  useLayoutEffect(() => {
    const tooltipSize = tooltipRef.current?.getBoundingClientRect();
    setRectWidth(tooltipSize?.width);
  });

  if (!tooltip.display) return <></>;

  const { x, y, data } = tooltip;

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
        left: x + offset[0],
        top: offset[1] ? y + offset[1] : y - 10,
        ...styles,
      }}
    >
      {labels(data)}
      {children}
    </div>
  );
}

export default Tooltip;
