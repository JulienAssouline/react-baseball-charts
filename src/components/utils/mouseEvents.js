function handleMouseOver(e, d, x, y, setTooltip) {
  if (setTooltip) {
    setTooltip({
      display: true,
      data: d,
      x,
      y,
    });
  }
}

function handleMouseOut(setTooltip) {
  if (setTooltip) {
    setTooltip({ display: false });
  }
}

export { handleMouseOver, handleMouseOut };
