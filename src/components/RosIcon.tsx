import React from 'react';

interface RosIconProps {
  width?: number;  // Optional prop for width
  height?: number; // Optional prop for height
  color?: string;  // Optional prop for color
}

const RosIcon: React.FC<RosIconProps> = ({ width = 24, height = 24, color = '#0000FF' }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="6" cy="6" r="2" fill={color} />
    <circle cx="12" cy="6" r="2" fill={color} />
    <circle cx="18" cy="6" r="2" fill={color} />
    <circle cx="6" cy="12" r="2" fill={color} />
    <circle cx="12" cy="12" r="2" fill={color} />
    <circle cx="18" cy="12" r="2" fill={color} />
    <circle cx="6" cy="18" r="2" fill={color} />
    <circle cx="12" cy="18" r="2" fill={color} />
    <circle cx="18" cy="18" r="2" fill={color} />
  </svg>
);

export default RosIcon;
