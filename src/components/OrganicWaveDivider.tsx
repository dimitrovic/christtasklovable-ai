import React from 'react';

interface OrganicWaveDividerProps {
  color?: string;
  strokeWidth?: number;
  height?: number;
}

export const OrganicWaveDivider = ({ 
  color = "#000000", // black
  strokeWidth = 2,
  height = 40
}: OrganicWaveDividerProps) => {
  return (
    <svg 
      viewBox="0 0 1200 40" 
      width="100%" 
      height={height}
      style={{ display: 'block' }}
      preserveAspectRatio="none"
    >
      <path 
        d="M0,20 Q150,10 300,20 T600,20 T900,20 T1200,20" 
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}; 