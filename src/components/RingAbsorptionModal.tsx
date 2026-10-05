import React, { useState, useEffect, useRef } from 'react';
import { SoulRing, SpiritBone } from '../types/game';
import { sound } from '../utils/audio';
import { getRingColorHex, getRingGlowStyle } from '../data/martialSouls';
import confetti from 'canvas-confetti';
import { Shield, Sparkles, Award } from 'lucide-react';

interface RingAbsorptionModalProps {
  ring: SoulRing;
  droppedBone?: SpiritBone;
  onSuccess: (ring: SoulRing, bone?: SpiritBone) => void;
  onCancel: () => void;
}

export const RingAbsorptionModal: React.FC<RingAbsorptionModalProps> = ({
  ring,
  droppedBone,
  onSuccess,
  onCancel,
}) => {
  const [absorptionProgress, setAbsorptionProgress] = useState(20);
  const [needlePos, setNeedlePos] = useState(50);
  const [resonanceTarget, setResonanceTarget] = useState(50);
  const [isPressing, setIsPressing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const animFrameRef = useRef<number | null>(null);

  const ringColor = getRingColorHex(ring.tier);
  const glow = getRingGlowStyle(ring.tier);

  const tolerance = ring.tier === 'gold' ? 14 : ring.tier === 'red' ? 16 : ring.tier === 'black' ? 20 : 25;
  const isInside = Math.abs(needlePos - resonanceTarget) <= tolerance;

  // Move resonance target smoothly
  useEffect(() => {
    const interval = setInterval(() => {
      setResonanceTarget(prev => {
        const delta = (Math.random() - 0.5) * 35;
        return Math.max(20, Math.min(80, prev + delta));
      });
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const isPressingRef = useRef(isPressing);
  isPressingRef.current = isPressing;

  const needlePosRef = useRef(needlePos);
  needlePosRef.current = needlePos;

  const resonanceTargetRef = useRef(resonanceTarget);
  resonanceTargetRef.current = resonanceTarget;

  const isCompletedRef = useRef(false);
  const absorptionProgressRef = useRef(0);

  // Absorption physics game loop (100% decoupled from setState callbacks)
  useEffect(() => {
    if (isCompleted) return;

    let lastTime = performance.now();

    const loop = (currentTime: number) => {
      if (isCompletedRef.current) return;

      const dt = Math.min(0.1, (currentTime - lastTime) / 1000);
      lastTime = currentTime;

      // Update needle
      const force = isPressingRef.current ? 55 : -45;
      const nextNeedle = Math.max(0, Math.min(100, needlePosRef.current + force * dt));
      needlePosRef.current = nextNeedle;
      setNeedlePos(nextNeedle);

      // Check if inside target
      const inSync = Math.abs(nextNeedle - resonanceTargetRef.current) <= tolerance;
      if (inSync) {
        const speed = ring.tier === 'gold' ? 16 : ring.tier === 'red' ? 20 : 26;
        const nextProg = Math.min(100, absorptionProgressRef.current + speed * dt);
        absorptionProgressRef.current = nextProg;
        setAbsorptionProgress(nextProg);

        if (nextProg >= 100 && !isCompletedRef.current) {
          isCompletedRef.current = true;
          setIsCompleted(true);
          sound.playBreakthrough();
          sound.playRingResonance(ring.tier);
          confetti({
            particleCount: 120,
            spread: 80,
            origin: { y: 0.5 },
          });
          return;
        }
      }

      if (!isCompletedRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [tolerance, ring.tier, isCompleted]);

  const handleFinish = () => {
    onSuccess(ring, droppedBone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Ambient Ring Glow in background */}
        <div
          className="absolute -top-20 -right-20 w-72 h-72 rounded-full blur-3xl opacity-35 pointer-events-none"
          style={{ backgroundColor: ringColor }}
        />

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-2 mb-1.5 text-xs font-mono uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SOUL RING ABSORPTION RITUAL · 魂环吸收考验</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-cinzel font-black text-slate-100">
            Absorbing {ring.years.toLocaleString()}-Year Soul Ring
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Resonating with the residual spiritual essence of the <strong className="text-amber-300">{ring.beastOrigin}</strong>.
          </p>
        </div>

        {/* High-Res Authentic Donghua Animation Soul Ring Artwork */}
        <div className="relative w-full h-48 sm:h-60 rounded-2xl overflow-hidden border-2 shadow-2xl mb-4 group" style={{ borderColor: ringColor }}>
          <img
            src="/src/assets/images/soul_ring_donghua_anim_1791177706402.jpg"
            alt="Soul Land Donghua Animation Soul Ring with Ancient Runes"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent flex flex-col justify-end p-4">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span
                className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-lg border backdrop-blur-md shadow"
                style={{
                  color: ringColor,
                  borderColor: ringColor,
                  backgroundColor: `${ringColor}25`,
                }}
              >
                Donghua Animation Soul Ring · Ring Order {ring.ringOrder}
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-950/80 text-amber-300 border border-slate-700">
                {ring.years.toLocaleString()} Years Ancient Beast Aura
              </span>
            </div>
            <p className="text-[11px] text-slate-200 line-clamp-1 font-mono">
              Inscribed with ancient Douluo beast runes & glowing celestial energy bands
            </p>
          </div>
        </div>

        {!isCompleted ? (
          /* Minigame Channeling Interface */
          <div className="space-y-4">
            {/* Resonance Gauge */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Spiritual Resonance Meter</span>
                <span className={isInside ? 'text-emerald-400 font-bold' : 'text-rose-400'}>
                  {isInside ? '● HARMONIC SYNC (+Progress)' : '▲ TURBULENT (Adjust Needle)'}
                </span>
              </div>
              <div className="relative h-8 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-0.5 shadow-inner">
                {/* Safe zone target */}
                <div
                  className="absolute top-0 bottom-0 bg-emerald-500/25 border-x-2 border-emerald-400 transition-all duration-300 rounded"
                  style={{
                    left: `${Math.max(0, resonanceTarget - tolerance)}%`,
                    width: `${tolerance * 2}%`,
                  }}
                />
                {/* Needle indicator */}
                <div
                  className="absolute top-0 bottom-0 w-3 bg-amber-400 rounded-sm shadow-[0_0_12px_#F59E0B] transition-all duration-75"
                  style={{
                    left: `${needlePos}%`,
                    transform: 'translateX(-50%)',
                  }}
                />
              </div>
            </div>

            {/* Overall Absorption Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                <span>Soul Ring Assimilation</span>
                <span className="text-amber-400 font-bold tabular-nums">
                  {Math.round(absorptionProgress)}%
                </span>
              </div>
              <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full transition-all duration-150 rounded-full shadow-[0_0_15px_#F59E0B]"
                  style={{
                    width: `${absorptionProgress}%`,
                    backgroundColor: ringColor,
                    boxShadow: glow,
                  }}
                />
              </div>
            </div>

            {/* Interactive Touch/Click Controller */}
            <div className="pt-2">
              <button
                onMouseDown={() => {
                  sound.playCultivate();
                  setIsPressing(true);
                }}
                onMouseUp={() => setIsPressing(false)}
                onTouchStart={() => {
                  sound.playCultivate();
                  setIsPressing(true);
                }}
                onTouchEnd={() => setIsPressing(false)}
                className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-bold font-cinzel tracking-wider uppercase transition-all select-none active:scale-[0.98] shadow-lg ${
                  isPressing
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_30px_rgba(245,158,11,0.6)]'
                    : 'bg-slate-800 hover:bg-slate-750 text-amber-200 border border-slate-700'
                }`}
              >
                {isPressing ? '⚡ Channeling Mysterious Heaven Qi...' : 'Hold to Channel Qi & Stabilize Ring'}
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Press & hold to push the spiritual needle right; release to let it slide left. Keep it inside the green resonance zone.
              </p>
            </div>
          </div>
        ) : (
          /* Completion & Reward Screen */
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="p-4 bg-emerald-950/40 border border-emerald-500/50 rounded-2xl text-center space-y-1">
              <div className="inline-flex items-center gap-1.5 text-emerald-400 text-sm sm:text-base font-bold font-cinzel">
                <Award className="w-5 h-5" />
                <span>Soul Ring Successfully Absorbed! (境界突破)</span>
              </div>
              <p className="text-xs text-slate-300">
                The {ring.years.toLocaleString()}-year spiritual energy has permanently forged into your martial soul channels!
              </p>
            </div>

            {/* Unlocked Skill Details */}
            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm sm:text-base font-bold text-amber-300 font-cinzel">
                    {ring.skill.name}
                  </h4>
                  <span className="text-xs text-slate-400 font-medium">
                    {ring.skill.pinyinName}
                  </span>
                </div>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/50 px-2.5 py-1 rounded-lg border border-cyan-800">
                  {ring.skill.spCost} SP · {ring.skill.cooldown}s CD
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {ring.skill.description}
              </p>
            </div>

            {/* Dropped Spirit Bone Reward if any */}
            {droppedBone && (
              <div className="p-4 bg-purple-950/40 border border-purple-500/50 rounded-2xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-purple-300 font-cinzel">
                    🎁 Rare Spirit Bone Dropped: {droppedBone.name}
                  </span>
                  <span className="text-[11px] text-purple-400 font-mono">
                    {droppedBone.slot.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="text-xs text-slate-300">
                  {droppedBone.specialSkillDesc}
                </p>
              </div>
            )}

            <button
              onClick={handleFinish}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-bold font-cinzel text-sm uppercase tracking-wider rounded-2xl transition-all shadow-xl"
            >
              Fuse Soul Ring & Return to Cultivation
            </button>
          </div>
        )}

        {!isCompleted && (
          <div className="mt-4 text-center">
            <button
              onClick={onCancel}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Abort Absorption
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
