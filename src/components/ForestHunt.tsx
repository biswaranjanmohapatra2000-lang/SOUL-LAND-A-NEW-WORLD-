import React, { useState } from 'react';
import { PlayerStats, SpiritBeast, RingColorTier } from '../types/game';
import { FOREST_ZONES, SPIRIT_BEASTS, BEAST_AGE_CATEGORIES, BEAST_ELEMENTS, getBeastElement, BeastAgeCategory } from '../data/spiritBeasts';
import { getRingColorHex } from '../data/martialSouls';
import { sound } from '../utils/audio';
import { Sparkles, Swords, MapPin, Layers, Award, Shield, Flame, BookOpen } from 'lucide-react';

interface ForestHuntProps {
  player: PlayerStats;
  onSelectBeast: (beast: SpiritBeast) => void;
}

export const ForestHunt: React.FC<ForestHuntProps> = ({ player, onSelectBeast }) => {
  const [browseMode, setBrowseMode] = useState<'zones' | 'ages'>('zones');
  const [selectedZoneId, setSelectedZoneId] = useState<string>('outer_rim');
  const [selectedAgeCategoryId, setSelectedAgeCategoryId] = useState<string>('hundred_year');
  const [selectedTierFilter, setSelectedTierFilter] = useState<'all' | RingColorTier>('all');
  const [selectedElementFilter, setSelectedElementFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const selectedZone = FOREST_ZONES.find(z => z.id === selectedZoneId) || FOREST_ZONES[0];
  const selectedAgeCategory = BEAST_AGE_CATEGORIES.find(c => c.id === selectedAgeCategoryId) || BEAST_AGE_CATEGORIES[1];

  // Base list of beasts depending on browse mode
  const baseBeasts = browseMode === 'zones'
    ? SPIRIT_BEASTS.filter(b => b.zoneId === selectedZoneId)
    : SPIRIT_BEASTS.filter(b => b.years >= selectedAgeCategory.minYears && b.years <= selectedAgeCategory.maxYears);

  const beastsInZone = baseBeasts.filter(b => {
    const matchesTier = selectedTierFilter === 'all' || b.tier === selectedTierFilter;
    const elem = getBeastElement(b);
    const matchesElement = selectedElementFilter === 'all' || elem === selectedElementFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.chineseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.possibleRing.skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesElement && matchesSearch;
  });

  const maxRingsAllowed = Math.floor(player.rank / 10);
  const needsRing = player.soulRings.length < maxRingsAllowed;

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Hero Location Banner */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 p-6 sm:p-8 shadow-2xl min-h-[220px] flex flex-col justify-end group">
        <img
          src={selectedZone.image}
          alt={selectedZone.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30" />

        <div className="relative z-10 max-w-2xl space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <MapPin className="w-4 h-4" />
            <span>EXPEDITION MAP · 猎杀魂兽</span>
            <span aria-hidden="true">·</span>
            <span>{selectedZone.chineseName}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-cinzel font-black text-slate-100">
            {selectedZone.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedZone.description}
          </p>

          {/* Bottleneck Notice */}
          {needsRing ? (
            <div className="mt-3 p-3 bg-amber-950/50 border border-amber-500/50 rounded-2xl flex items-center gap-3 text-xs text-amber-200 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>
                <strong>Cultivation Bottleneck Reached!</strong> Hunt and absorb your {player.soulRings.length + 1}th Soul Ring to breakthrough!
              </span>
            </div>
          ) : (
            <div className="mt-2 text-xs text-slate-400 font-mono">
              Current Soul Rings: {player.soulRings.length} / 9 · Next breakthrough at Rank {(player.soulRings.length + 1) * 10}
            </div>
          )}
        </div>
      </div>

      {/* Mode Switcher: Zones vs Age Categories */}
      <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              sound.playChime(650);
              setBrowseMode('zones');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-cinzel font-bold transition-all border flex items-center gap-2 ${
              browseMode === 'zones'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Expedition Zones (秘境区域)</span>
          </button>

          <button
            onClick={() => {
              sound.playChime(700);
              setBrowseMode('ages');
            }}
            className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-cinzel font-bold transition-all border flex items-center gap-2 ${
              browseMode === 'ages'
                ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.3)]'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Beast Age Hierarchy (魂兽年限全鉴)</span>
          </button>
        </div>

        <span className="hidden sm:inline-block text-xs font-mono text-slate-400">
          Total <strong>{SPIRIT_BEASTS.length}</strong> Canonical Soul Beasts
        </span>
      </div>

      {/* MODE 1: Zone Navigation Tabs */}
      {browseMode === 'zones' && (
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
          {FOREST_ZONES.map(zone => {
            const isSelected = selectedZone.id === zone.id;
            const isLocked = player.rank < zone.rankReq;
            const countInZone = SPIRIT_BEASTS.filter(b => b.zoneId === zone.id).length;

            return (
              <button
                key={zone.id}
                onClick={() => {
                  sound.playChime(550);
                  setSelectedZoneId(zone.id);
                }}
                className={`p-3 rounded-2xl border text-left whitespace-nowrap transition-all flex items-center gap-3 min-w-[220px] backdrop-blur-sm ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-400 text-amber-200 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                  <img src={zone.image} alt={zone.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-cinzel font-bold truncate">{zone.name}</span>
                    <span className="text-[10px] font-mono text-amber-400">({countInZone})</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono block">
                    {zone.chineseName}
                  </span>
                  {isLocked && <span className="text-[10px] text-rose-400 font-mono">Req Rank {zone.rankReq}</span>}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* MODE 2: Beast Age Categories Selector */}
      {browseMode === 'ages' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {BEAST_AGE_CATEGORIES.map(cat => {
              const isSelected = selectedAgeCategory.id === cat.id;
              const countInAge = SPIRIT_BEASTS.filter(b => b.years >= cat.minYears && b.years <= cat.maxYears).length;

              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    sound.playRingResonance(cat.tier);
                    setSelectedAgeCategoryId(cat.id);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between space-y-1.5 ${
                    isSelected
                      ? 'border-2 shadow-lg scale-[1.02]'
                      : 'bg-slate-900/70 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                  style={{
                    borderColor: isSelected ? cat.colorHex : undefined,
                    backgroundColor: isSelected ? `${cat.colorHex}18` : undefined,
                    boxShadow: isSelected ? `0 0 20px ${cat.colorHex}44` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="w-3 h-3 rounded-full border shadow-sm"
                      style={{ backgroundColor: cat.colorHex, borderColor: cat.colorHex }}
                    />
                    <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300">
                      {countInAge} Beasts
                    </span>
                  </div>
                  <h4 className="font-cinzel font-bold text-xs sm:text-sm text-slate-100 truncate">
                    {cat.name}
                  </h4>
                  <span className="text-[10px] font-mono block text-slate-400 truncate">
                    {cat.yearsRange}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Detailed Age Stage Lore & Absorption Guide */}
          <div
            className="p-4 sm:p-5 rounded-3xl border bg-slate-900/90 shadow-xl backdrop-blur-md space-y-2 relative overflow-hidden"
            style={{ borderColor: selectedAgeCategory.colorHex, boxShadow: `0 0 15px ${selectedAgeCategory.colorHex}22` }}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider" style={{ color: selectedAgeCategory.colorHex }}>
                  CANONICAL AGE STAGE · 斗罗大陆年限全鉴
                </span>
                <h3 className="text-lg sm:text-xl font-cinzel font-bold text-slate-100">
                  {selectedAgeCategory.chineseName} ({selectedAgeCategory.yearsRange})
                </h3>
              </div>
              <span className="text-xs font-mono px-3 py-1 rounded-xl border bg-slate-950 self-start sm:self-auto" style={{ borderColor: selectedAgeCategory.colorHex, color: selectedAgeCategory.colorHex }}>
                {selectedAgeCategory.recommendedRank}
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              {selectedAgeCategory.lore}
            </p>
            <div className="text-[11px] font-mono text-slate-400 pt-1 border-t border-slate-800 flex items-center gap-2">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Soul Ring Halo: <strong>{selectedAgeCategory.ringDescription}</strong></span>
            </div>
          </div>
        </div>
      )}

      {/* Element & Attribute Filter Bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {BEAST_ELEMENTS.map(elem => {
            const isSelected = selectedElementFilter === elem.id;
            return (
              <button
                key={elem.id}
                onClick={() => {
                  sound.playChime(620);
                  setSelectedElementFilter(elem.id);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:text-white'
                }`}
              >
                <span>{elem.icon}</span>
                <span>{elem.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tier filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-slate-900/80 border border-slate-800 p-4 rounded-3xl backdrop-blur-sm">
          {/* Tier filter tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'All Tiers', color: 'text-slate-300' },
              { id: 'white', label: '10-Yr (White)', color: 'text-slate-100' },
              { id: 'yellow', label: '100-Yr (Yellow)', color: 'text-yellow-400' },
              { id: 'purple', label: '1,000-Yr (Purple)', color: 'text-purple-400' },
              { id: 'black', label: '10,000-Yr (Black)', color: 'text-indigo-400' },
              { id: 'red', label: '100,000-Yr (Red)', color: 'text-rose-400' },
              { id: 'gold', label: 'Million-Yr (Gold)', color: 'text-amber-400' },
            ].map(tier => (
              <button
                key={tier.id}
                onClick={() => {
                  sound.playChime(600);
                  setSelectedTierFilter(tier.id as any);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold whitespace-nowrap transition-all border ${
                  selectedTierFilter === tier.id
                    ? 'bg-amber-400 text-slate-950 border-amber-300 shadow'
                    : `bg-slate-950/60 border-slate-800 ${tier.color} hover:bg-slate-800`
                }`}
              >
                {tier.label}
              </button>
            ))}
          </div>

          {/* Search input & beast counter */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search beasts or skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-400 transition-colors w-full sm:w-48"
            />
            <span className="text-xs font-mono text-amber-400 whitespace-nowrap shrink-0 bg-slate-950 px-2.5 py-1.5 rounded-xl border border-slate-800">
              {beastsInZone.length} Beast{beastsInZone.length === 1 ? '' : 's'}
            </span>
          </div>
        </div>
      </div>

      {/* Beasts Grid in Selected Zone */}
      {beastsInZone.length === 0 ? (
        <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-3xl text-slate-400 space-y-2">
          <p className="text-sm font-cinzel font-bold text-slate-300">No Spirit Beasts Found</p>
          <p className="text-xs text-slate-500">Try adjusting your tier filter or search query.</p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {beastsInZone.map(beast => {
          const isUnderlevel = player.rank < beast.rankReq;
          const ringColor = getRingColorHex(beast.tier);

          return (
            <div
              key={beast.id}
              className="bg-slate-900/80 border border-slate-800 rounded-3xl p-5 shadow-xl flex flex-col justify-between hover:border-slate-700 transition-all space-y-4 backdrop-blur-sm group"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-slate-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0 shadow-lg relative">
                  {beast.image ? (
                    <img
                      src={beast.image}
                      alt={beast.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <span className="text-4xl">🐉</span>
                  )}
                  <div
                    className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full shadow-sm"
                    style={{ backgroundColor: ringColor }}
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <h3 className="font-cinzel font-bold text-slate-100 text-lg truncate">
                      {beast.name}
                    </h3>
                    <span
                      className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-lg border"
                      style={{
                        borderColor: ringColor,
                        color: ringColor,
                        backgroundColor: `${ringColor}22`,
                      }}
                    >
                      {beast.years.toLocaleString()} Yrs
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 font-medium mt-0.5">
                    {beast.chineseName}
                  </p>

                  {/* Element & Drop Badges */}
                  {(() => {
                    const elemId = getBeastElement(beast);
                    const elemInfo = BEAST_ELEMENTS.find(e => e.id === elemId) || BEAST_ELEMENTS[1];
                    const bronzeReward = Math.round(beast.years * 12);
                    return (
                      <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
                        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${elemInfo.badgeBg} flex items-center gap-1`}>
                          {elemInfo.icon} {elemInfo.chinese}
                        </span>
                        <span className="text-[10px] font-mono text-amber-300 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                          💰 +{bronzeReward >= 10000 ? `${(bronzeReward / 10000).toFixed(0)} Silver` : `${bronzeReward} Bronze`}
                        </span>
                        <span className="text-[10px] font-mono text-emerald-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                          📦 Beast Material Drops
                        </span>
                      </div>
                    );
                  })()}

                  <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                    {beast.description}
                  </p>
                </div>
              </div>

              {/* Beast Stats & Potential Drops */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono bg-slate-950/70 p-3 rounded-2xl border border-slate-800">
                <div className="text-slate-400">
                  <span>HP: </span>
                  <span className="text-slate-200 tabular-nums font-bold">{beast.hp.toLocaleString()}</span>
                </div>
                <div className="text-slate-400">
                  <span>ATK: </span>
                  <span className="text-rose-400 tabular-nums font-bold">{beast.attack}</span>
                </div>
                <div className="text-slate-400">
                  <span>DEF: </span>
                  <span className="text-cyan-400 tabular-nums font-bold">{beast.defense}</span>
                </div>
                <div className="text-purple-400">
                  <span>Bone Drop: </span>
                  <span className="tabular-nums font-bold">{(beast.boneDropChance * 100).toFixed(0)}%</span>
                </div>
              </div>

              {/* Associated Soul Ring Skill Preview */}
              <div className="p-3 bg-slate-950/80 rounded-2xl border border-slate-800 text-xs space-y-1">
                <div className="flex items-center justify-between text-slate-400">
                  <span className="font-bold text-amber-300 font-cinzel">
                    {beast.possibleRing.skill.name}
                  </span>
                  <span className="font-mono text-cyan-400">
                    {beast.possibleRing.skill.spCost} SP
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {beast.possibleRing.skill.description}
                </p>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  sound.playHeavyImpact();
                  onSelectBeast(beast);
                }}
                className={`w-full py-3.5 rounded-2xl text-xs font-bold font-cinzel tracking-wider uppercase transition-all flex items-center justify-center gap-2 shadow-lg ${
                  isUnderlevel
                    ? 'bg-rose-950/60 hover:bg-rose-900/60 text-rose-200 border border-rose-800'
                    : 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>
                  {isUnderlevel ? `High Danger (Req Rank ${beast.rankReq})` : 'Initiate Hunt & Enter Battle'}
                </span>
              </button>
            </div>
          );
        })}
      </div>
      )}
    </div>
  );
};
