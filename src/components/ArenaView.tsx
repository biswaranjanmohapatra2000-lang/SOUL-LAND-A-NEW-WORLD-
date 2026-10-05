import React from 'react';
import { PlayerStats, ArenaOpponent } from '../types/game';
import { ARENA_MASTERS } from '../data/arenaMasters';
import { sound } from '../utils/audio';
import { Trophy, Swords, Coins, Sparkles } from 'lucide-react';

interface ArenaViewProps {
  player: PlayerStats;
  onChallengeMaster: (master: ArenaOpponent) => void;
}

export const ArenaView: React.FC<ArenaViewProps> = ({ player, onChallengeMaster }) => {
  const getBadgeTitle = (pts: number) => {
    if (pts >= 7000) return { title: 'Douluo Sovereign', color: 'text-amber-400 border-amber-500 bg-amber-950/40' };
    if (pts >= 5000) return { title: 'Diamond Spirit Master', color: 'text-cyan-400 border-cyan-500 bg-cyan-950/40' };
    if (pts >= 3500) return { title: 'Black Gold Master', color: 'text-indigo-400 border-indigo-500 bg-indigo-950/40' };
    if (pts >= 2000) return { title: 'Purple Gold Master', color: 'text-purple-400 border-purple-500 bg-purple-950/40' };
    if (pts >= 1000) return { title: 'Gold Spirit Master', color: 'text-amber-300 border-amber-400 bg-amber-950/30' };
    if (pts >= 500) return { title: 'Silver Spirit Master', color: 'text-slate-300 border-slate-400 bg-slate-800/40' };
    if (pts >= 200) return { title: 'Copper Spirit Master', color: 'text-amber-600 border-amber-700 bg-amber-950/20' };
    return { title: 'Iron Spirit Master', color: 'text-slate-400 border-slate-700 bg-slate-900' };
  };

  const badge = getBadgeTitle(player.arenaRankPoints);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Header Banner with Real Arena Background */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 p-6 sm:p-8 shadow-2xl min-h-[220px] flex flex-col justify-end group">
        <img
          src="/src/assets/images/kurukshetra_arena_bg_1791145456156.jpg"
          alt="Soto Great Spirit Arena"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/40" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-amber-400">
              <Trophy className="w-4 h-4" />
              <span>SOTO GREAT SPIRIT ARENA · 索托大魂斗场</span>
              <span aria-hidden="true">·</span>
              <span>KURUKSHETRA DUEL BATTLEFIELD</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
              Continental Spirit Master Tournament
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Duel legendary Titled Douluos and God Kings with cinematic visual strikes, avatar cutscenes, and battle sound effects!
            </p>
          </div>

          {/* Current Arena Glory Tier Card */}
          <div className="bg-slate-950/85 backdrop-blur-md border border-slate-800 p-4 rounded-2xl text-center space-y-1.5 min-w-[220px] shadow-xl">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
              Current Glory Badge
            </span>
            <div className={`px-3 py-1 rounded-xl border text-xs font-cinzel font-bold ${badge.color}`}>
              {badge.title}
            </div>
            <p className="text-xs font-mono text-amber-400 tabular-nums font-bold">
              {player.arenaRankPoints} Glory Points
            </p>
          </div>
        </div>
      </div>

      {/* Duel Opponents Grid with Real Character Art */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARENA_MASTERS.map(master => {
          const isChallenging = master.rank > player.rank + 15;

          return (
            <div
              key={master.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 backdrop-blur-sm group"
            >
              <div>
                <div className="flex items-start gap-4">
                  {/* Master Portrait */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden shrink-0 shadow-lg">
                    <img
                      src={master.image}
                      alt={master.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base sm:text-lg font-cinzel font-bold text-slate-100 truncate">
                        {master.name}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-amber-400 block mt-0.5">
                      {master.title} · Rank {master.rank}
                    </span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-800 inline-block mt-1">
                      {master.realmName} · {master.ringsCount} Rings
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 italic mt-3 bg-slate-950/70 p-2.5 rounded-xl border border-slate-800/80 leading-relaxed">
                  {master.dialogue}
                </p>

                {/* Opponent Attributes */}
                <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/80 p-2.5 rounded-xl border border-slate-800/80 mt-3">
                  <div className="text-slate-400">
                    <span>HP: </span>
                    <span className="text-slate-200 tabular-nums font-bold">{master.hp.toLocaleString()}</span>
                  </div>
                  <div className="text-slate-400">
                    <span>ATK: </span>
                    <span className="text-rose-400 tabular-nums font-bold">{master.attack}</span>
                  </div>
                  <div className="text-slate-400">
                    <span>DEF: </span>
                    <span className="text-cyan-400 tabular-nums font-bold">{master.defense}</span>
                  </div>
                  <div className="text-slate-400">
                    <span>Rings: </span>
                    <span className="text-amber-400 tabular-nums font-bold">{master.ringsCount}</span>
                  </div>
                </div>

                {/* Victory Rewards Preview */}
                <div className="mt-3 flex items-center justify-between text-xs font-mono text-slate-400 pt-1">
                  <span className="text-emerald-400 flex items-center gap-1 font-bold">
                    <Coins className="w-3.5 h-3.5" /> +{master.rewards.gold} Gold
                  </span>
                  <span className="text-cyan-400">
                    +{master.rewards.exp} Exp
                  </span>
                  <span className="text-purple-400 font-bold">
                    +{master.rewards.crystals} Crystals
                  </span>
                </div>
              </div>

              {/* Challenge Button */}
              <button
                onClick={() => {
                  sound.playHeavyImpact();
                  onChallengeMaster(master);
                }}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold font-cinzel tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isChallenging
                    ? 'bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800'
                    : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>
                  {isChallenging ? 'Underdog Duel (High Risk)' : 'Enter Duel & Clash'}
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
