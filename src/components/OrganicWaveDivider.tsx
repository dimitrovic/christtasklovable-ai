import React from 'react';

interface OrganicWaveDividerProps {
  color?: string;
  strokeWidth?: number;
  height?: number;
  variant?: 'default' | 'hero' | 'two-dips';
}

export const OrganicWaveDivider = ({ 
  color = "#1e293b", // slate-800 - more visible than black
  strokeWidth = 2,
  height = 40,
  variant = 'default'
}: OrganicWaveDividerProps) => {
  // Hero variant with gentle dips in the middle
  const heroPath = "M0,20 L400,20 Q450,20 475,15 T500,20 L600,20 Q650,20 675,15 T700,20 L800,20 Q850,20 875,15 T900,20 L1200,20 L1200,40 L0,40 Z";
  
  // Two dips variant
  const twoDipsPath = "M0,20 L350,20 Q400,20 425,15 T450,20 L750,20 Q800,20 825,15 T850,20 L1200,20 L1200,40 L0,40 Z";
  
  // Default variant with flowing curves
  const defaultPath = "M0,20 Q150,10 300,20 T600,20 T900,20 T1200,20 L1200,40 L0,40 Z";
  
  const pathData = variant === 'hero' ? heroPath : 
                   variant === 'two-dips' ? twoDipsPath : 
                   defaultPath;

  return (
    <div 
      className="relative w-full"
      style={{ 
        height: `${height}px`, 
        marginTop: `-${height/2}px`,
        marginBottom: `-${height/2}px`,
        zIndex: 10
      }}
    >
      <svg 
        viewBox="0 0 1200 40" 
        width="100%" 
        height="100%"
        className="absolute top-0 left-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <path 
          d={pathData}
          fill={color}
        />
      </svg>
    </div>
  );
}; 