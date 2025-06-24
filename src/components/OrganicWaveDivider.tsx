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
    <div style={{ position: 'relative', height: `${height}px`, overflow: 'hidden' }}>
      {/* Single organic wave line */}
      <svg 
        viewBox="0 0 1200 40" 
        width="100%" 
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
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
    </div>
  );
}; 