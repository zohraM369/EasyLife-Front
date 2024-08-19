import React from "react";
import "./animationSVG.css";

interface AnimatedSVGProps {
  svgPath: string; // Path to the SVG file
}

export const AnimatedSVG: React.FC<AnimatedSVGProps> = ({ svgPath }) => {
  return (
    <div className="svg-container">
      <img src={svgPath} className="animated-svg" alt="animated graphic" />
    </div>
  );
};
