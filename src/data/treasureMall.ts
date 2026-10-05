import { ResourceItem } from '../types/game';

export interface MallTreasureItem {
  id: string;
  name: string;
  chineseName: string;
  category: 'immortal_herb' | 'tribulation_treasure' | 'ore_metal' | 'cultivation_pill';
  costBronze: number; // in Bronze (1 Gold = 1,000,000 Bronze, 1 Silver = 10,000 Bronze)
  description: string;
  lore: string;
  icon: string;
  rarity: 'rare' | 'epic' | 'legendary' | 'divine';
  effectText: string;
  tribulationBonus?: number; // e.g. 0.15 = +15% survival
  cultivationBonus?: number; // e.g. 1500 EXP
  lifespanBonus?: number; // e.g. 20 years
  statBonus?: {
    hp?: number;
    attack?: number;
    defense?: number;
    critRate?: number;
  };
  resourceYield: ResourceItem;
}

export const MALL_TREASURES: MallTreasureItem[] = [
  // ==========================================
  // SECTION 1: HEAVENLY TRIBULATION TREASURES
  // ==========================================
  {
    id: 'spirit_increasing_grass',
    name: 'Spirit Increasing Grass',
    chineseName: '聚灵草 (初级渡劫宝药)',
    category: 'tribulation_treasure',
    costBronze: 50 * 1000000, // 50 Gold
    description: 'A miraculous herb that condenses pure spiritual essence into a dense energy cocoon.',
    lore: 'Mentioned by ancient grandmasters as an indispensable herb before facing the divine thunderbolts.',
    icon: '🌿',
    rarity: 'rare',
    effectText: '+15% Heavenly Tribulation Survival Chance & +500 Max HP',
    tribulationBonus: 0.15,
    resourceYield: {
      id: 'spirit_grass',
      name: 'Spirit Increasing Grass (聚灵草)',
      chineseName: '聚灵草',
      category: 'tribulation_treasure',
      description: 'Increases Heavenly Tribulation survival rate by 15%.',
      quantity: 1,
      icon: '🌿',
      rarity: 'rare',
      sellValueInBronze: 25 * 1000000,
      tribulationBonus: 0.15,
      equipStats: { hp: 500 },
    },
  },
  {
    id: 'foundation_building_liquid',
    name: 'Foundation Building Liquid',
    chineseName: '筑基灵液 (经脉淬炼灵液)',
    category: 'tribulation_treasure',
    costBronze: 120 * 1000000, // 120 Gold
    description: 'Golden spirit fluid distilled from millennium dragon marrow and jade dew. Solidifies dantian meridians.',
    lore: 'Reinforces the spiritual skeleton to endure devastating tribulation thunder without bone fractures.',
    icon: '🧪',
    rarity: 'epic',
    effectText: '+20% Heavenly Tribulation Survival Chance & +40 Iron Defense',
    tribulationBonus: 0.20,
    resourceYield: {
      id: 'foundation_liquid',
      name: 'Foundation Building Liquid (筑基灵液)',
      chineseName: '筑基灵液',
      category: 'tribulation_treasure',
      description: 'Strengthens body meridians, granting +20% Tribulation survival chance.',
      quantity: 1,
      icon: '🧪',
      rarity: 'epic',
      sellValueInBronze: 60 * 1000000,
      tribulationBonus: 0.20,
      equipStats: { defense: 40, hp: 800 },
    },
  },
  {
    id: 'three_pattern_thunder_fruit',
    name: 'Three-Pattern Thunder Fruit',
    chineseName: '三纹雷劫果 (天劫神果)',
    category: 'tribulation_treasure',
    costBronze: 280 * 1000000, // 280 Gold
    description: 'A miraculous fruit born within celestial lightning clouds, etched with 3 natural lightning dao runes.',
    lore: 'Absorbs raw celestial lightning into pure spiritual power. Greatly minimizes tribulation lightning strike backlash.',
    icon: '⚡',
    rarity: 'legendary',
    effectText: '+30% Heavenly Tribulation Survival Chance & Lightning Immunity Shield',
    tribulationBonus: 0.30,
    resourceYield: {
      id: 'thunder_fruit',
      name: 'Three-Pattern Thunder Fruit (三纹雷劫果)',
      chineseName: '三纹雷劫果',
      category: 'tribulation_treasure',
      description: 'Supreme thunder fruit granting +30% Heavenly Tribulation survival.',
      quantity: 1,
      icon: '⚡',
      rarity: 'legendary',
      sellValueInBronze: 140 * 1000000,
      tribulationBonus: 0.30,
      equipStats: { attack: 65, defense: 50 },
    },
  },
  {
    id: 'nine_turn_golden_pill',
    name: 'Nine-Turn Golden Pill',
    chineseName: '九转金丹 (仙品灵丹)',
    category: 'tribulation_treasure',
    costBronze: 200 * 1000000, // 200 Gold
    description: 'Refined through nine cycles of spiritual fire. Grants an impenetrable protective soul barrier against lethal backlash.',
    lore: 'Ancient alchemical masterpiece used by Spirit Douluos stepping into Titled Douluo realm.',
    icon: '💊',
    rarity: 'legendary',
    effectText: '+25% Heavenly Tribulation Survival Chance & Revives 50% HP upon failure',
    tribulationBonus: 0.25,
    resourceYield: {
      id: 'nine_turn_pill',
      name: 'Nine-Turn Golden Pill (九转金丹)',
      chineseName: '九转金丹',
      category: 'tribulation_treasure',
      description: 'Immortal pill providing +25% Tribulation survival chance.',
      quantity: 1,
      icon: '💊',
      rarity: 'legendary',
      sellValueInBronze: 100 * 1000000,
      tribulationBonus: 0.25,
    },
  },
  {
    id: 'heavenly_dragon_marrow',
    name: 'Heavenly Dragon Marrow',
    chineseName: '天龙髓 (真龙圣髓)',
    category: 'tribulation_treasure',
    costBronze: 450 * 1000000, // 450 Gold
    description: 'Primal dragon marrow harvested from ancient dragon kings. Bestows true dragon constitution to withstand God-rank lightning.',
    lore: 'The supreme heavenly treasure for breaking through Rank 90 into Titled Douluo and Godhood.',
    icon: '🐉',
    rarity: 'divine',
    effectText: '+35% Heavenly Tribulation Survival Chance & +2,000 Max HP, +100 ATK',
    tribulationBonus: 0.35,
    resourceYield: {
      id: 'dragon_marrow',
      name: 'Heavenly Dragon Marrow (天龙髓)',
      chineseName: '天龙髓',
      category: 'tribulation_treasure',
      description: 'Divine marrow offering +35% Tribulation survival rate.',
      quantity: 1,
      icon: '🐉',
      rarity: 'divine',
      sellValueInBronze: 220 * 1000000,
      tribulationBonus: 0.35,
      equipStats: { hp: 2000, attack: 100, defense: 80 },
    },
  },

  // ==========================================
  // SECTION 2: IMMORTAL HERBS & CULTIVATION ACCELERATORS
  // ==========================================
  {
    id: 'spirit_gathering_pill',
    name: 'Spirit Gathering Pill',
    chineseName: '聚灵回元丹',
    category: 'cultivation_pill',
    costBronze: 15 * 10000, // 15 Silver
    description: 'A standard Douluo elixir that instantly replenishes spiritual reservoir.',
    lore: 'Commonly consumed during closed-door meditation to maintain constant Qi circulation.',
    icon: '🔮',
    rarity: 'rare',
    effectText: 'Instantly grants +600 Cultivation EXP',
    cultivationBonus: 600,
    resourceYield: {
      id: 'gathering_pill',
      name: 'Spirit Gathering Pill (聚灵丹)',
      chineseName: '聚灵丹',
      category: 'pill',
      description: 'Grants +600 Cultivation EXP.',
      quantity: 1,
      icon: '🔮',
      rarity: 'rare',
      sellValueInBronze: 70000,
      cultivationBonus: 600,
    },
  },
  {
    id: 'cockscomb_phoenix_sunflower',
    name: 'Cockscomb Phoenix Sunflower',
    chineseName: '鸡冠凤凰葵 (仙品药草)',
    category: 'immortal_herb',
    costBronze: 150 * 1000000, // 150 Gold
    description: 'Immortal herb from the Ice and Fire Yin Yang Well. Purges all impurities from fire-attribute souls.',
    lore: 'Bestowed by Tang San upon Ma Hongjun, purifying evil fire into sublime sacred phoenix fire.',
    icon: '🌻',
    rarity: 'legendary',
    effectText: '+5,000 Cultivation EXP, +80 Attack, +5% Crit Rate',
    cultivationBonus: 5000,
    statBonus: { attack: 80, critRate: 0.05 },
    resourceYield: {
      id: 'phoenix_sunflower',
      name: 'Cockscomb Phoenix Sunflower (鸡冠凤凰葵)',
      chineseName: '鸡冠凤凰葵',
      category: 'herb',
      description: 'Increases Cultivation EXP by +5,000 and permanently grants +80 ATK.',
      quantity: 1,
      icon: '🌻',
      rarity: 'legendary',
      sellValueInBronze: 75 * 1000000,
      cultivationBonus: 5000,
    },
  },
  {
    id: 'octagonal_ice_infernal_apricot',
    name: 'Ice-Fire Yin Yang Dual Herb',
    chineseName: '八角玄冰草与烈火杏娇疏 (双生仙品)',
    category: 'immortal_herb',
    costBronze: 220 * 1000000, // 220 Gold
    description: 'The twin extremes of extreme frost and scorching flame. Tempering in the Yin Yang well grants invulnerability.',
    lore: 'Allowed Tang San to achieve an impenetrable body immune to all earthly poisons and fire/water extremes.',
    icon: '☯️',
    rarity: 'divine',
    effectText: '+8,000 Cultivation EXP, +1,500 HP, +80 DEF, Poison Immunity',
    cultivationBonus: 8000,
    statBonus: { hp: 1500, defense: 80 },
    resourceYield: {
      id: 'dual_ice_fire_herb',
      name: 'Ice-Fire Dual Herb (双生仙草)',
      chineseName: '双生仙草',
      category: 'herb',
      description: 'Grants +8,000 EXP, +1,500 HP, and extreme elemental resistance.',
      quantity: 1,
      icon: '☯️',
      rarity: 'divine',
      sellValueInBronze: 110 * 1000000,
      cultivationBonus: 8000,
    },
  },
  {
    id: 'full_moon_narcissus',
    name: 'Full Moon Narcissus',
    chineseName: '水仙玉肌骨 (通透经络)',
    category: 'immortal_herb',
    costBronze: 80 * 1000000, // 80 Gold
    description: 'A pure jade lily that cleanses all eight extraordinary meridians with celestial moisture.',
    lore: 'Consumed by Zhu Zhuqing, significantly amplifying internal agility and soul energy flow.',
    icon: '🪷',
    rarity: 'epic',
    effectText: '+3,500 Cultivation EXP, +60 Defense, +10 Speed',
    cultivationBonus: 3500,
    statBonus: { defense: 60 },
    resourceYield: {
      id: 'narcissus_herb',
      name: 'Full Moon Narcissus (水仙玉肌骨)',
      chineseName: '水仙玉肌骨',
      category: 'herb',
      description: 'Cleanses meridians, granting +3,500 EXP and +60 DEF.',
      quantity: 1,
      icon: '🪷',
      rarity: 'epic',
      sellValueInBronze: 40 * 1000000,
      cultivationBonus: 3500,
    },
  },
  {
    id: 'year_extending_elixir',
    name: 'Year-Extending Spirit Elixir',
    chineseName: '延寿益气丹 (驻颜神丹)',
    category: 'cultivation_pill',
    costBronze: 60 * 1000000, // 60 Gold
    description: 'Refined from thousand-year peach essence and spirit dew, restoring youthful vigor.',
    lore: 'Renews decaying vitality, reverses facial aging, and extends mortal lifespan.',
    icon: '✨',
    rarity: 'epic',
    effectText: 'Extends Lifespan by 20 Years & Restores Peak Youthful Visage',
    lifespanBonus: 20,
    resourceYield: {
      id: 'lifespan_pill',
      name: 'Year-Extending Elixir (延寿丹)',
      chineseName: '延寿丹',
      category: 'pill',
      description: 'Restores peak youth and adds 20 years of lifespan.',
      quantity: 1,
      icon: '✨',
      rarity: 'epic',
      sellValueInBronze: 30 * 1000000,
    },
  },

  // ==========================================
  // SECTION 3: BLACKSMITHING METALS & ORES
  // ==========================================
  {
    id: 'ore_hundred_refined_steel',
    name: 'Hundred-Refined Fine Steel',
    chineseName: '百炼精铁 (精锻铸材)',
    category: 'ore_metal',
    costBronze: 5 * 1000000, // 5 Gold (500 Silver)
    description: 'Pure iron hammered over a hundred times to eliminate slag. Essential for standard weapon forging.',
    lore: 'The foundation material used by apprentices and masters in the Blacksmith Guild.',
    icon: '🔩',
    rarity: 'rare',
    effectText: 'Forging material for steel armor, speartips, and crossbow bolts.',
    resourceYield: {
      id: 'cold_iron',
      name: 'Hundred-Refined Fine Steel (百炼精铁)',
      chineseName: '百炼精铁',
      category: 'ore',
      description: 'Essential metal for blacksmithing armors and weapons.',
      quantity: 1,
      icon: '🔩',
      rarity: 'rare',
      sellValueInBronze: 2500000,
    },
  },
  {
    id: 'ore_deep_sea_cold_silver',
    name: 'Deep Sea Cold Silver',
    chineseName: '深海沉银 (万载秘金)',
    category: 'ore_metal',
    costBronze: 25 * 1000000, // 25 Gold
    description: 'Submerged under ten thousand meters of oceanic pressure for millennia. Conducts soul power flawlessly.',
    lore: 'Tang San used Deep Sea Cold Silver to craft the legendary Godly Zhuge Crossbow mechanism.',
    icon: '💠',
    rarity: 'epic',
    effectText: 'High-tier forging material for Zhuge Crossbow and Titan Heavy Armor.',
    resourceYield: {
      id: 'cold_silver',
      name: 'Deep Sea Cold Silver (深海沉银)',
      chineseName: '深海沉银',
      category: 'ore',
      description: 'Superb soul-conducting metal for crafting divine equipment.',
      quantity: 1,
      icon: '💠',
      rarity: 'epic',
      sellValueInBronze: 12500000,
    },
  },
  {
    id: 'ore_star_meteorite_iron',
    name: 'Star Meteorite Iron',
    chineseName: '天外陨铁 (极品神金)',
    category: 'ore_metal',
    costBronze: 60 * 1000000, // 60 Gold
    description: 'A fragment of a fallen star bearing cosmic magnetic resonance. Immune to mundane heat and cold.',
    lore: 'The primary ingredient required by Divine Craftsman Lou Gao to forge the Peacock Feather.',
    icon: '☄️',
    rarity: 'legendary',
    effectText: 'Required for crafting Divine Peacock Feather and Dragon King Armor.',
    resourceYield: {
      id: 'meteor_iron',
      name: 'Star Meteorite Iron (天外陨铁)',
      chineseName: '天外陨铁',
      category: 'ore',
      description: 'Precious cosmic ore used in crafting divine tools.',
      quantity: 1,
      icon: '☄️',
      rarity: 'legendary',
      sellValueInBronze: 30000000,
    },
  },
];
