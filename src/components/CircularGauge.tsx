import React from 'react';

interface CircularScoreGaugeProps {
  score: number; // 0 to 10
  maxScore?: number; // default 10
  size?: number; // size in px, e.g. 150
  strokeWidth?: number;
}

export const CircularScoreGauge: React.FC<CircularScoreGaugeProps> = ({
  score,
  maxScore = 10,
  size = 150,
  strokeWidth = 12
}) => {
  const percentage = Math.min(100, Math.max(0, (score / maxScore) * 100));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background track circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#2C3E50"
          strokeWidth={strokeWidth}
          fill="none"
          className="opacity-40"
        />
        {/* Inner subtle guide circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius - strokeWidth / 2 - 3}
          stroke="#4A6B82"
          strokeWidth="1"
          strokeDasharray="3 3"
          fill="none"
          className="opacity-50"
        />
        {/* Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#F4D03F"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          className="transition-all duration-300 ease-out"
        />
      </svg>
      {/* Center Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
        <span className="text-3xl font-black font-mono text-white tracking-tight">
          {score.toFixed(2)}
        </span>
        <span className="text-[10px] uppercase font-bold tracking-wider text-[#A3C1AD] mt-0.5">
          {percentage.toFixed(0)}% SKALI
        </span>
      </div>
    </div>
  );
};

interface MiniCircularRingProps {
  score: number; // 0 to 10
  color: string; // hex or tailwind class
  label: string;
  size?: number; // default 48
}

export const MiniCircularRing: React.FC<MiniCircularRingProps> = ({
  score,
  color,
  label,
  size = 48
}) => {
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(100, Math.max(0, (score / 10) * 100));
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#CBD5E1"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="square"
          className="transition-all duration-300"
        />
      </svg>
      <span className="absolute font-mono text-xs font-black text-slate-900">
        {label}
      </span>
    </div>
  );
};
