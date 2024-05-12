import React from 'react';
import './App.css'; // Import the CSS file

export function Canvas() {
  return (
    <>
      <canvas 
        id="game" 
        width={1000} 
        height={1000} 
        className="canvas-border" 
        style={{ 
          border: "15px solid blue",
          borderRadius: "12px"
        }}
      ></canvas>
    </>
  );
}
