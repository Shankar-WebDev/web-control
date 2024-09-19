import React from 'react';

interface RosIconProps {
  width?: number;  // Optional prop for width
  height?: number; // Optional prop for height
  color?: string;  // Optional prop for color
}

const RosIcon: React.FC<RosIconProps> = ({ width = 24, height = 24, color = '#0000FF' }) => (
  <div className="flex flex-row items-center justify-center group relative">
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 ease-in-out hover:scale-110 hover:rotate-90"
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
    {/* <span className={`flex flex-row top-full mt-2 text-[${color}] mb-[10px] text-[35px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out`}>
      ROS 2
    </span> */}
  </div>
);

export default RosIcon;
