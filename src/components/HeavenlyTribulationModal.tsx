import React, { useState } from 'react';
import { PlayerStats, ResourceItem } from '../types/game';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Zap, ShieldAlert, Sparkles, AlertTriangle, CheckCircle2, XCircle } from 'lucide-react';

interface HeavenlyTribulationModalProps {
  player: PlayerStats;
  targetRank: number; // e.g. 70, 80, 90, 100
  onSuccess: (newRank: number, bonusAtk: number, bonusDef: number, bonusHp: number) => void;
  onFailure: (damageTaken: number) => void;
  onClose: () => void;
}

export const HeavenlyTribulationModal: React.FC<HeavenlyTribulationModalProps> = ({
  player,
  targetRank,
  onSuccess,
  onFailure,
  onClose,
}) => {
  const [isStriking, setIsStriking] = useState<boolean>(false);
  const [outcome, setOutcome] = useState<'success' | 'failure' | null>(null);
  const [usedTreasureIds, setUsedTreasureIds] = useState<string[]>([]);
  const [flashLightning, setFlashLightning] = useState<boolean>(false);

  // Available tribulation items in player's inventory
  const inventoryTreasures = (player.inventory || []).filter(
    item => item.category === 'tribulation_treasure' && item.quantity > 0
  );

  // Base survival rate is 40% as requested by the user
  const baseChance = 0.40;

  // Calculate bonus chance from selected treasures
  const treasureBonus = usedTreasureIds.reduce((sum, id) => {
    const item = inventoryTreasures.find(t => t.id === id);
    if (!item) return sum;
    if (id.includes('spirit_grass')) return sum + 0.15;
    if (id.includes('foundation')) return sum + 0.20;
    if (id.includes('thunder_fruit')) return sum + 0.30;
    if (id.includes('nine_turn')) return sum + 0.25;
    if (id.includes('dragon_marrow')) return sum + 0.35;
    return sum + (item.tribulationBonus || 0.15);
  }, 0);

  const totalSurvivalChance = Math.min(0.98, baseChance + treasureBonus + (player.tribulationBonusChance || 0));

  const toggleSelectTreasure = (itemId: string) => {
    if (usedTreasureIds.includes(itemId)) {
      setUsedTreasureIds(prev => prev.filter(id => id !== itemId));
    } else {
      setUsedTreasureIds(prev => [...prev, itemId]);
    }
  };

  const handleEndureStrike = () => {
    setIsStriking(true);
    sound.unlock();
    sound.playRingResonance('purple');
    sound.playHammerSlam();

    // Flash screen effect
    setFlashLightning(true);
    setTimeout(() => setFlashLightning(false), 200);
    setTimeout(() => setFlashLightning(true), 450);
    setTimeout(() => setFlashLightning(false), 650);

    setTimeout(() => {
      const roll = Math.random();
      const survived = roll <= totalSurvivalChance;

      setIsStriking(false);
      if (survived) {
        sound.playBreakthrough();
        sound.playRingResonance('gold');
        confetti({ particleCount: 150, spread: 100 });
        setOutcome('success');
      } else {
        sound.playRingResonance('purple');
        setOutcome('failure');
      }
    }, 2400);
  };

  const handleClaimSuccess = () => {
    const bonusHp = 3000 + targetRank * 50;
    const bonusAtk = 250 + targetRank * 4;
    const bonusDef = 160 + targetRank * 3;
    onSuccess(targetRank, bonusAtk, bonusDef, bonusHp);
  };

  const handleAcknowledgeFailure = () => {
    const damage = Math.round(player.maxHp * 0.45);
    onFailure(damage);
  };

  const realmTitle =
    targetRank >= 100
      ? 'God King Divine Tribulation (神王灭世神劫)'
      : targetRank >= 90
      ? 'Titled Douluo Ninth Heavenly Tribulation (封号斗罗九霄天劫)'
      : targetRank >= 80
      ? 'Spirit Douluo Lightning Tribulation (魂斗罗八荒雷劫)'
      : 'Spirit Saint Divine Avatar Tribulation (魂圣七曜天劫)';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md select-none overflow-y-auto">
      {/* Lightning Flash Overlay */}
      {flashLightning && (
        <div className="fixed inset-0 bg-white/90 z-50 pointer-events-none transition-opacity duration-100" />
      )}

      <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-purple-500/80 rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(168,85,247,0.4)] my-8">
        {/* Background Apocalyptic Artwork */}
        <div className="relative h-64 sm:h-72 w-full overflow-hidden">
          <img
            src="/src/assets/images/heavenly_tribulation_strike_1791219011951.jpg"
            alt="Heavenly Tribulation Lightning Strike"
            className={`w-full h-full object-cover transition-transform duration-1000 ${
              isStriking ? 'scale-110 filter brightness-125' : ''
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Glowing Apocalyptic Title */}
          <div className="absolute bottom-4 left-6 right-6 space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-purple-950/80 border border-purple-500 text-purple-300 text-[11px] font-mono font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                HEAVENLY TRIBULATION · 九重紫霄天劫
              </span>
              <span className="text-[11px] font-mono text-amber-400 font-bold">
                Rank {targetRank} Bottleneck
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-cinzel font-black text-slate-100 tracking-wide">
              {realmTitle}
            </h2>
            <p className="text-xs text-purple-200">
              Surviving the heavenly thunder strike requires profound soul power and protective immortal treasures.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {outcome === null && (
            <>
              {/* Survival Probability Radar */}
              <div className="bg-slate-950/80 border border-purple-500/40 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4 text-purple-400" />
                    Calculated Tribulation Survival Rate
                  </span>
                  <span
                    className={`font-black text-base tabular-nums ${
                      totalSurvivalChance >= 0.8
                        ? 'text-emerald-400'
                        : totalSurvivalChance >= 0.6
                        ? 'text-amber-400'
                        : 'text-rose-400 animate-pulse'
                    }`}
                  >
                    {(totalSurvivalChance * 100).toFixed(0)}% Chance
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-3.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      totalSurvivalChance >= 0.8
                        ? 'bg-gradient-to-r from-emerald-500 to-emerald-400'
                        : totalSurvivalChance >= 0.6
                        ? 'bg-gradient-to-r from-amber-500 to-amber-400'
                        : 'bg-gradient-to-r from-rose-600 to-rose-400'
                    }`}
                    style={{ width: `${totalSurvivalChance * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Base Survival Chance: <strong className="text-rose-400">40%</strong></span>
                  <span>Treasures Added: <strong className="text-purple-300">+{(treasureBonus * 100).toFixed(0)}%</strong></span>
                </div>
              </div>

              {/* Protective Treasures Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Select Protective Treasures from Inventory
                  </h4>
                  <span className="text-[11px] font-mono text-slate-400">
                    {inventoryTreasures.length} Available
                  </span>
                </div>

                {inventoryTreasures.length === 0 ? (
                  <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-4 text-center space-y-1">
                    <p className="text-xs text-slate-400">
                      You have no protective tribulation treasures in your inventory.
                    </p>
                    <p className="text-[11px] text-amber-400/90 font-mono">
                      Tip: Obtain Spirit Increasing Grass (+15%), Foundation Building Liquid (+20%), or Three-Pattern Thunder Fruit (+30%) from the Heavenly Mall or Quests!
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
                    {inventoryTreasures.map(item => {
                      const isSelected = usedTreasureIds.includes(item.id);
                      const bonusPercent =
                        item.id.includes('spirit_grass')
                          ? 15
                          : item.id.includes('foundation')
                          ? 20
                          : item.id.includes('thunder_fruit')
                          ? 30
                          : item.id.includes('nine_turn')
                          ? 25
                          : item.id.includes('dragon_marrow')
                          ? 35
                          : Math.round((item.tribulationBonus || 0.15) * 100);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => toggleSelectTreasure(item.id)}
                          className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                            isSelected
                              ? 'bg-purple-950/60 border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.3)] ring-1 ring-purple-400'
                              : 'bg-slate-950/60 border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">{item.icon}</span>
                            <div>
                              <div className="text-xs font-bold text-slate-200">{item.name}</div>
                              <div className="text-[10px] text-emerald-400 font-mono">+{bonusPercent}% Survival</div>
                            </div>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                              isSelected ? 'bg-purple-500 border-purple-400 text-white' : 'border-slate-700'
                            }`}
                          >
                            {isSelected ? '✓' : ''}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  disabled={isStriking}
                  className="flex-1 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono font-bold transition-colors disabled:opacity-50"
                >
                  Retreat & Prepare More
                </button>

                <button
                  type="button"
                  onClick={handleEndureStrike}
                  disabled={isStriking}
                  className="flex-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 hover:from-purple-500 hover:to-indigo-500 text-white font-cinzel font-black text-sm tracking-wider shadow-[0_0_25px_rgba(147,51,234,0.6)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all disabled:opacity-60"
                >
                  <Zap className={`w-4 h-4 text-amber-300 ${isStriking ? 'animate-bounce' : ''}`} />
                  <span>{isStriking ? 'Channeling Heavenly Lightning...' : 'Endure Heavenly Lightning Strike!'}</span>
                </button>
              </div>
            </>
          )}

          {/* Outcome Result Display */}
          {outcome === 'success' && (
            <div className="bg-emerald-950/40 border-2 border-emerald-500/80 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  TRIUMPHANT TRANSCENDENCE · 渡劫成功
                </span>
                <h3 className="text-2xl font-cinzel font-black text-slate-100">
                  Heavenly Tribulation Conquered!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  The violent violet divine thunder tempered your bone marrow and divine soul! You have broken through to <strong>Rank {targetRank}</strong>!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs font-mono py-2 max-w-sm mx-auto bg-slate-950/60 rounded-xl p-3 border border-emerald-800/60">
                <div>
                  <span className="text-slate-400 block text-[10px]">HP Boost</span>
                  <span className="text-emerald-400 font-bold">+{3000 + targetRank * 50}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">ATK Surge</span>
                  <span className="text-rose-400 font-bold">+{250 + targetRank * 4}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">DEF Shield</span>
                  <span className="text-cyan-400 font-bold">+{160 + targetRank * 3}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClaimSuccess}
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-cinzel font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Claim Ascended Realm & Continue Cultivation
              </button>
            </div>
          )}

          {outcome === 'failure' && (
            <div className="bg-rose-950/40 border-2 border-rose-500/80 rounded-2xl p-6 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-rose-500/20 border-2 border-rose-400 mx-auto flex items-center justify-center">
                <XCircle className="w-10 h-10 text-rose-400" />
              </div>
              <div className="space-y-1">
                <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                  TRIBULATION BACKLASH · 渡劫失败遭反噬
                </span>
                <h3 className="text-2xl font-cinzel font-black text-slate-100">
                  Struck by Heavenly Lightning Backlash!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  The ferocious heavenly thunderbolts overwhelmed your body defenses. Your spiritual health suffered severe backlash, but you survived to cultivate another day.
                </p>
              </div>

              <div className="p-3 bg-slate-950/60 rounded-xl border border-rose-800/60 text-xs font-mono text-rose-300 max-w-sm mx-auto">
                Damage Suffered: -{Math.round(player.maxHp * 0.45)} HP. Use healing pills or meditate to recover!
              </div>

              <button
                type="button"
                onClick={handleAcknowledgeFailure}
                className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-cinzel font-bold text-sm rounded-xl shadow-lg transition-all"
              >
                Retreat to Sanctuary to Recover Health
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
