import { useRef } from 'react';
import { useCanvasRenderer } from '../../hooks/useScrollAnimation';
import './ScrollCanvas.css';

export default function ScrollCanvas({ images, ready, progress }) {
  const canvasRef = useRef(null);

  useCanvasRenderer(canvasRef, images, ready, progress);

  return (
    <div className="canvas-wrapper" id="canvas-wrapper">
      <canvas ref={canvasRef} id="product-canvas" aria-hidden="true" />
      <div className="canvas-vignette" aria-hidden="true" />
    </div>
  );
}
