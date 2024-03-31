// Import dependencies
"use client";

import React, { MouseEvent, TouchEvent, useEffect, useState } from "react";
import Image from "next/image";

interface ImageEffectProps {
  previewImage: string;
  width: number;
  height: number;
  alt?: string; // Optional alt prop
  className?: string;
}

// Constants for magnifier size and zoom level
const MAGNIFIER_SIZE = 100;
const ZOOM_LEVEL = 2.5;

// ImageEffect component
const ImageEffect: React.FC<ImageEffectProps> = ({
  previewImage,
  width,
  height,
  alt,
  className,
}) => {
  // State variables
  const [zoomable, setZoomable] = useState(true);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });
  const [position, setPosition] = useState({
    x: 100,
    y: 100,
    mouseX: 0,
    mouseY: 0,
  });

  // Event handlers for mouse events
  const handleMouseEnter = (e: MouseEvent) => {
    let element = e.currentTarget;
    let { width, height } = element.getBoundingClientRect();
    setImageSize({ width, height });
    setZoomable(true);
    updatePosition(
      e.clientX - element.getBoundingClientRect().left,
      e.clientY - element.getBoundingClientRect().top
    );
  };

  const handleMouseLeave = () => {
    setZoomable(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    updatePosition(
      e.clientX - e.currentTarget.getBoundingClientRect().left,
      e.clientY - e.currentTarget.getBoundingClientRect().top
    );
  };

  // Event handlers for touch events
  const handleTouchStart = (e: TouchEvent) => {
    let touch = e.touches[0];
    updatePosition(
      touch.clientX - e.currentTarget.getBoundingClientRect().left,
      touch.clientY - e.currentTarget.getBoundingClientRect().top
    );
  };

  // Update position
  const updatePosition = (x: number, y: number) => {
    setPosition({
      x: -x * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      y: -y * ZOOM_LEVEL + MAGNIFIER_SIZE / 2,
      mouseX: x - MAGNIFIER_SIZE / 2,
      mouseY: y - MAGNIFIER_SIZE / 2,
    });
  };

  // Render method
  return (
    <div className="flex justify-center items-center">
      <div
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchStart} // You may need to adjust this behavior based on your requirements
        className={`w-full h-full relative overflow-hidden ${className || ""}`}
      >
        <Image
          className="object-cover border z-10"
          alt={alt || ""}
          src={previewImage}
          height={height}
          width={width}
        />
        <div
          style={{
            backgroundPosition: `${position.x}px ${position.y}px`,
            backgroundImage: `url(${previewImage})`,
            backgroundSize: `${imageSize.width * ZOOM_LEVEL}px ${
              imageSize.height * ZOOM_LEVEL
            }px`,
            backgroundRepeat: "no-repeat",
            display: zoomable ? "block" : "none",
            top: `${position.mouseY}px`,
            left: `${position.mouseX}px`,
            width: `${MAGNIFIER_SIZE}px`,
            height: `${MAGNIFIER_SIZE}px`,
          }}
          className={`z-50 border-4 rounded-full pointer-events-none absolute border-background`}
        />
      </div>
    </div>
  );
};

export default ImageEffect;
