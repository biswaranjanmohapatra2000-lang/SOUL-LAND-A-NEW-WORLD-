import React from 'react';
import { PlayerStats } from '../types/game';
import { getRealmInfo, getRingColorHex, SOUL_LAND_ERAS } from '../data/martialSouls';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { User, Shield, Award, Sparkles, RefreshCw, Zap, BookOpen } from 'lucide-react';

interface SoulMasterProfileProps {
  player: PlayerStats;
  onResetGame: () => void;
  onAdvanceGodTrial: () => void;
}

const GOD_TRIALS = [
  { stage: 1, title: 'First Trial: Ascend the 333 Sea God Steps', desc: 'Climb against the divine light barrier of Sea God Mountain.' },
  { stage: 2, title: 'Second Trial: Break through the Ring Sea', desc: 'Cross the ferocious waters guarded by the Demon Soul Great White Shark.' },
  { stage: 3, title: 'Third Trial: Tide Refining Body', desc: 'Endure the torrential fury of abyssal tidal waves for 12 hours.' },
  { stage: 4, title: 'Fourth Trial: Slay the Evil Demon Whale', desc: 'Defeat the Deep Sea Demon Whale King in the open ocean.' },
  { stage: 5, title: 'Fifth Trial: Challenge the Seven Pillar Douluos', desc: 'Duel the seven holy guardians of Sea God Island.' },
  { stage: 6, title: 'Sixth Trial: Survive Bo Saixi for One Incense Stick', desc: 'Withstand the attacks of the High Priestess Limit Douluo.' },
  { stage: 7, title: 'Seventh Trial: Unearth the Sea God Trident', desc: 'Extract the 108,000-catty divine trident with pure heart.' },
  { stage: 8, title: 'Eighth Trial: Rebuild All Spirit Rings to Red', desc: 'Reshape spirit rings through divine sea illumination.' },
  { stage: 9, title: 'Final Trial: Sea God Divine Ascension', desc: 'Fuse all divine soul fragments to become the God of the Ocean!' },
];

export const SoulMasterProfile: React.FC<SoulMasterProfileProps> = ({
  player,
  onResetGame,
  onAdvanceGodTrial,
}) => {
  const realm = getRealmInfo(player.rank);
  const currentTrial = GOD_TRIALS[Math.min(player.godTrialStage, GOD_TRIALS.length - 1)];

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Profile Header */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-md">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-amber-500/10 border-2 border-amber-400/60 overflow-hidden shrink-0 shadow-lg relative">
            {player.primarySoul.image ? (
              <img
                src={player.primarySoul.image}
                alt={player.primarySoul.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-4xl">
                {player.primarySoul.type === 'tool' ? '🔨' : '🐉'}
              </div>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <User className="w-3.5 h-3.5" />
              <span>{player.primarySoul.chineseName}</span>
              <span aria-hidden="true">·</span>
              <span>{realm.chinese}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-cinzel font-black text-slate-100">
              {player.name}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Primary: <strong className="text-amber-300">{player.primarySoul.name}</strong>
              {player.secondarySoul && (
                <> · Secondary: <strong className="text-purple-300">{player.secondarySoul.name}</strong></>
              )}
            </p>
          </div>
        </div>

        {/* Quick Reset & Rebirth Option */}
        <button
          onClick={() => {
            if (confirm('Awaken a new Martial Soul and restart your Douluo path?')) {
              onResetGame();
            }
          }}
          className="px-4 py-2.5 bg-slate-900 hover:bg-rose-950/60 border border-slate-800 hover:border-rose-800 text-slate-400 hover:text-rose-200 text-xs font-semibold rounded-2xl transition-all flex items-center gap-2 shadow"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Rebirth / New Soul</span>
        </button>
      </div>

      {/* Sea God Nine Trials Card with Location Artwork */}
      <div className="relative rounded-3xl overflow-hidden border border-cyan-900/60 shadow-2xl p-6 sm:p-8 flex flex-col justify-between group">
        <img
          src="/src/assets/images/location_sea_god_island_1791176607302.jpg"
          alt="Sea God Island"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5 font-bold">
                <Zap className="w-3.5 h-3.5 text-cyan-400" /> DIVINE TRIALS OF SEA GOD ISLAND (海神九考)
              </span>
              <h3 className="text-xl sm:text-2xl font-cinzel font-black text-slate-100 mt-1">
                Stage {player.godTrialStage + 1} / 9: {currentTrial.title}
              </h3>
            </div>
            <span className="text-xs font-mono text-cyan-300 bg-cyan-950/80 px-3.5 py-1.5 rounded-xl border border-cyan-700 backdrop-blur-md self-start sm:self-auto">
              {player.godTrialStage >= 9 ? 'GOD ASCENDED' : `Ascension: ${(player.godTrialStage / 9 * 100).toFixed(0)}%`}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed bg-slate-950/70 p-4 rounded-2xl border border-slate-800/80 backdrop-blur-md">
            {currentTrial.desc}
          </p>

          {player.godTrialStage < 9 && (
            <button
              onClick={() => {
                sound.playRingResonance('gold');
                confetti({ particleCount: 80, spread: 70 });
                onAdvanceGodTrial();
              }}
              disabled={player.rank < (player.godTrialStage + 1) * 11}
              className={`w-full py-4 rounded-2xl text-xs sm:text-sm font-bold font-cinzel uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xl ${
                player.rank >= (player.godTrialStage + 1) * 11
                  ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-black'
                  : 'bg-slate-900/60 text-slate-500 border border-slate-800 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {player.rank >= (player.godTrialStage + 1) * 11
                  ? 'Pass Divine Trial & Absorb Sea God Divine Light'
                  : `Trial Requires Rank ${(player.godTrialStage + 1) * 11}`}
              </span>
            </button>
          )}
        </div>
      </div>

      {/* Personal Inventory & Resource Bag */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-cinzel font-bold text-amber-200">
              Personal Inventory & Beast Resources (储物魂导器)
            </h3>
            <p className="text-xs text-slate-400">
              Materials harvested from spirit beast hunts and quests, ready to be forged at the Blacksmith Guild.
            </p>
          </div>
          <span className="text-xs font-mono text-amber-300 bg-amber-950/40 px-3 py-1.5 rounded-xl border border-amber-800/80 self-start sm:self-auto">
            {player.inventory?.length || 0} Resource Types in Bag
          </span>
        </div>

        {(!player.inventory || player.inventory.length === 0) ? (
          <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl space-y-1">
            <p>Your personal storage bag is currently empty.</p>
            <p className="text-amber-400/80 font-mono">Hunt beasts in the Star Dou Forest or complete commission quests to harvest beast leather, bones, and meat!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {player.inventory.map(item => (
              <div
                key={item.id}
                className="p-3.5 bg-slate-950/80 border border-slate-800 rounded-2xl flex items-center justify-between shadow"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold font-cinzel text-slate-200">{item.name}</h4>
                    <span className="text-[10px] text-amber-400 font-mono block">{item.chineseName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      Category: {item.category}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold font-mono text-cyan-300 block">
                    x{item.quantity}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Sells: {Math.round(item.sellValueInBronze / 10000)}S
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Soul Rings Arsenal Grid */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4 backdrop-blur-md">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-cinzel font-bold text-amber-200">
            Absorbed Soul Rings Configuration
          </h3>
          <span className="text-xs font-mono text-slate-400">
            {player.soulRings.length} / 9 Active Rings
          </span>
        </div>

        {player.soulRings.length === 0 ? (
          <div className="py-12 text-center text-xs text-slate-500 border border-dashed border-slate-800 rounded-2xl">
            No soul rings absorbed yet. Venture into the Star Dou Great Forest to hunt your first spirit beast!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {player.soulRings.map(ring => {
              const ringColor = getRingColorHex(ring.tier);

              return (
                <div
                  key={ring.id}
                  className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 space-y-2 flex flex-col justify-between shadow-lg"
                  style={{ borderLeftColor: ringColor, borderLeftWidth: '5px' }}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                        Ring {ring.ringOrder} · {ring.years.toLocaleString()} Years
                      </span>
                      <h4 className="font-cinzel font-bold text-slate-100 text-sm">
                        {ring.skill.name}
                      </h4>
                      <span className="text-xs text-amber-400/90 font-mono">
                        {ring.skill.pinyinName}
                      </span>
                    </div>
                    <span className="text-2xl">{ring.skill.icon}</span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {ring.skill.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-850">
                    <span>Source: {ring.beastOrigin}</span>
                    <span className="text-cyan-400 font-bold">{ring.skill.spCost} SP</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
