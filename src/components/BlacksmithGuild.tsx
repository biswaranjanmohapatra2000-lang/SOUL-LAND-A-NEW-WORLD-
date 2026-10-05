import React, { useState } from 'react';
import { PlayerStats, ForgingRecipe, ResourceItem, BlacksmithRank } from '../types/game';
import { BLACKSMITH_RANKS, FORGING_RECIPES } from '../data/blacksmith';
import { fromTotalBronze, formatCurrencyString } from '../utils/currency';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Hammer, Shield, Swords, Sparkles, Award, Coins, Flame, ChevronRight, Check } from 'lucide-react';

interface BlacksmithGuildProps {
  player: PlayerStats;
  onForgeItem: (recipe: ForgingRecipe, item: ResourceItem, expGain: number) => void;
  onSellResource: (itemId: string, count: number, bronzeEarned: number) => void;
  onEquipItem: (item: ResourceItem) => void;
  onGoToForest: () => void;
}

export const BlacksmithGuild: React.FC<BlacksmithGuildProps> = ({
  player,
  onForgeItem,
  onSellResource,
  onEquipItem,
  onGoToForest,
}) => {
  const [selectedSlot, setSelectedSlot] = useState<'all' | 'armor' | 'weapon' | 'accessory'>('all');
  const [isForging, setIsForging] = useState<boolean>(false);
  const [activeForgingRecipeId, setActiveForgingRecipeId] = useState<string | null>(null);

  const totalBronze = player.totalBronzeCoins ?? (player.gold * 1000000);
  const currency = fromTotalBronze(totalBronze);

  const currentRankInfo =
    BLACKSMITH_RANKS.find(r => r.rank === player.blacksmithRank) || BLACKSMITH_RANKS[0];

  const currentRankIndex = BLACKSMITH_RANKS.findIndex(r => r.rank === player.blacksmithRank);
  const nextRankInfo = BLACKSMITH_RANKS[currentRankIndex + 1];

  const expNeeded = nextRankInfo ? nextRankInfo.minExp : currentRankInfo.minExp;
  const progressPercent = nextRankInfo
    ? Math.min(100, (player.blacksmithExp / nextRankInfo.minExp) * 100)
    : 100;

  // Inventory material counts helper
  const getMaterialCount = (matId: string): number => {
    const item = (player.inventory || []).find(i => i.id === matId);
    return item ? item.quantity : 0;
  };

  const filteredRecipes = FORGING_RECIPES.filter(recipe => {
    if (selectedSlot === 'all') return true;
    return recipe.slot === selectedSlot;
  });

  const handleStartForging = (recipe: ForgingRecipe) => {
    // Check materials
    const missingMat = recipe.requiredMaterials.find(m => getMaterialCount(m.id) < m.count);
    if (missingMat) {
      sound.playRingResonance('purple');
      alert(`Missing material: ${missingMat.name} (Need ${missingMat.count}, have ${getMaterialCount(missingMat.id)}). Hunt beasts in Star Dou Forest to collect beast materials!`);
      return;
    }

    if (totalBronze < recipe.costBronze) {
      sound.playRingResonance('purple');
      alert(`Insufficient coins for forging fee! Required: ${formatCurrencyString(recipe.costBronze)}`);
      return;
    }

    setIsForging(true);
    setActiveForgingRecipeId(recipe.id);
    sound.unlock();
    sound.playHammerSlam();

    setTimeout(() => {
      sound.playHammerSlam();
    }, 600);

    setTimeout(() => {
      sound.playBreakthrough();
      sound.playChime(880);
      confetti({ particleCount: 70, spread: 80 });

      setIsForging(false);
      setActiveForgingRecipeId(null);

      const craftedItem: ResourceItem = {
        id: `forged_${recipe.id}_${Date.now()}`,
        name: recipe.name,
        chineseName: recipe.chineseName,
        category: 'equipment',
        description: recipe.description,
        quantity: 1,
        icon: recipe.slot === 'weapon' ? '⚔️' : recipe.slot === 'armor' ? '🛡️' : '💍',
        rarity: recipe.minRank.includes('Divine') ? 'divine' : recipe.minRank.includes('Grandmaster') ? 'legendary' : 'epic',
        sellValueInBronze: Math.round(recipe.costBronze * 1.5),
        equipStats: recipe.stats,
      };

      onForgeItem(recipe, craftedItem, 80 + currentRankIndex * 40);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Blacksmith Guild Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 p-6 sm:p-8 bg-slate-900 shadow-2xl">
        <img
          src="/src/assets/images/blacksmith_guild_forge_1791218997186.jpg"
          alt="Divine Blacksmith Guild Forge"
          className="absolute inset-0 w-full h-full object-cover opacity-35 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Hammer className="w-3.5 h-3.5 text-amber-400" />
              <span>BLACKSMITH GUILD OF GENGXIN CITY · 庚辛城铁匠协会</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
              Divine Foundry & Weapon Forge
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Founded by Divine Craftsman Lou Gao and elevated by Tang San's Clear Sky hammer techniques. Melt beast bones, cold iron, and deep sea silver to forge indestructible armors and lethal hidden weapons.
            </p>
          </div>

          {/* Blacksmith Rank Card */}
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 shadow-xl space-y-2 shrink-0 md:min-w-[260px]">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Craftsman Rank</span>
              <span className="font-bold text-amber-300 flex items-center gap-1">
                {currentRankInfo.icon} {currentRankInfo.rank}
              </span>
            </div>
            <div className="text-sm font-cinzel font-bold text-amber-200">
              {currentRankInfo.chineseTitle}
            </div>

            {/* EXP Bar */}
            <div className="space-y-1 pt-1">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>Forging EXP</span>
                <span className="text-amber-300 tabular-nums">
                  {player.blacksmithExp} / {expNeeded} EXP
                </span>
              </div>
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <p className="text-[10px] text-slate-400 leading-tight pt-1">
              {currentRankInfo.perkDescription}
            </p>
          </div>
        </div>
      </div>

      {/* Slots Filter Buttons */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {[
            { id: 'all', label: 'All Blueprints (全部图纸)' },
            { id: 'armor', label: '🛡️ Heavy Armors (防御重铠)' },
            { id: 'weapon', label: '⚔️ Battle Weapons (破阵神兵)' },
            { id: 'accessory', label: '💍 Talismans & Charms (辟邪宝符)' },
          ].map(slot => (
            <button
              key={slot.id}
              onClick={() => setSelectedSlot(slot.id as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-cinzel font-bold whitespace-nowrap transition-all border ${
                selectedSlot === slot.id
                  ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              {slot.label}
            </button>
          ))}
        </div>

        {/* Quick link to Forest */}
        <button
          onClick={onGoToForest}
          className="text-xs font-mono text-amber-300 hover:text-amber-200 flex items-center gap-1 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800"
        >
          <span>🌲 Hunt Beasts for Skin & Bone</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Forging Blueprints Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map(recipe => {
          const isActivelyForging = isForging && activeForgingRecipeId === recipe.id;
          const costCoins = fromTotalBronze(recipe.costBronze);

          // Check if player has all materials
          const hasMaterials = recipe.requiredMaterials.every(
            m => getMaterialCount(m.id) >= m.count
          );
          const canAfford = totalBronze >= recipe.costBronze;

          return (
            <div
              key={recipe.id}
              className="bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-md transition-all"
            >
              <div className="space-y-3">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shadow">
                    {recipe.slot === 'weapon' ? '⚔️' : recipe.slot === 'armor' ? '🛡️' : '💍'}
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-lg border border-slate-700 bg-slate-950/80 text-amber-300">
                    {recipe.minRank}
                  </span>
                </div>

                <div>
                  <h3 className="font-cinzel font-bold text-slate-100 text-base">
                    {recipe.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-400/90 block">
                    {recipe.chineseName}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                  {recipe.description}
                </p>

                {/* Stat Bonuses */}
                <div className="flex flex-wrap gap-2 text-[11px] font-mono">
                  {recipe.stats.attack && (
                    <span className="px-2 py-0.5 rounded-md bg-rose-950/50 border border-rose-800 text-rose-300">
                      +{recipe.stats.attack} ATK
                    </span>
                  )}
                  {recipe.stats.defense && (
                    <span className="px-2 py-0.5 rounded-md bg-cyan-950/50 border border-cyan-800 text-cyan-300">
                      +{recipe.stats.defense} DEF
                    </span>
                  )}
                  {recipe.stats.hp && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-950/50 border border-emerald-800 text-emerald-300">
                      +{recipe.stats.hp} HP
                    </span>
                  )}
                  {recipe.stats.critRate && (
                    <span className="px-2 py-0.5 rounded-md bg-amber-950/50 border border-amber-800 text-amber-300">
                      +{(recipe.stats.critRate * 100).toFixed(0)}% Crit
                    </span>
                  )}
                </div>

                {/* Required Materials */}
                <div className="space-y-1.5 pt-2 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                    Forging Materials Required:
                  </span>
                  <div className="space-y-1">
                    {recipe.requiredMaterials.map(mat => {
                      const countHave = getMaterialCount(mat.id);
                      const isEnough = countHave >= mat.count;

                      return (
                        <div
                          key={mat.id}
                          className="flex items-center justify-between text-xs font-mono p-1.5 rounded-lg bg-slate-950/60 border border-slate-800/80"
                        >
                          <span className="text-slate-300 truncate">{mat.name}</span>
                          <span
                            className={`font-bold tabular-nums shrink-0 ml-2 ${
                              isEnough ? 'text-emerald-400' : 'text-rose-400'
                            }`}
                          >
                            {countHave} / {mat.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Forging Fee:</span>
                  <span className="text-amber-300 font-bold">
                    {costCoins.gold > 0 ? `${costCoins.gold} Gold ` : ''}
                    {costCoins.silver > 0 ? `${costCoins.silver} Silver` : `${costCoins.bronze} Bronze`}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartForging(recipe)}
                  disabled={!hasMaterials || !canAfford || isForging}
                  className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
                    isActivelyForging
                      ? 'bg-amber-500 text-slate-950 animate-pulse'
                      : hasMaterials && canAfford
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98]'
                      : 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Hammer className={`w-4 h-4 ${isActivelyForging ? 'animate-spin' : ''}`} />
                  <span>
                    {isActivelyForging
                      ? 'Tempering Metal & Imbuing Soul...'
                      : hasMaterials && canAfford
                      ? 'Forge Item (铸造装备)'
                      : !hasMaterials
                      ? 'Missing Materials (Hunt in Forest)'
                      : 'Insufficient Coins'}
                  </span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Guild Market: Sell Unneeded Materials for Canonical Coins */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base sm:text-lg font-cinzel font-bold text-slate-100 flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              Blacksmith Guild Market & Scrap Recycling (材料回收与兑换)
            </h3>
            <p className="text-xs text-slate-400">
              Sell extra beast hides, bones, and ores to the Guild Treasury to instantly earn Gold, Silver, and Copper coins.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { id: 'beast_skin', name: 'Beast Leather (兽皮)', value: 15000 }, // 15 Silver
            { id: 'beast_bone', name: 'Beast Bone (兽骨)', value: 25000 }, // 25 Silver
            { id: 'beast_meat', name: 'Beast Meat (兽肉)', value: 10000 }, // 10 Silver
            { id: 'cold_iron', name: 'Refined Steel (精铁)', value: 2500000 }, // 2.5 Gold
          ].map(res => {
            const count = getMaterialCount(res.id);
            const coins = fromTotalBronze(res.value);

            return (
              <div
                key={res.id}
                className="p-3 bg-slate-950/70 border border-slate-800 rounded-2xl flex items-center justify-between"
              >
                <div>
                  <span className="text-xs font-bold text-slate-200 block">{res.name}</span>
                  <span className="text-[11px] font-mono text-amber-300">
                    Sells for: {coins.gold > 0 ? `${coins.gold}G ` : ''}{coins.silver}S
                  </span>
                  <span className="text-[10px] text-slate-400 block font-mono">In Bag: {count}</span>
                </div>

                <button
                  type="button"
                  disabled={count <= 0}
                  onClick={() => {
                    sound.unlock();
                    sound.playChime(660);
                    onSellResource(res.id, 1, res.value);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-mono font-bold transition-all disabled:opacity-40 disabled:pointer-events-none"
                >
                  Sell 1
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
