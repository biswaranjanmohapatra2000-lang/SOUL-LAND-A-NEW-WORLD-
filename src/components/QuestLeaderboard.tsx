import React, { useState } from 'react';
import { PlayerStats, SoulQuest } from '../types/game';
import { INITIAL_SOUL_QUESTS, BOUNTY_LEADERBOARD } from '../data/quests';
import { fromTotalBronze, formatCurrencyString } from '../utils/currency';
import { sound } from '../utils/audio';
import confetti from 'canvas-confetti';
import { Trophy, Target, Shield, Sparkles, Award, CheckCircle2, ChevronRight, Swords, Compass } from 'lucide-react';

interface QuestLeaderboardProps {
  player: PlayerStats;
  quests: SoulQuest[];
  onClaimQuest: (questId: string) => void;
  onGoToForest: () => void;
  onGoToArena: () => void;
}

export const QuestLeaderboard: React.FC<QuestLeaderboardProps> = ({
  player,
  quests,
  onClaimQuest,
  onGoToForest,
  onGoToArena,
}) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'hunting' | 'gathering' | 'protection' | 'arena'>('all');
  const [activeSubView, setActiveSubView] = useState<'quests' | 'leaderboard'>('quests');

  const filteredQuests = quests.filter(q => {
    if (activeCategory === 'all') return true;
    return q.category === activeCategory;
  });

  const handleClaim = (quest: SoulQuest) => {
    sound.unlock();
    sound.playBreakthrough();
    sound.playChime(880);
    confetti({ particleCount: 80, spread: 70 });
    onClaimQuest(quest.id);
  };

  const completedCount = quests.filter(q => q.completed).length;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-amber-500/40 p-6 sm:p-8 bg-slate-900 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 via-amber-950/30 to-slate-950/80 pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono">
              <Target className="w-3.5 h-3.5" />
              <span>SPIRIT HALL BOUNTY PAVILION · 武魂殿悬赏大殿</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
              Quest Board & Bounty Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              Undertake imperial commissions across Douluo Continent: hunt ferocious spirit beasts, gather rare immortal herbs, escort trade caravans, and duel in the Great Spirit Arena to earn gold, EXP, and blacksmithing resources.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="bg-slate-950/90 border border-amber-500/40 rounded-2xl p-4 shadow-xl flex items-center gap-4 shrink-0">
            <div className="text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Completed</span>
              <span className="text-2xl font-cinzel font-black text-amber-300">
                {completedCount} / {quests.length}
              </span>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="text-center">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">Bounty Rank</span>
              <span className="text-2xl font-cinzel font-black text-cyan-300">
                #7 Continental
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Sub-View Switcher: Quests vs Leaderboard */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          <button
            onClick={() => setActiveSubView('quests')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel font-bold transition-all ${
              activeSubView === 'quests'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            📋 Commission Quests (悬赏任务)
          </button>
          <button
            onClick={() => setActiveSubView('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-cinzel font-bold transition-all ${
              activeSubView === 'leaderboard'
                ? 'bg-amber-400 text-slate-950 shadow'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            🏆 Bounty Leaderboard (大陆排行榜)
          </button>
        </div>

        {/* Category Filters for Quests */}
        {activeSubView === 'quests' && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[
              { id: 'all', label: 'All Quests' },
              { id: 'hunting', label: '🏹 Beast Hunting' },
              { id: 'gathering', label: '🌿 Herb Gathering' },
              { id: 'protection', label: '🛡️ Caravan Escort' },
              { id: 'arena', label: '⚔️ Arena Duels' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border ${
                  activeCategory === cat.id
                    ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: QUESTS BOARD */}
      {activeSubView === 'quests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredQuests.map(quest => {
            const rewardCoins = fromTotalBronze(quest.rewardBronze);
            const isReadyToClaim = !quest.completed && quest.currentCount >= quest.targetCount;
            const progressPercent = Math.min(100, (quest.currentCount / quest.targetCount) * 100);

            return (
              <div
                key={quest.id}
                className={`bg-slate-900/90 border rounded-3xl p-5 shadow-xl flex flex-col justify-between space-y-4 backdrop-blur-md transition-all ${
                  quest.completed
                    ? 'border-emerald-500/40 opacity-75'
                    : isReadyToClaim
                    ? 'border-amber-400 ring-2 ring-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                    : 'border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Category Badge & Rank Req */}
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-lg border uppercase ${
                        quest.category === 'hunting'
                          ? 'bg-rose-500/15 border-rose-500/60 text-rose-300'
                          : quest.category === 'gathering'
                          ? 'bg-emerald-500/15 border-emerald-500/60 text-emerald-300'
                          : quest.category === 'protection'
                          ? 'bg-blue-500/15 border-blue-500/60 text-blue-300'
                          : 'bg-amber-500/15 border-amber-500/60 text-amber-300'
                      }`}
                    >
                      {quest.category} Commission
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">
                      Req. Rank {quest.rankReq}+
                    </span>
                  </div>

                  {/* Title & Chinese */}
                  <div>
                    <h3 className="font-cinzel font-bold text-slate-100 text-base">
                      {quest.title}
                    </h3>
                    <span className="text-xs font-mono text-amber-400/90 block">
                      {quest.chineseTitle}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed font-sans">
                    {quest.description}
                  </p>

                  {/* Progress Tracker */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-slate-400">Objective Progress</span>
                      <span className="font-bold text-amber-300 tabular-nums">
                        {quest.currentCount} / {quest.targetCount}
                      </span>
                    </div>
                    <div className="h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                      <div
                        className="h-full bg-gradient-to-r from-amber-500 to-amber-300 rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>

                  {/* Rewards Breakdown */}
                  <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800/80 space-y-1.5">
                    <span className="text-[10px] font-mono text-slate-400 uppercase font-bold block">
                      Commission Rewards:
                    </span>
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
                      <span className="text-amber-300 font-bold">
                        💰 {rewardCoins.gold > 0 ? `${rewardCoins.gold} Gold ` : ''}
                        {rewardCoins.silver > 0 ? `${rewardCoins.silver} Silver` : `${rewardCoins.bronze} Bronze`}
                      </span>
                      <span className="text-cyan-300 font-bold">
                        ⚡ +{quest.rewardExp} EXP
                      </span>
                    </div>

                    {quest.rewardItems && quest.rewardItems.length > 0 && (
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        {quest.rewardItems.map((r, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-mono px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-300"
                          >
                            📦 {r.name} x{r.count}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Button */}
                <div className="pt-2">
                  {quest.completed ? (
                    <div className="py-2.5 text-center text-xs font-mono font-bold text-emerald-400 flex items-center justify-center gap-1.5 bg-emerald-950/30 rounded-xl border border-emerald-800/50">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Commission Completed & Claimed</span>
                    </div>
                  ) : isReadyToClaim ? (
                    <button
                      type="button"
                      onClick={() => handleClaim(quest)}
                      className="w-full py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-cinzel font-black text-xs sm:text-sm tracking-wider shadow-[0_0_20px_rgba(245,158,11,0.5)] active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-pulse"
                    >
                      <Sparkles className="w-4 h-4 text-slate-950" />
                      <span>Claim Commission Rewards!</span>
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      {quest.category === 'hunting' || quest.category === 'gathering' ? (
                        <button
                          type="button"
                          onClick={onGoToForest}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Compass className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Hunt in Forest to Complete</span>
                        </button>
                      ) : quest.category === 'arena' ? (
                        <button
                          type="button"
                          onClick={onGoToArena}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                        >
                          <Swords className="w-3.5 h-3.5 text-rose-400" />
                          <span>Enter Arena to Complete</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onGoToForest}
                          className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition-colors flex items-center justify-center gap-1.5"
                        >
                          <span>Undertake Commission in Forest</span>
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: CONTINENTAL BOUNTY LEADERBOARD */}
      {activeSubView === 'leaderboard' && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 shadow-2xl backdrop-blur-md space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-cinzel font-bold text-slate-100 flex items-center gap-2">
                <Trophy className="w-5 h-5 text-amber-400" />
                Continental Bounty Grandmaster Rankings
              </h3>
              <p className="text-xs text-slate-400">
                The most celebrated commission bounty hunters across the Heaven Dou and Star Luo Empires.
              </p>
            </div>
            <span className="text-xs font-mono text-amber-300 bg-amber-950/40 px-3 py-1 rounded-xl border border-amber-800">
              Season 1 Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase text-[11px]">
                  <th className="py-3 px-4">Rank</th>
                  <th className="py-3 px-4">Spirit Master</th>
                  <th className="py-3 px-4">Title / Association</th>
                  <th className="py-3 px-4 text-right">Bounty Points</th>
                  <th className="py-3 px-4 text-right">Total Coins Earned</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {BOUNTY_LEADERBOARD.map(master => (
                  <tr key={master.rank} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-3 px-4 font-bold">
                      {master.rank === 1 ? '🥇 #1' : master.rank === 2 ? '🥈 #2' : master.rank === 3 ? '🥉 #3' : `#${master.rank}`}
                    </td>
                    <td className="py-3 px-4 font-cinzel font-bold text-slate-200">
                      {master.name}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {master.title}
                    </td>
                    <td className="py-3 px-4 text-right text-amber-400 font-bold tabular-nums">
                      {master.score.toLocaleString()} pts
                    </td>
                    <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                      {master.coinEarned}
                    </td>
                  </tr>
                ))}

                {/* Player Row */}
                <tr className="bg-amber-500/10 border-t-2 border-amber-400/50">
                  <td className="py-3 px-4 font-bold text-amber-300">
                    #7
                  </td>
                  <td className="py-3 px-4 font-cinzel font-black text-amber-200">
                    {player.name} (You)
                  </td>
                  <td className="py-3 px-4 text-slate-300">
                    {player.primarySoul.name} · Rank {player.rank}
                  </td>
                  <td className="py-3 px-4 text-right text-amber-300 font-bold tabular-nums">
                    {(completedCount * 450 + player.arenaRankPoints).toLocaleString()} pts
                  </td>
                  <td className="py-3 px-4 text-right text-emerald-400 font-bold">
                    {formatCurrencyString(player.totalBronzeCoins ?? player.gold * 1000000)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
