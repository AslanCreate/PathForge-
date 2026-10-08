import React from 'react';

// Hand-drawn 4-point sparkle star
export const SparkleStarDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-6 h-6',
  color = '#ff5533',
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0 animate-doodle-pulse`}
    aria-hidden="true"
  >
    <path
      d="M12 2C12.5 7 15 9.5 20 10C15 10.5 12.5 13 12 18C11.5 13 9 10.5 4 10C9 9.5 11.5 7 12 2Z"
      fill={color}
      stroke="#000000"
      strokeWidth="1.75"
      strokeLinejoin="round"
    />
  </svg>
);

// Curved hand-drawn annotation arrow
export const CurvedArrowDoodle: React.FC<{
  className?: string;
  direction?: 'down-left' | 'down-right' | 'up-right';
}> = ({ className = 'w-12 h-10', direction = 'down-right' }) => {
  return (
    <svg
      viewBox="0 0 60 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} shrink-0`}
      aria-hidden="true"
    >
      {direction === 'down-right' && (
        <>
          <path
            d="M6 8C20 4 42 10 48 28"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
          <path
            d="M38 27L49 30L51 18"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'down-left' && (
        <>
          <path
            d="M54 8C40 4 18 10 12 28"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
          <path
            d="M22 27L11 30L9 18"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
      {direction === 'up-right' && (
        <>
          <path
            d="M8 32C22 32 44 26 48 10"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray="4 3"
          />
          <path
            d="M38 12L49 8L49 20"
            stroke="#000000"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </svg>
  );
};

// Squiggle brush underline
export const SquiggleDoodle: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-24 h-4',
  color = '#fde047',
}) => (
  <svg
    viewBox="0 0 100 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} shrink-0`}
    aria-hidden="true"
  >
    <path
      d="M3 10C18 3 24 13 38 7C52 2 58 13 72 8C86 3 91 11 97 7"
      stroke={color}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <path
      d="M3 10C18 3 24 13 38 7C52 2 58 13 72 8C86 3 91 11 97 7"
      stroke="#000000"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Animated steaming coffee mug doodle
export const SteamingCoffeeDoodle: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10',
}) => (
  <div className={`relative inline-flex items-center justify-center ${className}`}>
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      aria-hidden="true"
    >
      {/* Animated steam lines */}
      <path
        d="M11 8C10 5 13 4 12 1"
        stroke="#000000"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="animate-steam"
      />
      <path
        d="M17 9C16 6 19 4 18 1"
        stroke="#000000"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="animate-steam [animation-delay:0.4s]"
      />
      <path
        d="M23 8C22 5 25 4 24 1"
        stroke="#000000"
        strokeWidth="1.75"
        strokeLinecap="round"
        className="animate-steam [animation-delay:0.8s]"
      />
      {/* Cup body */}
      <path
        d="M8 12H26V23C26 27.4183 22.4183 31 18 31H16C11.5817 31 8 27.4183 8 23V12Z"
        fill="#fde047"
        stroke="#000000"
        strokeWidth="2"
      />
      {/* Handle */}
      <path
        d="M26 15C29 15 31 17 31 20C31 23 29 24 26 24"
        stroke="#000000"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Rim */}
      <rect x="7" y="11" width="20" height="3" rx="1.5" fill="#ffffff" stroke="#000000" strokeWidth="1.5" />
      {/* Cute face on mug */}
      <circle cx="14" cy="20" r="1.2" fill="#000000" />
      <circle cx="20" cy="20" r="1.2" fill="#000000" />
      <path d="M16 23C16.5 24 17.5 24 18 23" stroke="#000000" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

// Neo-brutalist tech sticker
export const DoodleSticker: React.FC<{
  text: string;
  bg?: string;
  rotation?: string;
  icon?: string;
  onClick?: () => void;
}> = ({ text, bg = '#4ade80', rotation = '-rotate-2', icon = '⚡', onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-xl border-2 border-black font-black text-xs uppercase brutal-shadow-sm select-none transition-all hover:scale-105 active:scale-95 cursor-pointer ${rotation} ${bg}`}
  >
    <span role="img" aria-hidden="true">
      {icon}
    </span>
    <span className="text-black tracking-tight">{text}</span>
  </button>
);
