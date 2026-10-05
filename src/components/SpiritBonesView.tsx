import React from 'react';
import { PlayerStats, SpiritBone, SpiritBoneSlot } from '../types/game';
import { getRingColorHex, getRingGlowStyle } from '../data/martialSouls';
import { sound } from '../utils/audio';
import { Shield, Sparkles, Award, Zap, Activity } from 'lucide-react';

interface SpiritBonesViewProps {
  player: PlayerStats;
  onUnequipBone?: (boneId: string) => void;
}

export const SpiritBonesView: React.FC<SpiritBonesViewProps> = ({ player }) => {
  const slots: { slot: SpiritBoneSlot; label: string; icon: string }[] = [
    { slot: 'head', label: 'Head Bone', icon: '👑' },
    { slot: 'torso', label: 'Torso Bone', icon: '🛡️' },
    { slot: 'left_arm', label: 'Left Arm Bone', icon: '💪' },
    { slot: 'right_arm', label: 'Right Arm Bone', icon: '⚔️' },
    { slot: 'left_leg', label: 'Left Leg Bone', icon: '🦵' },
    { slot: 'right_leg', label: 'Right Leg Bone', icon: '⚡' },
    { slot: 'external', label: 'External Bone (Eight Spider Lances)', icon: '🕷️' },
  ];

  // Aggregate bonus stats from all equipped bones
  const totalBoneHp = player.spiritBones.reduce((acc, b) => acc + b.hpBonus, 0);
  const totalBoneAtk = player.spiritBones.reduce((acc, b) => acc + b.attackBonus, 0);
  const totalBoneDef = player.spiritBones.reduce((acc, b) => acc + b.defenseBonus, 0);
  const totalBoneCrit = player.spiritBones.reduce((acc, b) => acc + b.critBonus, 0);

  return (
    <div className="space-y-6 max-w-7xl mx-auto px-4 sm:px-6 py-6">
      {/* Banner */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-amber-400">
            <Award className="w-4 h-4" />
            <span>SPIRIT BONE SANCTUARY</span>
            <span aria-hidden="true">·</span>
            <span>六大魂骨与外附至宝</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-slate-100">
            Spirit Bones & External Evolution
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            The rare bone treasures left behind by defeated spirit beasts. Fused with flesh and marrow, they grant permanent base attribute surges and sovereign spirit bone domain skills.
          </p>
        </div>

        {/* Aggregated Bone Boost Metrics */}
        <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-1.5 min-w-[240px] text-xs font-mono">
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">
            Aggregated Bone Attunement
          </span>
          <div className="grid grid-cols-2 gap-2 text-slate-300 pt-1">
            <div>HP: <span className="text-emerald-400">+{totalBoneHp}</span></div>
            <div>ATK: <span className="text-rose-400">+{totalBoneAtk}</span></div>
            <div>DEF: <span className="text-cyan-400">+{totalBoneDef}</span></div>
            <div>CRIT: <span className="text-amber-400">+{(totalBoneCrit * 100).toFixed(0)}%</span></div>
          </div>
        </div>
      </div>

      {/* 7 Slots Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {slots.map(s => {
          const equipped = player.spiritBones.find(b => b.slot === s.slot);
          const ringColor = equipped ? getRingColorHex(equipped.tier) : undefined;

          return (
            <div
              key={s.slot}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between space-y-4 shadow ${
                equipped
                  ? 'bg-slate-900/90 border-slate-700'
                  : 'bg-slate-950/50 border-dashed border-slate-800'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{s.icon}</span>
                    <span className="text-xs font-cinzel font-bold text-slate-300">
                      {s.label}
                    </span>
                  </div>
                  {equipped ? (
                    <span
                      className="text-[10px] font-mono px-2 py-0.5 rounded border"
                      style={{
                        borderColor: ringColor,
                        color: ringColor,
                        backgroundColor: `${ringColor}15`,
                      }}
                    >
                      {equipped.years.toLocaleString()} Yrs
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-slate-500">
                      Empty Slot
                    </span>
                  )}
                </div>

                {equipped ? (
                  <div className="mt-3 space-y-2">
                    <h3 className="font-cinzel font-bold text-slate-100 text-sm">
                      {equipped.name}
                    </h3>
                    <p className="text-xs text-purple-300 font-mono">
                      {equipped.chineseName}
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 text-xs font-mono bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                      <span className="text-emerald-400">HP +{equipped.hpBonus}</span>
                      <span className="text-rose-400">ATK +{equipped.attackBonus}</span>
                      <span className="text-cyan-400">DEF +{equipped.defenseBonus}</span>
                      <span className="text-amber-400">CRIT +{(equipped.critBonus * 100).toFixed(0)}%</span>
                    </div>

                    <div className="p-2.5 bg-purple-950/30 rounded-lg border border-purple-900/40 text-xs">
                      <span className="font-bold text-purple-300 block font-cinzel">
                        Active Skill: {equipped.specialSkillName}
                      </span>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {equipped.specialSkillDesc}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-slate-500">
                    <p>No bone fused in this slot.</p>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Hunt 10,000+ year beasts in Star Dou Forest to excavate bone drops.
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
