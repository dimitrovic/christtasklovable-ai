import React from 'react';

interface OrganicWaveDividerProps {
  topColor?: string;
  bottomColor?: string;
  waveColor?: string;
  height?: number;
}

export const OrganicWaveDivider = ({ 
  topColor = "#fbbf24", // yellow
  bottomColor = "#93c5fd", // light blue
  waveColor = "#3b82f6", // blue
  height = 80
}: OrganicWaveDividerProps) => {
  return (
    <div style={{ position: 'relative', height: `${height}px`, overflow: 'hidden' }}>
      {/* Top section background */}
      <div style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        height: '50%', 
        backgroundColor: topColor 
      }} />
      
      {/* Bottom section background */}
      <div style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        height: '50%', 
        backgroundColor: bottomColor 
      }} />
      
      {/* Organic wave */}
      <svg 
        viewBox="0 0 1200 80" 
        width="100%" 
        height="100%"
        style={{ position: 'absolute', top: 0, left: 0 }}
        preserveAspectRatio="none"
      >
        <path 
          d="M0,40 Q150,20 300,40 T600,40 T900,40 T1200,40 L1200,80 L0,80 Z" 
          fill={waveColor}
          opacity="0.8"
        />
        <path 
          d="M0,40 Q150,25 300,40 T600,40 T900,40 T1200,40" 
          stroke={waveColor}
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
      </svg>
    </div>
  );
}; 