import React from 'react';
import { PlayerStats, TangSectArt, HiddenWeapon } from '../types/game';
import { sound } from '../utils/audio';
import { Sparkles, Hammer, Shield, Crosshair, Award, Check } from 'lucide-react';

interface TangSectViewProps {
  player: PlayerStats;
  onUpgradeArt: (artId: string) => void;
  onCraftWeapon: (weaponId: string) => void;
  onEquipWeapon: (weapon: HiddenWeapon) => void;
}

export const TangSectView: React.FC<TangSectViewProps> = ({
  player,
  onUpgradeArt,
  onCraftWeapon,
  onEquipWeapon,
}) => {
  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Tang Sect Banner */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-purple-400">
            <Sparkles className="w-4 h-4" />
            <span>TANG SECT SANCTUARY</span>
            <span aria-hidden="true">·</span>
            <span>唐门宗祠与机巧暗器</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100">
            Mysterious Heaven Records & Hidden Weapons
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Inherited esoteric techniques from ancient Earth. Cultivate the five supreme secret arts to fortify your spirit channels and forge devastating mechanical hidden weapons capable of slaughtering gods.
          </p>
        </div>

        {/* Currency & Weapon Slot */}
        <div className="flex items-center gap-4 bg-slate-950/80 border border-slate-800 p-4 rounded-xl text-xs font-mono">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase">Equipped Weapon</span>
            <span className="text-amber-300 font-semibold font-cinzel text-sm">
              {player.equippedWeapon ? player.equippedWeapon.name : 'None'}
            </span>
          </div>
          <div className="border-l border-slate-800 pl-4">
            <span className="text-slate-400 block text-[10px] uppercase">Available Gold</span>
            <span className="text-emerald-400 font-semibold tabular-nums text-sm">
              {player.gold} Gold
            </span>
          </div>
        </div>
      </div>

      {/* Part 1: Mysterious Heaven Record - 5 Secret Arts */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-cinzel font-bold text-amber-200">
            01. The Five Tang Sect Secret Arts (玄天宝录)
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Passively augment your combat foundation
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {player.tangSectArts.map(art => {
            const isMax = art.level >= art.maxLevel;
            const canAfford = player.gold >= art.cultivationCost;

            return (
              <div
                key={art.id}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3 hover:border-slate-700 transition-all shadow"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-cinzel font-bold text-slate-100 text-sm">
                        {art.name}
                      </h3>
                      <span className="text-xs text-purple-400 font-mono">
                        {art.chineseName}
                      </span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-300 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/40">
                      Tier {art.level} / {art.maxLevel}
                    </span>
                  </div>

                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    {art.description}
                  </p>

                  <div className="mt-3 p-2 bg-slate-950 rounded-lg border border-slate-800/80 text-[11px] font-mono text-emerald-300">
                    {art.bonusDesc}
                  </div>
                </div>

                <button
                  onClick={() => {
                    sound.playRingResonance('purple');
                    onUpgradeArt(art.id);
                  }}
                  disabled={isMax || !canAfford}
                  className={`w-full py-2.5 rounded-lg text-xs font-semibold font-cinzel tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                    isMax
                      ? 'bg-slate-800/40 text-slate-600 border border-slate-800 cursor-not-allowed'
                      : canAfford
                      ? 'bg-purple-900/50 hover:bg-purple-800/60 text-purple-200 border border-purple-500/40'
                      : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {isMax ? 'Mastered' : `Cultivate (${art.cultivationCost} Gold)`}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 2: Mechanical Hidden Weapons Workshop */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-cinzel font-bold text-amber-200">
            02. Tang Sect Hidden Weapons Arsenal (机巧暗器)
          </h2>
          <span className="text-xs font-mono text-slate-400">
            Instant manual piercing burst during battles
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {player.hiddenWeapons.map(weapon => {
            const isEquipped = player.equippedWeapon?.id === weapon.id;
            const canAfford = player.gold >= weapon.craftCost;

            return (
              <div
                key={weapon.id}
                className={`bg-slate-900/80 border rounded-xl p-4 flex flex-col justify-between space-y-3 transition-all shadow ${
                  isEquipped ? 'border-amber-500/80 bg-slate-900/90' : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-cinzel font-bold text-slate-100 text-sm">
                        {weapon.name}
                      </h3>
                      <span className="text-xs text-amber-400 font-mono">
                        {weapon.chineseName}
                      </span>
                    </div>
                    {weapon.unlocked ? (
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800">
                        FORGED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                        LOCKED
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                    {weapon.description}
                  </p>

                  <div className="grid grid-cols-3 gap-1.5 mt-3 text-[11px] font-mono bg-slate-950 p-2 rounded-lg border border-slate-800/80 text-center">
                    <div>
                      <span className="text-slate-500 block text-[9px]">DMG</span>
                      <span className="text-rose-400 font-bold tabular-nums">{weapon.damage}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">PIERCE</span>
                      <span className="text-cyan-400 font-bold tabular-nums">{weapon.pierce}%</span>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[9px]">CD</span>
                      <span className="text-amber-300 font-bold tabular-nums">{weapon.cooldown}s</span>
                    </div>
                  </div>
                </div>

                {/* Craft or Equip Action */}
                <div>
                  {weapon.unlocked ? (
                    <button
                      onClick={() => {
                        sound.playDartRelease();
                        onEquipWeapon(weapon);
                      }}
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold font-cinzel tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                        isEquipped
                          ? 'bg-amber-400 text-slate-950 font-bold shadow'
                          : 'bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700'
                      }`}
                    >
                      {isEquipped ? <Check className="w-3.5 h-3.5" /> : null}
                      <span>{isEquipped ? 'Equipped in Hand' : 'Equip Weapon'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        sound.playHeavyImpact();
                        onCraftWeapon(weapon.id);
                      }}
                      disabled={!canAfford}
                      className={`w-full py-2.5 rounded-lg text-xs font-semibold font-cinzel tracking-wider uppercase transition-all flex items-center justify-center gap-1.5 ${
                        canAfford
                          ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold shadow'
                          : 'bg-slate-900 text-slate-500 border border-slate-800 cursor-not-allowed'
                      }`}
                    >
                      <Hammer className="w-3.5 h-3.5" />
                      <span>Forge Weapon ({weapon.craftCost} Gold)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
