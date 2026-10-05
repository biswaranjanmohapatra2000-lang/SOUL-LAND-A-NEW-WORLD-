import { ForgingRecipe, BlacksmithRank } from '../types/game';

export interface BlacksmithRankInfo {
  rank: BlacksmithRank;
  chineseTitle: string;
  minExp: number;
  perkDescription: string;
  discountRate: number; // e.g. 0.1 = 10% lower crafting fee
  icon: string;
}

export const BLACKSMITH_RANKS: BlacksmithRankInfo[] = [
  {
    rank: 'Apprentice',
    chineseTitle: '初级学徒铁匠',
    minExp: 0,
    perkDescription: 'Novice member permitted to forge basic leather armors and bone daggers.',
    discountRate: 0,
    icon: '🔨',
  },
  {
    rank: 'Journeyman',
    chineseTitle: '中级熟练铁匠',
    minExp: 200,
    perkDescription: 'Can forge steel-reinforced armors and spears with 10% lower cost.',
    discountRate: 0.1,
    icon: '⚒️',
  },
  {
    rank: 'Master',
    chineseTitle: '高级大师级铁匠',
    minExp: 600,
    perkDescription: 'Can forge titan scale mail and heavy clear sky warhammers with 20% stat bonus.',
    discountRate: 0.15,
    icon: '🔥',
  },
  {
    rank: 'Grandmaster',
    chineseTitle: '神匠级宗师',
    minExp: 1500,
    perkDescription: 'Capable of refining Deep Sea Cold Silver into Godly Zhuge Crossbows.',
    discountRate: 0.25,
    icon: '⚡',
  },
  {
    rank: 'Divine Craftsman (神匠)',
    chineseTitle: '斗罗至尊神匠 (楼高 / 唐三)',
    minExp: 3500,
    perkDescription: 'The pinnacle of forging! Can craft legendary Tang Sect hidden weapons and divine armor.',
    discountRate: 0.4,
    icon: '👑',
  },
];

export const FORGING_RECIPES: ForgingRecipe[] = [
  // --- ARMOR ---
  {
    id: 'armor_beast_leather_vest',
    name: 'Hardened Beast Leather Vest',
    chineseName: '兽皮坚甲',
    slot: 'armor',
    minRank: 'Apprentice',
    costBronze: 10000, // 10 Silver
    requiredMaterials: [
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 2 },
    ],
    stats: {
      defense: 25,
      hp: 150,
    },
    description: 'Tough vest stitched from Star Dou beast hides. Provides resilient protection against physical bites.',
  },
  {
    id: 'armor_forest_steel_cuirass',
    name: 'Star Dou Refined Iron Cuirass',
    chineseName: '星斗玄铁甲',
    slot: 'armor',
    minRank: 'Journeyman',
    costBronze: 50000, // 50 Silver
    requiredMaterials: [
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 3 },
      { id: 'cold_iron', name: 'Hundred-Refined Fine Steel (百炼精铁)', count: 2 },
    ],
    stats: {
      defense: 60,
      hp: 400,
    },
    description: 'Forged with folded hundred-refined steel plates interlaced with supple leather.',
  },
  {
    id: 'armor_titan_scale_armor',
    name: 'Titan Cold Silver Scale Armor',
    chineseName: '泰坦寒银重甲',
    slot: 'armor',
    minRank: 'Master',
    costBronze: 200000, // 2 Gold
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 4 },
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 2 },
    ],
    stats: {
      defense: 140,
      hp: 1000,
      critRate: 0.05,
    },
    description: 'Heavy armor forged by tempering titan beast bones with Deep Sea Cold Silver. Deflects ferocious blows.',
  },
  {
    id: 'armor_glacial_dragon_mail',
    name: 'Nine Heavens Glacial Dragon Mail',
    chineseName: '九天寒龙战甲',
    slot: 'armor',
    minRank: 'Grandmaster',
    costBronze: 800000, // 8 Gold
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 6 },
      { id: 'meteor_iron', name: 'Star Meteorite Iron (天外陨铁)', count: 2 },
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 3 },
    ],
    stats: {
      defense: 260,
      hp: 2200,
      speed: 10,
    },
    description: 'Imbued with dragon bone fragments and star meteorite ore. Radiates subzero protective barriers.',
  },

  // --- WEAPONS ---
  {
    id: 'weapon_wolf_bone_dagger',
    name: 'Demon Wolf Bone Dagger',
    chineseName: '狂狼骨刃',
    slot: 'weapon',
    minRank: 'Apprentice',
    costBronze: 15000, // 15 Silver
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 2 },
    ],
    stats: {
      attack: 30,
      speed: 6,
    },
    description: 'Chiseled from juvenile gale wolf bones, balanced for rapid slashing.',
  },
  {
    id: 'weapon_thunder_sky_spear',
    name: 'Thunder Sky Breaker Spear',
    chineseName: '紫电破阵矛',
    slot: 'weapon',
    minRank: 'Journeyman',
    costBronze: 80000, // 80 Silver
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 3 },
      { id: 'cold_iron', name: 'Hundred-Refined Fine Steel (百炼精铁)', count: 2 },
    ],
    stats: {
      attack: 75,
      critRate: 0.08,
    },
    description: 'A heavy spearhead quenched in thunder essence, piercing through hardened armor.',
  },
  {
    id: 'weapon_clear_sky_warhammer',
    name: 'Heaven-Forged Heavy Warhammer',
    chineseName: '铸天重锤',
    slot: 'weapon',
    minRank: 'Master',
    costBronze: 300000, // 3 Gold
    requiredMaterials: [
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 3 },
      { id: 'cold_iron', name: 'Hundred-Refined Fine Steel (百炼精铁)', count: 4 },
    ],
    stats: {
      attack: 160,
      defense: 40,
    },
    description: 'Modeled after the ancient Clear Sky Clan warhammers. Every swing carries crushing momentum.',
  },
  {
    id: 'weapon_godly_zhuge_crossbow',
    name: 'Godly Zhuge Crossbow',
    chineseName: '唐门绝技 · 诸葛神弩',
    slot: 'weapon',
    minRank: 'Grandmaster',
    costBronze: 600000, // 6 Gold
    requiredMaterials: [
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 3 },
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 4 },
      { id: 'cold_iron', name: 'Hundred-Refined Fine Steel (百炼精铁)', count: 5 },
    ],
    stats: {
      attack: 220,
      critRate: 0.15,
      speed: 12,
    },
    description: 'Supreme mechanical hidden weapon designed by Tang San. Fires 16 deadly steel bolts in a single instant.',
  },
  {
    id: 'weapon_peacock_feather',
    name: 'Divine Tool: Peacock Feather',
    chineseName: '机括类第一 · 孔雀翎 (神匠创世)',
    slot: 'weapon',
    minRank: 'Divine Craftsman (神匠)',
    costBronze: 2000000, // 20 Gold
    requiredMaterials: [
      { id: 'meteor_iron', name: 'Star Meteorite Iron (天外陨铁)', count: 4 },
      { id: 'dragon_essence', name: 'Dragon Bone Essence (龙骨精魄)', count: 2 },
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 5 },
    ],
    stats: {
      attack: 420,
      critRate: 0.25,
      speed: 20,
    },
    description: 'The crowning masterpiece of Lou Gao and the Tang Sect. Releases 365 deadly celestial needles that slaughter Titled Douluos.',
  },

  // --- ACCESSORIES ---
  {
    id: 'accessory_thunder_ward_talisman',
    name: 'Thunder Warding Talisman',
    chineseName: '九天避雷符 (渡劫神器)',
    slot: 'accessory',
    minRank: 'Journeyman',
    costBronze: 150000, // 1.5 Gold
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 3 },
      { id: 'spirit_grass', name: 'Spirit Increasing Grass (聚灵草)', count: 2 },
    ],
    stats: {
      defense: 30,
      hp: 300,
    },
    description: 'Protective amulet inscribed with ancient grounding runes. Increases Heavenly Tribulation survival chance by +15%!',
  },
  {
    id: 'accessory_beast_bone_ring',
    name: 'Beast King Bone Ring',
    chineseName: '兽王辟邪戒',
    slot: 'accessory',
    minRank: 'Master',
    costBronze: 250000, // 2.5 Gold
    requiredMaterials: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 5 },
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 1 },
    ],
    stats: {
      attack: 45,
      critRate: 0.08,
      hp: 400,
    },
    description: 'Carved from millennium beast skull bones, amplifying the wearer’s soul flow and critical precision.',
  },
];
