import { useEffect, useRef } from "react";
import { cursorTrail } from "../utility/cursorTrail";

function CursorTrailCanvas({ color, className, style }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const { renderTrailCursor, cleanUp } = cursorTrail({
      ref: canvasRef,
      color,
    });

    renderTrailCursor();

    return () => {
      cleanUp();
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={style}
    />
  );
}

export default CursorTrailCanvas;

