import React from 'react';

export const HeaderTicker: React.FC = () => {
  const tickerText = '🔥 GEN-Z CAREER FORGE • 100% HOMIE VIBES • ZERO BS ROADMAPS • REAL SEED-STAGE RUBRICS • CHAI & DREAMS • SHIP PRODUCTION CODE WEEKLY • ';

  return (
    <div className="w-full bg-[#fde047] border-b-2 border-black overflow-hidden py-1 select-none shrink-0" role="region" aria-label="Live announcements ticker">
      <div className="animate-marquee whitespace-nowrap text-[11px] sm:text-xs font-black tracking-wider uppercase flex items-center text-black">
        <span>{tickerText}</span>
        <span>{tickerText}</span>
        <span>{tickerText}</span>
        <span>{tickerText}</span>
      </div>
    </div>
  );
};
