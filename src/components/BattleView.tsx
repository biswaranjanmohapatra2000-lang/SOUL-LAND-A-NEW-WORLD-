import React, { useState, useEffect, useRef } from 'react';
import { PlayerStats, SpiritBeast, ArenaOpponent, SoulRing, SpiritBone } from '../types/game';
import { SpiritRingDisplay } from './SpiritRingDisplay';
import { sound } from '../utils/audio';
import { getRingColorHex, getRealmInfo } from '../data/martialSouls';
import { Swords, Shield, Zap, ArrowLeft, Heart, Flame, Crosshair, Sparkles } from 'lucide-react';

export type BattleTarget = SpiritBeast | ArenaOpponent;

interface BattleViewProps {
  player: PlayerStats;
  target: BattleTarget;
  isArena: boolean;
  onVictory: (target: BattleTarget) => void;
  onDefeat: () => void;
  onEscape: () => void;
}

interface FloatingText {
  id: number;
  text: string;
  color: string;
  isCrit?: boolean;
}

interface VisualEffect {
  id: number;
  type: 'slash' | 'slam' | 'lightning' | 'vines' | 'lotus' | 'avatar';
  x: number;
  y: number;
}

export const BattleView: React.FC<BattleViewProps> = ({
  player,
  target,
  isArena,
  onVictory,
  onDefeat,
  onEscape,
}) => {
  // Combat State
  const [playerHp, setPlayerHp] = useState(player.hp);
  const [playerSp, setPlayerSp] = useState(player.sp);
  const [targetHp, setTargetHp] = useState(target.hp);
  const [playerShield, setPlayerShield] = useState(0);

  // Animations & Visual States
  const [screenShake, setScreenShake] = useState(false);
  const [isPlayerAttacking, setIsPlayerAttacking] = useState(false);
  const [isTargetAttacking, setIsTargetAttacking] = useState(false);
  const [targetHitFlash, setTargetHitFlash] = useState(false);
  const [playerHitFlash, setPlayerHitFlash] = useState(false);
  const [activeCutscene, setActiveCutscene] = useState<string | null>(null);

  // Cooldowns
  const [skillCooldowns, setSkillCooldowns] = useState<{ [skillName: string]: number }>({});
  const [hiddenWeaponCd, setHiddenWeaponCd] = useState(0);
  const [dodgeCd, setDodgeCd] = useState(0);
  const [avatarCd, setAvatarCd] = useState(0);

  // Avatar Buff State
  const [isAvatarActive, setIsAvatarActive] = useState(false);
  const [avatarTimeRemaining, setAvatarTimeRemaining] = useState(0);
  const [isDodging, setIsDodging] = useState(false);
  const [activeSkillHighlight, setActiveSkillHighlight] = useState<string | undefined>(undefined);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [visualEffects, setVisualEffects] = useState<VisualEffect[]>([]);
  const [combatLogs, setCombatLogs] = useState<string[]>([
    `⚔️ Combat commenced against ${target.name}!`,
  ]);

  // Set Battle Mode Audio
  useEffect(() => {
    sound.setMode('battle');
    sound.startBGM();
    return () => {
      sound.setMode('cultivate');
    };
  }, []);

  // Trigger Screen Shake
  const triggerShake = () => {
    setScreenShake(true);
    setTimeout(() => setScreenShake(false), 350);
  };

  // Add floating damage text
  const addFloatingText = (text: string, color: string, isCrit: boolean = false) => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev.slice(-4), { id, text, color, isCrit }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(item => item.id !== id));
    }, 1200);
  };

  const addVfx = (type: VisualEffect['type'], x: number = 50, y: number = 50) => {
    const id = Date.now() + Math.random();
    setVisualEffects(prev => [...prev, { id, type, x, y }]);
    setTimeout(() => {
      setVisualEffects(prev => prev.filter(v => v.id !== id));
    }, 900);
  };

  const addLog = (msg: string) => {
    setCombatLogs(prev => [msg, ...prev.slice(0, 15)]);
  };

  // Cooldown & Ticker (runs every 100ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setSkillCooldowns(prev => {
        const next: { [k: string]: number } = {};
        Object.entries(prev).forEach(([key, val]) => {
          if (val > 0.1) next[key] = Math.max(0, val - 0.1);
        });
        return next;
      });

      setHiddenWeaponCd(prev => Math.max(0, prev - 0.1));
      setDodgeCd(prev => Math.max(0, prev - 0.1));
      setAvatarCd(prev => Math.max(0, prev - 0.1));

      // Martial Soul Avatar duration
      setAvatarTimeRemaining(prev => {
        if (prev <= 0.1 && isAvatarActive) {
          setIsAvatarActive(false);
          addLog('✨ Martial Soul Avatar state subsided.');
          return 0;
        }
        return Math.max(0, prev - 0.1);
      });

      // Passive SP Regen from Mysterious Heaven Method
      setPlayerSp(prev => Math.min(player.maxSp, prev + (1.8 + (player.tangSectArts[0]?.level || 1) * 0.5) * 0.1));
    }, 100);

    return () => clearInterval(interval);
  }, [isAvatarActive, player.maxSp, player.tangSectArts]);

  // Target Auto Combat Loop
  useEffect(() => {
    if (targetHp <= 0 || playerHp <= 0) return;

    const executeTargetAttack = () => {
      if (targetHp <= 0 || playerHp <= 0) return;

      setIsTargetAttacking(true);
      setTimeout(() => setIsTargetAttacking(false), 400);

      // Select normal attack or skill
      const useSkill = Math.random() < 0.45 && target.skills.length > 0;
      let rawDamage = target.attack;
      let actionName = 'unleashes raw ferocity';

      if (useSkill) {
        const skill = target.skills[Math.floor(Math.random() * target.skills.length)];
        rawDamage = target.attack * skill.damageMultiplier;
        actionName = `casts [${skill.name}]`;
      }

      // Check player evasion
      const totalEvasion = isDodging ? 0.95 : player.evasion;
      if (Math.random() < totalEvasion) {
        addFloatingText('MISS / EVADED', '#38BDF8');
        addLog(`💨 You effortlessly dodged ${target.name}'s assault with Ghost Shadow Track!`);
        return;
      }

      // Calculate damage through defense
      const damageReduction = player.defense / (player.defense + 300);
      let finalDamage = Math.max(15, Math.round(rawDamage * (1 - damageReduction)));

      if (isAvatarActive) {
        finalDamage = Math.round(finalDamage * 0.7);
      }

      // Shield handling
      if (playerShield > 0) {
        if (playerShield >= finalDamage) {
          setPlayerShield(prev => prev - finalDamage);
          addFloatingText(`-${finalDamage} (SHIELD BLOCKED)`, '#94A3B8');
          addLog(`🛡️ Your spirit barrier absorbed ${finalDamage} damage.`);
          return;
        } else {
          finalDamage -= playerShield;
          setPlayerShield(0);
          addLog('🛡️ Your spirit barrier shattered!');
        }
      }

      sound.playHeavyImpact();
      sound.playBeastRoar();
      triggerShake();
      setPlayerHitFlash(true);
      setTimeout(() => setPlayerHitFlash(false), 300);

      const nextHp = Math.max(0, playerHp - finalDamage);
      setPlayerHp(nextHp);
      if (nextHp <= 0) {
        setTimeout(() => onDefeat(), 500);
      }

      addFloatingText(`-${finalDamage}`, '#F43F5E');
      addLog(`💥 ${target.name} ${actionName}, dealing ${finalDamage} damage.`);
    };

    const delay = Math.max(2200, 3200 - player.speed * 10);
    const timer = setTimeout(executeTargetAttack, delay);

    return () => clearTimeout(timer);
  }, [targetHp, playerHp, target, player, isDodging, isAvatarActive, playerShield, onDefeat]);

  // Execute Soul Ring Skill
  const handleUseSoulSkill = (ring: SoulRing) => {
    const { skill } = ring;
    if ((skillCooldowns[skill.name] || 0) > 0) return;
    if (playerSp < skill.spCost) {
      addFloatingText('INSUFFICIENT SP', '#F59E0B');
      return;
    }

    setPlayerSp(prev => Math.max(0, prev - skill.spCost));
    setSkillCooldowns(prev => ({ ...prev, [skill.name]: skill.cooldown }));

    // Player attack surge animation
    setIsPlayerAttacking(true);
    setTimeout(() => setIsPlayerAttacking(false), 450);

    // Audio & Ring Resonance
    sound.playRingResonance(ring.tier);
    setActiveSkillHighlight(skill.name);
    setTimeout(() => setActiveSkillHighlight(undefined), 800);

    // Cutscene video-like animation for Rank 70+ True Avatar or 100k-year red skills!
    if (ring.tier === 'red' || ring.tier === 'gold' || skill.effectType === 'buff') {
      setActiveCutscene(skill.name);
      sound.playAvatarAwaken();
      triggerShake();
      setTimeout(() => setActiveCutscene(null), 1800);
    } else if (skill.effectType === 'control') {
      sound.playVineSnap();
      addVfx('vines');
    } else {
      sound.playHammerSlam();
      sound.playLightning();
      addVfx('slam');
      triggerShake();
    }

    // Hit target flash
    setTargetHitFlash(true);
    setTimeout(() => setTargetHitFlash(false), 350);

    // Calculate Damage
    let attackPower = player.attack;
    if (isAvatarActive) attackPower *= 1.8;

    const isCrit = Math.random() < player.critRate;
    let baseDamage = attackPower * skill.damageMultiplier * (isCrit ? 1.75 : 1.0);
    const enemyDefReduction = target.defense / (target.defense + 350);
    const finalDamage = Math.max(20, Math.round(baseDamage * (1 - enemyDefReduction)));

    if (skill.effectType === 'shield' && skill.shieldAmount) {
      const shieldVal = isAvatarActive ? skill.shieldAmount * 1.5 : skill.shieldAmount;
      setPlayerShield(prev => prev + shieldVal);
      addFloatingText(`+${shieldVal} SHIELD`, '#38BDF8');
    }

    if (skill.effectType === 'buff') {
      setIsAvatarActive(true);
      setAvatarTimeRemaining(15);
    }

    addFloatingText(`-${finalDamage}${isCrit ? ' CRIT!' : ''}`, isCrit ? '#F59E0B' : '#EF4444', isCrit);
    addLog(`⚔️ Unleashed [${skill.name}], striking for ${finalDamage} damage${isCrit ? ' (CRITICAL HIT!)' : ''}.`);

    const nextHp = Math.max(0, targetHp - finalDamage);
    setTargetHp(nextHp);
    if (nextHp <= 0) {
      setTimeout(() => onVictory(target), 600);
    }
  };

  // Execute Basic Attack Combo (Slash / Hammer Swing)
  const handleBasicAttack = () => {
    setIsPlayerAttacking(true);
    setTimeout(() => setIsPlayerAttacking(false), 350);

    sound.playSlash();
    sound.playHeavyImpact();
    addVfx('slash', 50, 45);

    setTargetHitFlash(true);
    setTimeout(() => setTargetHitFlash(false), 250);

    let rawDamage = player.attack * 1.0;
    if (isAvatarActive) rawDamage *= 1.45;

    const isCrit = Math.random() < player.critRate;
    if (isCrit) rawDamage *= 1.6;

    const enemyDefReduction = target.defense / (target.defense + 350);
    const finalDamage = Math.max(10, Math.round(rawDamage * (1 - enemyDefReduction)));

    addFloatingText(`-${finalDamage}`, isCrit ? '#F59E0B' : '#F1F5F9', isCrit);
    addLog(`🗡️ Basic attack dealt ${finalDamage} damage.`);

    const nextTargetHp = Math.max(0, targetHp - finalDamage);
    setTargetHp(nextTargetHp);
    if (nextTargetHp <= 0) {
      setTimeout(() => onVictory(target), 600);
    }
  };

  // Tang Sect Mechanical Hidden Weapon
  const handleHiddenWeapon = () => {
    if (hiddenWeaponCd > 0 || !player.equippedWeapon) return;
    const weapon = player.equippedWeapon;

    setHiddenWeaponCd(weapon.cooldown);
    sound.playDartRelease();

    if (weapon.id === 'buddhas_fury_tang_lotus') {
      setActiveCutscene("Buddha's Fury Tang Lotus Detonation!");
      sound.playExplosion();
      triggerShake();
      addVfx('lotus');
      setTimeout(() => setActiveCutscene(null), 1800);
    } else {
      addVfx('slash');
    }

    setTargetHitFlash(true);
    setTimeout(() => setTargetHitFlash(false), 350);

    const piercedDefense = Math.max(0, target.defense * (1 - weapon.pierce / 100));
    const defReduction = piercedDefense / (piercedDefense + 350);
    const finalDamage = Math.round(weapon.damage * (1 - defReduction));

    addFloatingText(`-${finalDamage} (PIERCED)`, '#A855F7');
    addLog(`🎯 Released Tang Sect Hidden Weapon [${weapon.name}], dealing ${finalDamage} armor-piercing damage!`);

    const nextTargetHp = Math.max(0, targetHp - finalDamage);
    setTargetHp(nextTargetHp);
    if (nextTargetHp <= 0) {
      setTimeout(() => onVictory(target), 700);
    }
  };

  // Ghost Shadow Evasion
  const handleDodge = () => {
    if (dodgeCd > 0) return;
    setDodgeCd(7);
    setIsDodging(true);
    sound.playSlash();
    addLog('💨 Activated Ghost Shadow Perplexing Track! Evasion boosted for 2 seconds.');
    addFloatingText('EVASION +95%', '#38BDF8');
    setTimeout(() => {
      setIsDodging(false);
    }, 2000);
  };

  // Activate True Avatar
  const handleActivateAvatar = () => {
    if (player.rank < 70) return;
    if (avatarCd > 0 || isAvatarActive) return;

    setActiveCutscene('Martial Soul True Avatar Unleashed!');
    sound.playAvatarAwaken();
    triggerShake();
    setTimeout(() => setActiveCutscene(null), 1800);

    setIsAvatarActive(true);
    setAvatarTimeRemaining(15);
    setAvatarCd(35);
    addLog('🔥 Summoned Martial Soul True Avatar (武魂真身)! All attributes doubled.');
    addFloatingText('TRUE AVATAR AWAKENED', '#FBBF24', true);
  };

  const realm = getRealmInfo(player.rank);
  const targetHpPercent = Math.max(0, Math.min(100, (targetHp / target.maxHp) * 100));
  const playerHpPercent = Math.max(0, Math.min(100, (playerHp / player.maxHp) * 100));
  const playerSpPercent = Math.max(0, Math.min(100, (playerSp / player.maxSp) * 100));

  const targetImage = 'image' in target ? target.image : undefined;
  const targetSubtitle = 'chineseName' in target ? target.chineseName : ('title' in target ? target.title : '');
  const possibleRing = 'possibleRing' in target ? target.possibleRing : undefined;

  return (
    <div
      className={`relative min-h-[calc(100vh-4rem)] bg-slate-950 p-4 sm:p-6 lg:p-8 flex flex-col justify-between overflow-hidden select-none transition-transform duration-100 ${
        screenShake ? 'translate-x-1.5 -translate-y-1.5 scale-[1.01]' : ''
      }`}
    >
      {/* Kurukshetra-Style Cinematic Battle Arena Background */}
      <div className="absolute inset-0 opacity-40 pointer-events-none overflow-hidden">
        <img
          src="/src/assets/images/kurukshetra_arena_bg_1791145456156.jpg"
          alt="Kurukshetra Style Battlefield"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950" />
      </div>

      {/* Fullscreen Video-Like Skill Cutscene Overlay */}
      {activeCutscene && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950/90 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
          <div className="relative flex flex-col items-center text-center p-6 space-y-4">
            {/* Blazing Sun/Avatar Aura Ring */}
            <div className="w-48 h-48 sm:w-64 sm:h-64 rounded-full border-4 border-amber-400 bg-amber-500/20 shadow-[0_0_80px_rgba(245,158,11,0.9)] animate-spin-slow flex items-center justify-center relative">
              <span className="text-6xl sm:text-7xl animate-bounce">🔥</span>
            </div>
            <div className="space-y-1">
              <span className="text-xs font-mono font-bold tracking-widest text-amber-300 uppercase">
                SEVENTH SOUL SKILL · 武魂真身
              </span>
              <h2 className="text-3xl sm:text-5xl font-cinzel font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 drop-shadow-[0_0_30px_#F59E0B]">
                {activeCutscene}
              </h2>
            </div>
          </div>
        </div>
      )}

      {/* Top Header Controls */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <button
          onClick={onEscape}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-amber-300 transition-colors bg-slate-900/80 px-3.5 py-1.5 rounded-xl border border-slate-800"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retreat to Continent</span>
        </button>
        <div className="text-center">
          <span className="text-[11px] uppercase tracking-widest text-amber-400 font-mono flex items-center justify-center gap-1">
            <Sparkles className="w-3.5 h-3.5" />
            {isArena ? 'Soto Great Spirit Arena Duel' : 'Star Dou Great Forest Hunt'}
          </span>
          <h2 className="text-lg font-cinzel font-bold text-slate-100">
            {target.name}
          </h2>
        </div>
        <div className="text-xs text-emerald-400 font-mono tabular-nums bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
          ● BATTLE ACTIVE
        </div>
      </div>

      {/* Floating Damage Text */}
      <div className="absolute inset-x-0 top-1/3 flex flex-col items-center pointer-events-none z-30">
        {floatingTexts.map(ft => (
          <div
            key={ft.id}
            className={`font-cinzel font-black text-2xl sm:text-4xl animate-bounce drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] ${
              ft.isCrit ? 'scale-125' : ''
            }`}
            style={{ color: ft.color }}
          >
            {ft.text}
          </div>
        ))}
      </div>

      {/* Animated Visual Effects (VFX) */}
      <div className="absolute inset-0 pointer-events-none z-25 flex items-center justify-center">
        {visualEffects.map(vfx => (
          <div key={vfx.id} className="absolute inset-0 flex items-center justify-center">
            {vfx.type === 'slash' && (
              <div className="w-72 h-72 border-t-8 border-amber-400 rounded-full animate-ping shadow-[0_0_40px_#F59E0B]" />
            )}
            {vfx.type === 'slam' && (
              <div className="w-96 h-96 border-4 border-amber-500 rounded-full animate-pulse shadow-[0_0_60px_#F59E0B]" />
            )}
            {vfx.type === 'vines' && (
              <div className="w-80 h-80 border-4 border-dashed border-emerald-400 rounded-full animate-spin shadow-[0_0_40px_#10B981]" />
            )}
            {vfx.type === 'lotus' && (
              <div className="w-96 h-96 bg-red-600/30 rounded-full animate-ping shadow-[0_0_80px_#DC2626]" />
            )}
          </div>
        ))}
      </div>

      {/* Kurukshetra-Style Visual Card Battler Stage */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 my-auto max-w-5xl mx-auto w-full">
        {/* Opponent Card with Animations */}
        <div
          className={`bg-slate-900/85 border-2 rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
            targetHitFlash
              ? 'border-rose-500 bg-rose-950/40 translate-x-2'
              : isTargetAttacking
              ? 'border-amber-400 -translate-y-3 shadow-[0_0_30px_rgba(245,158,11,0.5)]'
              : 'border-slate-800'
          }`}
        >
          <div className="flex items-start gap-5">
            {/* Visual Beast Avatar */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-800 border-2 border-slate-700 overflow-hidden flex items-center justify-center shrink-0 shadow-lg relative group">
              {targetImage ? (
                <img
                  src={targetImage}
                  alt={target.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              ) : (
                <span className="text-4xl">👹</span>
              )}
              {targetHitFlash && (
                <div className="absolute inset-0 bg-rose-500/60 animate-ping" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="font-cinzel font-bold text-slate-100 text-lg sm:text-xl truncate">
                  {target.name}
                </h3>
                {possibleRing && (
                  <span
                    className="text-xs font-mono font-bold px-2.5 py-0.5 rounded border"
                    style={{
                      borderColor: getRingColorHex(possibleRing.tier),
                      color: getRingColorHex(possibleRing.tier),
                    }}
                  >
                    {possibleRing.years.toLocaleString()} Yrs
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {targetSubtitle || 'Primeval Sovereign'}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 font-mono mt-3">
                <span>ATK: {target.attack}</span>
                <span>DEF: {target.defense}</span>
              </div>
            </div>
          </div>

          {/* Opponent Segmented HP Bar */}
          <div className="mt-5 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-rose-400 font-semibold flex items-center gap-1">
                <Heart className="w-3.5 h-3.5" /> Target Health
              </span>
              <span className="text-slate-200 tabular-nums font-bold">
                {Math.round(targetHp)} / {target.maxHp}
              </span>
            </div>
            <div className="h-3.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
              <div
                className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 rounded-full transition-all duration-200"
                style={{ width: `${targetHpPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Player Visual Card with Animated Soul Rings */}
        <div
          className={`bg-slate-900/85 border-2 rounded-3xl p-6 shadow-2xl flex flex-col justify-between transition-all duration-200 relative overflow-hidden ${
            playerHitFlash
              ? 'border-rose-500 bg-rose-950/40 -translate-x-2'
              : isPlayerAttacking
              ? 'border-amber-400 translate-y-3 shadow-[0_0_35px_rgba(245,158,11,0.6)]'
              : isAvatarActive
              ? 'border-amber-400 ring-2 ring-amber-400/50'
              : 'border-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-xs font-mono text-amber-400 font-bold">
                {realm.title} (Rank {player.rank})
              </span>
              <h3 className="font-cinzel font-bold text-slate-100 text-lg sm:text-xl">
                {player.primarySoul.name}
              </h3>
            </div>

            {/* True Avatar Button (Rank 70+) */}
            {player.rank >= 70 && (
              <button
                onClick={handleActivateAvatar}
                disabled={isAvatarActive || avatarCd > 0}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold font-cinzel transition-all ${
                  isAvatarActive
                    ? 'bg-amber-400 text-slate-950 shadow-[0_0_20px_#F59E0B]'
                    : avatarCd > 0
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                }`}
              >
                {isAvatarActive
                  ? `AVATAR (${Math.ceil(avatarTimeRemaining)}s)`
                  : avatarCd > 0
                  ? `CD: ${Math.ceil(avatarCd)}s`
                  : '🔥 MARTIAL SOUL AVATAR'}
              </button>
            )}
          </div>

          {/* Central 3D Animated Halo Display */}
          <div className="py-2">
            <SpiritRingDisplay
              martialSoul={player.primarySoul}
              rings={player.soulRings}
              activeRingSkillId={activeSkillHighlight}
              size="sm"
              isAvatarActive={isAvatarActive}
            />
          </div>

          {/* Player HP & SP Meters */}
          <div className="space-y-2 mt-2">
            {/* HP */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> HP {playerShield > 0 && `(+${playerShield} Shield)`}
                </span>
                <span className="text-slate-200 tabular-nums font-bold">
                  {Math.round(playerHp)} / {player.maxHp}
                </span>
              </div>
              <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transition-all duration-150"
                  style={{ width: `${playerHpPercent}%` }}
                />
              </div>
            </div>

            {/* SP */}
            <div className="space-y-1">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Soul Power (SP)
                </span>
                <span className="text-slate-200 tabular-nums font-bold">
                  {Math.round(playerSp)} / {player.maxSp}
                </span>
              </div>
              <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800 p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 rounded-full transition-all duration-150"
                  style={{ width: `${playerSpPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Deck: Active Soul Skills & Combat Tactics */}
      <div className="relative z-10 max-w-5xl mx-auto w-full mt-4 space-y-3">
        {/* Soul Ring Skills Grid */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
              Soul Skills Arsenal (Click or Tap to Strike)
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Auto SP recovery active
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
            {player.soulRings.length === 0 ? (
              <div className="col-span-full py-4 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                No Soul Rings absorbed yet. Hunt Spirit Beasts in Star Dou Forest to gain your first Ring!
              </div>
            ) : (
              player.soulRings.map(ring => {
                const cdRemaining = skillCooldowns[ring.skill.name] || 0;
                const isOnCd = cdRemaining > 0;
                const notEnoughSp = playerSp < ring.skill.spCost;
                const ringColor = getRingColorHex(ring.tier);

                return (
                  <button
                    key={ring.id}
                    onClick={() => handleUseSoulSkill(ring)}
                    disabled={isOnCd || notEnoughSp}
                    className={`relative p-3 rounded-2xl border text-left transition-all overflow-hidden flex flex-col justify-between ${
                      isOnCd || notEnoughSp
                        ? 'bg-slate-900/60 border-slate-800 opacity-60 cursor-not-allowed'
                        : 'bg-slate-900 hover:bg-slate-850 border-slate-700 active:scale-[0.98] shadow-md hover:border-amber-400'
                    }`}
                    style={{
                      borderColor: isOnCd ? undefined : `${ringColor}66`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{ backgroundColor: ringColor }}
                    />

                    <div className="flex items-start justify-between gap-1 mb-1">
                      <span className="text-xs font-bold text-slate-200 font-cinzel truncate">
                        {ring.skill.name.split(':')[1]?.trim() || ring.skill.name}
                      </span>
                      <span className="text-sm shrink-0">{ring.skill.icon}</span>
                    </div>

                    <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                      {ring.skill.pinyinName}
                    </p>

                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span className="text-cyan-400">{ring.skill.spCost} SP</span>
                      <span>
                        {isOnCd ? `${cdRemaining.toFixed(1)}s` : `${ring.skill.cooldown}s CD`}
                      </span>
                    </div>

                    {/* Cooldown Dark Overlay */}
                    {isOnCd && (
                      <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-xs flex items-center justify-center text-xs font-mono font-bold text-amber-300">
                        {cdRemaining.toFixed(1)}s
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Secondary Tactics: Basic Strike, Tang Sect Hidden Weapon, Ghost Shadow Dodge */}
        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button
            onClick={handleBasicAttack}
            className="flex-1 min-w-[120px] py-3 px-4 bg-slate-850 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold font-cinzel transition-all inline-flex items-center justify-center gap-1.5 shadow"
          >
            <Swords className="w-4 h-4 text-amber-400" />
            <span>Basic Strike</span>
          </button>

          {player.equippedWeapon && (
            <button
              onClick={handleHiddenWeapon}
              disabled={hiddenWeaponCd > 0}
              className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl text-xs font-bold font-cinzel transition-all inline-flex items-center justify-center gap-1.5 border shadow ${
                hiddenWeaponCd > 0
                  ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-purple-950/50 hover:bg-purple-900/60 border-purple-500/50 text-purple-200'
              }`}
            >
              <Crosshair className="w-4 h-4 text-purple-400" />
              <span>
                {player.equippedWeapon.name} {hiddenWeaponCd > 0 ? `(${hiddenWeaponCd.toFixed(1)}s)` : ''}
              </span>
            </button>
          )}

          <button
            onClick={handleDodge}
            disabled={dodgeCd > 0}
            className={`flex-1 min-w-[130px] py-3 px-4 rounded-xl text-xs font-bold font-cinzel transition-all inline-flex items-center justify-center gap-1.5 border shadow ${
              dodgeCd > 0
                ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-950/50 hover:bg-cyan-900/60 border-cyan-500/50 text-cyan-200'
            }`}
          >
            <Shield className="w-4 h-4 text-cyan-400" />
            <span>Ghost Shadow Dodge {dodgeCd > 0 ? `(${dodgeCd.toFixed(1)}s)` : ''}</span>
          </button>
        </div>

        {/* Combat Log Ticker */}
        <div className="h-16 overflow-y-auto bg-slate-950/80 border border-slate-800/80 rounded-xl p-2.5 font-mono text-[11px] text-slate-400 space-y-1">
          {combatLogs.map((log, i) => (
            <div key={i} className="truncate">
              {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
