import React from 'react';
import { SoulRing, MartialSoul } from '../types/game';
import { getRingColorHex, getRingGlowStyle } from '../data/martialSouls';

interface SpiritRingDisplayProps {
  martialSoul: MartialSoul;
  rings: SoulRing[];
  activeRingSkillId?: string;
  size?: 'sm' | 'md' | 'lg';
  isAvatarActive?: boolean;
}

export const SpiritRingDisplay: React.FC<SpiritRingDisplayProps> = ({
  martialSoul,
  rings,
  activeRingSkillId,
  size = 'md',
  isAvatarActive = false,
}) => {
  const containerDimensions = size === 'sm' ? 'w-48 h-48' : size === 'lg' ? 'w-80 h-80' : 'w-64 h-64';
  const avatarSize = size === 'sm' ? 'w-24 h-24' : size === 'lg' ? 'w-40 h-40' : 'w-32 h-32';

  return (
    <div className={`relative flex items-center justify-center ${containerDimensions} select-none mx-auto`}>
      {/* Background radial ambient aura */}
      <div
        className={`absolute inset-0 rounded-full blur-2xl transition-all duration-700 pointer-events-none ${
          isAvatarActive ? 'scale-125 opacity-70 bg-amber-500/30' : 'opacity-40'
        }`}
        style={{ backgroundColor: martialSoul.colorScheme.glow }}
      />

      {/* Floating Soul Rings Orbit System */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {rings.map((ring, index) => {
          const totalRings = rings.length;
          // Step scale each ring from inner to outer
          const minScale = 0.58;
          const maxScale = 1.05;
          const scale = totalRings === 1 ? 0.75 : minScale + (index / Math.max(1, totalRings - 1)) * (maxScale - minScale);
          const colorHex = getRingColorHex(ring.tier);
          const glow = getRingGlowStyle(ring.tier);
          const isActive = ring.skill.name === activeRingSkillId;

          // Alternate rotation speeds and directions
          const animClass = index % 2 === 0 ? 'animate-spin-slow' : 'animate-spin-reverse-slow';

          return (
            <div
              key={ring.id || index}
              className={`absolute rounded-full border transition-all duration-500 flex items-center justify-center ${animClass}`}
              style={{
                width: `${scale * 100}%`,
                height: `${scale * 56}%`, // Elliptical 3D tilt perspective
                borderColor: colorHex,
                borderWidth: isActive ? '3.5px' : '2.5px',
                boxShadow: isActive ? `${glow}, 0 0 30px ${colorHex}` : `${glow}, inset 0 0 10px ${colorHex}55`,
                opacity: isActive ? 1 : 0.88,
                transform: `rotateX(66deg) ${isActive ? 'scale(1.08)' : 'scale(1)'}`,
              }}
            >
              {/* Inner photon light thread */}
              <div
                className="absolute inset-[2px] rounded-full border border-white/60 pointer-events-none"
                style={{ boxShadow: `0 0 6px ${colorHex}` }}
              />

              {/* Beast Runes on Ring */}
              <span
                className="absolute -top-3.5 text-[9px] font-mono font-bold select-none"
                style={{ color: colorHex, textShadow: `0 0 6px ${colorHex}` }}
              >
                ᛟ ✦ ᚱ
              </span>
              <span
                className="absolute -bottom-3.5 text-[9px] font-mono font-bold select-none"
                style={{ color: colorHex, textShadow: `0 0 6px ${colorHex}` }}
              >
                ⚡ ᛞ ᛗ
              </span>

              {/* Soul Ring Rune nodes / energy beads along ring */}
              <div
                className="absolute -top-1 w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}, 0 0 15px #FFF` }}
              />
              <div
                className="absolute -bottom-1 w-2.5 h-2.5 rounded-full shadow-sm"
                style={{ backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}, 0 0 15px #FFF` }}
              />
              <div
                className="absolute -left-1 w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: colorHex, boxShadow: `0 0 8px ${colorHex}` }}
              />
              <div
                className="absolute -right-1 w-2 h-2 rounded-full shadow-sm"
                style={{ backgroundColor: colorHex, boxShadow: `0 0 8px ${colorHex}` }}
              />
            </div>
          );
        })}
      </div>

      {/* Central Martial Soul Avatar / Emblem */}
      <div
        className={`relative z-10 rounded-2xl flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${avatarSize} ${
          isAvatarActive
            ? 'ring-4 ring-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] animate-pulse-ring'
            : 'border border-slate-700/80 shadow-xl'
        }`}
        style={{
          background: `radial-gradient(circle, ${martialSoul.colorScheme.glow} 0%, rgba(15,23,42,0.92) 80%)`,
        }}
      >
        {martialSoul.image ? (
          <img
            src={martialSoul.image}
            alt={martialSoul.name}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center p-2">
            <span className="text-3xl mb-1">
              {martialSoul.id === 'blue_silver_emperor' ? '🌿' : martialSoul.id === 'evil_eye_white_tiger' ? '🐯' : martialSoul.id === 'seraphim_angel' ? '👼' : '✨'}
            </span>
            <span className="text-xs font-cinzel font-bold text-amber-200 tracking-wide text-center">
              {martialSoul.chineseName}
            </span>
          </div>
        )}

        {/* Martial Soul Avatar Mode Banner */}
        {isAvatarActive && (
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black via-black/80 to-transparent py-1 text-center">
            <span className="text-[10px] font-bold tracking-wider text-amber-300 font-cinzel">
              TRUE AVATAR
            </span>
          </div>
        )}
      </div>

      {/* Ring count badge */}
      <div className="absolute -bottom-2 z-20 px-2.5 py-0.5 rounded-full bg-slate-900/90 border border-slate-700 text-[11px] text-slate-300 font-mono tabular-nums shadow">
        {rings.length} / 9 Rings
      </div>
    </div>
  );
};
