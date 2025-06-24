import React from 'react';

interface DecorativeDividerProps {
  color?: string;
  strokeWidth?: number;
}

export const DecorativeDivider = ({ 
  color = "#3b82f6", 
  strokeWidth = 2 
}: DecorativeDividerProps) => {
  return (
    <svg 
      viewBox="0 0 1200 40" 
      width="100%" 
      height="auto"
      style={{ display: 'block' }}
    >
      <path 
        d="M0,20 L400,20 Q450,20 475,15 T500,20 L700,20 Q750,20 775,15 T800,20 L1200,20" 
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </svg>
  );
}; 