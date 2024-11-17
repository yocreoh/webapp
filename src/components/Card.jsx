import React, { useRef, useState, useMemo, useEffect } from 'react';
import "./Card.css";

const Card = ({
  rarityPreset = "common",
  landscape = false,
  img,
  animationOptions = null,
  shineOptions = null,
  holographicOptions = null,
  size = null,
  shadowOptions = null,
  className = "",
  style = {}
}) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    if (!isAnimating || isHovered) return;

    let direction = 1; // Move right
    let positionX = 50;

    const interval = setInterval(() => {
      // Smoothly move left/right
      if (positionX <= 0) direction = 1; // Switch to moving right
      if (positionX >= 100) direction = -1; // Switch to moving left

      positionX += direction; // Update position
      setPosition((prev) => ({
        ...prev,
        x: positionX
      }));

      // Simulate rotation based on position
      const tx = ((positionX - 50) / 1.5) * 0.5;
      setRotation({ x: 0, y: tx });
    }, 16); // Update every ~16ms (60fps)

    return () => clearInterval(interval);
  }, [isAnimating, isHovered]);

  // Handle mouse/touch movement
  const handleMove = (e) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const cardWidth = size?.width || rect.width;
    const cardHeight = size?.height || rect.height;

    // Get cursor position relative to card
    let x, y;
    if (e.type.includes('touch')) {
      x = e.touches[0].clientX - rect.left;
      y = e.touches[0].clientY - rect.top;
    } else {
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
    }

    // Calculate percentages and rotation
    const px = Math.abs(Math.floor((100 / cardWidth) * x) - 100);
    const py = Math.abs(Math.floor((100 / cardHeight) * y) - 100);

    const tx = ((px - 50) / 1.5) * 0.5;
    const ty = ((py - 50) / 2) * -1;

    // Calculate positions for effects
    const lp = 50 + (px - 50) / 1.5;
    const tp = 50 + (py - 50) / 1.5;

    setRotation({ x: ty, y: tx });
    setPosition({ x: lp, y: tp });
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
    setIsAnimating(true);
  };

  // Custom styles based on props
  const cardStyle = {
    '--bg-position-x': `${position.x}%`,
    '--bg-position-y': `${position.y}%`,
    '--rotate-x': `${rotation.x}deg`,
    '--rotate-y': `${rotation.y}deg`,
    '--rotate-z': landscape ? '90deg' : '0deg',
    backgroundImage: `url(${img})`,
    ...(size && { width: `${size.width}px`, height: `${size.height}px` }),
    ...style
  };

  return (
    <section className="cards">
      <div
        ref={cardRef}
        className={`
          card-holo
          ${rarityPreset}
          ${holographicOptions ? 'holographic holo' : ''}
          ${isHovered ? 'hovered' : ''}
          ${className}
        `}
        style={cardStyle}
        onMouseMove={handleMove}
        onTouchMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchEnd={handleLeave}
        onMouseEnter={() => setIsAnimating(false)} // Pause animation on hover
      />
    </section>
  );
};

export default React.memo(Card);
