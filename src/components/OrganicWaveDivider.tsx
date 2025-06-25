import React from 'react';

interface OrganicWaveDividerProps {
  color?: string;
  height?: number;
}

export const OrganicWaveDivider = ({
  color = "#fff",
  height = 60,
}: OrganicWaveDividerProps) => {
  return (
    <div style={{ position: 'relative', width: '100%', height: `${height}px`, overflow: 'hidden' }}>
      <svg
        viewBox="0 0 1200 120"
        width="100%"
        height="100%"
        style={{ display: 'block' }}
        preserveAspectRatio="none"
      >
        <path
          d="M0,40 C150,120 350,0 600,40 C850,80 1050,0 1200,40 L1200,120 L0,120 Z"
          fill={color}
        />
      </svg>
    </div>
  );
}; 