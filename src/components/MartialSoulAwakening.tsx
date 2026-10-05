import React, { useState, useEffect } from 'react';
import { MartialSoul, MartialSoulRankTier, MartialSoulCategory } from '../types/game';
import {
  MARTIAL_SOULS,
  rollTierByExactOdds,
  getRankTierBadgeColor,
  getRankTierLabel,
  getCategoryLabel,
} from '../data/martialSouls';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Shield,
  Swords,
  Zap,
  Check,
  Flame,
  Award,
  BookOpen,
  Info,
  X,
  Heart,
  Gem,
  UtensilsCrossed,
} from 'lucide-react';

interface MartialSoulAwakeningProps {
  onCompleteAwakening: (soul: MartialSoul, name: string, secondarySoul?: MartialSoul, innateRank?: number) => void;
}

export const MartialSoulAwakening: React.FC<MartialSoulAwakeningProps> = ({
  onCompleteAwakening,
}) => {
  const [playerName, setPlayerName] = useState<string>('Tang San');
  const [isAwakening, setIsAwakening] = useState<boolean>(false);
  const [rouletteIndex, setRouletteIndex] = useState<number>(0);
  const [activeChildStep, setActiveChildStep] = useState<number>(1);
  const [showOddsModal, setShowOddsModal] = useState<boolean>(false);
  const [showCodexModal, setShowCodexModal] = useState<boolean>(false);
  const [codexFilterTier, setCodexFilterTier] = useState<string>('all');
  const [awakenedResult, setAwakenedResult] = useState<{
    primary: MartialSoul;
    secondary?: MartialSoul;
    isTwin: boolean;
    innateRank: number;
    rolledTier: MartialSoulRankTier;
  } | null>(null);

  // Animate the children lineup queue stepping up in 3D perspective
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveChildStep(prev => (prev >= 6 ? 1 : prev + 1));
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const handleStartRandomAwakening = () => {
    setIsAwakening(true);
    setAwakenedResult(null);
    sound.unlock();
    sound.playRingResonance('purple');

    let counter = 0;
    const totalTicks = 24;
    const interval = setInterval(() => {
      counter++;
      const randIdx = Math.floor(Math.random() * MARTIAL_SOULS.length);
      setRouletteIndex(randIdx);
      sound.playChime(350 + (counter % 8) * 60);

      if (counter >= totalTicks) {
        clearInterval(interval);

        // Exact Probability Tier Roll from user specifications:
        // Divine: 1% | Super: 5% | Top: 10% | High: 35% | Intermediate: 45% | Normal: 65% | Waste: 80%
        const rolledTier = rollTierByExactOdds();
        const tierPool = MARTIAL_SOULS.filter(s => s.rankTier === rolledTier);
        const pool = tierPool.length > 0 ? tierPool : MARTIAL_SOULS;
        const primarySoul = pool[Math.floor(Math.random() * pool.length)];

        // Canon Twin Martial Soul chance strictly LESS THAN 5% (< 4.5%)
        const twinRoll = Math.random();
        const isTwin = twinRoll < 0.045; // 4.5% chance (< 5%)

        let secondarySoul: MartialSoul | undefined = undefined;
        if (isTwin) {
          // Select distinct secondary soul of high or super tier
          const remainingSouls = MARTIAL_SOULS.filter(s => s.id !== primarySoul.id);
          secondarySoul = remainingSouls[Math.floor(Math.random() * remainingSouls.length)];
        }

        // Innate Spirit Power:
        // Twin or Divine Tier: Rank 10 (Innate Full Spirit Power / 先天满魂力)
        // Tang San Blue Silver Grass canon: Rank 10 Innate Full Spirit Power shock!
        // Others: Rank 3 to 10
        let innateRank = 5 + Math.floor(Math.random() * 6);
        if (isTwin || rolledTier === 'divine' || primarySoul.id === 'blue_silver_grass_waste') {
          innateRank = 10;
        }

        setIsAwakening(false);
        setAwakenedResult({
          primary: primarySoul,
          secondary: secondarySoul,
          isTwin,
          innateRank,
          rolledTier,
        });

        sound.playBreakthrough();
        sound.playRingResonance(rolledTier === 'divine' ? 'gold' : rolledTier === 'super' ? 'red' : 'purple');
        confetti({
          particleCount: isTwin || rolledTier === 'divine' ? 200 : 120,
          spread: isTwin ? 130 : 90,
          origin: { y: 0.5 },
        });
      }
    }, 85);
  };

  const handleConfirmAwakening = () => {
    if (!awakenedResult) return;
    sound.unlock();
    sound.playBreakthrough();
    onCompleteAwakening(
      awakenedResult.primary,
      playerName.trim() || 'Tang San',
      awakenedResult.secondary,
      awakenedResult.innateRank
    );
  };

  const filteredCodexSouls = MARTIAL_SOULS.filter(s => {
    if (codexFilterTier === 'all') return true;
    return s.rankTier === codexFilterTier;
  });

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden select-none">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img
          src="/src/assets/images/spirit_hall_awakening_1791218983620.jpg"
          alt="Spirit Hall"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/60" />
      </div>

      <div className="relative z-10 w-full max-w-4xl bg-slate-900/90 border border-amber-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md space-y-6 my-6">
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SPIRIT HALL AWAKENING CEREMONY · 武魂殿觉醒大典</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
            Martial Soul Awakening
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Deacon Su Yuntao of Spirit Hall channels golden spiritual energy through six black stones. Village children step up one by one in group into the awakening array.
          </p>

          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setShowOddsModal(true)}
              className="text-xs font-mono text-amber-400 hover:text-amber-300 underline inline-flex items-center gap-1"
            >
              <Info className="w-3.5 h-3.5" />
              <span>View 7 Ranks Awakening Odds (品阶觉醒概率)</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setShowCodexModal(true)}
              className="text-xs font-mono text-cyan-400 hover:text-cyan-300 underline inline-flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Browse All Martial Souls Catalog (全武魂图鉴)</span>
            </button>
          </div>
        </div>

        {/* ================= 3D MOTION PICTURE: SPIRIT HALL AWAKENING CEREMONY ================= */}
        <div className="relative w-full h-64 sm:h-80 rounded-3xl overflow-hidden border-2 border-amber-500/50 shadow-2xl group">
          <img
            src="/src/assets/images/spirit_hall_awakening_1791218983620.jpg"
            alt="Deacon Su Yuntao Awakening Children"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isAwakening ? 'scale-105 filter brightness-115' : 'group-hover:scale-102'
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

          {/* Golden Rune Awakening Array on Ground */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-48 h-20 pointer-events-none flex items-center justify-center">
            <div className="w-40 h-16 rounded-full border-2 border-dashed border-amber-400/80 animate-spin-slow shadow-[0_0_20px_#F59E0B]" />
            {/* 6 Black Awakening Stones */}
            {[0, 60, 120, 180, 240, 300].map((deg, i) => (
              <div
                key={i}
                className="absolute w-3 h-3 rounded-full bg-slate-900 border border-amber-400 shadow-[0_0_8px_#F59E0B]"
                style={{
                  transform: `rotate(${deg}deg) translate(65px) rotate(-${deg}deg)`,
                }}
              />
            ))}
          </div>

          {/* Children Queue 3D Stepping Up Motion Indicator */}
          <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between bg-slate-950/85 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-amber-300 font-bold">
                Lineup Step: Child #{activeChildStep}
              </span>
              <span className="text-[10px] text-slate-400">
                (Stepping onto the Six Awakening Stones)
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5, 6].map(n => (
                <div
                  key={n}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeChildStep === n
                      ? 'bg-amber-400 scale-125 shadow-[0_0_8px_#F59E0B]'
                      : 'bg-slate-700'
                  }`}
                  title={`Child #${n}`}
                />
              ))}
            </div>
          </div>

          {/* Su Yuntao Dialogue Bubble */}
          <div className="absolute top-4 left-4 z-20 bg-slate-950/90 border border-amber-500/40 p-2.5 rounded-xl shadow-lg max-w-xs">
            <span className="text-[10px] font-mono font-bold text-amber-400 block">
              Deacon Su Yuntao (素云涛执事):
            </span>
            <p className="text-[11px] text-slate-200 font-cinzel italic leading-snug">
              "Do not fear, child. Close your eyes and channel the spirit energy within your right hand!"
            </p>
          </div>
        </div>

        {/* Name Input Bar */}
        <div className="max-w-md mx-auto space-y-1.5">
          <label className="text-xs font-mono text-slate-400 block text-center">
            Spirit Master Name (魂师姓名)
          </label>
          <input
            type="text"
            value={playerName}
            onChange={e => setPlayerName(e.target.value)}
            placeholder="Enter Spirit Master Name..."
            maxLength={20}
            className="w-full px-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-2xl text-slate-100 text-sm focus:outline-none focus:border-amber-400 transition-colors font-cinzel text-center shadow-inner"
          />
        </div>

        {/* ================= RANDOM AWAKENING ACTION BUTTON ================= */}
        {!awakenedResult && (
          <div className="text-center space-y-3 pt-2">
            <button
              type="button"
              onClick={handleStartRandomAwakening}
              disabled={isAwakening}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-black text-base tracking-wider rounded-2xl shadow-[0_0_30px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 mx-auto disabled:opacity-60"
            >
              <Sparkles className={`w-5 h-5 ${isAwakening ? 'animate-spin' : ''}`} />
              <span>
                {isAwakening ? 'Channeling Awakening Array...' : 'Awaken Martial Soul (开始随机觉醒)'}
              </span>
            </button>

            <p className="text-[11px] font-mono text-slate-400">
              * Everyone awakens 1 Martial Soul randomly. Rare Twin Martial Soul chance is <strong>&lt; 5%</strong>.
            </p>

            {/* Live Roulette Display when spinning */}
            {isAwakening && (
              <div className="p-4 bg-slate-950/80 border border-amber-500/60 rounded-2xl max-w-sm mx-auto shadow-2xl animate-pulse space-y-1">
                <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                  Resonating with Cosmic Soul Leyline...
                </span>
                <div className="text-lg font-cinzel font-bold text-slate-100">
                  {MARTIAL_SOULS[rouletteIndex]?.name}
                </div>
                <div className="text-xs font-mono text-amber-300">
                  {MARTIAL_SOULS[rouletteIndex]?.chineseName}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= REVEALED AWAKENING RESULT CARD ================= */}
        {awakenedResult && (
          <div className="bg-slate-950/95 border-2 border-amber-400 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(245,158,11,0.3)] space-y-6 animate-in fade-in zoom-in-95 duration-500">
            {/* Twin Soul Announcement */}
            {awakenedResult.isTwin && (
              <div className="bg-gradient-to-r from-purple-900/60 via-amber-900/60 to-purple-900/60 border-2 border-amber-300 p-4 rounded-2xl text-center space-y-1 shadow-2xl animate-bounce">
                <span className="text-xs font-mono font-black text-amber-300 tracking-widest uppercase block">
                  👑 MIRACULOUS AUSPICIOUS OMEN · 绝世双生武魂 (&lt; 5% CHANCE) 👑
                </span>
                <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200">
                  Twin Martial Souls Awakened!
                </h3>
                <p className="text-xs text-purple-200">
                  A legend born once in a millennium! You possess dual martial souls and Innate Full Spirit Power!
                </p>
              </div>
            )}

            {/* Su Yuntao Live Reaction */}
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-amber-500/30 text-center">
              <span className="text-[11px] font-mono text-amber-400 font-bold block mb-1">
                Deacon Su Yuntao's Astonishment (素云涛执事惊呼):
              </span>
              <p className="text-xs sm:text-sm font-cinzel italic text-slate-200">
                {awakenedResult.primary.rankTier === 'divine'
                  ? '“Unbelievable... Celestial golden light descends from the nine heavens! A Divine Tier Martial Soul has manifested!”'
                  : awakenedResult.primary.id === 'blue_silver_grass_waste'
                  ? '“Alas, it is the waste martial soul Blue Silver Grass... But wait! Put your hand on the crystal ball... WHAT?! Blinding light! Innate Full Spirit Power Rank 10?!”'
                  : awakenedResult.isTwin
                  ? '“Heavens above! A child possessing twin martial souls?! The continent will shake in awe!”'
                  : '“The awakening is complete! An extraordinary martial soul resonates with your spirit power!”'}
              </p>
            </div>

            {/* Martial Souls Card Grid */}
            <div className={`grid gap-4 ${awakenedResult.isTwin ? 'sm:grid-cols-2' : 'max-w-md mx-auto'}`}>
              {/* Primary Martial Soul */}
              <div
                className="bg-slate-900/90 border-2 rounded-2xl p-5 space-y-4 shadow-xl"
                style={{
                  borderColor: awakenedResult.primary.colorScheme.border,
                  boxShadow: `0 0 25px ${awakenedResult.primary.colorScheme.glow}`,
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold">
                    Primary Martial Soul (主武魂)
                  </span>
                  {/* Rank Tier Badge */}
                  <span
                    className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                      getRankTierBadgeColor(awakenedResult.primary.rankTier).bg
                    } ${getRankTierBadgeColor(awakenedResult.primary.rankTier).border} ${
                      getRankTierBadgeColor(awakenedResult.primary.rankTier).text
                    }`}
                  >
                    {getRankTierLabel(awakenedResult.primary.rankTier)}
                  </span>
                </div>

                {/* Martial Soul Picture */}
                <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700 relative group">
                  <img
                    src={awakenedResult.primary.image || '/src/assets/images/martial_soul_hammer_1791144077856.jpg'}
                    alt={awakenedResult.primary.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-slate-200">
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-700">
                      {getCategoryLabel(awakenedResult.primary.category)}
                    </span>
                    <span className="bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-700 text-amber-300">
                      {awakenedResult.primary.element}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-cinzel font-black text-slate-100">
                    {awakenedResult.primary.name}
                  </h3>
                  <p className="text-xs font-mono text-amber-300">
                    {awakenedResult.primary.chineseName}
                  </p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {awakenedResult.primary.description}
                </p>

                {/* Base Attributes */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800">
                  <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-slate-400">Base HP:</span>
                    <span className="text-emerald-400 font-bold">{awakenedResult.primary.baseHp}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-slate-400">Base ATK:</span>
                    <span className="text-rose-400 font-bold">{awakenedResult.primary.baseAttack}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-slate-400">Base DEF:</span>
                    <span className="text-blue-400 font-bold">{awakenedResult.primary.baseDefense}</span>
                  </div>
                  <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                    <span className="text-slate-400">Base SPD:</span>
                    <span className="text-amber-400 font-bold">{awakenedResult.primary.baseSpeed}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Martial Soul (Twin) */}
              {awakenedResult.isTwin && awakenedResult.secondary && (
                <div
                  className="bg-slate-900/90 border-2 rounded-2xl p-5 space-y-4 shadow-xl"
                  style={{
                    borderColor: awakenedResult.secondary.colorScheme.border,
                    boxShadow: `0 0 25px ${awakenedResult.secondary.colorScheme.glow}`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                      Secondary Martial Soul (副武魂)
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                        getRankTierBadgeColor(awakenedResult.secondary.rankTier).bg
                      } ${getRankTierBadgeColor(awakenedResult.secondary.rankTier).border} ${
                        getRankTierBadgeColor(awakenedResult.secondary.rankTier).text
                      }`}
                    >
                      {getRankTierLabel(awakenedResult.secondary.rankTier)}
                    </span>
                  </div>

                  <div className="w-full h-44 rounded-2xl overflow-hidden border border-slate-700 relative group">
                    <img
                      src={awakenedResult.secondary.image || '/src/assets/images/seven_killing_sword_1791220338549.jpg'}
                      alt={awakenedResult.secondary.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] font-mono text-slate-200">
                      <span className="bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-700">
                        {getCategoryLabel(awakenedResult.secondary.category)}
                      </span>
                      <span className="bg-slate-950/80 px-2 py-0.5 rounded-lg border border-slate-700 text-amber-300">
                        {awakenedResult.secondary.element}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-cinzel font-black text-slate-100">
                      {awakenedResult.secondary.name}
                    </h3>
                    <p className="text-xs font-mono text-amber-300">
                      {awakenedResult.secondary.chineseName}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {awakenedResult.secondary.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono pt-2 border-t border-slate-800">
                    <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-slate-400">Base HP:</span>
                      <span className="text-emerald-400 font-bold">{awakenedResult.secondary.baseHp}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-slate-400">Base ATK:</span>
                      <span className="text-rose-400 font-bold">{awakenedResult.secondary.baseAttack}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-slate-400">Base DEF:</span>
                      <span className="text-blue-400 font-bold">{awakenedResult.secondary.baseDefense}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-xl flex items-center justify-between">
                      <span className="text-slate-400">Base SPD:</span>
                      <span className="text-amber-400 font-bold">{awakenedResult.secondary.baseSpeed}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Innate Spirit Power Badge */}
            <div className="bg-slate-900 border border-amber-400/50 p-4 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-slate-400 block">
                  Innate Spirit Power (先天魂力)
                </span>
                <span className="text-lg font-cinzel font-bold text-amber-300">
                  {awakenedResult.innateRank === 10
                    ? 'Innate Full Spirit Power Rank 10 (先天满魂力 · 十级)'
                    : `Innate Spirit Power Rank ${awakenedResult.innateRank} (先天魂力 · ${awakenedResult.innateRank}级)`}
                </span>
              </div>
              <span className="text-3xl">🔮</span>
            </div>

            {/* Confirmation Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 justify-center pt-2">
              <button
                type="button"
                onClick={handleStartRandomAwakening}
                className="w-full sm:w-auto px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-cinzel font-bold text-xs uppercase tracking-wider rounded-xl transition-all"
              >
                Re-Awaken (重新随机觉醒)
              </button>
              <button
                type="button"
                onClick={handleConfirmAwakening}
                className="w-full sm:w-auto px-10 py-3.5 bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-cinzel font-black text-sm uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Begin Douluo Journey (踏入魂师界)</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL: 7 RANKS ODDS OVERVIEW ================= */}
      {showOddsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
          <div className="relative w-full max-w-lg bg-slate-900 border border-amber-500/40 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-cinzel font-bold text-slate-100">
                  Martial Soul Awakening Odds (品阶觉醒概率)
                </h3>
              </div>
              <button
                onClick={() => setShowOddsModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200 flex items-center justify-between">
                <span className="font-bold">Divine Tier Spirit (神级武魂):</span>
                <span className="px-2 py-0.5 rounded bg-amber-400 text-slate-950 font-bold">1% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-200 flex items-center justify-between">
                <span className="font-bold">Super Tier Spirit (超级武魂):</span>
                <span className="px-2 py-0.5 rounded bg-purple-400 text-slate-950 font-bold">5% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400 text-rose-200 flex items-center justify-between">
                <span className="font-bold">Top Tier Spirit (顶级武魂):</span>
                <span className="px-2 py-0.5 rounded bg-rose-400 text-slate-950 font-bold">10% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400 text-blue-200 flex items-center justify-between">
                <span className="font-bold">High Tier Spirit (高级武魂):</span>
                <span className="px-2 py-0.5 rounded bg-blue-400 text-slate-950 font-bold">35% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200 flex items-center justify-between">
                <span className="font-bold">Intermediate Tier Spirit (中级武魂):</span>
                <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-bold">45% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-600 text-slate-200 flex items-center justify-between">
                <span className="font-bold">Normal Spirit (普通武魂):</span>
                <span className="px-2 py-0.5 rounded bg-slate-600 text-slate-100 font-bold">65% Chance</span>
              </div>
              <div className="p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300 flex items-center justify-between">
                <span className="font-bold">Waste Spirit (废武魂):</span>
                <span className="px-2 py-0.5 rounded bg-stone-700 text-stone-200 font-bold">80% Base Rate</span>
              </div>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p>
                * <strong>Twin Martial Souls (双生武魂):</strong> Strictly <strong>&lt; 5%</strong> chance to awaken upon birth.
              </p>
              <p>
                * All categories represented: Healing, Gem, Support, Strength, Agility, Control, Defense, Food, Beast, Plant, Tool, Elemental.
              </p>
            </div>

            <button
              onClick={() => setShowOddsModal(false)}
              className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-cinzel font-bold text-xs uppercase rounded-xl transition-all"
            >
              Understood
            </button>
          </div>
        </div>
      )}

      {/* ================= MODAL: ALL MARTIAL SOULS CATALOG CODEX ================= */}
      {showCodexModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
          <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl max-h-[90vh] overflow-hidden flex flex-col space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-amber-400" />
                <h3 className="text-xl font-cinzel font-bold text-slate-100">
                  Douluo Martial Souls Codex · 全武魂图鉴
                </h3>
              </div>
              <button
                onClick={() => setShowCodexModal(false)}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Filter buttons by Tier */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
              {[
                { id: 'all', label: 'All Souls (全部)' },
                { id: 'divine', label: 'Divine (神级 1%)' },
                { id: 'super', label: 'Super (超级 5%)' },
                { id: 'top', label: 'Top (顶级 10%)' },
                { id: 'high', label: 'High (高级 35%)' },
                { id: 'intermediate', label: 'Intermediate (中级 45%)' },
                { id: 'normal', label: 'Normal (普通 65%)' },
                { id: 'waste', label: 'Waste (废武魂 80%)' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setCodexFilterTier(tab.id)}
                  className={`text-[11px] font-mono px-3 py-1.5 rounded-xl whitespace-nowrap transition-colors ${
                    codexFilterTier === tab.id
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Grid of Souls */}
            <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 scrollbar-thin">
              {filteredCodexSouls.map(soul => {
                const tierBadge = getRankTierBadgeColor(soul.rankTier);
                return (
                  <div
                    key={soul.id}
                    className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between space-y-2.5 hover:border-amber-400/50 transition-all"
                  >
                    <div className="w-full h-32 rounded-xl overflow-hidden border border-slate-800 relative">
                      <img
                        src={soul.image || '/src/assets/images/martial_soul_hammer_1791144077856.jpg'}
                        alt={soul.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <span className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${tierBadge.bg} ${tierBadge.border} ${tierBadge.text}`}>
                          {getRankTierLabel(soul.rankTier)}
                        </span>
                      </div>
                      <div className="absolute bottom-1.5 left-2">
                        <span className="text-[10px] font-mono bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700 text-slate-200">
                          {getCategoryLabel(soul.category)}
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-cinzel font-bold text-slate-100">{soul.name}</h4>
                      <p className="text-[11px] font-mono text-amber-300/90">{soul.chineseName}</p>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                      {soul.description}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono pt-1 border-t border-slate-900 text-slate-400">
                      <span>HP: {soul.baseHp}</span>
                      <span>ATK: {soul.baseAttack}</span>
                      <span>DEF: {soul.baseDefense}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
