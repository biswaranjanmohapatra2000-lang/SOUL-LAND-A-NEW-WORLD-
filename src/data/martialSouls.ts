import { MartialSoul, MartialSoulRankTier, MartialSoulCategory } from '../types/game';

export interface SoulLandEra {
  eraId: 'sl1' | 'sl2' | 'sl3' | 'sl4' | 'sl5';
  title: string;
  chinese: string;
  protagonist: string;
  description: string;
}

export const SOUL_LAND_ERAS: SoulLandEra[] = [
  {
    eraId: 'sl1',
    title: 'Soul Land I: Douluo Dalu',
    chinese: '斗罗大陆 I',
    protagonist: 'Tang San & Shrek Seven Devils',
    description: 'The foundation of the continent. Tang San reincarnates with the Mysterious Heaven Method, awakening Twin Martial Souls: Blue Silver Emperor and Clear Sky Hammer.',
  },
  {
    eraId: 'sl2',
    title: 'Soul Land II: The Unrivaled Tang Sect',
    chinese: '绝世唐门 II',
    protagonist: 'Huo Yuhao & Tang Wutong',
    description: 'Ten thousand years later, the Tang Sect declines. Huo Yuhao awakens the Mental Spirit Eyes, fusing the Million-Year Sky Dream Ice Worm and Ice Jade Empress Scorpion.',
  },
  {
    eraId: 'sl3',
    title: 'Soul Land III: Legend of the Dragon King',
    chinese: '龙王传说 III',
    protagonist: 'Tang Wulin & Gu Yuena',
    description: 'Spirit beasts face extinction. Tang Wulin inherits the seal of the Golden Dragon King, clashing and loving Gu Yuena, the Silver Dragon King.',
  },
  {
    eraId: 'sl4',
    title: 'Soul Land IV: Ultimate Douluo',
    chinese: '终极斗罗 IV',
    protagonist: 'Lan Xuanyu',
    description: 'Interstellar space era. Lan Xuanyu fuses both Gold and Silver Dragon King bloodlines to ascend as the omnipotent Dragon God.',
  },
  {
    eraId: 'sl5',
    title: 'Soul Land V: Rebirth of Tang San',
    chinese: '重生唐三 V',
    protagonist: 'Reincarnated God King Tang San',
    description: 'Tang San reincarnates onto the Fairy Continent to reunite with Xiao Wu, cultivating the Mysterious Heaven Nine Transformations against demonic monster overlords.',
  },
];

/**
 * Canon Soul Land Martial Souls with All Tiers (Divine, Super, Top, High, Intermediate, Normal, Waste)
 * and All Categories (Healing, Support, Auxiliary, Strength, Agility, Control, Defense, Elemental, Beast, Plant, Gem, Tool, Food)
 */
export const MARTIAL_SOULS: (MartialSoul & { era: 'sl1' | 'sl2' | 'sl3' | 'sl4' | 'sl5' })[] = [
  // ==========================================
  // 1. DIVINE TIER (神级武魂 · 1% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'seraphim_angel',
    era: 'sl1',
    name: 'Six-Winged Seraphim Angel',
    chineseName: '六翼天使 (千仞雪 · 光明神级)',
    type: 'beast',
    category: 'elemental',
    categoryName: 'Elemental & Strength · 光明强攻系',
    rankTier: 'divine',
    rankTierName: 'Divine Tier Spirit · 神级武魂 (1%)',
    rarityChanceText: 'Awakening Rate: 1% (Divine Godhood)',
    description: 'Direct divine god-inherited martial soul of the Angel God. Radiates pure sacred solar fire, dissolving all darkness, debuffs, and evil on the continent.',
    element: 'Holy Light & Solar Flame',
    baseHp: 920,
    baseAttack: 118,
    baseDefense: 62,
    baseSpeed: 44,
    avatarBonusDesc: 'Angelic Domain purges all control debuffs, dissolves 35% enemy attack, and doubles holy flame burst damage.',
    image: '/src/assets/images/seraphim_angel_divine_1791220214516.jpg',
    colorScheme: {
      primary: '#FDE047',
      border: '#EAB308',
      glow: 'rgba(234, 179, 8, 0.75)',
    },
  },
  {
    id: 'sea_god_trident_soul',
    era: 'sl1',
    name: 'Sea God Trident',
    chineseName: '海神三叉戟 · 黄金瀚海 (唐三 · 神级)',
    type: 'tool',
    category: 'control',
    categoryName: 'Control & Tool · 控制神器系',
    rankTier: 'divine',
    rankTierName: 'Divine Tier Spirit · 神级武魂 (1%)',
    rarityChanceText: 'Awakening Rate: 1% (Divine Godhood)',
    description: 'Divine artifact tool soul weighing 108,000 catties. Wields the Vast Sea Cosmic Shroud, golden halberd divine skills, and absolute mastery over oceanic tides.',
    element: 'Divine Water & Ocean Domain',
    baseHp: 960,
    baseAttack: 122,
    baseDefense: 66,
    baseSpeed: 40,
    avatarBonusDesc: 'Unfixed Storm stuns all enemies for 3.5 seconds with irresistible divine suppression.',
    image: '/src/assets/images/location_sea_god_island_1791176607302.jpg',
    colorScheme: {
      primary: '#38BDF8',
      border: '#0284C7',
      glow: 'rgba(56, 189, 248, 0.75)',
    },
  },
  {
    id: 'dragon_god_lan_xuanyu',
    era: 'sl4',
    name: 'Nine-Colored Dragon God',
    chineseName: '九彩龙神 (蓝轩宇 · 宇宙至高神)',
    type: 'beast',
    category: 'beast',
    categoryName: 'Beast & Omnipotent · 至高神兽系',
    rankTier: 'divine',
    rankTierName: 'Divine Tier Spirit · 神级武魂 (1%)',
    rarityChanceText: 'Awakening Rate: 1% (Divine Godhood)',
    description: 'The supreme progenitor of all dragonkind in the cosmos. Fuses both Gold and Silver Dragon King bloodlines to wield all elements and infinite physical might.',
    element: 'Nine Cosmic Elements & Dragon Core',
    baseHp: 990,
    baseAttack: 125,
    baseDefense: 70,
    baseSpeed: 42,
    avatarBonusDesc: 'Dragon God Domain bends spatial dimensions and ignores 60% of all enemy defenses.',
    image: '/src/assets/images/silver_dragon_gu_yuena_1791145485703.jpg',
    colorScheme: {
      primary: '#C084FC',
      border: '#9333EA',
      glow: 'rgba(192, 132, 252, 0.75)',
    },
  },
  {
    id: 'asura_god_sword',
    era: 'sl5',
    name: 'Asura God Demonic Sword',
    chineseName: '修罗魔剑 (杀戮之神 · 绝世修罗)',
    type: 'tool',
    category: 'strength',
    categoryName: 'Strength & Slaughter · 强攻杀戮系',
    rankTier: 'divine',
    rankTierName: 'Divine Tier Spirit · 神级武魂 (1%)',
    rarityChanceText: 'Awakening Rate: 1% (Divine Godhood)',
    description: 'Supreme God of Slaughter arbiter weapon. Bathed in crimson slaughter Qi, dispensing divine execution upon any who violate cosmic balance.',
    element: 'Asura Slaughter & Blood Core',
    baseHp: 910,
    baseAttack: 130,
    baseDefense: 55,
    baseSpeed: 45,
    avatarBonusDesc: 'Asura Judgment executes targets below 40% HP instantly and triples critical damage.',
    image: '/src/assets/images/seven_killing_sword_1791220338549.jpg',
    colorScheme: {
      primary: '#EF4444',
      border: '#991B1B',
      glow: 'rgba(239, 68, 68, 0.8)',
    },
  },

  // ==========================================
  // 2. SUPER TIER (超级武魂 · 5% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'clear_sky_hammer',
    era: 'sl1',
    name: 'Clear Sky Hammer',
    chineseName: '昊天锤 (天下第一器武魂 · 唐三/唐昊)',
    type: 'tool',
    category: 'strength',
    categoryName: 'Strength & Force · 强攻器武魂',
    rankTier: 'super',
    rankTierName: 'Super Tier Spirit · 超级武魂 (5%)',
    rarityChanceText: 'Awakening Rate: 5% (Super Clan Heritage)',
    description: 'The number one offensive tool spirit of Douluo Continent. Capable of executing Great Sumeru Hammer and Chaos Wind Split Hammer techniques to shatter mountains.',
    element: 'Thunder & Tremor',
    baseHp: 750,
    baseAttack: 105,
    baseDefense: 52,
    baseSpeed: 30,
    avatarBonusDesc: 'Clear Sky True Body triples physical attack and shatters enemy armor by 50%.',
    image: '/src/assets/images/martial_soul_hammer_1791144077856.jpg',
    colorScheme: {
      primary: '#38BDF8',
      border: '#0284C7',
      glow: 'rgba(56, 189, 248, 0.6)',
    },
  },
  {
    id: 'seven_kill_sword',
    era: 'sl1',
    name: 'Seven Kill Sword',
    chineseName: '七杀剑 (剑道尘心 · 天下第一攻伐)',
    type: 'tool',
    category: 'strength',
    categoryName: 'Strength & Weapon · 极攻剑道系',
    rankTier: 'super',
    rankTierName: 'Super Tier Spirit · 超级武魂 (5%)',
    rarityChanceText: 'Awakening Rate: 5% (Super Clan Heritage)',
    description: 'Supreme single-target piercing tool soul. Seven steps to slay gods, rending void and barriers with peerless, unyielding silver sword Qi.',
    element: 'Sword Qi & Absolute Pierce',
    baseHp: 680,
    baseAttack: 115,
    baseDefense: 44,
    baseSpeed: 42,
    avatarBonusDesc: 'Seven Kill Sword Domain increases sword damage by 70% and grants 50% armor ignore.',
    image: '/src/assets/images/seven_killing_sword_1791220338549.jpg',
    colorScheme: {
      primary: '#E0E7FF',
      border: '#6366F1',
      glow: 'rgba(99, 102, 241, 0.65)',
    },
  },
  {
    id: 'golden_dragon_king',
    era: 'sl3',
    name: 'Golden Dragon King Bloodline',
    chineseName: '黄金龙 (极致力量 · 唐舞麟)',
    type: 'beast',
    category: 'strength',
    categoryName: 'Strength & Beast · 极致力量兽武魂',
    rankTier: 'super',
    rankTierName: 'Super Tier Spirit · 超级武魂 (5%)',
    rarityChanceText: 'Awakening Rate: 5% (Super Dragon King)',
    description: 'Inherited from the ancient Dragon God\'s brute strength. Possesses unbreakable golden dragon scales, immense physical vitality, and golden dragon claws.',
    element: 'Pure Kinetic Force & Dragon Gold',
    baseHp: 880,
    baseAttack: 112,
    baseDefense: 65,
    baseSpeed: 36,
    avatarBonusDesc: 'Golden Dragon Roar grants 4 seconds of damage immunity and doubles basic attack output.',
    image: '/src/assets/images/dragon_king_wulin_1791145471777.jpg',
    colorScheme: {
      primary: '#F59E0B',
      border: '#B45309',
      glow: 'rgba(245, 158, 11, 0.65)',
    },
  },
  {
    id: 'ice_jade_scorpion',
    era: 'sl2',
    name: 'Ice Jade Empress Scorpion',
    chineseName: '冰碧帝皇蝎 (极致之冰 · 霍雨浩)',
    type: 'beast',
    category: 'elemental',
    categoryName: 'Elemental & Control · 极致之冰系',
    rankTier: 'super',
    rankTierName: 'Super Tier Spirit · 超级武魂 (5%)',
    rarityChanceText: 'Awakening Rate: 5% (Extreme North Overlord)',
    description: 'The supreme empress of the Far North icy wastes. Commands absolute subzero freezing temperatures (-273°C) and diamond-hard jade carapaces.',
    element: 'Ultimate Ice & Absolute Zero',
    baseHp: 760,
    baseAttack: 102,
    baseDefense: 58,
    baseSpeed: 38,
    avatarBonusDesc: 'Eternal Glacial Domain freezes opponents completely and amplifies ice crit chance by 50%.',
    image: '/src/assets/images/extreme_north_ice_1791178514110.jpg',
    colorScheme: {
      primary: '#38BDF8',
      border: '#0284C7',
      glow: 'rgba(56, 189, 248, 0.65)',
    },
  },
  {
    id: 'dark_devilgod_tiger_soul',
    era: 'sl1',
    name: 'Dark Devilgod Tiger',
    chineseName: '暗魔邪神虎 (至邪魔神 · 六元素)',
    type: 'beast',
    category: 'beast',
    categoryName: 'Beast & Agility · 邪神全能兽武魂',
    rankTier: 'super',
    rankTierName: 'Super Tier Spirit · 超级武魂 (5%)',
    rarityChanceText: 'Awakening Rate: 5% (Dark Devil Mutation)',
    description: 'A terrifying chimera mutated when the God of Evil descended upon a white tiger. Wields darkness, lightning, wind, spatial displacement, and age-reversing arena spells.',
    element: 'Evil, Space, Lightning & Darkness',
    baseHp: 780,
    baseAttack: 108,
    baseDefense: 54,
    baseSpeed: 46,
    avatarBonusDesc: 'Life-and-Death Arena reverses target cultivation age and leeches 30% of their spirit power.',
    image: '/src/assets/images/beast_dark_devilgod_1791178527805.jpg',
    colorScheme: {
      primary: '#A855F7',
      border: '#7E22CE',
      glow: 'rgba(168, 85, 247, 0.65)',
    },
  },

  // ==========================================
  // 3. TOP TIER (顶级武魂 · 10% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'nine_hearted_begonia',
    era: 'sl1',
    name: 'Nine-Hearted Begonia',
    chineseName: '九心海棠 (叶泠泠 · 奇迹之愈)',
    type: 'tool',
    category: 'healing',
    categoryName: 'Healing Type · 治疗系 (奇迹之愈)',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Singular Healing Wonder)',
    description: 'The sole miraculous healing martial soul in existence with only one living practitioner per generation. All rings grant total area-of-effect life recovery.',
    element: 'Sacred Life & Vital Restoration',
    baseHp: 920,
    baseAttack: 52,
    baseDefense: 68,
    baseSpeed: 32,
    avatarBonusDesc: 'Begonia Life Bloom instantly restores 65% max HP and cleanses all bleeding, poison, and curse effects.',
    image: '/src/assets/images/healing_begonia_flower_1791220353681.jpg',
    colorScheme: {
      primary: '#F43F5E',
      border: '#E11D48',
      glow: 'rgba(244, 63, 94, 0.6)',
    },
  },
  {
    id: 'nine_treasure_glazed_pagoda',
    era: 'sl1',
    name: 'Nine Treasure Glazed Tile Pagoda',
    chineseName: '九宝琉璃塔 (宁荣荣 · 宝石辅助之神)',
    type: 'tool',
    category: 'gem',
    categoryName: 'Gem & Auxiliary · 宝石辅助系',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Gem Pagoda Evolution)',
    description: 'The supreme jewel-encrusted pagoda of the continent, broken through past seven layers by consuming the Immortal Tulip. Amplifies strength, speed, defense, and spirit power.',
    element: 'Gem Radiance & Auxiliary Aura',
    baseHp: 840,
    baseAttack: 58,
    baseDefense: 74,
    baseSpeed: 34,
    avatarBonusDesc: 'Nine Treasure Divine Glow grants 30% damage mitigation and 35% attribute enhancement to user and allies.',
    image: '/src/assets/images/glazed_tile_pagoda_gem_1791220230027.jpg',
    colorScheme: {
      primary: '#38BDF8',
      border: '#0284C7',
      glow: 'rgba(56, 189, 248, 0.6)',
    },
  },
  {
    id: 'blue_silver_emperor',
    era: 'sl1',
    name: 'Blue Silver Emperor',
    chineseName: '蓝银皇 (植物之帝 · 唐三/阿银)',
    type: 'tool',
    category: 'plant',
    categoryName: 'Plant & Control · 植物控制系',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Royal Plant Emperor)',
    description: 'The monarch of all vegetation across Douluo Continent. Possesses indestructible golden-veined blue vines, paralytic toxins, and the Blue Silver Domain.',
    element: 'Nature, Wood & Life Vitality',
    baseHp: 860,
    baseAttack: 82,
    baseDefense: 62,
    baseSpeed: 36,
    avatarBonusDesc: 'Blue Silver Forest Domain recovers 8% HP every 3 seconds and doubles crowd-control lock duration.',
    image: '/src/assets/images/cultivation_sanctuary_1791176565730.jpg',
    colorScheme: {
      primary: '#10B981',
      border: '#047857',
      glow: 'rgba(16, 185, 129, 0.6)',
    },
  },
  {
    id: 'blue_lightning_dragon',
    era: 'sl1',
    name: 'Blue Lightning Tyrant Dragon',
    chineseName: '蓝电霸王龙 (天下第一兽武魂 · 玉天恒)',
    type: 'beast',
    category: 'beast',
    categoryName: 'Beast & Strength · 强攻龙化兽武魂',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Upper Three Sects)',
    description: 'Premier beast spirit of the Land Tyrant Clan. Allows draconic bodily transformation: dragon claw, dragon arm, dragon wings, and dragon head as rings are acquired.',
    element: 'Lightning, Thunder & Draconic Force',
    baseHp: 760,
    baseAttack: 100,
    baseDefense: 50,
    baseSpeed: 38,
    avatarBonusDesc: 'True Dragon Body electrifies user attacks with cascading lightning chains that stun targets for 2 seconds.',
    image: '/src/assets/images/martial_soul_dragon_1791144090196.jpg',
    colorScheme: {
      primary: '#60A5FA',
      border: '#2563EB',
      glow: 'rgba(96, 165, 250, 0.6)',
    },
  },
  {
    id: 'evil_eye_white_tiger',
    era: 'sl1',
    name: 'Evil Eye White Tiger',
    chineseName: '邪眸白虎 (星罗皇室 · 戴沐白)',
    type: 'beast',
    category: 'strength',
    categoryName: 'Strength & Beast · 强攻兽武魂',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Imperial Bloodline)',
    description: 'Imperial beast martial soul of the Star Luo Empire. Double pupils convey unyielding battle intent, White Tiger Vajra Transformation, and White Tiger Demon God Body.',
    element: 'Metal, Light & Ferocity',
    baseHp: 780,
    baseAttack: 98,
    baseDefense: 56,
    baseSpeed: 34,
    avatarBonusDesc: 'White Tiger Demon God Transformation increases all attributes by 60% and grants continuous 25% lifesteal.',
    image: '/src/assets/images/martial_soul_hammer_1791144077856.jpg',
    colorScheme: {
      primary: '#FBBF24',
      border: '#D97706',
      glow: 'rgba(251, 191, 36, 0.6)',
    },
  },
  {
    id: 'flame_phoenix',
    era: 'sl1',
    name: 'Evil Fire Phoenix',
    chineseName: '炽火邪凤 (马红俊 · 凤凰涅槃)',
    type: 'beast',
    category: 'elemental',
    categoryName: 'Elemental & Beast · 火元素爆发系',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Divine Bird Mutation)',
    description: 'Mutated avian beast spirit wielding inextinguishable crimson solar flames. Capable of soaring aerial bombardment and miraculous Phoenix Nirvana resurrection.',
    element: 'Extreme Fire & Nirvana Flame',
    baseHp: 750,
    baseAttack: 106,
    baseDefense: 48,
    baseSpeed: 38,
    avatarBonusDesc: 'Phoenix Nirvana restores 40% HP upon receiving lethal damage and triggers a giant fire radial explosion.',
    image: '/src/assets/images/fighting_battle_clash_1791176595756.jpg',
    colorScheme: {
      primary: '#F97316',
      border: '#EA580C',
      glow: 'rgba(249, 115, 22, 0.6)',
    },
  },
  {
    id: 'death_spider_emperor',
    era: 'sl1',
    name: 'Death Spider Emperor',
    chineseName: '死亡蜘蛛皇 (比比东 · 毒蛛主宰)',
    type: 'beast',
    category: 'control',
    categoryName: 'Control & Poison · 剧毒控制系',
    rankTier: 'top',
    rankTierName: 'Top Tier Spirit · 顶级武魂 (10%)',
    rarityChanceText: 'Awakening Rate: 10% (Spider Sovereign)',
    description: 'Deadly arachnid beast soul wielded by Supreme Pontiff Bibi Dong. Spits out razor-sharp spider silk webs, corrosive venom scythes, and necrotic poison fields.',
    element: 'Evil, Web & Corrosive Venom',
    baseHp: 820,
    baseAttack: 104,
    baseDefense: 54,
    baseSpeed: 42,
    avatarBonusDesc: 'Death Domain grants 3 seconds of immortality and inflicts continuous percentage-based true poison.',
    image: '/src/assets/images/beast_dark_devilgod_1791178527805.jpg',
    colorScheme: {
      primary: '#84CC16',
      border: '#65A30D',
      glow: 'rgba(132, 204, 22, 0.6)',
    },
  },

  // ==========================================
  // 4. HIGH TIER (高级武魂 · 35% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'seven_treasure_pagoda',
    era: 'sl1',
    name: 'Seven Treasure Glazed Tile Pagoda',
    chineseName: '七宝琉璃塔 (宁风致 · 上三宗宗主)',
    type: 'tool',
    category: 'gem',
    categoryName: 'Gem & Auxiliary · 宝石辅助系',
    rankTier: 'high',
    rankTierName: 'High Tier Spirit · 高级武魂 (35%)',
    rarityChanceText: 'Awakening Rate: 35% (Noble Glazed Gem)',
    description: 'Renowned gem-type auxiliary spirit revered across the continent. Possesses 7 glowing prismatic jewel levels providing massive percentage boosts to allies.',
    element: 'Gem Resonance & Holy Auxiliary',
    baseHp: 780,
    baseAttack: 50,
    baseDefense: 65,
    baseSpeed: 30,
    avatarBonusDesc: 'Glazed Radiance enhances all squad attack and defense by 25%.',
    image: '/src/assets/images/glazed_tile_pagoda_gem_1791220230027.jpg',
    colorScheme: {
      primary: '#38BDF8',
      border: '#0EA5E9',
      glow: 'rgba(56, 189, 248, 0.5)',
    },
  },
  {
    id: 'nether_civet',
    era: 'sl1',
    name: 'Netherworld Civet',
    chineseName: '幽冥灵猫 (朱竹清 · 幽冥敏攻)',
    type: 'beast',
    category: 'agility',
    categoryName: 'Agility Attack · 敏攻刺杀系',
    rankTier: 'high',
    rankTierName: 'High Tier Spirit · 高级武魂 (35%)',
    rarityChanceText: 'Awakening Rate: 35% (Agile Noble Feline)',
    description: 'Aristocratic feline beast spirit known for untraceable stealth, phantom claw strikes, and dark shadow evasion.',
    element: 'Shadow, Darkness & Phantom Speed',
    baseHp: 640,
    baseAttack: 94,
    baseDefense: 38,
    baseSpeed: 48,
    avatarBonusDesc: 'Nether Doppelganger grants 35% evasion and 40% increased critical strike rate.',
    image: '/src/assets/images/beast_dark_devilgod_1791178527805.jpg',
    colorScheme: {
      primary: '#C084FC',
      border: '#A855F7',
      glow: 'rgba(168, 85, 247, 0.5)',
    },
  },
  {
    id: 'xuanwu_turtle',
    era: 'sl1',
    name: 'Xuanwu Divine Turtle',
    chineseName: '玄武神龟 (石墨/石磨 · 极致防御)',
    type: 'beast',
    category: 'defense',
    categoryName: 'Defense Type · 坚盾防御系',
    rankTier: 'high',
    rankTierName: 'High Tier Spirit · 高级武魂 (35%)',
    rarityChanceText: 'Awakening Rate: 35% (Ancient Iron Shell)',
    description: 'Sacred tortoise beast spirit capable of splitting its heavy shell into flying bladed shields, offering near-impenetrable barrier mitigation.',
    element: 'Water & Earth Bastion',
    baseHp: 950,
    baseAttack: 62,
    baseDefense: 82,
    baseSpeed: 22,
    avatarBonusDesc: 'Xuanwu Shield Bastion cuts all incoming damage by 50% and deflects projectiles.',
    image: '/src/assets/images/spirit_beast_titan_1791144100858.jpg',
    colorScheme: {
      primary: '#0D9488',
      border: '#0F766E',
      glow: 'rgba(13, 148, 136, 0.5)',
    },
  },
  {
    id: 'diamond_mammoth',
    era: 'sl1',
    name: 'Diamond Mammoth',
    chineseName: '钻石猛犸 (呼延震 · 象甲宗重甲)',
    type: 'beast',
    category: 'defense',
    categoryName: 'Defense & Strength · 重甲防御系',
    rankTier: 'high',
    rankTierName: 'High Tier Spirit · 高级武魂 (35%)',
    rarityChanceText: 'Awakening Rate: 35% (Elephant Armored Sect)',
    description: 'Gigantic heavyweight pachyderm beast spirit. Diamond-plated hide and massive tusks shrug off bludgeoning and bladed strikes alike.',
    element: 'Earth & Crystalline Density',
    baseHp: 960,
    baseAttack: 68,
    baseDefense: 80,
    baseSpeed: 20,
    avatarBonusDesc: 'Diamond Fortress Body reduces damage taken by 45% and reflects 20% back to attackers.',
    image: '/src/assets/images/spirit_beast_titan_1791144100858.jpg',
    colorScheme: {
      primary: '#94A3B8',
      border: '#475569',
      glow: 'rgba(148, 163, 184, 0.5)',
    },
  },
  {
    id: 'swift_wind_wolf',
    era: 'sl1',
    name: 'Swift Wind Double-Headed Wolf',
    chineseName: '疾风双头狼 (风笑天 · 自创魂技)',
    type: 'beast',
    category: 'agility',
    categoryName: 'Agility & Wind · 疾风敏攻系',
    rankTier: 'high',
    rankTierName: 'High Tier Spirit · 高级武魂 (35%)',
    rarityChanceText: 'Awakening Rate: 35% (Kamikaze College)',
    description: 'A mutated twin-headed canine predator that rides upon gale-force drafts. Can execute the 36 Consecutive Wind Slashes.',
    element: 'Wind, Tempest & Speed',
    baseHp: 670,
    baseAttack: 92,
    baseDefense: 40,
    baseSpeed: 45,
    avatarBonusDesc: 'Tempest Gale Wings grant continuous 20% bonus movement and attack speed.',
    image: '/src/assets/images/soul_land_forest_bg_1791144063367.jpg',
    colorScheme: {
      primary: '#2DD4BF',
      border: '#0F766E',
      glow: 'rgba(45, 212, 191, 0.5)',
    },
  },

  // ==========================================
  // 5. INTERMEDIATE TIER (中级武魂 · 45% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'recovery_big_sausage',
    era: 'sl1',
    name: 'Recovery Big Sausage',
    chineseName: '恢复大香肠 (奥斯卡 · 食物辅助系)',
    type: 'tool',
    category: 'food',
    categoryName: 'Food Type · 食物系 (治愈恢复)',
    rankTier: 'intermediate',
    rankTierName: 'Intermediate Tier Spirit · 中级武魂 (45%)',
    rarityChanceText: 'Awakening Rate: 45% (Food Creation Master)',
    description: 'Rare food-type martial soul. Chanting quirky incantations produces savory sausages that accelerate HP regeneration, detoxify poisons, and grant temporary flight.',
    element: 'Food Essence & Sustenance',
    baseHp: 720,
    baseAttack: 42,
    baseDefense: 50,
    baseSpeed: 28,
    avatarBonusDesc: 'Super Big Sausage continuously regenerates 5% HP and restores 15 spirit energy every 2 seconds.',
    image: '/src/assets/images/meditating_spirit_master_1791176901033.jpg',
    colorScheme: {
      primary: '#FB923C',
      border: '#EA580C',
      glow: 'rgba(251, 146, 60, 0.45)',
    },
  },
  {
    id: 'ghost_shadow_bamboo',
    era: 'sl1',
    name: 'Ghost Shadow Bamboo',
    chineseName: '鬼影修竹 (敏捷植物 · 缠绕破空)',
    type: 'tool',
    category: 'plant',
    categoryName: 'Plant & Agility · 植物修竹系',
    rankTier: 'intermediate',
    rankTierName: 'Intermediate Tier Spirit · 中级武魂 (45%)',
    rarityChanceText: 'Awakening Rate: 45% (Forest Bamboo Grove)',
    description: 'Flexible dark bamboo that flexes with remarkable spring velocity, piercing foes with splintered wooden needle volleys.',
    element: 'Wood & Kinetic Spring',
    baseHp: 650,
    baseAttack: 72,
    baseDefense: 45,
    baseSpeed: 38,
    avatarBonusDesc: 'Bamboo Gale Needle storm binds and bleeds all surrounding foes.',
    image: '/src/assets/images/soul_land_forest_bg_1791144063367.jpg',
    colorScheme: {
      primary: '#4ADE80',
      border: '#16A34A',
      glow: 'rgba(74, 222, 128, 0.45)',
    },
  },
  {
    id: 'iron_armor_rhino',
    era: 'sl1',
    name: 'Iron Armor Rhinoceros',
    chineseName: '铁甲狂犀 (防御强攻 · 蛮力冲撞)',
    type: 'beast',
    category: 'defense',
    categoryName: 'Defense & Brute · 蛮力重甲系',
    rankTier: 'intermediate',
    rankTierName: 'Intermediate Tier Spirit · 中级武魂 (45%)',
    rarityChanceText: 'Awakening Rate: 45% (Steel Horn Tribe)',
    description: 'Thick-skinned charging beast martial soul with a reinforced nasal horn designed to shatter city fortifications.',
    element: 'Earth & Iron Plating',
    baseHp: 820,
    baseAttack: 68,
    baseDefense: 66,
    baseSpeed: 24,
    avatarBonusDesc: 'Rhinoceros Charge stuns enemies caught in the headlong rush for 1.5 seconds.',
    image: '/src/assets/images/spirit_beast_titan_1791144100858.jpg',
    colorScheme: {
      primary: '#64748B',
      border: '#334155',
      glow: 'rgba(100, 116, 139, 0.45)',
    },
  },
  {
    id: 'flame_hound',
    era: 'sl1',
    name: 'Flame Hound',
    chineseName: '烈焰魔犬 (火属敏攻 · 扑咬碎骨)',
    type: 'beast',
    category: 'elemental',
    categoryName: 'Elemental & Beast · 火元素犬系',
    rankTier: 'intermediate',
    rankTierName: 'Intermediate Tier Spirit · 中级武魂 (45%)',
    rarityChanceText: 'Awakening Rate: 45% (Fire Pack Hunter)',
    description: 'Fiery canine beast soul that leaves burning paw prints. Specializes in pack tactics, flanking maneuvers, and burning fangs.',
    element: 'Fire & Burning Bite',
    baseHp: 680,
    baseAttack: 76,
    baseDefense: 42,
    baseSpeed: 36,
    avatarBonusDesc: 'Hellfire Howl boosts user fire damage by 25% for 8 seconds.',
    image: '/src/assets/images/fighting_battle_clash_1791176595756.jpg',
    colorScheme: {
      primary: '#F87171',
      border: '#DC2626',
      glow: 'rgba(248, 113, 113, 0.45)',
    },
  },

  // ==========================================
  // 6. NORMAL TIER (普通武魂 · 65% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'iron_broadsword',
    era: 'sl1',
    name: 'Tempered Iron Sword',
    chineseName: '精铁长剑 (普通器武魂 · 军中兵刃)',
    type: 'tool',
    category: 'tool',
    categoryName: 'Tool Type · 普通器武魂 (精铁剑)',
    rankTier: 'normal',
    rankTierName: 'Normal Spirit · 普通武魂 (65%)',
    rarityChanceText: 'Awakening Rate: 65% (Mundane Weapon)',
    description: 'A standard forged iron blade common among city guards and mercenary spirit masters across the Heaven Dou Empire.',
    element: 'Standard Steel',
    baseHp: 560,
    baseAttack: 62,
    baseDefense: 36,
    baseSpeed: 28,
    avatarBonusDesc: 'Iron Blade Cleave delivers 20% bonus physical slash damage.',
    image: '/src/assets/images/seven_killing_sword_1791220338549.jpg',
    colorScheme: {
      primary: '#94A3B8',
      border: '#475569',
      glow: 'rgba(148, 163, 184, 0.35)',
    },
  },
  {
    id: 'wild_mountain_boar',
    era: 'sl1',
    name: 'Wild Mountain Boar',
    chineseName: '山林野猪 (普通兽武魂 · 粗糙皮肉)',
    type: 'beast',
    category: 'strength',
    categoryName: 'Beast & Strength · 普通兽武魂',
    rankTier: 'normal',
    rankTierName: 'Normal Spirit · 普通武魂 (65%)',
    rarityChanceText: 'Awakening Rate: 65% (Woodland Beast)',
    description: 'Rugged wild boar beast soul providing decent resilience and hearty stamina for rural spirit masters.',
    element: 'Earth & Beast Hide',
    baseHp: 640,
    baseAttack: 58,
    baseDefense: 44,
    baseSpeed: 22,
    avatarBonusDesc: 'Wild Boar Tusk Smash knocks back foes by 3 paces.',
    image: '/src/assets/images/spirit_beast_titan_1791144100858.jpg',
    colorScheme: {
      primary: '#78716C',
      border: '#44403C',
      glow: 'rgba(120, 113, 108, 0.35)',
    },
  },
  {
    id: 'woodland_gray_wolf',
    era: 'sl1',
    name: 'Woodland Gray Wolf',
    chineseName: '荒原野狼 (普通兽武魂 · 敏捷爪牙)',
    type: 'beast',
    category: 'agility',
    categoryName: 'Beast & Agility · 普通野狼系',
    rankTier: 'normal',
    rankTierName: 'Normal Spirit · 普通武魂 (65%)',
    rarityChanceText: 'Awakening Rate: 65% (Grassland Predator)',
    description: 'A lean gray predator soul found frequently in countryside village children awakenings.',
    element: 'Beast Tooth & Agility',
    baseHp: 540,
    baseAttack: 64,
    baseDefense: 32,
    baseSpeed: 34,
    avatarBonusDesc: 'Wolf Pack Bite increases attack speed by 15%.',
    image: '/src/assets/images/soul_land_forest_bg_1791144063367.jpg',
    colorScheme: {
      primary: '#9CA3AF',
      border: '#4B5563',
      glow: 'rgba(156, 163, 175, 0.35)',
    },
  },

  // ==========================================
  // 7. WASTE SPIRIT TIER (废武魂 · 80% AWAKENING CHANCE)
  // ==========================================
  {
    id: 'blue_silver_grass_waste',
    era: 'sl1',
    name: 'Blue Silver Grass (Weed)',
    chineseName: '蓝银草 (标准公认废武魂 · 随处可见野草)',
    type: 'tool',
    category: 'plant',
    categoryName: 'Plant & Weed · 典型废武魂 (蓝银草)',
    rankTier: 'waste',
    rankTierName: 'Waste Spirit · 废武魂 (80%)',
    rarityChanceText: 'Awakening Rate: 80% (Universal Wild Grass)',
    description: 'The universally acknowledged standard waste martial soul of Douluo Continent. Grows everywhere on roadsides without attack power, defense, or innate soul rank, yet holds dormant ancestral royal veins!',
    element: 'Frail Herb & Tenacious Vitality',
    baseHp: 480,
    baseAttack: 38,
    baseDefense: 28,
    baseSpeed: 25,
    avatarBonusDesc: 'Grassland Resilience allows survival with 1 HP remaining when struck by mortal blow.',
    image: '/src/assets/images/waste_spirit_weed_1791220244464.jpg',
    colorScheme: {
      primary: '#6EE7B7',
      border: '#059669',
      glow: 'rgba(110, 231, 183, 0.4)',
    },
  },
  {
    id: 'luo_sanpao',
    era: 'sl1',
    name: 'Luo Sanpao',
    chineseName: '罗三炮 (变异变异废武魂 · 玉小刚)',
    type: 'beast',
    category: 'beast',
    categoryName: 'Beast Mutation · 异变体废武魂',
    rankTier: 'waste',
    rankTierName: 'Waste Spirit · 废武魂 (80%)',
    rarityChanceText: 'Awakening Rate: 80% (Defective Dragon Mutation)',
    description: 'Grandmaster Yu Xiaogang\'s mutant spirit. Originally destined to be the Blue Lightning Tyrant Dragon, a flawed mutation turned it into a chubby pig-dragon capable of firing flatulent shockwaves after eating radishes.',
    element: 'Flatulent Thunder & Radish Energy',
    baseHp: 520,
    baseAttack: 40,
    baseDefense: 35,
    baseSpeed: 20,
    avatarBonusDesc: 'Sanpao Thunder Fart disorients enemies for 2 seconds with pungent smoke.',
    image: '/src/assets/images/waste_spirit_weed_1791220244464.jpg',
    colorScheme: {
      primary: '#FCD34D',
      border: '#D97706',
      glow: 'rgba(252, 211, 77, 0.4)',
    },
  },
  {
    id: 'rusty_farming_sickle',
    era: 'sl1',
    name: 'Rusty Farming Sickle',
    chineseName: '生锈农镰 (乡村农具 · 废武魂)',
    type: 'tool',
    category: 'tool',
    categoryName: 'Tool & Farming · 农具废武魂',
    rankTier: 'waste',
    rankTierName: 'Waste Spirit · 废武魂 (80%)',
    rarityChanceText: 'Awakening Rate: 80% (Mundane Farming Tool)',
    description: 'An old iron sickle used by peasants to harvest wheat. Possesses virtually no combat capacity or spirit power circulation.',
    element: 'Rusty Metal',
    baseHp: 450,
    baseAttack: 36,
    baseDefense: 24,
    baseSpeed: 24,
    avatarBonusDesc: 'Harvest Slash gathers 1 extra grain of crop.',
    image: '/src/assets/images/waste_spirit_weed_1791220244464.jpg',
    colorScheme: {
      primary: '#A3A3A3',
      border: '#525252',
      glow: 'rgba(163, 163, 163, 0.3)',
    },
  },
  {
    id: 'ceramic_teacup',
    era: 'sl1',
    name: 'Coarse Ceramic Teacup',
    chineseName: '粗瓷茶杯 (日用杂物 · 废武魂)',
    type: 'tool',
    category: 'tool',
    categoryName: 'Tool & Household · 杂器废武魂',
    rankTier: 'waste',
    rankTierName: 'Waste Spirit · 废武魂 (80%)',
    rarityChanceText: 'Awakening Rate: 80% (Fragile Household Utensil)',
    description: 'A fragile clay vessel for drinking boiled tea. Shakes when channeled with spirit power.',
    element: 'Brittle Ceramic',
    baseHp: 420,
    baseAttack: 30,
    baseDefense: 22,
    baseSpeed: 20,
    avatarBonusDesc: 'Tea Splash quenches user thirst.',
    image: '/src/assets/images/waste_spirit_weed_1791220244464.jpg',
    colorScheme: {
      primary: '#9CA3AF',
      border: '#4B5563',
      glow: 'rgba(156, 163, 175, 0.3)',
    },
  },
];

/**
 * Canon Realm Titles & Ring Limits
 */
export const REALM_NAMES = [
  { minRank: 1, maxRank: 10, title: 'Spirit Scholar', chinese: '魂士', ringsAllowed: 0 },
  { minRank: 11, maxRank: 20, title: 'Spirit Master', chinese: '魂师', ringsAllowed: 1 },
  { minRank: 21, maxRank: 30, title: 'Spirit Grandmaster', chinese: '大魂师', ringsAllowed: 2 },
  { minRank: 31, maxRank: 40, title: 'Spirit Elder', chinese: '魂尊', ringsAllowed: 3 },
  { minRank: 41, maxRank: 50, title: 'Spirit Ancestor', chinese: '魂宗', ringsAllowed: 4 },
  { minRank: 51, maxRank: 60, title: 'Spirit King', chinese: '魂王', ringsAllowed: 5 },
  { minRank: 61, maxRank: 70, title: 'Spirit Emperor', chinese: '魂帝', ringsAllowed: 6 },
  { minRank: 71, maxRank: 80, title: 'Spirit Saint', chinese: '魂圣', ringsAllowed: 7 }, // True Avatar!
  { minRank: 81, maxRank: 90, title: 'Spirit Douluo', chinese: '魂斗罗', ringsAllowed: 8 },
  { minRank: 91, maxRank: 98, title: 'Titled Douluo', chinese: '封号斗罗', ringsAllowed: 9 },
  { minRank: 99, maxRank: 99, title: 'Limit Douluo', chinese: '极限斗罗', ringsAllowed: 9 },
  { minRank: 100, maxRank: 100, title: 'God King Rank', chinese: '神王级 (海神/修罗神/龙神)', ringsAllowed: 10 },
];

export function getRealmInfo(rank: number) {
  const clamped = Math.min(100, Math.max(1, rank));
  const found = REALM_NAMES.find(r => clamped >= r.minRank && clamped <= r.maxRank);
  return found || REALM_NAMES[0];
}

export function getRankTierBadgeColor(tier?: MartialSoulRankTier): { bg: string; border: string; text: string; glow: string } {
  switch (tier) {
    case 'divine':
      return {
        bg: 'bg-amber-500/20',
        border: 'border-amber-400',
        text: 'text-amber-300 font-bold',
        glow: 'shadow-[0_0_15px_rgba(245,158,11,0.5)]',
      };
    case 'super':
      return {
        bg: 'bg-purple-500/20',
        border: 'border-purple-400',
        text: 'text-purple-300 font-bold',
        glow: 'shadow-[0_0_12px_rgba(168,85,247,0.4)]',
      };
    case 'top':
      return {
        bg: 'bg-rose-500/20',
        border: 'border-rose-400',
        text: 'text-rose-300 font-bold',
        glow: 'shadow-[0_0_10px_rgba(244,63,94,0.4)]',
      };
    case 'high':
      return {
        bg: 'bg-blue-500/20',
        border: 'border-blue-400',
        text: 'text-blue-300 font-bold',
        glow: 'shadow-[0_0_10px_rgba(59,130,246,0.3)]',
      };
    case 'intermediate':
      return {
        bg: 'bg-emerald-500/20',
        border: 'border-emerald-400',
        text: 'text-emerald-300 font-semibold',
        glow: 'shadow-[0_0_8px_rgba(16,185,129,0.3)]',
      };
    case 'normal':
      return {
        bg: 'bg-slate-700/40',
        border: 'border-slate-500',
        text: 'text-slate-300',
        glow: 'shadow-none',
      };
    case 'waste':
    default:
      return {
        bg: 'bg-stone-800/40',
        border: 'border-stone-600',
        text: 'text-stone-300',
        glow: 'shadow-none',
      };
  }
}

export function getRankTierLabel(tier?: MartialSoulRankTier): string {
  switch (tier) {
    case 'divine': return 'Divine Tier · 神级武魂 (1%)';
    case 'super': return 'Super Tier · 超级武魂 (5%)';
    case 'top': return 'Top Tier · 顶级武魂 (10%)';
    case 'high': return 'High Tier · 高级武魂 (35%)';
    case 'intermediate': return 'Intermediate Tier · 中级武魂 (45%)';
    case 'normal': return 'Normal Tier · 普通武魂 (65%)';
    case 'waste': return 'Waste Spirit · 废武魂 (80%)';
    default: return 'Spirit Rank';
  }
}

export function getCategoryLabel(category?: MartialSoulCategory): string {
  switch (category) {
    case 'healing': return 'Healing Type (治疗系)';
    case 'support': return 'Support Type (辅助系)';
    case 'auxiliary': return 'Auxiliary Type (增益辅助系)';
    case 'strength': return 'Strength Type (强攻系 / 力量型)';
    case 'agility': return 'Agility Type (敏攻系)';
    case 'control': return 'Control Type (控制系)';
    case 'defense': return 'Defense Type (防御系)';
    case 'elemental': return 'Elemental Type (元素系)';
    case 'beast': return 'Beast Type (兽武魂)';
    case 'plant': return 'Plant Type (植物系)';
    case 'gem': return 'Gem / Jewel Type (宝石系)';
    case 'tool': return 'Tool Type (器武魂)';
    case 'food': return 'Food Type (食物系)';
    default: return 'Soul Category';
  }
}

/**
 * Exact probability roll specified by the user:
 * - Divine rank: 1% chance
 * - Super tier: 5% chance
 * - Top tier: 10% chance
 * - High tier: 35% chance
 * - Intermediate tier: 45% chance
 * - Normal tier: 65% chance
 * - Waste spirit: 80% chance
 */
export function rollTierByExactOdds(): MartialSoulRankTier {
  const roll = Math.random() * 100;
  if (roll < 1.0) return 'divine';       // 1%
  if (roll < 5.0) return 'super';        // 5% cumulative
  if (roll < 10.0) return 'top';         // 10% cumulative
  if (roll < 35.0) return 'high';        // 35% cumulative
  if (roll < 45.0) return 'intermediate';// 45% cumulative
  if (roll < 65.0) return 'normal';      // 65% cumulative
  return 'waste';                        // Up to 100% (80% waste rate)
}

export function getRingColorHex(tier: string): string {
  switch (tier) {
    case 'white': return '#F1F5F9';
    case 'yellow': return '#EAB308';
    case 'purple': return '#A855F7';
    case 'black': return '#6366F1';
    case 'red': return '#EF4444';
    case 'gold': return '#F59E0B';
    default: return '#EAB308';
  }
}

export function getRingGlowStyle(tier: string): string {
  switch (tier) {
    case 'white': return '0 0 10px rgba(255,255,255,0.7)';
    case 'yellow': return '0 0 14px rgba(234, 179, 8, 0.85)';
    case 'purple': return '0 0 18px rgba(168, 85, 247, 0.9)';
    case 'black': return '0 0 20px rgba(99, 102, 241, 0.95)';
    case 'red': return '0 0 28px rgba(239, 68, 68, 1)';
    case 'gold': return '0 0 34px rgba(245, 158, 11, 1)';
    default: return '0 0 10px rgba(234, 179, 8, 0.8)';
  }
}

export const DONGHUA_SOUL_RING_IMAGE = '/src/assets/images/soul_ring_donghua_anim_1791177706402.jpg';
export const CHILD_SPIRIT_MASTER_IMAGE = '/src/assets/images/spirit_master_child_1791177725351.jpg';
export const YOUTH_SPIRIT_MASTER_IMAGE = '/src/assets/images/meditating_spirit_master_1791176901033.jpg';
export const VENERABLE_SPIRIT_MASTER_IMAGE = '/src/assets/images/spirit_master_venerable_1791177755559.jpg';
export const BREAKTHROUGH_REACTION_IMAGE = '/src/assets/images/spirit_master_breakthrough_1791177742106.jpg';

export interface DonghuaRingDetails {
  tier: string;
  name: string;
  chinese: string;
  yearsRange: string;
  runeDescription: string;
  colorHex: string;
  glowColor: string;
}

export const DONGHUA_RING_TIERS: DonghuaRingDetails[] = [
  {
    tier: 'white',
    name: 'Ten-Year Soul Ring',
    chinese: '十年白玉符文环',
    yearsRange: '10 - 99 Years',
    runeDescription: 'Faint circular mist ring with ancient glyphs of weak woodland beasts.',
    colorHex: '#F1F5F9',
    glowColor: 'rgba(255,255,255,0.7)',
  },
  {
    tier: 'yellow',
    name: 'Hundred-Year Soul Ring',
    chinese: '百年明黄古符环',
    yearsRange: '100 - 999 Years',
    runeDescription: 'Luminous golden-amber ring etched with Douluo ancient beast runes and topaz sparks.',
    colorHex: '#EAB308',
    glowColor: 'rgba(234,179,8,0.85)',
  },
  {
    tier: 'purple',
    name: 'Thousand-Year Soul Ring',
    chinese: '千年紫晶雷耀环',
    yearsRange: '1,000 - 9,999 Years',
    runeDescription: 'Deep royal amethyst ring crackling with spatial lightning wisps and arcane runes.',
    colorHex: '#A855F7',
    glowColor: 'rgba(168,85,247,0.9)',
  },
  {
    tier: 'black',
    name: 'Ten-Thousand-Year Soul Ring',
    chinese: '万年黑曜冥渊环',
    yearsRange: '10,000 - 99,999 Years',
    runeDescription: 'Heavy obsidian abyss band with crimson crackles, demonic beast seal inscriptions, and oppressive gravity.',
    colorHex: '#1E293B',
    glowColor: 'rgba(99,102,241,0.95)',
  },
  {
    tier: 'red',
    name: 'Hundred-Thousand-Year Divine Ring',
    chinese: '十万年血狱炎神环',
    yearsRange: '100,000 - 999,999 Years',
    runeDescription: 'Legendary blood-ruby divine halo with swirling solar phoenix runes, celestial flame sparks, and god-tier presence.',
    colorHex: '#EF4444',
    glowColor: 'rgba(239,68,68,1)',
  },
  {
    tier: 'gold',
    name: 'Million-Year / Divine God Ring',
    chinese: '百万年赤金神王环',
    yearsRange: '1,000,000+ Years',
    runeDescription: 'Peerless celestial platinum-gold halo carrying Sea God and Asura God divine scripts, shining with eternal cosmic luminescence.',
    colorHex: '#F59E0B',
    glowColor: 'rgba(245,158,11,1)',
  },
];

export interface CultivationAgeInfo {
  ageYears: number;
  ageMonths: number;
  totalYearsCultivated: number;
  appearanceStage: 'child' | 'youth' | 'venerable';
  isYouthRetained: boolean;
  lifespanYears: number;
  image: string;
  stageName: string;
}

export function calculateAgeInfo(inGameMonths: number = 72, rank: number = 10): CultivationAgeInfo {
  const totalMonths = Math.max(72, inGameMonths);
  const ageYears = Math.floor(totalMonths / 12);
  const ageMonths = totalMonths % 12;
  const totalYearsCultivated = ageYears - 6;

  let lifespanYears = 80;
  if (rank >= 100) lifespanYears = 99999;
  else if (rank >= 90) lifespanYears = 350 + (rank - 90) * 30;
  else if (rank >= 70) lifespanYears = 180 + (rank - 70) * 6;
  else if (rank >= 50) lifespanYears = 130 + (rank - 50) * 2;
  else if (rank >= 30) lifespanYears = 100 + (rank - 30);

  const isYouthRetained = rank >= 50 || (rank >= 30 && ageYears < 45);

  let appearanceStage: 'child' | 'youth' | 'venerable' = 'youth';
  let image = YOUTH_SPIRIT_MASTER_IMAGE;
  let stageName = 'Prime Youth Spirit Master (青年魂师)';

  if (ageYears < 12) {
    appearanceStage = 'child';
    image = CHILD_SPIRIT_MASTER_IMAGE;
    stageName = 'Child Prodigy (幼年魂师 · 6-11岁)';
  } else if (isYouthRetained || (ageYears >= 12 && ageYears < 50)) {
    appearanceStage = 'youth';
    image = YOUTH_SPIRIT_MASTER_IMAGE;
    stageName = isYouthRetained
      ? 'Peerless Youth Retained (驻颜有术 · 青春永驻)'
      : 'Shrek Academy Youth (青年魂师 · 意气风发)';
  } else {
    appearanceStage = 'venerable';
    image = VENERABLE_SPIRIT_MASTER_IMAGE;
    stageName = 'Venerable Elder Master (垂暮老者 · 需破境延寿)';
  }

  return {
    ageYears,
    ageMonths,
    totalYearsCultivated,
    appearanceStage,
    isYouthRetained,
    lifespanYears,
    image,
    stageName,
  };
}
