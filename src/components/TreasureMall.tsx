import React, { useState } from 'react';
import { PlayerStats, ResourceItem } from '../types/game';
import { MALL_TREASURES, MallTreasureItem } from '../data/treasureMall';
import { fromTotalBronze, formatCurrencyString } from '../utils/currency';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Sparkles, ShoppingBag, Zap, Shield, Flame, Filter, Coins, Check } from 'lucide-react';

interface TreasureMallProps {
  player: PlayerStats;
  onPurchaseItem: (item: ResourceItem, costBronze: number, expGain?: number, statGain?: { hp?: number; attack?: number; defense?: number }) => void;
  onGoToArena: () => void;
  onGoToForest: () => void;
}

export const TreasureMall: React.FC<TreasureMallProps> = ({
  player,
  onPurchaseItem,
  onGoToArena,
  onGoToForest,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'tribulation' | 'herb' | 'pill' | 'ore'>('all');
  const [purchasedId, setPurchasedId] = useState<string | null>(null);

  const totalBronze = player.totalBronzeCoins ?? (player.gold * 1000000);
  const currency = fromTotalBronze(totalBronze);

  const filteredItems = MALL_TREASURES.filter(item => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'tribulation') return item.category === 'tribulation_treasure';
    if (selectedCategory === 'herb') return item.category === 'immortal_herb';
    if (selectedCategory === 'pill') return item.category === 'cultivation_pill';
    if (selectedCategory === 'ore') return item.category === 'ore_metal';
    return true;
  });

  const handleBuy = (item: MallTreasureItem) => {
    if (totalBronze < item.costBronze) {
      sound.playRingResonance('purple');
      alert(`Insufficient funds! This treasure costs ${formatCurrencyString(item.costBronze)}. Win bouts in the Great Spirit Arena or hunt beasts in Star Dou Forest to earn more coins!`);
      return;
    }

    sound.unlock();
    sound.playChime(880);
    sound.playHammerSlam();
    confetti({ particleCount: 60, spread: 70 });

    setPurchasedId(item.id);
    setTimeout(() => setPurchasedId(null), 1800);

    onPurchaseItem(
      item.resourceYield,
      item.costBronze,
      item.cultivationBonus,
      item.statBonus
    );
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 p-6 sm:p-8 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-slate-950/80 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>DOULUO TREASURE PAVILION · 斗罗天宝阁</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
              Heavenly & Earthly Treasures Mall
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Procure rare immortal herbs from the Ice and Fire Yin Yang Well, Heavenly Tribulation protective treasures (Spirit Increasing Grass, Foundation Building Liquid, Three-Pattern Thunder Fruit), and divine forging ores.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-[11px] font-mono text-slate-400">
              <span>Earn coins exclusively by:</span>
              <button
                onClick={onGoToArena}
                className="text-amber-400 hover:text-amber-300 underline font-bold"
              >
                ⚔️ Great Spirit Arena Duels
              </button>
              <span>·</span>
              <button
                onClick={onGoToForest}
                className="text-emerald-400 hover:text-emerald-300 underline font-bold"
              >
                🌲 Star Dou Forest Hunts
              </button>
            </div>
          </div>

          {/* Canonical 4-Coin Currency Display */}
          <div className="bg-slate-950/90 border border-amber-500/50 rounded-2xl p-4 shadow-xl space-y-2 shrink-0 md:min-w-[260px]">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-300">
              <Coins className="w-4 h-4 text-amber-400" />
              <span>SOUL LAND WALLET (魂币钱庄)</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-1">
              <div className="p-2 rounded-xl bg-slate-900 border border-amber-500/30">
                <span className="text-[10px] text-amber-400 block font-bold">Gold (金币)</span>
                <span className="text-base font-black text-amber-300 tabular-nums">
                  {currency.gold.toLocaleString()}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-700">
                <span className="text-[10px] text-slate-300 block font-bold">Silver (银币)</span>
                <span className="text-base font-black text-slate-200 tabular-nums">
                  {currency.silver}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-amber-700/50">
                <span className="text-[10px] text-amber-600 block font-bold">Copper (铜币)</span>
                <span className="text-sm font-bold text-amber-500 tabular-nums">
                  {currency.copper}
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-[10px] text-slate-500 block font-bold">Bronze (魂币)</span>
                <span className="text-sm font-bold text-slate-400 tabular-nums">
                  {currency.bronze}
                </span>
              </div>
            </div>
            <div className="text-[10px] text-slate-500 font-mono text-center pt-1 border-t border-slate-800">
              Ratio: 100 Bronze = 1 Copper = 1/100 Silver = 1/10,000 Gold
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Treasures (全部宝物)' },
          { id: 'tribulation', label: '⚡ Tribulation Treasures (渡劫神药)' },
          { id: 'herb', label: '🌿 Immortal Herbs (冰火仙品)' },
          { id: 'pill', label: '💊 Cultivation Pills (聚灵丹药)' },
          { id: 'ore', label: '🔩 Blacksmith Ores (精炼神铁)' },
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id as any)}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-cinzel font-bold whitespace-nowrap transition-all border ${
              selectedCategory === cat.id
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Treasures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredItems.map(item => {
          const canAfford = totalBronze >= item.costBronze;
          const isJustBought = purchasedId === item.id;
          const costCurrency = fromTotalBronze(item.costBronze);

          const borderColor =
            item.rarity === 'divine'
              ? 'border-amber-400/80 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
              : item.rarity === 'legendary'
              ? 'border-purple-500/80 shadow-[0_0_16px_rgba(168,85,247,0.2)]'
              : item.rarity === 'epic'
              ? 'border-blue-500/60'
              : 'border-slate-800';

          return (
            <div
              key={item.id}
              className={`bg-slate-900/90 border rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-md transition-all hover:scale-[1.01] ${borderColor}`}
            >
              <div className="space-y-3">
                {/* Top Row: Icon & Tag */}
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-center text-2xl shadow">
                    {item.icon}
                  </div>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-xl border uppercase ${
                      item.rarity === 'divine'
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                        : item.rarity === 'legendary'
                        ? 'bg-purple-500/20 border-purple-400 text-purple-300'
                        : item.rarity === 'epic'
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300'
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}
                  >
                    {item.rarity}
                  </span>
                </div>

                {/* Name & Chinese */}
                <div>
                  <h3 className="font-cinzel font-bold text-slate-100 text-base">
                    {item.name}
                  </h3>
                  <span className="text-xs font-mono text-amber-400/90 block">
                    {item.chineseName}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans line-clamp-2">
                  {item.description}
                </p>

                {/* Effect Badge */}
                <div className="p-2.5 rounded-xl bg-slate-950/80 border border-slate-800/80 text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.effectText}</span>
                </div>
              </div>

              {/* Price & Buy Button */}
              <div className="pt-3 border-t border-slate-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-400">Price:</span>
                  <span className="font-bold text-amber-300 flex items-center gap-1">
                    {costCurrency.gold > 0 && <span>{costCurrency.gold} Gold</span>}
                    {costCurrency.silver > 0 && <span>{costCurrency.silver} Silver</span>}
                    {costCurrency.gold === 0 && costCurrency.silver === 0 && <span>{costCurrency.bronze} Bronze</span>}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => handleBuy(item)}
                  disabled={!canAfford}
                  className={`w-full py-3 rounded-2xl text-xs sm:text-sm font-cinzel font-bold transition-all flex items-center justify-center gap-2 ${
                    isJustBought
                      ? 'bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
                      : canAfford
                      ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.3)] active:scale-[0.98]'
                      : 'bg-slate-800/50 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  {isJustBought ? (
                    <>
                      <Check className="w-4 h-4 stroke-[3]" />
                      <span>Purchased to Inventory!</span>
                    </>
                  ) : canAfford ? (
                    <>
                      <Coins className="w-4 h-4 text-slate-950" />
                      <span>Purchase Treasure</span>
                    </>
                  ) : (
                    <span>Insufficient Coins</span>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
