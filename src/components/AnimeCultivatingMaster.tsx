import React, { useState } from 'react';
import { PlayerStats, SoulRing, MartialSoul } from '../types/game';
import { CultivationAgeInfo, getRingColorHex, getRingGlowStyle } from '../data/martialSouls';
import { sound } from '../utils/audio';
import { Sparkles, Zap, Flame, Award, Eye } from 'lucide-react';

interface AnimeCultivatingMasterProps {
  player: PlayerStats;
  currentSoul: MartialSoul;
  ageInfo: CultivationAgeInfo;
  isReactionActive: boolean;
  isGatheringQi: boolean;
  seclusionTimeRemaining: number;
  passiveRate: number;
  onTapCharacter: (e: React.MouseEvent<HTMLDivElement>) => void;
  floatingQis: { id: number; x: number; y: number; amount: number }[];
}

export const AnimeCultivatingMaster: React.FC<AnimeCultivatingMasterProps> = ({
  player,
  currentSoul,
  ageInfo,
  isReactionActive,
  isGatheringQi,
  seclusionTimeRemaining,
  passiveRate,
  onTapCharacter,
  floatingQis,
}) => {
  const [activeRingId, setActiveRingId] = useState<string | null>(null);
  const [ringDisplayMode, setRingDisplayMode] = useState<'anime_3d' | 'mandala'>('anime_3d');

  // Beast rune glyphs for authentic Donghua aesthetic
  const RUNES = ['ᛟ', '✦', '⚡', 'ᚱ', 'ᛞ', 'ᚦ', 'ᛗ', 'ᛉ', '✧', 'ᛊ'];

  // Handle ring interaction
  const handleRingClick = (e: React.MouseEvent, ring: SoulRing) => {
    e.stopPropagation();
    sound.unlock();
    sound.playRingResonance(ring.tier);
    setActiveRingId(activeRingId === ring.id ? null : ring.id);
  };

  return (
    <div className="relative w-full flex flex-col items-center select-none">
      {/* Top Display Mode Toggle for Soul Rings */}
      <div className="w-full flex items-center justify-between mb-3 px-2 z-20">
        <div className="flex items-center gap-1.5 text-xs font-mono text-amber-300">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-400" />
          <span>LIVING CULTIVATION · 动画原版立体魂环</span>
        </div>

        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-xl border border-slate-800 text-[11px] font-mono">
          <button
            onClick={() => setRingDisplayMode('anime_3d')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              ringDisplayMode === 'anime_3d'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Authentic anime vertical stacked 3D orbiting rings"
          >
            3D Ascension (动画盘旋)
          </button>
          <button
            onClick={() => setRingDisplayMode('mandala')}
            className={`px-2.5 py-1 rounded-lg transition-all ${
              ringDisplayMode === 'mandala'
                ? 'bg-amber-400 text-slate-950 font-bold shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
            title="Concentric divine mandala halo array"
          >
            Mandala Halo (神环法阵)
          </button>
        </div>
      </div>

      {/* Main Interactive Motion Picture Viewport */}
      <div
        onClick={onTapCharacter}
        className={`relative w-72 h-[410px] sm:w-[350px] sm:h-[460px] rounded-3xl overflow-hidden border-2 cursor-pointer group active:scale-[0.99] transition-all duration-500 shadow-2xl flex items-center justify-center ${
          isReactionActive
            ? 'border-amber-300 ring-4 ring-amber-400/70 shadow-[0_0_60px_rgba(245,158,11,0.8)]'
            : 'border-amber-500/50 hover:border-amber-400 shadow-[0_0_40px_rgba(245,158,11,0.25)]'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(30, 41, 59, 0.95) 0%, rgba(2, 6, 23, 1) 100%)',
        }}
        title="Tap the Meditating Spirit Master to condense heavenly Qi!"
      >
        {/* ================= LAYER 1: AMBIENT HEAVENLY QI STREAM PARTICLES ================= */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {/* Vertical Qi rising streams */}
          {[15, 30, 50, 70, 85].map((leftPos, i) => (
            <div
              key={i}
              className="absolute w-1 rounded-full opacity-60 pointer-events-none"
              style={{
                left: `${leftPos}%`,
                bottom: '10%',
                height: '80%',
                background: `linear-gradient(to top, transparent, ${i % 2 === 0 ? 'rgba(245, 158, 11, 0.6)' : 'rgba(56, 189, 248, 0.5)'}, transparent)`,
                animation: `qi-particle-rise ${3 + (i % 3) * 1.2}s ease-in-out infinite`,
                animationDelay: `${i * 0.7}s`,
              }}
            />
          ))}

          {/* Radial sanctuary background glow */}
          <div
            className={`absolute inset-0 blur-3xl opacity-30 transition-all duration-700 pointer-events-none ${
              isGatheringQi || isReactionActive ? 'scale-125 opacity-60 bg-amber-400/40' : ''
            }`}
            style={{ backgroundColor: currentSoul.colorScheme.glow }}
          />
        </div>

        {/* ================= LAYER 2: ROTATING LOTUS SEAT & SPIRITUAL ENERGY RIPPLES ================= */}
        <div className="absolute bottom-6 inset-x-0 flex items-center justify-center pointer-events-none z-0">
          {/* Floor expanding Qi ripple */}
          <div className="w-56 h-28 rounded-full border-2 border-amber-400/40 animate-lotus-ripple absolute" />
          <div className="w-48 h-24 rounded-full border border-amber-300/30 animate-lotus-ripple absolute" style={{ animationDelay: '1.2s' }} />

          {/* Golden Lotus Pedestal SVG */}
          <div className="relative w-44 h-20 opacity-90 animate-pulse">
            <svg viewBox="0 0 200 80" className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.8)]">
              {/* Elliptical base */}
              <ellipse cx="100" cy="45" rx="85" ry="24" fill="url(#lotusGlow)" stroke="#F59E0B" strokeWidth="2" opacity="0.6" />
              {/* Radiating Lotus Petals */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => (
                <path
                  key={i}
                  d={`M 100 45 Q ${100 + Math.cos(deg * Math.PI / 180) * 75} ${45 + Math.sin(deg * Math.PI / 180) * 20} ${100 + Math.cos((deg + 15) * Math.PI / 180) * 90} ${45 + Math.sin((deg + 15) * Math.PI / 180) * 25}`}
                  stroke="#FBBF24"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.8"
                />
              ))}
              <defs>
                <radialGradient id="lotusGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.8" />
                  <stop offset="60%" stopColor="#D97706" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#78350F" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* ================= LAYER 3: LIVING MOTION PICTURE MEDITATING MASTER ================= */}
        {/* Breathing Animation container holding the spirit master */}
        <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden">
          <div
            className={`relative w-full h-full flex items-center justify-center animate-cultivation-breath transition-all duration-500 ${
              isReactionActive ? 'scale-105 brightness-115' : ''
            }`}
          >
            <img
              src={isReactionActive ? ageInfo.image : ageInfo.image}
              alt="Meditating Spirit Master in Lotus Posture"
              className={`w-full h-full object-cover object-center transition-transform duration-700 ${
                isGatheringQi ? 'scale-105' : 'group-hover:scale-102'
              }`}
            />

            {/* Cinematic Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent pointer-events-none" />

            {/* Glowing Dantian Core Node (Centered around lower abdomen / navel) */}
            <div
              className="absolute left-1/2 top-[62%] w-7 h-7 rounded-full bg-amber-400 pointer-events-none animate-dantian-pulse blur-[1px]"
              style={{
                boxShadow: '0 0 25px #F59E0B, 0 0 50px #FBBF24',
              }}
            />
            {/* Dantian inner golden spark */}
            <div className="absolute left-1/2 top-[62%] -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white pointer-events-none shadow-[0_0_12px_#FFF]" />

            {/* Ascending Meridian Qi Stream SVG (Dantian -> Chest -> Crown) */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-70">
              <path
                d="M 175 320 Q 175 250 175 160"
                stroke="url(#meridianGlow)"
                strokeWidth="2.5"
                fill="none"
                strokeDasharray="6 4"
                className="animate-pulse"
              />
              <defs>
                <linearGradient id="meridianGlow" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#FBBF24" stopOpacity="0.9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* ================= LAYER 4: AUTHENTIC DONGHUA 3D HORIZONTAL SOUL RINGS ================= */}
        {/* Mode 1: 3D Horizontal Ascension View (Anime Canon: rings hover horizontally stacked from feet to head) */}
        {ringDisplayMode === 'anime_3d' && (
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-center items-center z-20">
            {player.soulRings.length > 0 ? (
              player.soulRings.map((ring, idx) => {
                const total = player.soulRings.length;
                // Vertical stacking positions: Spaced clearly from thighs (30%) up through torso to chest (72%)
                // Never buried under lotus pedestal or bottom controls!
                const minBottom = 30;
                const maxBottom = 72;
                const verticalStep = total <= 1 ? 48 : minBottom + (idx / Math.max(1, total - 1)) * (maxBottom - minBottom);
                // Ring diameter grows subtly as it encompasses body
                const ringWidth = Math.min(94, 76 + (idx % 3) * 6);
                const colorHex = getRingColorHex(ring.tier);
                const isSelected = activeRingId === ring.id;
                const isClockwise = idx % 2 === 0;

                // Anim style for 3D rotation and vertical floating with rotateX tilt
                const animStyle: React.CSSProperties = {
                  bottom: `${verticalStep}%`,
                  width: `${ringWidth}%`,
                  height: `${ringWidth * 0.44}%`,
                  borderColor: colorHex,
                  transform: 'rotateX(68deg)',
                  boxShadow: isSelected
                    ? `0 0 35px ${colorHex}, inset 0 0 20px ${colorHex}`
                    : `0 0 18px ${colorHex}, inset 0 0 12px ${colorHex}66`,
                  animation: `${isClockwise ? 'anime-ring-orbit-cw' : 'anime-ring-orbit-ccw'} ${14 + idx * 2}s linear infinite, anime-ring-levitate-${idx % 3} ${3.5 + idx * 0.4}s ease-in-out infinite`,
                };

                return (
                  <div
                    key={ring.id || idx}
                    onClick={(e) => handleRingClick(e, ring)}
                    className="absolute rounded-full border-[3px] cursor-pointer pointer-events-auto transition-transform flex items-center justify-center group/ring"
                    style={animStyle}
                    title={`${ring.ringOrder ? `Ring ${ring.ringOrder}: ` : ''}${ring.years.toLocaleString()} Years (${ring.beastOrigin}) - Click to resonate!`}
                  >
                    {/* Inner high-intensity photon core line */}
                    <div
                      className="absolute inset-[3px] rounded-full border border-white/80 pointer-events-none"
                      style={{
                        boxShadow: `0 0 8px ${colorHex}`,
                      }}
                    />

                    {/* Beast Runes Spaced along the 360-degree circumference */}
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, rIdx) => {
                      const runeChar = RUNES[(idx + rIdx) % RUNES.length];
                      return (
                        <span
                          key={rIdx}
                          className="absolute text-[10px] font-mono font-bold animate-rune-glow pointer-events-none select-none"
                          style={{
                            color: ring.tier === 'white' ? '#F1F5F9' : colorHex,
                            transform: `rotate(${deg}deg) translate(${ringWidth * 1.5}px) rotate(-${deg}deg)`,
                            textShadow: `0 0 8px ${colorHex}`,
                          }}
                        >
                          {runeChar}
                        </span>
                      );
                    })}

                    {/* Concentrated Energy Beads at cardinal points */}
                    <div
                      className="absolute -top-1.5 w-3 h-3 rounded-full pointer-events-none"
                      style={{
                        backgroundColor: colorHex,
                        boxShadow: `0 0 12px ${colorHex}, 0 0 20px #FFF`,
                      }}
                    />
                    <div
                      className="absolute -bottom-1.5 w-3 h-3 rounded-full pointer-events-none"
                      style={{
                        backgroundColor: colorHex,
                        boxShadow: `0 0 12px ${colorHex}, 0 0 20px #FFF`,
                      }}
                    />

                    {/* Ring Tier Flare Particle Wisps */}
                    {ring.tier === 'red' && (
                      <span className="absolute -top-2 text-xs animate-bounce pointer-events-none">🔥</span>
                    )}
                    {ring.tier === 'purple' && (
                      <span className="absolute -right-2 text-xs animate-pulse pointer-events-none">⚡</span>
                    )}
                    {ring.tier === 'gold' && (
                      <span className="absolute -left-2 text-xs animate-spin-slow pointer-events-none">👑</span>
                    )}
                  </div>
                );
              })
            ) : (
              // Novice Spirit Master Innate Martial Soul Ring
              <div
                className="absolute bottom-[35%] w-[80%] h-[34%] rounded-full border-2 border-dashed border-amber-400/60 flex items-center justify-center animate-spin-slow"
                style={{ transform: 'rotateX(72deg)' }}
              >
                <span className="text-[10px] font-mono text-amber-300">Awakening Innate Ring...</span>
              </div>
            )}
          </div>
        )}

        {/* Mode 2: Concentric Divine Mandala Halo Array */}
        {ringDisplayMode === 'mandala' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-15">
            {player.soulRings.map((ring, idx) => {
              const total = player.soulRings.length;
              const minScale = 0.55;
              const maxScale = 1.05;
              const scale = total === 1 ? 0.75 : minScale + (idx / Math.max(1, total - 1)) * (maxScale - minScale);
              const colorHex = getRingColorHex(ring.tier);
              const isClockwise = idx % 2 === 0;

              return (
                <div
                  key={ring.id || idx}
                  onClick={(e) => handleRingClick(e, ring)}
                  className="absolute rounded-full border-[2.5px] cursor-pointer pointer-events-auto transition-transform flex items-center justify-center"
                  style={{
                    width: `${scale * 90}%`,
                    height: `${scale * 56}%`,
                    borderColor: colorHex,
                    boxShadow: `0 0 20px ${colorHex}, inset 0 0 12px ${colorHex}66`,
                    transform: 'rotateX(68deg)',
                    animation: `${isClockwise ? 'anime-ring-orbit-cw' : 'anime-ring-orbit-ccw'} ${16 + idx * 2}s linear infinite`,
                  }}
                >
                  {/* Glowing Runes */}
                  {[0, 60, 120, 180, 240, 300].map((deg, rIdx) => (
                    <span
                      key={rIdx}
                      className="absolute text-[11px] font-mono font-bold animate-rune-glow"
                      style={{
                        color: colorHex,
                        transform: `rotate(${deg}deg) translate(${scale * 125}px) rotate(-${deg}deg)`,
                        textShadow: `0 0 8px ${colorHex}`,
                      }}
                    >
                      {RUNES[(idx + rIdx) % RUNES.length]}
                    </span>
                  ))}
                  <div
                    className="absolute -top-1 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}` }}
                  />
                  <div
                    className="absolute -bottom-1 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: colorHex, boxShadow: `0 0 10px ${colorHex}` }}
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ================= LAYER 5: STATUS BADGES & DIALOGUES ================= */}
        {/* Top Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-wrap items-center gap-1.5 pointer-events-none">
          <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl border backdrop-blur-md shadow ${
            isReactionActive
              ? 'bg-amber-500/40 border-amber-300 text-amber-200 animate-pulse'
              : 'bg-slate-950/85 border-slate-700 text-slate-200'
          }`}>
            {isReactionActive ? '🔥 Breakthrough Euphoria (破境亢奋)' : '🧘 Lotus Posture Meditation (入定凝神)'}
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-950/80 border border-slate-700 text-cyan-300 font-semibold">
            Age {ageInfo.ageYears}
          </span>
        </div>

        {/* Top Right Active Soul Rings Counter Badge */}
        <div className="absolute top-3 right-3 z-30 pointer-events-none">
          <div className="flex items-center gap-1.5 bg-slate-950/90 border border-amber-500/40 px-2.5 py-1 rounded-xl shadow-lg backdrop-blur-md">
            <span className="text-[10px] font-mono font-bold text-amber-300">
              {player.soulRings.length} Rings
            </span>
            <div className="flex items-center gap-1">
              {player.soulRings.map((r, i) => (
                <span
                  key={i}
                  className="w-2.5 h-2.5 rounded-full ring-1 ring-white/60 animate-pulse"
                  style={{ backgroundColor: getRingColorHex(r.tier), boxShadow: `0 0 6px ${getRingColorHex(r.tier)}` }}
                  title={`Ring ${i + 1}: ${r.tier}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Breakthrough Reaction Thunder Dialogue */}
        {isReactionActive && (
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-amber-500/20 to-transparent flex flex-col justify-end p-4 pointer-events-none z-40 animate-pulse">
            <div className="bg-slate-950/95 border-2 border-amber-400 p-3.5 rounded-2xl shadow-2xl text-center">
              <span className="text-[11px] font-mono font-black text-amber-400 block tracking-wider uppercase">
                ⚡ REALM BREAKTHROUGH REACTION · 破境蜕变 ⚡
              </span>
              <p className="text-xs sm:text-sm font-cinzel font-bold text-amber-200 mt-1 leading-snug">
                『天地元气归心，经脉拓宽，神魂蜕变破境！』
              </p>
              <span className="text-[10px] text-cyan-300 font-mono block mt-1">
                (Heaven & Earth Essence surges into Dantian · Realm breakthrough triumphant!)
              </span>
            </div>
          </div>
        )}

        {/* Deep Dao Seclusion Active Overlay */}
        {seclusionTimeRemaining > 0 && !isReactionActive && (
          <div className="absolute inset-0 bg-amber-500/20 backdrop-blur-[1px] flex flex-col items-center justify-center pointer-events-none z-30 animate-pulse">
            <div className="w-48 h-48 rounded-full border-2 border-dashed border-amber-300 animate-spin-slow flex items-center justify-center">
              <span className="text-3xl animate-bounce">⚡</span>
            </div>
            <div className="bg-slate-950/90 px-4 py-2 rounded-2xl border border-amber-400/80 mt-3 text-center shadow-2xl">
              <span className="text-xs font-mono font-bold text-amber-300 block">DEEP DAO SECLUSION (闭关中)</span>
              <span className="text-lg font-cinzel font-black text-amber-200 tabular-nums">
                {seclusionTimeRemaining}s Remaining
              </span>
            </div>
          </div>
        )}

        {/* Bottom Interactive Tap Hint */}
        <div className="absolute bottom-3 inset-x-0 text-center pointer-events-none z-25">
          <span className="text-[11px] font-mono font-bold text-amber-300 bg-slate-950/90 px-3.5 py-1.5 rounded-full border border-amber-500/50 shadow-xl backdrop-blur-md">
            ✨ Tap Meditating Master to Gather Qi (+{passiveRate * 3})
          </span>
        </div>

        {/* Floating Condensation Qi Bursts */}
        {floatingQis.map(q => (
          <div
            key={q.id}
            className="absolute font-cinzel font-black text-amber-300 text-lg sm:text-xl pointer-events-none animate-bounce z-35"
            style={{ left: `${q.x}px`, top: `${q.y}px` }}
          >
            +{q.amount} Qi
          </div>
        ))}
      </div>

      {/* Selected Ring Skill Inspector Card (Appears when clicking any of the rings) */}
      {activeRingId && (
        <div className="w-full mt-3 p-3 bg-slate-950/95 border border-amber-500/50 rounded-2xl shadow-xl flex items-center justify-between gap-3 animate-in fade-in duration-200 z-30">
          {(() => {
            const ring = player.soulRings.find(r => r.id === activeRingId);
            if (!ring) return null;
            const ringColor = getRingColorHex(ring.tier);
            return (
              <>
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg border font-mono font-bold shrink-0 shadow"
                    style={{ borderColor: ringColor, color: ringColor, backgroundColor: `${ringColor}20` }}
                  >
                    {ring.skill.icon || '🔥'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold font-cinzel text-slate-100">{ring.skill.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border" style={{ borderColor: ringColor, color: ringColor }}>
                        {ring.years.toLocaleString()} Yrs ({ring.beastOrigin})
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 line-clamp-1">{ring.skill.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveRingId(null)}
                  className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1 bg-slate-900 rounded-lg shrink-0"
                >
                  Dismiss
                </button>
              </>
            );
          })()}
        </div>
      )}

      {/* Horizontal Rings Summary List under the character */}
      <div className="w-full mt-3 flex items-center justify-center gap-2 flex-wrap">
        {player.soulRings.map((ring, idx) => {
          const colorHex = getRingColorHex(ring.tier);
          const isSelected = activeRingId === ring.id;
          return (
            <button
              key={ring.id || idx}
              onClick={(e) => handleRingClick(e, ring)}
              className={`px-2.5 py-1 rounded-xl text-[10px] font-mono font-bold transition-all border flex items-center gap-1.5 ${
                isSelected ? 'scale-105 shadow-md' : 'hover:scale-102'
              }`}
              style={{
                borderColor: colorHex,
                backgroundColor: isSelected ? `${colorHex}35` : `${colorHex}15`,
                color: ring.tier === 'white' ? '#F1F5F9' : colorHex,
              }}
              title={`Ring ${ring.ringOrder}: ${ring.years.toLocaleString()} Yrs - ${ring.beastOrigin}`}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: colorHex }} />
              <span>R{ring.ringOrder || idx + 1}: {ring.years.toLocaleString()}Y</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
