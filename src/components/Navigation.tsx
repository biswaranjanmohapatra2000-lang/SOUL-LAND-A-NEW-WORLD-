import React from 'react';
import { ActiveTab, PlayerStats } from '../types/game';
import { sound } from '../utils/audio';
import { getRealmInfo } from '../data/martialSouls';
import { fromTotalBronze } from '../utils/currency';
import { Volume2, VolumeX, Sparkles, BookOpen, Coins } from 'lucide-react';

interface NavigationProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  player: PlayerStats;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenHelp: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  player,
  soundEnabled,
  onToggleSound,
  onOpenHelp,
}) => {
  const realm = getRealmInfo(player.rank);
  const totalBronze = player.totalBronzeCoins ?? (player.gold * 1000000);
  const coins = fromTotalBronze(totalBronze);

  const navLinks: { id: ActiveTab; label: string; icon?: string }[] = [
    { id: 'cultivation', label: 'Cultivation (修炼)' },
    { id: 'forest', label: 'Star Dou Forest (星斗森林)' },
    { id: 'arena', label: 'Spirit Arena (斗魂场)' },
    { id: 'mall', label: 'Treasure Mall (天宝阁)' },
    { id: 'quests', label: 'Bounty Quests (悬赏任务)' },
    { id: 'blacksmith', label: 'Blacksmith Guild (铁匠协会)' },
    { id: 'tangsect', label: 'Tang Sect (唐门)' },
    { id: 'spiritbones', label: 'Spirit Bones (魂骨)' },
    { id: 'profile', label: 'Profile (魂师全览)' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playChime(660);
              setActiveTab('cultivation');
            }}
            className="text-lg sm:text-xl font-cinzel font-bold tracking-tight text-amber-300 hover:text-amber-200 transition-colors whitespace-nowrap text-left"
          >
            Soul Land: Douluo Awakening
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  sound.playChime(700);
                  setActiveTab(link.id);
                }}
                className={`relative py-1 text-sm transition-colors whitespace-nowrap ${
                  isActive ? 'text-amber-300 font-semibold' : 'text-slate-400 hover:text-slate-100'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2.5">
          {/* Audio Status & Chime Test Button */}
          <button
            onClick={onToggleSound}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-semibold transition-all flex items-center gap-1.5 shadow ${
              soundEnabled
                ? 'bg-amber-500/15 border-amber-400/80 text-amber-300 hover:bg-amber-500/25'
                : 'bg-rose-950/40 border-rose-800 text-rose-300 hover:bg-rose-900/50'
            }`}
            title="Click to test chime and toggle audio"
          >
            {soundEnabled ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>Audio: ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                <span>Audio: OFF</span>
              </>
            )}
          </button>

          {/* Quick Player Stat Bar Summary */}
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 font-mono tabular-nums bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-amber-400 font-semibold">{realm.title}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>Rank {player.rank}</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-amber-300 font-bold flex items-center gap-1" title={`${coins.gold} Gold, ${coins.silver} Silver, ${coins.copper} Copper, ${coins.bronze} Bronze`}>
              <Coins className="w-3.5 h-3.5 text-amber-400" />
              <span>{coins.gold.toLocaleString()}G {coins.silver}S</span>
            </span>
          </div>

          {/* Codex Guide */}
          <button
            onClick={onOpenHelp}
            className="px-3 py-1.5 text-xs font-semibold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 transition-all rounded-xl whitespace-nowrap shadow flex items-center gap-1 font-cinzel"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Douluo Codex</span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-slate-800/80 bg-slate-950 overflow-x-auto">
        {navLinks.map((link) => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => {
                sound.playChime(600);
                setActiveTab(link.id);
              }}
              className={`px-2.5 py-1 text-xs whitespace-nowrap transition-colors rounded ${
                isActive ? 'bg-amber-400/15 text-amber-300 font-bold' : 'text-slate-400'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
