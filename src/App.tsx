import React, { useState, useEffect, useCallback } from 'react';
import {
  PlayerStats,
  ActiveTab,
  MartialSoul,
  SpiritBeast,
  ArenaOpponent,
  SoulRing,
  SpiritBone,
  HiddenWeapon,
  ResourceItem,
  SoulQuest,
  ForgingRecipe,
} from './types/game';
import { MARTIAL_SOULS } from './data/martialSouls';
import { INITIAL_TANG_SECT_ARTS, INITIAL_HIDDEN_WEAPONS } from './data/tangSect';
import { INITIAL_SOUL_QUESTS } from './data/quests';
import { fromTotalBronze } from './utils/currency';
import { Navigation } from './components/Navigation';
import { CultivationSanctuary } from './components/CultivationSanctuary';
import { ForestHunt } from './components/ForestHunt';
import { ArenaView } from './components/ArenaView';
import { TreasureMall } from './components/TreasureMall';
import { QuestLeaderboard } from './components/QuestLeaderboard';
import { BlacksmithGuild } from './components/BlacksmithGuild';
import { TangSectView } from './components/TangSectView';
import { SpiritBonesView } from './components/SpiritBonesView';
import { SoulMasterProfile } from './components/SoulMasterProfile';
import { BattleView } from './components/BattleView';
import { RingAbsorptionModal } from './components/RingAbsorptionModal';
import { MartialSoulAwakening } from './components/MartialSoulAwakening';
import { DouluoCodexModal } from './components/DouluoCodexModal';
import { HeavenlyTribulationModal } from './components/HeavenlyTribulationModal';
import { SoulLandMusicPlayer } from './components/SoulLandMusicPlayer';
import { sound } from './utils/audio';
import confetti from 'canvas-confetti';

const STORAGE_KEY = 'soul_land_douluo_save_v6';

export const CANONICAL_ELDER_RINGS: SoulRing[] = [
  {
    id: 'initial_ring_1',
    ringOrder: 1,
    years: 423,
    tier: 'yellow',
    beastOrigin: 'Datura Snake (曼陀罗蛇)',
    skill: {
      name: 'First Soul Skill: Soul Entanglement',
      pinyinName: '第一魂技 · 蓝银缠绕',
      description: 'Summons rapid spirit vines to bind the target, dealing 180% damage and stunning for 1.8 seconds.',
      cooldown: 5,
      spCost: 20,
      damageMultiplier: 1.8,
      effectType: 'control',
      controlDuration: 1.8,
      icon: '🔗',
    },
  },
  {
    id: 'initial_ring_2',
    ringOrder: 2,
    years: 2100,
    tier: 'purple',
    beastOrigin: 'Ghost Shadow Bamboo (鬼影修竹)',
    skill: {
      name: 'Second Soul Skill: Parasitic Rupture',
      pinyinName: '第二魂技 · 寄生破灭',
      description: 'Detonates dormant spirit seeds embedded in the enemy, dealing 210% damage and granting a 15% shield.',
      cooldown: 6,
      spCost: 25,
      damageMultiplier: 2.1,
      effectType: 'shield',
      shieldAmount: 260,
      icon: '🌿',
    },
  },
  {
    id: 'initial_ring_3',
    ringOrder: 3,
    years: 4500,
    tier: 'purple',
    beastOrigin: 'Ghost Tiger (幽冥鬼虎)',
    skill: {
      name: 'Third Soul Skill: Phantom Gale Strike',
      pinyinName: '第三魂技 · 幽冥撕裂',
      description: 'Rips through space with lethal momentum, dealing 280% damage with guaranteed critical strike.',
      cooldown: 7,
      spCost: 35,
      damageMultiplier: 2.8,
      effectType: 'burst',
      icon: '🌪️',
    },
  },
];

export default function App() {
  const [isAwakened, setIsAwakened] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return !!saved;
    } catch {
      return false;
    }
  });

  const [player, setPlayer] = useState<PlayerStats>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Self-heal / migration: If rank >= 30, guarantee all 3 Spirit Elder rings are present!
        if (parsed.rank >= 30) {
          if (!parsed.soulRings) parsed.soulRings = [];
          while (parsed.soulRings.length < 3) {
            const nextIdx = parsed.soulRings.length;
            parsed.soulRings.push(CANONICAL_ELDER_RINGS[nextIdx] || CANONICAL_ELDER_RINGS[2]);
          }
        }

        // Initialize inventory and totalBronzeCoins if missing
        if (!parsed.inventory) parsed.inventory = [];
        if (parsed.totalBronzeCoins === undefined) {
          parsed.totalBronzeCoins = (parsed.gold || 8500) * 1000000;
        }
        if (!parsed.blacksmithRank) parsed.blacksmithRank = 'Apprentice';
        if (parsed.blacksmithExp === undefined) parsed.blacksmithExp = 0;
        if (parsed.tribulationSurvivedCount === undefined) parsed.tribulationSurvivedCount = 0;
        if (parsed.tribulationBonusChance === undefined) parsed.tribulationBonusChance = 0;

        return parsed;
      }
    } catch {
      // Fallback
    }

    const defaultSoul = MARTIAL_SOULS[0]; // Clear Sky Hammer
    return {
      name: 'Tang San',
      rank: 35, // Spirit Elder (魂尊 - 3 Rings Active)
      currentExp: 420,
      maxExp: 1000,
      hp: defaultSoul.baseHp + 2400,
      maxHp: defaultSoul.baseHp + 2400,
      sp: 240,
      maxSp: 240,
      attack: defaultSoul.baseAttack + 260,
      defense: defaultSoul.baseDefense + 140,
      critRate: 0.22,
      evasion: 0.12,
      speed: defaultSoul.baseSpeed + 12,
      gold: 8500,
      totalBronzeCoins: 8500 * 1000000,
      soulCrystals: 65,
      primarySoul: defaultSoul,
      activeSoulIndex: 0,
      soulRings: [
        {
          id: 'initial_ring_1',
          ringOrder: 1,
          years: 423,
          tier: 'yellow',
          beastOrigin: 'Datura Snake',
          skill: {
            name: 'First Soul Skill: Soul Entanglement',
            pinyinName: '第一魂技 · 蓝银缠绕',
            description: 'Summons rapid spirit vines to bind the target, dealing 180% damage and stunning for 1.8 seconds.',
            cooldown: 5,
            spCost: 20,
            damageMultiplier: 1.8,
            effectType: 'control',
            controlDuration: 1.8,
            icon: '🔗',
          },
        },
        {
          id: 'initial_ring_2',
          ringOrder: 2,
          years: 2100,
          tier: 'purple',
          beastOrigin: 'Ghost Shadow Bamboo',
          skill: {
            name: 'Second Soul Skill: Parasitic Rupture',
            pinyinName: '第二魂技 · 寄生破灭',
            description: 'Detonates dormant spirit seeds embedded in the enemy, dealing 210% damage and granting a 15% shield.',
            cooldown: 6,
            spCost: 25,
            damageMultiplier: 2.1,
            effectType: 'shield',
            shieldAmount: 260,
            icon: '🌿',
          },
        },
        {
          id: 'initial_ring_3',
          ringOrder: 3,
          years: 4500,
          tier: 'purple',
          beastOrigin: 'Ghost Tiger',
          skill: {
            name: 'Third Soul Skill: Phantom Gale Strike',
            pinyinName: '第三魂技 · 幽冥撕裂',
            description: 'Rips through space with lethal momentum, dealing 280% damage with guaranteed critical strike.',
            cooldown: 7,
            spCost: 35,
            damageMultiplier: 2.8,
            effectType: 'burst',
            icon: '🌪️',
          },
        },
      ],
      spiritBones: [],
      tangSectArts: INITIAL_TANG_SECT_ARTS,
      hiddenWeapons: INITIAL_HIDDEN_WEAPONS,
      equippedWeapon: INITIAL_HIDDEN_WEAPONS[0],
      unlockedZones: ['outer_rim', 'thousand_woods', 'lake_of_life'],
      arenaRankPoints: 1250,
      godTrialStage: 1,
      inGameMonths: 180, // Age 15 (Classic Shrek Academy youth)
      inventory: [
        {
          id: 'beast_skin',
          name: 'Spirit Beast Leather (魂兽厚皮)',
          chineseName: '魂兽厚皮',
          category: 'beast_material',
          description: 'Supple leather harvested from forest spirit beasts.',
          quantity: 6,
          icon: '🛡️',
          rarity: 'common',
          sellValueInBronze: 15000,
        },
        {
          id: 'beast_bone',
          name: 'Hardened Beast Bone (坚硬兽骨)',
          chineseName: '坚硬兽骨',
          category: 'beast_material',
          description: 'Dense bone for weapon and armor crafting.',
          quantity: 4,
          icon: '🦴',
          rarity: 'common',
          sellValueInBronze: 25000,
        },
        {
          id: 'beast_meat',
          name: 'Spirit Beast Meat (灵气兽肉)',
          chineseName: '灵气兽肉',
          category: 'beast_material',
          description: 'Nutritious meat full of essence.',
          quantity: 8,
          icon: '🥩',
          rarity: 'common',
          sellValueInBronze: 10000,
        },
        {
          id: 'spirit_grass',
          name: 'Spirit Increasing Grass (聚灵草)',
          chineseName: '聚灵草',
          category: 'tribulation_treasure',
          description: 'Increases Heavenly Tribulation survival rate by 15%.',
          quantity: 2,
          icon: '🌿',
          rarity: 'rare',
          sellValueInBronze: 25000000,
          tribulationBonus: 0.15,
        },
      ],
      blacksmithRank: 'Apprentice',
      blacksmithExp: 120,
      tribulationSurvivedCount: 0,
      tribulationBonusChance: 0,
    };
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('cultivation');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(sound.isEnabled());
  const [showCodex, setShowCodex] = useState<boolean>(false);
  const [breakthroughReactionActive, setBreakthroughReactionActive] = useState<boolean>(false);
  const [tribulationTargetRank, setTribulationTargetRank] = useState<number | null>(null);
  const [quests, setQuests] = useState<SoulQuest[]>(() => INITIAL_SOUL_QUESTS);

  // Time Flow Ticker: 1 real-world minute = 1 Douluo Continent month (12 minutes = 1 year)
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayer(prev => ({
        ...prev,
        inGameMonths: (prev.inGameMonths ?? 72) + 1,
      }));
    }, 60000); // 1 real-world minute = 1 Douluo month
    return () => clearInterval(timer);
  }, []);

  // Self-heal / Canon Enforcer: Spirit Elder (Rank 30+) always possesses 3 Soul Rings
  const handleSyncElderRings = () => {
    setPlayer(prev => {
      const updated = [...(prev.soulRings || [])];
      while (updated.length < 3) {
        const nextIdx = updated.length;
        updated.push(CANONICAL_ELDER_RINGS[nextIdx] || CANONICAL_ELDER_RINGS[2]);
      }
      return {
        ...prev,
        soulRings: updated,
      };
    });
  };

  useEffect(() => {
    if (player.rank >= 30 && (!player.soulRings || player.soulRings.length < 3)) {
      handleSyncElderRings();
    }
  }, [player.rank, player.soulRings?.length]);

  // Active Combat Session
  const [currentBattle, setCurrentBattle] = useState<{
    target: SpiritBeast | ArenaOpponent;
    isArena: boolean;
  } | null>(null);

  // Active Soul Ring Absorption Session
  const [absorptionData, setAbsorptionData] = useState<{
    ring: SoulRing;
    droppedBone?: SpiritBone;
  } | null>(null);

  // Save to localStorage
  useEffect(() => {
    if (isAwakened) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(player));
      } catch {
        // Ignore quota
      }
    }
  }, [player, isAwakened]);

  // Audio Toggle
  const handleToggleSound = () => {
    const newState = sound.toggleSound();
    setSoundEnabled(newState);
  };

  // Awakening handler
  const handleCompleteAwakening = (
    soul: MartialSoul,
    name: string,
    secondarySoul?: MartialSoul,
    innateRank: number = 10
  ) => {
    const initialPlayer: PlayerStats = {
      name,
      rank: innateRank,
      currentExp: 100,
      maxExp: 100,
      hp: soul.baseHp + (secondarySoul ? 400 : 0),
      maxHp: soul.baseHp + (secondarySoul ? 400 : 0),
      sp: 120,
      maxSp: 120,
      attack: soul.baseAttack + (secondarySoul ? 45 : 0),
      defense: soul.baseDefense + (secondarySoul ? 30 : 0),
      critRate: 0.15,
      evasion: 0.08,
      speed: soul.baseSpeed,
      gold: 600,
      totalBronzeCoins: 600 * 1000000,
      soulCrystals: 5,
      primarySoul: soul,
      secondarySoul: secondarySoul,
      activeSoulIndex: 0,
      soulRings: [],
      spiritBones: [],
      tangSectArts: INITIAL_TANG_SECT_ARTS,
      hiddenWeapons: INITIAL_HIDDEN_WEAPONS,
      equippedWeapon: INITIAL_HIDDEN_WEAPONS[0],
      unlockedZones: ['holy_soul_woods', 'outer_rim'],
      arenaRankPoints: 120,
      godTrialStage: 0,
      inGameMonths: 72, // Age 6: Awakened by Su Yuntao in Holy Soul Village
      inventory: [
        {
          id: 'beast_meat',
          name: 'Spirit Beast Meat (灵气兽肉)',
          chineseName: '灵气兽肉',
          category: 'beast_material',
          description: 'Nutritious meat full of essence.',
          quantity: 3,
          icon: '🥩',
          rarity: 'common',
          sellValueInBronze: 10000,
        },
      ],
      blacksmithRank: 'Apprentice',
      blacksmithExp: 0,
      tribulationSurvivedCount: 0,
      tribulationBonusChance: 0,
    };

    setPlayer(initialPlayer);
    setIsAwakened(true);
    setActiveTab('cultivation');
    sound.startBGM();
  };

  // Meditate / Qi gathering
  const handleMeditate = useCallback((amount?: number) => {
    const gain = amount !== undefined ? amount : 50 + Math.floor(Math.random() * 30);
    setPlayer(prev => {
      const nextExp = Math.min(prev.maxExp, prev.currentExp + gain);
      const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + (amount ? 0 : 15000);
      return {
        ...prev,
        currentExp: nextExp,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        hp: prev.maxHp,
        sp: prev.maxSp,
      };
    });
  }, []);

  // Realm Breakthrough
  const handleBreakthrough = useCallback(() => {
    setBreakthroughReactionActive(true);
    setTimeout(() => setBreakthroughReactionActive(false), 3800);

    setPlayer(prev => {
      const newRank = prev.rank + 1;
      const hpMultiplier = 1.08;
      const atkMultiplier = 1.07;
      const defMultiplier = 1.06;

      const newMaxHp = Math.round(prev.maxHp * hpMultiplier);
      const newMaxSp = prev.maxSp + 15;
      const newAtk = Math.round(prev.attack * atkMultiplier);
      const newDef = Math.round(prev.defense * defMultiplier);
      const newMaxExp = Math.round(prev.maxExp * 1.25);

      return {
        ...prev,
        rank: newRank,
        currentExp: 0,
        maxExp: newMaxExp,
        hp: newMaxHp,
        maxHp: newMaxHp,
        sp: newMaxSp,
        maxSp: newMaxSp,
        attack: newAtk,
        defense: newDef,
      };
    });
  }, []);

  // Time Advance (Fast-Forward Meditation)
  const handleAdvanceTime = useCallback((months: number) => {
    setPlayer(prev => ({
      ...prev,
      inGameMonths: (prev.inGameMonths ?? 72) + months,
    }));
  }, []);

  // Switch Active Soul (Twin Martial Souls)
  const handleSwitchActiveSoul = useCallback(() => {
    setPlayer(prev => ({
      ...prev,
      activeSoulIndex: prev.activeSoulIndex === 0 ? 1 : 0,
    }));
  }, []);

  // Awaken Twin Martial Soul
  const handleAwakenSecondarySoul = useCallback((secondary: MartialSoul) => {
    setPlayer(prev => ({
      ...prev,
      secondarySoul: secondary,
      maxHp: prev.maxHp + 400,
      attack: prev.attack + 45,
      defense: prev.defense + 30,
    }));
  }, []);

  // Herb Bonus Handler
  const handleApplyHerbBonus = useCallback((stats: { hp?: number; attack?: number; defense?: number; critRate?: number }) => {
    setPlayer(prev => ({
      ...prev,
      hp: prev.hp + (stats.hp || 0),
      maxHp: prev.maxHp + (stats.hp || 0),
      attack: prev.attack + (stats.attack || 0),
      defense: prev.defense + (stats.defense || 0),
      critRate: prev.critRate + (stats.critRate || 0),
    }));
  }, []);

  // Pill Bonus Handler
  const handleApplyPillBonus = useCallback((bonus: { hp?: number; attack?: number; defense?: number; exp?: number }) => {
    setPlayer(prev => ({
      ...prev,
      hp: prev.hp + (bonus.hp || 0),
      maxHp: prev.maxHp + (bonus.hp || 0),
      attack: prev.attack + (bonus.attack || 0),
      defense: prev.defense + (bonus.defense || 0),
      currentExp: Math.min(prev.maxExp, prev.currentExp + (bonus.exp || 0)),
    }));
  }, []);

  // Start Beast Hunt Battle
  const handleSelectBeast = (beast: SpiritBeast) => {
    sound.startBGM();
    setCurrentBattle({
      target: beast,
      isArena: false,
    });
  };

  // Start Arena Duel Battle
  const handleChallengeMaster = (master: ArenaOpponent) => {
    sound.startBGM();
    setCurrentBattle({
      target: master,
      isArena: true,
    });
  };

  // Battle Victory Callback
  const handleBattleVictory = (target: SpiritBeast | ArenaOpponent) => {
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.5 },
    });

    if (currentBattle?.isArena) {
      const master = target as ArenaOpponent;
      const bronzeWon = master.rewards.gold * 1000000;

      setPlayer(prev => {
        const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + bronzeWon;
        return {
          ...prev,
          totalBronzeCoins: nextBronze,
          gold: Math.floor(nextBronze / 1000000),
          soulCrystals: prev.soulCrystals + master.rewards.crystals,
          arenaRankPoints: prev.arenaRankPoints + 150,
          currentExp: Math.min(prev.maxExp, prev.currentExp + master.rewards.exp),
          hp: prev.maxHp,
          sp: prev.maxSp,
        };
      });

      // Update Arena quests
      setQuests(prev =>
        prev.map(q =>
          q.category === 'arena' && !q.completed
            ? { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1) }
            : q
        )
      );

      sound.playBreakthrough();
      setCurrentBattle(null);
    } else {
      const beast = target as SpiritBeast;
      const dropBone = Math.random() < beast.boneDropChance ? beast.droppedBone : undefined;
      const bronzeDrop = Math.round(beast.years * 12);
      const droppedSkinCount = Math.floor(1 + Math.random() * 3);
      const droppedBoneCount = Math.floor(1 + Math.random() * 2);
      const droppedMeatCount = Math.floor(1 + Math.random() * 3);

      setPlayer(prev => {
        const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + bronzeDrop;
        const currentInv = [...(prev.inventory || [])];

        const addResource = (id: string, name: string, count: number, icon: string, value: number) => {
          const idx = currentInv.findIndex(i => i.id === id);
          if (idx >= 0) {
            currentInv[idx] = { ...currentInv[idx], quantity: currentInv[idx].quantity + count };
          } else {
            currentInv.push({
              id,
              name,
              chineseName: name,
              category: 'beast_material',
              description: `Material harvested from ${beast.name}`,
              quantity: count,
              icon,
              rarity: 'common',
              sellValueInBronze: value,
            });
          }
        };

        addResource('beast_skin', 'Spirit Beast Leather (魂兽厚皮)', droppedSkinCount, '🛡️', 15000);
        addResource('beast_bone', 'Hardened Beast Bone (坚硬兽骨)', droppedBoneCount, '🦴', 25000);
        addResource('beast_meat', 'Spirit Beast Meat (灵气兽肉)', droppedMeatCount, '🥩', 10000);

        return {
          ...prev,
          totalBronzeCoins: nextBronze,
          gold: Math.floor(nextBronze / 1000000),
          inventory: currentInv,
        };
      });

      // Update hunting quests
      setQuests(prev =>
        prev.map(q => {
          if (q.category === 'hunting' && !q.completed) {
            if (q.id === 'quest_datura_snake' && beast.id.includes('datura')) {
              return { ...q, currentCount: q.currentCount + 1 };
            }
            if (q.id === 'quest_ghost_tiger' && beast.id.includes('ghost_tiger')) {
              return { ...q, currentCount: q.currentCount + 1 };
            }
            if (q.id === 'quest_man_faced_spider' && beast.id.includes('spider')) {
              return { ...q, currentCount: q.currentCount + 1 };
            }
            return { ...q, currentCount: Math.min(q.targetCount, q.currentCount + 1) };
          }
          return q;
        })
      );

      setCurrentBattle(null);
      setAbsorptionData({
        ring: beast.possibleRing,
        droppedBone: dropBone,
      });
    }
  };

  // Battle Defeat Callback
  const handleBattleDefeat = () => {
    sound.playRingResonance('purple');
    alert('Defeated in battle! Your soul power depleted. You have retreated to the sanctuary to recover.');
    setPlayer(prev => ({
      ...prev,
      hp: prev.maxHp,
      sp: prev.maxSp,
    }));
    setCurrentBattle(null);
  };

  // Soul Ring Absorption Success
  const handleRingSuccess = (ring: SoulRing, bone?: SpiritBone) => {
    confetti({
      particleCount: 110,
      spread: 90,
      origin: { y: 0.5 },
    });

    setPlayer(prev => {
      const existingRings = prev.soulRings.filter(r => r.ringOrder !== ring.ringOrder);
      const newRings = [...existingRings, ring].sort((a, b) => a.ringOrder - b.ringOrder);

      const ringStatMultiplier = ring.tier === 'gold' ? 350 : ring.tier === 'red' ? 220 : ring.tier === 'black' ? 120 : ring.tier === 'purple' ? 60 : 30;

      let updatedBones = [...prev.spiritBones];
      let boneHp = 0;
      let boneAtk = 0;
      let boneDef = 0;
      let boneCrit = 0;

      if (bone) {
        updatedBones = updatedBones.filter(b => b.slot !== bone.slot);
        updatedBones.push(bone);
        boneHp = bone.hpBonus;
        boneAtk = bone.attackBonus;
        boneDef = bone.defenseBonus;
        boneCrit = bone.critBonus;
      }

      return {
        ...prev,
        soulRings: newRings,
        spiritBones: updatedBones,
        rank: prev.rank + 1,
        currentExp: 0,
        maxHp: prev.maxHp + ringStatMultiplier * 4 + boneHp,
        hp: prev.maxHp + ringStatMultiplier * 4 + boneHp,
        attack: prev.attack + Math.round(ringStatMultiplier * 0.8) + boneAtk,
        defense: prev.defense + Math.round(ringStatMultiplier * 0.5) + boneDef,
        critRate: prev.critRate + boneCrit,
      };
    });

    setBreakthroughReactionActive(true);
    setTimeout(() => setBreakthroughReactionActive(false), 3800);

    setAbsorptionData(null);
    setActiveTab('cultivation');
  };

  // Tang Sect Upgrades
  const handleUpgradeArt = (artId: string) => {
    setPlayer(prev => {
      const art = prev.tangSectArts.find(a => a.id === artId);
      if (!art || prev.gold < art.cultivationCost || art.level >= art.maxLevel) return prev;

      const newLevel = art.level + 1;
      const updatedArts = prev.tangSectArts.map(a => (a.id === artId ? { ...a, level: newLevel } : a));

      let critDelta = 0;
      let evasionDelta = 0;
      let defPercent = 0;

      if (artId === 'purple_demon_eyes') critDelta = 0.05;
      if (artId === 'ghost_shadow_track') evasionDelta = 0.03;
      if (artId === 'mystic_jade_hands') defPercent = 0.06;

      const nextBronze = Math.max(0, (prev.totalBronzeCoins ?? prev.gold * 1000000) - art.cultivationCost * 1000000);

      return {
        ...prev,
        gold: Math.floor(nextBronze / 1000000),
        totalBronzeCoins: nextBronze,
        tangSectArts: updatedArts,
        critRate: prev.critRate + critDelta,
        evasion: prev.evasion + evasionDelta,
        defense: Math.round(prev.defense * (1 + defPercent)),
        maxSp: prev.maxSp + 15,
      };
    });
  };

  // Tang Sect Weapons
  const handleCraftWeapon = (weaponId: string) => {
    setPlayer(prev => {
      const weapon = prev.hiddenWeapons.find(w => w.id === weaponId);
      if (!weapon || prev.gold < weapon.craftCost) return prev;

      const updatedWeapons = prev.hiddenWeapons.map(w =>
        w.id === weaponId ? { ...w, unlocked: true } : w
      );

      const nextBronze = Math.max(0, (prev.totalBronzeCoins ?? prev.gold * 1000000) - weapon.craftCost * 1000000);

      return {
        ...prev,
        gold: Math.floor(nextBronze / 1000000),
        totalBronzeCoins: nextBronze,
        hiddenWeapons: updatedWeapons,
        equippedWeapon: { ...weapon, unlocked: true },
      };
    });
  };

  const handleEquipWeapon = (weapon: HiddenWeapon) => {
    setPlayer(prev => ({
      ...prev,
      equippedWeapon: weapon,
    }));
  };

  // Sea God Divine Trial Advance
  const handleAdvanceGodTrial = () => {
    setPlayer(prev => {
      const nextStage = prev.godTrialStage + 1;
      sound.playBreakthrough();
      confetti({ particleCount: 80, spread: 70 });
      const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + 3000 * 1000000;
      return {
        ...prev,
        godTrialStage: nextStage,
        maxHp: prev.maxHp + 1500,
        hp: prev.maxHp + 1500,
        attack: prev.attack + 180,
        defense: prev.defense + 120,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        soulCrystals: prev.soulCrystals + 50,
      };
    });
  };

  // Mall Purchase Handler
  const handlePurchaseMallItem = (
    item: ResourceItem,
    costBronze: number,
    expGain?: number,
    statGain?: { hp?: number; attack?: number; defense?: number; critRate?: number }
  ) => {
    setPlayer(prev => {
      const nextBronze = Math.max(0, (prev.totalBronzeCoins ?? prev.gold * 1000000) - costBronze);
      const currentInv = [...(prev.inventory || [])];
      const existingIdx = currentInv.findIndex(i => i.id === item.id);
      if (existingIdx >= 0) {
        currentInv[existingIdx] = {
          ...currentInv[existingIdx],
          quantity: currentInv[existingIdx].quantity + (item.quantity || 1),
        };
      } else {
        currentInv.push({ ...item });
      }

      return {
        ...prev,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        inventory: currentInv,
        currentExp: expGain ? Math.min(prev.maxExp, prev.currentExp + expGain) : prev.currentExp,
        maxHp: prev.maxHp + (statGain?.hp || 0),
        hp: prev.hp + (statGain?.hp || 0),
        attack: prev.attack + (statGain?.attack || 0),
        defense: prev.defense + (statGain?.defense || 0),
        critRate: prev.critRate + (statGain?.critRate || 0),
      };
    });
  };

  // Claim Quest Handler
  const handleClaimQuest = (questId: string) => {
    const targetQuest = quests.find(q => q.id === questId);
    if (!targetQuest || targetQuest.completed) return;

    setQuests(prev =>
      prev.map(q => (q.id === questId ? { ...q, completed: true } : q))
    );

    setPlayer(prev => {
      const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + targetQuest.rewardBronze;
      const currentInv = [...(prev.inventory || [])];

      if (targetQuest.rewardItems) {
        targetQuest.rewardItems.forEach(rew => {
          const idx = currentInv.findIndex(i => i.id === rew.id);
          if (idx >= 0) {
            currentInv[idx] = { ...currentInv[idx], quantity: currentInv[idx].quantity + rew.count };
          } else {
            currentInv.push({
              id: rew.id,
              name: rew.name,
              chineseName: rew.name,
              category: rew.id.includes('skin') || rew.id.includes('bone') || rew.id.includes('meat') ? 'beast_material' : 'ore',
              description: `Commission bounty reward: ${targetQuest.title}`,
              quantity: rew.count,
              icon: rew.id.includes('skin') ? '🛡️' : rew.id.includes('bone') ? '🦴' : rew.id.includes('meat') ? '🥩' : '🔩',
              rarity: 'rare',
              sellValueInBronze: 15000,
            });
          }
        });
      }

      return {
        ...prev,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        inventory: currentInv,
        currentExp: Math.min(prev.maxExp, prev.currentExp + targetQuest.rewardExp),
      };
    });
  };

  // Blacksmith Forging Handler
  const handleForgeItem = (recipe: ForgingRecipe, craftedItem: ResourceItem, expGain: number) => {
    setPlayer(prev => {
      const nextBronze = Math.max(0, (prev.totalBronzeCoins ?? prev.gold * 1000000) - recipe.costBronze);
      const currentInv = [...(prev.inventory || [])];

      // Deduct required materials
      recipe.requiredMaterials.forEach(mat => {
        const idx = currentInv.findIndex(i => i.id === mat.id);
        if (idx >= 0) {
          currentInv[idx] = { ...currentInv[idx], quantity: Math.max(0, currentInv[idx].quantity - mat.count) };
        }
      });

      // Add forged item
      currentInv.push(craftedItem);

      // Rank progression
      const newExp = (prev.blacksmithExp || 0) + expGain;
      let newRank = prev.blacksmithRank;
      if (newExp >= 3500) newRank = 'Divine Craftsman (神匠)';
      else if (newExp >= 1500) newRank = 'Grandmaster';
      else if (newExp >= 600) newRank = 'Master';
      else if (newExp >= 200) newRank = 'Journeyman';

      return {
        ...prev,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        inventory: currentInv.filter(i => i.quantity > 0 || i.category === 'equipment'),
        blacksmithExp: newExp,
        blacksmithRank: newRank,
        attack: prev.attack + (craftedItem.equipStats?.attack || 0),
        defense: prev.defense + (craftedItem.equipStats?.defense || 0),
        maxHp: prev.maxHp + (craftedItem.equipStats?.hp || 0),
        hp: prev.hp + (craftedItem.equipStats?.hp || 0),
        critRate: prev.critRate + (craftedItem.equipStats?.critRate || 0),
      };
    });
  };

  // Blacksmith Market Sell Handler
  const handleSellResource = (itemId: string, count: number, bronzeEarned: number) => {
    setPlayer(prev => {
      const currentInv = [...(prev.inventory || [])];
      const idx = currentInv.findIndex(i => i.id === itemId);
      if (idx >= 0) {
        currentInv[idx] = { ...currentInv[idx], quantity: Math.max(0, currentInv[idx].quantity - count) };
      }
      const nextBronze = (prev.totalBronzeCoins ?? prev.gold * 1000000) + bronzeEarned * count;
      return {
        ...prev,
        totalBronzeCoins: nextBronze,
        gold: Math.floor(nextBronze / 1000000),
        inventory: currentInv.filter(i => i.quantity > 0 || i.category === 'equipment'),
      };
    });
  };

  // Heavenly Tribulation Outcomes
  const handleTribulationSuccess = (targetRank: number, bonusAtk: number, bonusDef: number, bonusHp: number) => {
    setPlayer(prev => ({
      ...prev,
      rank: prev.rank + 1,
      currentExp: 0,
      maxExp: Math.round(prev.maxExp * 1.3),
      attack: prev.attack + bonusAtk,
      defense: prev.defense + bonusDef,
      maxHp: prev.maxHp + bonusHp,
      hp: prev.maxHp + bonusHp,
      tribulationSurvivedCount: (prev.tribulationSurvivedCount || 0) + 1,
    }));
    setTribulationTargetRank(null);
    setBreakthroughReactionActive(true);
    setTimeout(() => setBreakthroughReactionActive(false), 3800);
  };

  const handleTribulationFailure = (damageTaken: number) => {
    setPlayer(prev => ({
      ...prev,
      hp: Math.max(1, prev.hp - damageTaken),
      currentExp: Math.max(0, prev.currentExp - Math.round(prev.maxExp * 0.15)),
    }));
    setTribulationTargetRank(null);
  };

  // Reset Game / Rebirth
  const handleResetGame = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAwakened(false);
  };

  if (!isAwakened) {
    return <MartialSoulAwakening onCompleteAwakening={handleCompleteAwakening} />;
  }

  // Active Combat View
  if (currentBattle) {
    return (
      <BattleView
        player={player}
        target={currentBattle.target}
        isArena={currentBattle.isArena}
        onVictory={handleBattleVictory}
        onDefeat={handleBattleDefeat}
        onEscape={() => setCurrentBattle(null)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top 3-Zone Navigation Header */}
      <Navigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        player={player}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenHelp={() => setShowCodex(true)}
      />

      {/* Main Tab Content */}
      <main className="flex-1 pb-12">
        {activeTab === 'cultivation' && (
          <CultivationSanctuary
            player={player}
            breakthroughReactionActive={breakthroughReactionActive}
            onMeditate={handleMeditate}
            onBreakthrough={handleBreakthrough}
            onSwitchActiveSoul={handleSwitchActiveSoul}
            onAwakenSecondarySoul={handleAwakenSecondarySoul}
            onGoToForest={() => setActiveTab('forest')}
            onApplyHerbBonus={handleApplyHerbBonus}
            onApplyPillBonus={handleApplyPillBonus}
            onAdvanceTime={handleAdvanceTime}
            onTriggerTribulation={(rank) => setTribulationTargetRank(rank)}
            onSyncElderRings={handleSyncElderRings}
          />
        )}

        {activeTab === 'forest' && (
          <ForestHunt
            player={player}
            onSelectBeast={handleSelectBeast}
          />
        )}

        {activeTab === 'arena' && (
          <ArenaView
            player={player}
            onChallengeMaster={handleChallengeMaster}
          />
        )}

        {activeTab === 'mall' && (
          <TreasureMall
            player={player}
            onPurchaseItem={handlePurchaseMallItem}
            onGoToArena={() => setActiveTab('arena')}
            onGoToForest={() => setActiveTab('forest')}
          />
        )}

        {activeTab === 'quests' && (
          <QuestLeaderboard
            player={player}
            quests={quests}
            onClaimQuest={handleClaimQuest}
            onGoToForest={() => setActiveTab('forest')}
            onGoToArena={() => setActiveTab('arena')}
          />
        )}

        {activeTab === 'blacksmith' && (
          <BlacksmithGuild
            player={player}
            onForgeItem={handleForgeItem}
            onSellResource={handleSellResource}
            onEquipItem={() => {}}
            onGoToForest={() => setActiveTab('forest')}
          />
        )}

        {activeTab === 'tangsect' && (
          <TangSectView
            player={player}
            onUpgradeArt={handleUpgradeArt}
            onCraftWeapon={handleCraftWeapon}
            onEquipWeapon={handleEquipWeapon}
          />
        )}

        {activeTab === 'spiritbones' && (
          <SpiritBonesView
            player={player}
          />
        )}

        {activeTab === 'profile' && (
          <SoulMasterProfile
            player={player}
            onResetGame={handleResetGame}
            onAdvanceGodTrial={handleAdvanceGodTrial}
          />
        )}
      </main>

      {/* Soul Ring Absorption Minigame Modal */}
      {absorptionData && (
        <RingAbsorptionModal
          ring={absorptionData.ring}
          droppedBone={absorptionData.droppedBone}
          onSuccess={handleRingSuccess}
          onCancel={() => setAbsorptionData(null)}
        />
      )}

      {/* Heavenly Lightning Tribulation Strike Modal */}
      {tribulationTargetRank !== null && (
        <HeavenlyTribulationModal
          player={player}
          targetRank={tribulationTargetRank}
          onSuccess={handleTribulationSuccess}
          onFailure={handleTribulationFailure}
          onClose={() => setTribulationTargetRank(null)}
        />
      )}

      {/* Douluo Codex Help Modal */}
      {showCodex && <DouluoCodexModal onClose={() => setShowCodex(false)} />}

      {/* Persistent Soul Land Donghua Music Player */}
      <SoulLandMusicPlayer />

      {/* Clean Quiet Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-4 px-6 text-center text-xs text-slate-500 font-mono">
        <span>Soul Land: Douluo Awakening · 斗罗大陆全系列 (Soul Land I, II, III, IV, V)</span>
        <span aria-hidden="true" className="mx-2">·</span>
        <span>Immortal Cultivation & Martial Soul Ascension</span>
      </footer>
    </div>
  );
}
