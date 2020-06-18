import React from "react";
import { TooltipProvider } from "../context/TooltipContext";

function BaseballChartsContainer({ width, styles, children }) {
  return (
    <TooltipProvider>
      <div style={{ styles }}>
        {React.Children.map(children, (child) => {
          return React.cloneElement(child, { width });
        })}
      </div>
    </TooltipProvider>
  );
}

export default BaseballChartsContainer;
