import React from "react";
import { TooltipProvider } from "../context/TooltipContext";

function BaseballChartsContainer({ children }) {
  return (
    <TooltipProvider>
      <div>{children}</div>
    </TooltipProvider>
  );
}

export default BaseballChartsContainer;
