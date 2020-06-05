import React, { useContext } from "react";
import { TooltipContext } from "../context/TooltipContext";

function Tooltip({ labels, styles }) {
  const { tooltip } = useContext(TooltipContext);

  if (!tooltip.display) return <></>;

  const { info, x, y, data } = tooltip;

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
        backgroundColor: "white",
        left: x,
        top: y,
        ...styles,
      }}
    >
      <h3>{info}</h3>
      <p>{labels(data)}</p>
    </div>
  );
}

export default Tooltip;
