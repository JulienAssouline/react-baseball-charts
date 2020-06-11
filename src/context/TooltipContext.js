import React, { createContext, useState } from "react";

const TooltipContext = createContext();

const TooltipProvider = ({ children }) => {
  const [tooltip, setTooltip] = useState({
    display: false,
    x: null,
    y: null,
  });

  const value = { tooltip, setTooltip };

  return (
    <TooltipContext.Provider value={value}>{children}</TooltipContext.Provider>
  );
};

export { TooltipProvider, TooltipContext };
