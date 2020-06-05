import React, { useContext } from "react";
import { TooltipContext } from "../context/TooltipContext";

function Tooltip() {
  const { tooltip } = useContext(TooltipContext);

  if (!tooltip.display) return <></>;

  return (
    <div
      className="baseball-charts-tooltip-container"
      style={{
        border: "1px solid black",
        display: "block",
        position: "absolute",
        height: "auto",
        padding: 10,
        width: 300,
        textAlign: "left",
        left: tooltip.x,
        top: tooltip.y,
      }}
    >
      <h1>{tooltip.info}</h1>
    </div>
  );
}

export default Tooltip;
