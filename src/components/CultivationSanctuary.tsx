import React, { useState, useEffect } from 'react';
import { PlayerStats, MartialSoul, SoulRing } from '../types/game';
import { SpiritRingDisplay } from './SpiritRingDisplay';
import { AnimeCultivatingMaster } from './AnimeCultivatingMaster';
import {
  getRealmInfo,
  MARTIAL_SOULS,
  SOUL_LAND_ERAS,
  calculateAgeInfo,
  DONGHUA_SOUL_RING_IMAGE,
  BREAKTHROUGH_REACTION_IMAGE,
  DONGHUA_RING_TIERS,
  getRankTierBadgeColor,
  getRankTierLabel,
  getCategoryLabel,
} from '../data/martialSouls';
import {
  INITIAL_MERIDIANS,
  IMMORTAL_HERBS,
  PILL_RECIPES,
  Meridian,
  ImmortalHerb,
  PillRecipe,
} from '../data/meridiansAndHerbs';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Award,
  Flame,
  Swords,
  Shield,
  Zap,
  BookOpen,
  Volume2,
  RefreshCw,
  Heart,
  Hammer,
  Clock,
  Calendar,
  Eye,
  ChevronRight,
} from 'lucide-react';

interface CultivationSanctuaryProps {
  player: PlayerStats;
  breakthroughReactionActive?: boolean;
  onMeditate: (amount?: number) => void;
  onBreakthrough: () => void;
  onSwitchActiveSoul: () => void;
  onAwakenSecondarySoul: (soul: MartialSoul) => void;
  onGoToForest: () => void;
  onApplyHerbBonus: (stats: { hp?: number; attack?: number; defense?: number; critRate?: number }, herbName: string) => void;
  onApplyPillBonus: (bonus: { hp?: number; attack?: number; defense?: number; exp?: number }, pillName: string) => void;
  onAdvanceTime?: (months: number) => void;
  onTriggerTribulation?: (targetRank: number) => void;
  onSyncElderRings?: () => void;
}

interface FloatingQi {
  id: number;
  x: number;
  y: number;
  amount: number;
}

export const CultivationSanctuary: React.FC<CultivationSanctuaryProps> = ({
  player,
  breakthroughReactionActive = false,
  onMeditate,
  onBreakthrough,
  onSwitchActiveSoul,
  onAwakenSecondarySoul,
  onGoToForest,
  onApplyHerbBonus,
  onApplyPillBonus,
  onAdvanceTime,
  onTriggerTribulation,
  onSyncElderRings,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'sanctum' | 'donghua_rings' | 'meridians' | 'garden' | 'alchemy' | 'chronicles' | 'martial_codex'>('sanctum');
  const [codexTierFilter, setCodexTierFilter] = useState<string>('all');
  const [codexCategoryFilter, setCodexCategoryFilter] = useState<string>('all');
  const [isGatheringQi, setIsGatheringQi] = useState(false);
  const [floatingQis, setFloatingQis] = useState<FloatingQi[]>([]);
  const [showTwinAwakenModal, setShowTwinAwakenModal] = useState(false);
  const [selectedEraTab, setSelectedEraTab] = useState<'sl1' | 'sl2' | 'sl3' | 'sl4' | 'sl5'>('sl1');

  // Immortal Taoists Spiritual Array Level
  const [spiritArrayLevel, setSpiritArrayLevel] = useState<number>(1);
  // Deep Seclusion State
  const [seclusionTimeRemaining, setSeclusionTimeRemaining] = useState<number>(0);

  // Local Breakthrough Reaction
  const [localReactionActive, setLocalReactionActive] = useState<boolean>(false);
  const isReactionActive = breakthroughReactionActive || localReactionActive;

  // Calculate age, time flow, and youth retention according to Soul Land rules
  const ageInfo = calculateAgeInfo(player.inGameMonths ?? 72, player.rank);

  // Meridians local progression
  const [meridians, setMeridians] = useState<Meridian[]>(INITIAL_MERIDIANS);

  // Herb Garden local growth timers
  const [gardenHerbs, setGardenHerbs] = useState<{ [herbId: string]: number }>({
    phoenix_sunflower: 0,
    octagonal_ice_grass: 5,
  });

  const realm = getRealmInfo(player.rank);
  const nextRealm = getRealmInfo(player.rank + 1);

  // Check if at a rank bottleneck (rank 10, 20, 30, 40, etc.)
  const isBottleneck = player.rank % 10 === 0;
  const maxRingsAllowed = Math.floor(player.rank / 10);
  const isRingMissing = player.soulRings.length < maxRingsAllowed;
  const isTribulationBottleneck = player.rank >= 70 && (player.rank % 10 === 0 || player.rank === 99);
  const canBreakthrough = player.currentExp >= player.maxExp && (!isBottleneck || !isRingMissing);

  const expPercent = Math.min(100, (player.currentExp / player.maxExp) * 100);

  // Calculate passive soul power rate based on realm, meridians, and spirit array
  const thoroughfareLevel = meridians.find(m => m.id === 'thoroughfare_vessel')?.level || 1;
  const passiveRate = Math.round(15 + player.rank * 1.5 + thoroughfareLevel * 3 + spiritArrayLevel * 5);
  const passiveRateRef = React.useRef(passiveRate);
  passiveRateRef.current = passiveRate;

  // Stabilize onMeditate with useRef to completely prevent effect cycling / call stack overflow
  const onMeditateRef = React.useRef(onMeditate);
  onMeditateRef.current = onMeditate;

  // Passive Soul Power Ticker (every 2 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      onMeditateRef.current(Math.round(passiveRateRef.current * 2));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  // Deep Seclusion Countdown Ticker
  useEffect(() => {
    if (seclusionTimeRemaining <= 0) return;
    const timer = setInterval(() => {
      setSeclusionTimeRemaining(prev => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [seclusionTimeRemaining > 0]);

  // Seclusion Completion Handler (fires after render outside setState)
  const prevSeclusionRef = React.useRef(seclusionTimeRemaining);
  useEffect(() => {
    if (prevSeclusionRef.current > 0 && seclusionTimeRemaining === 0) {
      sound.playBreakthrough();
      sound.playRingResonance('gold');
      confetti({ particleCount: 100, spread: 80 });
      onMeditateRef.current(800 + player.rank * 25);
    }
    prevSeclusionRef.current = seclusionTimeRemaining;
  }, [seclusionTimeRemaining, player.rank]);

  // Herb growth timer tick
  useEffect(() => {
    const timer = setInterval(() => {
      setGardenHerbs(prev => {
        const next: { [k: string]: number } = {};
        Object.entries(prev).forEach(([k, val]) => {
          if (val > 0) next[k] = val - 1;
          else next[k] = 0;
        });
        return next;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Interactive Tap on Meditating Spirit Master to gather heavenly qi
  const handleTapMeditatingCharacter = (e: React.MouseEvent<HTMLDivElement>) => {
    sound.unlock();
    sound.playCultivate();
    setIsGatheringQi(true);
    setTimeout(() => setIsGatheringQi(false), 300);

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const gained = 45 + Math.floor(Math.random() * 25);
    onMeditate(gained);

    const id = Date.now() + Math.random();
    setFloatingQis(prev => [...prev.slice(-4), { id, x: clickX, y: clickY, amount: gained }]);
    setTimeout(() => {
      setFloatingQis(prev => prev.filter(q => q.id !== id));
    }, 900);
  };

  const handleBreakthroughClick = () => {
    if (isBottleneck && isRingMissing) {
      onGoToForest();
    } else if (isTribulationBottleneck) {
      if (onTriggerTribulation) {
        onTriggerTribulation(player.rank);
      } else {
        onBreakthrough();
      }
    } else {
      sound.playBreakthrough();
      confetti({
        particleCount: 120,
        spread: 85,
        origin: { y: 0.5 },
      });
      setLocalReactionActive(true);
      setTimeout(() => setLocalReactionActive(false), 3800);
      onBreakthrough();
    }
  };

  // Meridian Upgrade
  const handleUpgradeMeridian = (meridianId: string) => {
    const target = meridians.find(m => m.id === meridianId);
    if (!target || player.gold < target.qiCost || target.level >= target.maxLevel) return;

    sound.playRingResonance('purple');
    sound.playChime(780);

    setMeridians(prev =>
      prev.map(m => (m.id === meridianId ? { ...m, level: m.level + 1, qiCost: Math.round(m.qiCost * 1.35) } : m))
    );

    onApplyHerbBonus(target.bonus, `Meridian: ${target.name}`);
  };

  // Harvest Herb
  const handleHarvestHerb = (herb: ImmortalHerb) => {
    sound.playRingResonance('gold');
    sound.playChime(880);
    confetti({ particleCount: 60, spread: 60 });

    onApplyHerbBonus(herb.statReward, herb.name);
    // Restart growth timer
    setGardenHerbs(prev => ({ ...prev, [herb.id]: herb.growTimeSec }));
  };

  // Refine Pill
  const handleRefinePill = (pill: PillRecipe) => {
    if (player.gold < pill.craftCost) return;
    sound.playHammerSlam();
    sound.playChime(900);
    confetti({ particleCount: 75, spread: 70 });

    onApplyPillBonus(pill.bonus, pill.name);
  };

  const currentSoul = player.activeSoulIndex === 1 && player.secondarySoul ? player.secondarySoul : player.primarySoul;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6 select-none">
      {/* Top Realm & Passive Qi Bar with Douluo Calendar & Age */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md relative overflow-hidden">
        <div className="space-y-2 text-center md:text-left z-10">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 text-xs font-mono text-amber-400">
            <Sparkles className="w-4 h-4" />
            <span>IMMORTAL TAOIST SANCTUM · 洞天福地</span>
            <span aria-hidden="true">·</span>
            <span>{realm.chinese}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
            {realm.title} · Rank {player.rank}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Passive Gathering: <strong className="text-emerald-400">+{passiveRate} Soul Power/sec</strong>
            <span className="mx-2 text-slate-600">·</span>
            Next Realm: <strong className="text-amber-300">{nextRealm.title}</strong>
          </p>

          {/* Douluo Continent Time Flow & Age Status */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs font-mono">
            <span className="flex items-center gap-1.5 text-cyan-300 bg-cyan-950/60 px-3 py-1 rounded-xl border border-cyan-800">
              <Calendar className="w-3.5 h-3.5" />
              <span>Age: <strong>{ageInfo.ageYears}</strong> Yrs, {ageInfo.ageMonths} Mos</span>
            </span>
            <span className="flex items-center gap-1.5 text-amber-300 bg-amber-950/60 px-3 py-1 rounded-xl border border-amber-800">
              <Clock className="w-3.5 h-3.5" />
              <span>1 Real Min = 1 Douluo Mo</span>
            </span>
            {ageInfo.isYouthRetained ? (
              <span className="text-emerald-300 font-bold bg-emerald-950/60 px-3 py-1 rounded-xl border border-emerald-800 shadow-[0_0_12px_rgba(16,185,129,0.3)]">
                ✨ Youth Retained (驻颜有术 · 青春永驻)
              </span>
            ) : ageInfo.appearanceStage === 'child' ? (
              <span className="text-blue-300 bg-blue-950/60 px-3 py-1 rounded-xl border border-blue-800">
                🌱 Child Prodigy (6-11 Yrs)
              </span>
            ) : (
              <span className="text-rose-300 bg-rose-950/60 px-3 py-1 rounded-xl border border-rose-800">
                ⚠️ Aging Visage (Lifespan: {ageInfo.lifespanYears} Yrs)
              </span>
            )}
          </div>
        </div>

        {/* Exp Progress Bar */}
        <div className="w-full md:w-96 space-y-2 z-10">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-400">Heavenly Qi Reservoir</span>
            <span className="text-amber-300 font-bold tabular-nums">
              {player.currentExp} / {player.maxExp} EXP
            </span>
          </div>
          <div className="h-4 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 rounded-full transition-all duration-300 shadow-[0_0_15px_#F59E0B]"
              style={{ width: `${expPercent}%` }}
            />
          </div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>Rings: {player.soulRings.length} / 9</span>
            <span>Tap character to gather Qi faster</span>
          </div>
        </div>
      </div>

      {/* Spirit Elder 3-Ring Resonance Alert Banner */}
      {player.rank >= 30 && player.soulRings.length < 3 && (
        <div className="bg-gradient-to-r from-amber-950/80 via-purple-950/80 to-amber-950/80 border-2 border-amber-400 p-4 rounded-3xl shadow-[0_0_25px_rgba(245,158,11,0.3)] flex flex-col sm:flex-row items-center justify-between gap-3 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-2xl">⚡</span>
            <div>
              <span className="text-xs font-mono font-bold text-amber-300 block">
                SPIRIT ELDER SOUL RING RESONANCE · 魂尊三环共鸣
              </span>
              <p className="text-xs text-slate-200">
                In Douluo Dalu canon, a <strong>Spirit Elder (魂尊 - Rank 30+)</strong> commands <strong>Three Soul Rings</strong>! Currently only {player.soulRings.length} rings are synchronized.
              </p>
            </div>
          </div>
          {onSyncElderRings && (
            <button
              onClick={() => {
                sound.playRingResonance('purple');
                sound.playBreakthrough();
                onSyncElderRings();
              }}
              className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-bold text-xs rounded-xl shadow-lg shrink-0 active:scale-95 transition-all"
            >
              Resonate 3rd Ring (三环齐聚 · 幽冥撕裂)
            </button>
          )}
        </div>
      )}

      {/* Immortal Taoists Sub-Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'sanctum', label: 'Sanctum Meditation (打坐修炼)' },
          { id: 'donghua_rings', label: 'Donghua Soul Rings (动画原版魂环)' },
          { id: 'martial_codex', label: 'Martial Souls Codex (全武魂图鉴)' },
          { id: 'meridians', label: 'Eight Meridians (奇经八脉)' },
          { id: 'garden', label: 'Immortal Herbs (冰火药园)' },
          { id: 'alchemy', label: 'Alchemy Furnace (炼丹房)' },
          { id: 'chronicles', label: 'Douluo Chronicles (I-V)' },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              sound.playChime(660);
              setActiveSubTab(tab.id as any);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-cinzel font-bold whitespace-nowrap transition-all border ${
              activeSubTab === tab.id
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: SANCTUM MEDITATION (HOMEPAGE WITH CROSS-LEGGED CHARACTER) ================= */}
      {activeSubTab === 'sanctum' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual: Meditating Spirit Master Sitting Cross-Legged in Lotus Posture */}
          <div className="lg:col-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col items-center justify-between relative overflow-hidden backdrop-blur-md">
            {/* Ambient Background Glow */}
            <div
              className={`absolute inset-0 opacity-20 pointer-events-none blur-3xl transition-all duration-700 ${
                isGatheringQi || isReactionActive ? 'scale-125 opacity-40 bg-amber-400/40' : ''
              }`}
              style={{ backgroundColor: currentSoul.colorScheme.glow }}
            />

            {/* Top Switcher & Active Form */}
            <div className="w-full flex items-center justify-between z-10 mb-4">
              <div>
                <span className="text-xs font-mono text-slate-400">
                  {ageInfo.stageName} · Meditating in Lotus Posture
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-amber-200">
                  {player.name} · {currentSoul.name}
                </h3>
              </div>

              {player.secondarySoul ? (
                <button
                  onClick={() => {
                    sound.playRingResonance('purple');
                    onSwitchActiveSoul();
                  }}
                  className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold rounded-xl border border-slate-700 transition-colors shadow"
                >
                  Switch: {player.activeSoulIndex === 0 ? player.secondarySoul.name : player.primarySoul.name}
                </button>
              ) : (
                <button
                  onClick={() => setShowTwinAwakenModal(true)}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-purple-600 via-amber-500 to-amber-600 text-slate-950 text-xs font-bold font-cinzel rounded-xl shadow-lg hover:opacity-90 transition-all"
                >
                  Awaken Twin Soul
                </button>
              )}
            </div>

            {/* Centerpiece: Living Motion Picture Cultivating Master with Authentic Anime 3D Soul Rings */}
            <AnimeCultivatingMaster
              player={player}
              currentSoul={currentSoul}
              ageInfo={ageInfo}
              isReactionActive={isReactionActive}
              isGatheringQi={isGatheringQi}
              seclusionTimeRemaining={seclusionTimeRemaining}
              passiveRate={passiveRate}
              onTapCharacter={handleTapMeditatingCharacter}
              floatingQis={floatingQis}
            />

            {/* Immortal Taoists Cultivation Controls (Seclusion, Array, and 1-Year Fast-Forward) */}
            <div className="w-full z-10 grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <button
                disabled={seclusionTimeRemaining > 0}
                onClick={() => {
                  sound.unlock();
                  sound.playRingResonance('purple');
                  sound.playCultivate();
                  setSeclusionTimeRemaining(10);
                }}
                className={`py-2.5 px-3 rounded-2xl border text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all shadow ${
                  seclusionTimeRemaining > 0
                    ? 'bg-amber-950/40 border-amber-800 text-amber-300'
                    : 'bg-slate-900/90 hover:bg-slate-850 border-slate-700 text-slate-200 hover:text-amber-300'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>
                  {seclusionTimeRemaining > 0 ? `Secluding (${seclusionTimeRemaining}s)` : 'Deep Seclusion (闭关悟道)'}
                </span>
              </button>

              <button
                disabled={player.gold < 100 * spiritArrayLevel}
                onClick={() => {
                  if (player.gold < 100 * spiritArrayLevel) return;
                  sound.unlock();
                  sound.playHammerSlam();
                  sound.playChime(750);
                  setSpiritArrayLevel(prev => prev + 1);
                }}
                className="py-2.5 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 text-slate-200 hover:text-cyan-300 transition-all shadow disabled:opacity-50"
              >
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>Array Lv.{spiritArrayLevel} (+{spiritArrayLevel * 5}/s)</span>
              </button>

              {/* Fast-Forward 1 Douluo Year button */}
              <button
                onClick={() => {
                  sound.unlock();
                  sound.playRingResonance('gold');
                  sound.playChime(880);
                  onAdvanceTime?.(12);
                  onMeditate(500);
                  confetti({ particleCount: 50, spread: 60 });
                }}
                className="py-2.5 px-3 rounded-2xl bg-slate-900/90 hover:bg-slate-850 border border-slate-700 text-xs font-mono font-bold flex items-center justify-center gap-1.5 text-amber-300 hover:text-amber-200 transition-all shadow"
                title="Advance 1 in-game year (12 Douluo months) to see physical growth and youth retention"
              >
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>Meditate 1 Year (+12 Mos)</span>
              </button>
            </div>

            {/* Bottom Breakthrough Controls */}
            <div className="w-full z-10 pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  sound.unlock();
                  sound.playCultivate();
                  onMeditate(120);
                }}
                className="w-full sm:flex-1 py-4 bg-slate-850 hover:bg-slate-800 active:scale-[0.98] border border-slate-700 rounded-2xl text-xs sm:text-sm font-bold font-cinzel tracking-wider text-amber-200 transition-all flex items-center justify-center gap-2 shadow-lg"
              >
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Condense Heavenly Qi (+120 EXP)</span>
              </button>

              {isBottleneck && isRingMissing ? (
                <button
                  onClick={handleBreakthroughClick}
                  className="w-full sm:flex-1 py-4 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-slate-950 font-bold font-cinzel text-xs sm:text-sm tracking-wider rounded-2xl transition-all shadow-xl flex items-center justify-center gap-2 animate-pulse"
                >
                  <Flame className="w-4 h-4 text-slate-950" />
                  <span>Bottleneck: Face Soul Ring Tribulation</span>
                </button>
              ) : isTribulationBottleneck ? (
                <button
                  onClick={handleBreakthroughClick}
                  disabled={!canBreakthrough}
                  className={`w-full sm:flex-1 py-4 rounded-2xl text-xs sm:text-sm font-bold font-cinzel tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                    canBreakthrough
                      ? 'bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-[0_0_25px_rgba(168,85,247,0.7)] animate-pulse active:scale-[0.98]'
                      : 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>
                    {canBreakthrough
                      ? 'Face Heavenly Lightning Tribulation (引九天神雷劫)'
                      : `Max EXP Needed for Heavenly Tribulation (Rank ${player.rank})`}
                  </span>
                </button>
              ) : (
                <button
                  onClick={handleBreakthroughClick}
                  disabled={!canBreakthrough}
                  className={`w-full sm:flex-1 py-4 rounded-2xl text-xs sm:text-sm font-bold font-cinzel tracking-wider transition-all flex items-center justify-center gap-2 ${
                    canBreakthrough
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_25px_rgba(245,158,11,0.5)] active:scale-[0.98]'
                      : 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Award className="w-4 h-4" />
                  <span>
                    {canBreakthrough ? 'Trigger Realm Breakthrough (破境)' : 'Max EXP Needed to Breakthrough'}
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right Column: Character Attributes & Quick Status */}
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 backdrop-blur-md">
              <h3 className="text-sm font-cinzel font-bold text-slate-200">
                Cultivation Matrix & Power
              </h3>

              <div className="space-y-2 text-xs font-mono">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Total Battle Power</span>
                  <span className="text-amber-400 font-bold text-base tabular-nums">
                    {(player.attack * 3 + player.defense * 2 + player.maxHp * 0.2 + player.rank * 100).toFixed(0)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Health Points (HP)</span>
                  <span className="text-emerald-400 font-bold tabular-nums">{player.maxHp}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Soul Power (SP)</span>
                  <span className="text-cyan-400 font-bold tabular-nums">{player.maxSp}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Physical & Spirit ATK</span>
                  <span className="text-rose-400 font-bold tabular-nums">{player.attack}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Iron Barrier DEF</span>
                  <span className="text-cyan-300 font-bold tabular-nums">{player.defense}</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-slate-400">Critical Strike Rate</span>
                  <span className="text-amber-300 font-bold tabular-nums">{(player.critRate * 100).toFixed(1)}%</span>
                </div>
              </div>
            </div>

            {/* Cave Sanctuary Location Card */}
            <div className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-xl p-5 group min-h-[160px] flex flex-col justify-end">
              <img
                src="/src/assets/images/cultivation_sanctuary_1791176565730.jpg"
                alt="Cultivation Cave Sanctuary"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
              <div className="relative z-10 space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">DAO SANCTUARY</span>
                <h4 className="text-sm font-cinzel font-bold text-slate-100">Blue Silver Water Cave</h4>
                <p className="text-[11px] text-slate-300 leading-relaxed">
                  Carpets of glowing immortal moss and crystalline stalactites condense endless spirit essence.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB: DONGHUA ANIMATION SOUL RINGS (动画原版魂环) ================= */}
      {activeSubTab === 'donghua_rings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>SOUL LAND DONGHUA CANON · 动画原版魂环</span>
              </div>
              <h2 className="text-xl sm:text-3xl font-cinzel font-black text-slate-100 mt-1">
                Douluo Animation Version Soul Rings
              </h2>
              <p className="text-xs text-slate-300">
                Faithful to the official Soul Land 3D anime: luminous circular energy halos inscribed with ancient Douluo runes, spatial lightning, and divine fire.
              </p>
            </div>
            <button
              onClick={() => setActiveSubTab('sanctum')}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 rounded-xl text-xs font-mono border border-slate-700 self-start sm:self-auto shadow"
            >
              ← Back to Lotus Meditation
            </button>
          </div>

          {/* Donghua Animation Ring Visual Masterpiece Banner */}
          <div className="relative rounded-3xl overflow-hidden border-2 border-amber-500/40 shadow-2xl p-6 sm:p-8 min-h-[280px] flex flex-col justify-end group">
            <img
              src={DONGHUA_SOUL_RING_IMAGE}
              alt="Soul Land Animation Version Soul Rings"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />
            <div className="relative z-10 space-y-2 max-w-2xl">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider bg-slate-950/80 px-2.5 py-1 rounded-lg border border-amber-500/40 inline-block">
                OFFICIAL 3D ANIMATION VISUALS · 动画魂环全鉴
              </span>
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-slate-100">
                Ancient Beast Runic Encodings & Halo Radiance
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                Each soul ring is not a simple circle, but an intricate divine band etched with primeval Douluo beast glyphs. When invoked, rings ascend from beneath the master's feet, orbiting the body in 3D perspective to unleash terrifying soul skills.
              </p>
            </div>
          </div>

          {/* Grid of the 6 Donghua Ring Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DONGHUA_RING_TIERS.map(ring => {
              const countEquipped = player.soulRings.filter(r => r.tier === ring.tier).length;
              return (
                <div
                  key={ring.tier}
                  className="bg-slate-900/80 border rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-3 backdrop-blur-sm transition-all hover:scale-[1.01]"
                  style={{ borderColor: ring.colorHex, boxShadow: `0 0 16px ${ring.colorHex}22` }}
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-cinzel font-bold text-slate-100 text-base">
                          {ring.name}
                        </h4>
                        <span className="text-xs font-mono font-bold" style={{ color: ring.colorHex }}>
                          {ring.chinese}
                        </span>
                      </div>
                      <span className="text-xs font-mono px-2 py-0.5 rounded-lg border bg-slate-950/80" style={{ color: ring.colorHex, borderColor: ring.colorHex }}>
                        {ring.yearsRange}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed font-sans">
                      {ring.runeDescription}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                    <span>Equipped: <strong className="text-amber-300">{countEquipped}</strong> Rings</span>
                    <span style={{ color: ring.colorHex }}>● Ancient Douluo Runes</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 2: EIGHT EXTRAORDINARY MERIDIANS (奇经八脉) ================= */}
      {activeSubTab === 'meridians' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-cinzel font-bold text-amber-200">
                Eight Extraordinary Meridians (奇经八脉)
              </h2>
              <p className="text-xs text-slate-400">
                Temper each meridian with spirit qi to permanently boost attributes and passive gathering speed.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-800">
              Gold Available: {player.gold}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {meridians.map(m => {
              const isMax = m.level >= m.maxLevel;
              const canAfford = player.gold >= m.qiCost;

              return (
                <div
                  key={m.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-3 backdrop-blur-sm hover:border-slate-700 transition-all"
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-cinzel font-bold text-slate-100 text-sm">
                          {m.name}
                        </h3>
                        <span className="text-xs text-amber-400 font-mono">
                          {m.chineseName}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-lg bg-amber-950/40 text-amber-300 border border-amber-800/40">
                        Tier {m.level} / {m.maxLevel}
                      </span>
                    </div>

                    <div className="mt-3 p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-emerald-300">
                      {m.statBonus}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpgradeMeridian(m.id)}
                    disabled={isMax || !canAfford}
                    className={`w-full py-3 rounded-2xl text-xs font-bold font-cinzel uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow ${
                      isMax
                        ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                        : canAfford
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-slate-950'
                        : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>{isMax ? 'Fully Cleared' : `Temper Vessel (${m.qiCost} Gold)`}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 3: IMMORTAL HERBS GARDEN (冰火两仪眼) ================= */}
      {activeSubTab === 'garden' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-cinzel font-bold text-amber-200">
                Ice Fire Yin-Yang Well (冰火两仪眼药园)
              </h2>
              <p className="text-xs text-slate-400">
                Plant and harvest Soul Land legendary immortal herbs to permanently expand your soul channels.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {IMMORTAL_HERBS.map(herb => {
              const remainingSec = gardenHerbs[herb.id] || 0;
              const isReady = remainingSec === 0;

              return (
                <div
                  key={herb.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-3xl">{herb.icon}</span>
                        <div>
                          <h3 className="font-cinzel font-bold text-slate-100 text-sm">
                            {herb.name}
                          </h3>
                          <span className="text-xs text-amber-400 font-mono">
                            {herb.chineseName}
                          </span>
                        </div>
                      </div>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-lg border ${
                        isReady ? 'text-emerald-400 border-emerald-500 bg-emerald-950/40' : 'text-slate-400 border-slate-700 bg-slate-950'
                      }`}>
                        {isReady ? 'MATURE' : `${remainingSec}s to Bloom`}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {herb.description}
                    </p>

                    <div className="p-2.5 bg-slate-950/80 rounded-xl border border-slate-800 text-xs font-mono text-amber-300">
                      Harvest Effect: {herb.harvestBonus}
                    </div>
                  </div>

                  <button
                    onClick={() => handleHarvestHerb(herb)}
                    disabled={!isReady}
                    className={`w-full py-3 rounded-2xl text-xs font-bold font-cinzel uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow ${
                      isReady
                        ? 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.4)]'
                        : 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isReady ? 'Consume Immortal Herb' : `Absorbing Dew (${remainingSec}s)`}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 4: ALCHEMY FURNACE (炼丹房) ================= */}
      {activeSubTab === 'alchemy' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-cinzel font-bold text-amber-200">
                Tang Sect Pill Alchemy Chamber (炼丹房)
              </h2>
              <p className="text-xs text-slate-400">
                Refine rare spirit pills using heavenly herbs and titanium mineral fires.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-xl border border-emerald-800">
              Gold: {player.gold}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PILL_RECIPES.map(pill => {
              const canAfford = player.gold >= pill.craftCost;

              return (
                <div
                  key={pill.id}
                  className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-cinzel font-bold text-slate-100 text-base">
                          {pill.name}
                        </h3>
                        <span className="text-xs text-amber-400 font-mono">
                          {pill.chineseName}
                        </span>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border border-purple-500/40 text-purple-300 bg-purple-950/40">
                        {pill.grade} Pill
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {pill.description}
                    </p>

                    <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs font-mono text-emerald-300 font-bold">
                      Refining Yield: {pill.effectDesc}
                    </div>
                  </div>

                  <button
                    onClick={() => handleRefinePill(pill)}
                    disabled={!canAfford}
                    className={`w-full py-3.5 rounded-2xl text-xs font-bold font-cinzel uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg ${
                      canAfford
                        ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 text-slate-950'
                        : 'bg-slate-800/40 text-slate-500 border border-slate-800 cursor-not-allowed'
                    }`}
                  >
                    <Flame className="w-4 h-4" />
                    <span>Brew in Cauldron ({pill.craftCost} Gold)</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 5: SOUL LAND CHRONICLES (I to V) ================= */}
      {activeSubTab === 'chronicles' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-cinzel font-bold text-amber-200">
              Douluo Continent Saga Chronicles (Soul Land I, II, III, IV, V)
            </h2>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {SOUL_LAND_ERAS.map(era => (
              <button
                key={era.eraId}
                onClick={() => setSelectedEraTab(era.eraId)}
                className={`px-4 py-2 rounded-2xl text-xs font-cinzel font-bold whitespace-nowrap transition-colors ${
                  selectedEraTab === era.eraId
                    ? 'bg-amber-400 text-slate-950 shadow-md'
                    : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                {era.chinese} · {era.title}
              </button>
            ))}
          </div>

          {(() => {
            const era = SOUL_LAND_ERAS.find(e => e.eraId === selectedEraTab) || SOUL_LAND_ERAS[0];
            const eraSouls = MARTIAL_SOULS.filter(s => s.era === era.eraId);

            return (
              <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-md">
                <div className="space-y-1">
                  <span className="text-xs font-mono text-amber-400 uppercase font-bold">ERA OVERVIEW</span>
                  <h3 className="text-xl font-cinzel font-bold text-slate-100">{era.title}</h3>
                  <p className="text-xs text-slate-300 font-mono">Legendary Figures: {era.protagonist}</p>
                  <p className="text-xs text-slate-300 leading-relaxed mt-2">{era.description}</p>
                </div>

                <div className="pt-2">
                  <span className="text-xs font-mono text-slate-400 block mb-2 font-bold uppercase">
                    Notable Martial Souls in this Era
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {eraSouls.map(s => (
                      <div key={s.id} className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 space-y-1">
                        <span className="text-xs font-cinzel font-bold text-amber-300">{s.name}</span>
                        <span className="text-[10px] font-mono text-slate-400 block">{s.element}</span>
                        <p className="text-[11px] text-slate-300 line-clamp-2">{s.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* ================= TAB 7: MARTIAL SOULS CODEX (ALL 7 TIERS & 12 CATEGORIES) ================= */}
      {activeSubTab === 'martial_codex' && (
        <div className="space-y-6">
          <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono mb-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>DOULUO CANON CODEX · 斗罗大陆全武魂图鉴</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-cinzel font-black text-slate-100">
                  Seven Martial Soul Tiers & All Elemental Categories
                </h3>
                <p className="text-xs text-slate-400">
                  Comprehensive encyclopedia of all martial souls from Waste Spirit to Divine Godhood, categorized by battle combat specializations.
                </p>
              </div>

              {/* Quick Stat Pill */}
              <div className="flex items-center gap-2 text-xs font-mono bg-slate-950 px-3 py-2 rounded-2xl border border-slate-800 shrink-0">
                <span className="text-slate-400">Total Souls Cataloged:</span>
                <span className="text-amber-400 font-bold">{MARTIAL_SOULS.length} Souls</span>
              </div>
            </div>

            {/* Rank Tier Filter Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Filter By Spirit Rank Tier (按品阶筛选)
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Tiers (全部品阶)' },
                  { id: 'divine', label: 'Divine Tier (神级 1%)' },
                  { id: 'super', label: 'Super Tier (超级 5%)' },
                  { id: 'top', label: 'Top Tier (顶级 10%)' },
                  { id: 'high', label: 'High Tier (高级 35%)' },
                  { id: 'intermediate', label: 'Intermediate (中级 45%)' },
                  { id: 'normal', label: 'Normal (普通 65%)' },
                  { id: 'waste', label: 'Waste Spirit (废武魂 80%)' },
                ].map(tier => (
                  <button
                    key={tier.id}
                    onClick={() => {
                      sound.playChime(500);
                      setCodexTierFilter(tier.id);
                    }}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
                      codexTierFilter === tier.id
                        ? 'bg-amber-400 text-slate-950 font-bold border-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.3)]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {tier.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Category Filter Chips */}
            <div className="space-y-1.5">
              <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
                Filter By Specialization Category (按系别筛选)
              </span>
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                {[
                  { id: 'all', label: 'All Types (全部系别)' },
                  { id: 'healing', label: 'Healing (治疗系)' },
                  { id: 'gem', label: 'Gem / Jewel (宝石系)' },
                  { id: 'food', label: 'Food (食物系)' },
                  { id: 'strength', label: 'Strength (强攻系)' },
                  { id: 'agility', label: 'Agility (敏攻系)' },
                  { id: 'control', label: 'Control (控制系)' },
                  { id: 'defense', label: 'Defense (防御系)' },
                  { id: 'elemental', label: 'Elemental (元素系)' },
                  { id: 'beast', label: 'Beast (兽武魂)' },
                  { id: 'plant', label: 'Plant (植物系)' },
                  { id: 'tool', label: 'Tool (器武魂)' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      sound.playChime(520);
                      setCodexCategoryFilter(cat.id);
                    }}
                    className={`text-xs font-mono px-3 py-1.5 rounded-xl whitespace-nowrap transition-all border ${
                      codexCategoryFilter === cat.id
                        ? 'bg-cyan-400 text-slate-950 font-bold border-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.3)]'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {MARTIAL_SOULS.filter(s => {
                const matchTier = codexTierFilter === 'all' || s.rankTier === codexTierFilter;
                const matchCat = codexCategoryFilter === 'all' || s.category === codexCategoryFilter;
                return matchTier && matchCat;
              }).map(soul => {
                const tierStyle = getRankTierBadgeColor(soul.rankTier);
                return (
                  <div
                    key={soul.id}
                    className="bg-slate-950/80 border border-slate-800 rounded-3xl p-4 flex flex-col justify-between space-y-3 hover:border-amber-400/60 transition-all hover:shadow-[0_0_20px_rgba(245,158,11,0.15)] group"
                  >
                    {/* Visual Artwork */}
                    <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-800 relative">
                      <img
                        src={soul.image || '/src/assets/images/martial_soul_hammer_1791144077856.jpg'}
                        alt={soul.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />

                      {/* Rank Tier Badge */}
                      <div className="absolute top-2.5 right-2.5">
                        <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow ${tierStyle.bg} ${tierStyle.border} ${tierStyle.text}`}>
                          {getRankTierLabel(soul.rankTier)}
                        </span>
                      </div>

                      {/* Category Pill */}
                      <div className="absolute bottom-2 left-2 flex items-center gap-1.5">
                        <span className="text-[10px] font-mono bg-slate-950/85 px-2 py-0.5 rounded-lg border border-slate-700 text-slate-200 backdrop-blur-md">
                          {getCategoryLabel(soul.category)}
                        </span>
                        <span className="text-[10px] font-mono bg-slate-950/85 px-2 py-0.5 rounded-lg border border-slate-700 text-amber-300">
                          {soul.element}
                        </span>
                      </div>
                    </div>

                    {/* Titles */}
                    <div>
                      <h4 className="text-base font-cinzel font-bold text-slate-100 group-hover:text-amber-300 transition-colors">
                        {soul.name}
                      </h4>
                      <p className="text-xs font-mono text-amber-400/90">{soul.chineseName}</p>
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">
                      {soul.description}
                    </p>

                    {/* Avatar Bonus */}
                    <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-cyan-300 font-mono">
                      <span className="text-amber-400 font-bold block mb-0.5">True Avatar Domain Effect:</span>
                      <span>{soul.avatarBonusDesc}</span>
                    </div>

                    {/* Base Stats Footer */}
                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono pt-2 border-t border-slate-800 text-slate-400">
                      <div>Base HP: <strong className="text-emerald-400">{soul.baseHp}</strong></div>
                      <div>Base ATK: <strong className="text-rose-400">{soul.baseAttack}</strong></div>
                      <div>Base DEF: <strong className="text-blue-400">{soul.baseDefense}</strong></div>
                      <div>Base SPD: <strong className="text-amber-400">{soul.baseSpeed}</strong></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Twin Martial Soul Awakening Modal */}
      {showTwinAwakenModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="text-center space-y-1">
              <h3 className="text-xl sm:text-2xl font-cinzel font-bold text-amber-300">
                Twin Martial Soul Awakening (双生武魂)
              </h3>
              <p className="text-xs text-slate-400">
                Select a secondary martial soul from Soul Land 1 to 5 to awaken alongside your primary spirit!
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {MARTIAL_SOULS.filter(s => s.id !== player.primarySoul.id).map(soul => (
                <button
                  key={soul.id}
                  onClick={() => {
                    onAwakenSecondarySoul(soul);
                    setShowTwinAwakenModal(false);
                    sound.playAvatarAwaken();
                    confetti({ particleCount: 75, spread: 70 });
                  }}
                  className="p-4 rounded-2xl border border-slate-800 bg-slate-950 hover:border-amber-400 hover:bg-slate-900 transition-all text-left space-y-1.5 group shadow"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-slate-100 font-cinzel group-hover:text-amber-300 transition-colors">
                      {soul.name}
                    </span>
                    <span className="text-xs text-amber-400 font-mono">
                      {soul.element}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                    {soul.description}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowTwinAwakenModal(false)}
              className="w-full py-3 bg-slate-800 text-slate-300 hover:text-white rounded-2xl text-xs font-semibold"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
