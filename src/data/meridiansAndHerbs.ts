export interface Meridian {
  id: string;
  name: string;
  chineseName: string;
  level: number;
  maxLevel: number;
  statBonus: string;
  qiCost: number;
  bonus: {
    attack?: number;
    defense?: number;
    hp?: number;
    critRate?: number;
    passiveExpRate?: number;
  };
}

export interface ImmortalHerb {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  growTimeSec: number;
  harvestBonus: string;
  statReward: {
    attack?: number;
    defense?: number;
    hp?: number;
    critRate?: number;
  };
  icon: string;
}

export interface PillRecipe {
  id: string;
  name: string;
  chineseName: string;
  grade: 'Mortal' | 'Spirit' | 'Earth' | 'Heaven' | 'Divine';
  description: string;
  craftCost: number;
  effectDesc: string;
  bonus: {
    hp?: number;
    attack?: number;
    defense?: number;
    exp?: number;
  };
}

export const INITIAL_MERIDIANS: Meridian[] = [
  {
    id: 'governor_vessel',
    name: 'Governor Vessel',
    chineseName: '督脉 (阳脉之海)',
    level: 1,
    maxLevel: 10,
    statBonus: '+25 ATK & +3% Skill Damage per level',
    qiCost: 150,
    bonus: { attack: 25 },
  },
  {
    id: 'conception_vessel',
    name: 'Conception Vessel',
    chineseName: '任脉 (阴脉之海)',
    level: 1,
    maxLevel: 10,
    statBonus: '+200 HP & +15 DEF per level',
    qiCost: 150,
    bonus: { hp: 200, defense: 15 },
  },
  {
    id: 'thoroughfare_vessel',
    name: 'Thoroughfare Vessel',
    chineseName: '冲脉 (十二经之海)',
    level: 1,
    maxLevel: 10,
    statBonus: '+3 Passive Soul Power/sec per level',
    qiCost: 200,
    bonus: { passiveExpRate: 3 },
  },
  {
    id: 'belt_vessel',
    name: 'Belt Vessel',
    chineseName: '带脉 (约束诸经)',
    level: 1,
    maxLevel: 10,
    statBonus: '+15 DEF & +2% Evasion per level',
    qiCost: 180,
    bonus: { defense: 15 },
  },
  {
    id: 'yang_heel_vessel',
    name: 'Yang Heel Vessel',
    chineseName: '阳跷脉 (矫捷迅疾)',
    level: 1,
    maxLevel: 10,
    statBonus: '+1.5% Crit Rate & +20 ATK per level',
    qiCost: 250,
    bonus: { critRate: 0.015, attack: 20 },
  },
  {
    id: 'yin_heel_vessel',
    name: 'Yin Heel Vessel',
    chineseName: '阴跷脉 (清宁心神)',
    level: 1,
    maxLevel: 10,
    statBonus: '+300 Max HP & +10 SP capacity per level',
    qiCost: 220,
    bonus: { hp: 300 },
  },
];

export const IMMORTAL_HERBS: ImmortalHerb[] = [
  {
    id: 'phoenix_sunflower',
    name: 'Cockscomb Phoenix Sunflower',
    chineseName: '鸡冠凤凰葵',
    description: 'Immortal herb that purifies impurities in spirit veins and awakens blazing fire divinity.',
    growTimeSec: 15,
    harvestBonus: '+45 Permanent Attack Power',
    statReward: { attack: 45 },
    icon: '🌻',
  },
  {
    id: 'octagonal_ice_grass',
    name: 'Octagonal Mystery Ice Grass',
    chineseName: '八角玄冰草',
    description: 'Extreme frost immortal herb growing in the frigid springs of Ice Fire Yin-Yang Well. Grants subzero resilience.',
    growTimeSec: 25,
    harvestBonus: '+350 HP & +25 Defense',
    statReward: { hp: 350, defense: 25 },
    icon: '❄️',
  },
  {
    id: 'infernal_apricot',
    name: 'Infernal Delicate Apricot',
    chineseName: '烈火杏娇疏',
    description: 'Extreme volcanic fire herb growing in the molten springs of Ice Fire Yin-Yang Well. Forges iron sinews.',
    growTimeSec: 25,
    harvestBonus: '+40 Attack & +20 Defense',
    statReward: { attack: 40, defense: 20 },
    icon: '🔥',
  },
  {
    id: 'full_moon_dew',
    name: 'Full Moon Dew',
    chineseName: '望穿秋水露',
    description: 'Absorbs the nocturnal essence of the celestial moon, vastly expanding mental power and critical sight.',
    growTimeSec: 40,
    harvestBonus: '+4% Permanent Critical Strike Rate',
    statReward: { critRate: 0.04 },
    icon: '💧',
  },
  {
    id: 'yearning_heartbroken_red',
    name: 'Yearning Heartbroken Red',
    chineseName: '相思断肠红 (仙品之王)',
    description: 'The supreme emperor of all immortal herbs. Blossoms only for true devotion, conferring god-level life force.',
    growTimeSec: 60,
    harvestBonus: '+1,500 HP, +80 ATK, +50 DEF',
    statReward: { hp: 1500, attack: 80, defense: 50 },
    icon: '🌺',
  },
];

export const PILL_RECIPES: PillRecipe[] = [
  {
    id: 'spirit_condensation_pill',
    name: 'Spirit Condensation Pill',
    chineseName: '聚气凝灵丹',
    grade: 'Spirit',
    description: 'Refined from hundred-year herbs to compress spirit power and accelerate realm progression.',
    craftCost: 200,
    effectDesc: '+500 Immediate Cultivation EXP & +100 Max HP',
    bonus: { exp: 500, hp: 100 },
  },
  {
    id: 'bone_forging_pill',
    name: 'Vajra Bone-Forging Pill',
    chineseName: '金刚锻骨丹',
    grade: 'Earth',
    description: 'Tempered with dragon marrow and spirit beast bone ash. Permanently fortifies physical defenses.',
    craftCost: 450,
    effectDesc: '+35 Permanent Defense & +200 Max HP',
    bonus: { defense: 35, hp: 200 },
  },
  {
    id: 'heaven_shattering_pill',
    name: 'Clear Sky Thunder Pill',
    chineseName: '昊天破境玄丹',
    grade: 'Heaven',
    description: 'Blended with titanium hammer essence and thunder cores. Unleashes explosive attack potential.',
    craftCost: 900,
    effectDesc: '+60 Permanent Attack & +1,000 EXP',
    bonus: { attack: 60, exp: 1000 },
  },
  {
    id: 'god_ascension_pill',
    name: 'Divine Sea God Pill',
    chineseName: '九彩神光飞升丹',
    grade: 'Divine',
    description: 'The pinnacle supreme divine pill blessed by Sea God and Asura God light.',
    craftCost: 2500,
    effectDesc: '+150 ATK, +90 DEF, +2,500 HP, +5,000 EXP',
    bonus: { attack: 150, defense: 90, hp: 2500, exp: 5000 },
  },
];
