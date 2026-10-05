export type RingColorTier = 'white' | 'yellow' | 'purple' | 'black' | 'red' | 'gold';

export type BeastElement = 'wood' | 'fire' | 'water' | 'earth' | 'wind' | 'lightning' | 'darkness' | 'light' | 'space' | 'evil' | 'poison' | 'dragon';

export interface SoulRingSkill {
  name: string;
  pinyinName: string;
  description: string;
  cooldown: number; // in seconds
  spCost: number;
  damageMultiplier: number;
  effectType: 'damage' | 'shield' | 'control' | 'burst' | 'buff';
  controlDuration?: number; // seconds
  shieldAmount?: number;
  icon: string;
}

export interface SoulRing {
  id: string;
  ringOrder: number; // 1 to 9
  years: number;
  tier: RingColorTier;
  beastOrigin: string;
  skill: SoulRingSkill;
}

export type MartialSoulRankTier = 'waste' | 'normal' | 'intermediate' | 'high' | 'top' | 'super' | 'divine';

export type MartialSoulCategory =
  | 'healing'
  | 'support'
  | 'auxiliary'
  | 'strength'
  | 'agility'
  | 'control'
  | 'defense'
  | 'elemental'
  | 'beast'
  | 'plant'
  | 'gem'
  | 'tool'
  | 'food';

export interface MartialSoul {
  id: string;
  name: string;
  chineseName: string;
  type: 'tool' | 'beast';
  category?: MartialSoulCategory;
  categoryName?: string;
  rankTier?: MartialSoulRankTier;
  rankTierName?: string;
  rarityChanceText?: string;
  description: string;
  element: string;
  baseHp: number;
  baseAttack: number;
  baseDefense: number;
  baseSpeed: number;
  avatarBonusDesc: string;
  image?: string;
  colorScheme: {
    primary: string;
    border: string;
    glow: string;
  };
}

export type SpiritBoneSlot = 'head' | 'torso' | 'left_arm' | 'right_arm' | 'left_leg' | 'right_leg' | 'external';

export interface SpiritBone {
  id: string;
  name: string;
  chineseName: string;
  slot: SpiritBoneSlot;
  years: number;
  tier: RingColorTier;
  hpBonus: number;
  attackBonus: number;
  defenseBonus: number;
  critBonus: number;
  specialSkillName: string;
  specialSkillDesc: string;
}

export interface TangSectArt {
  id: string;
  name: string;
  chineseName: string;
  level: number;
  maxLevel: number;
  description: string;
  bonusDesc: string;
  cultivationCost: number;
  statEffect: {
    critRate?: number;
    evasion?: number;
    defensePercent?: number;
    spRegen?: number;
    damageBoost?: number;
  };
}

export interface HiddenWeapon {
  id: string;
  name: string;
  chineseName: string;
  description: string;
  damage: number;
  pierce: number;
  cooldown: number;
  craftCost: number;
  unlocked: boolean;
}

export interface SpiritBeast {
  id: string;
  name: string;
  chineseName: string;
  zoneId: string;
  years: number;
  tier: RingColorTier;
  element?: BeastElement;
  rankReq: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  description: string;
  image?: string;
  skills: {
    name: string;
    damageMultiplier: number;
    cd: number;
    desc: string;
  }[];
  possibleRing: SoulRing;
  boneDropChance: number;
  droppedBone?: SpiritBone;
  // Resource drops for Blacksmithing & Quests
  droppedResources?: {
    itemId: string;
    name: string;
    count: number;
    chance: number;
  }[];
}

export interface ArenaOpponent {
  id: string;
  name: string;
  title: string;
  rank: number;
  realmName: string;
  martialSoulName: string;
  ringsCount: number;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  rewards: {
    gold: number;
    exp: number;
    crystals: number;
  };
  skills: {
    name: string;
    ringTier: RingColorTier;
    damageMultiplier: number;
    cd: number;
    desc: string;
  }[];
  dialogue: string;
}

// 4-Tier Canonical Soul Land Currency (100:1 conversion ratio)
// 100 Bronze = 1 Copper, 100 Copper = 1 Silver, 100 Silver = 1 Gold
export interface SoulCurrency {
  bronze: number;
  copper: number;
  silver: number;
  gold: number;
}

// Resource item in player inventory
export interface ResourceItem {
  id: string;
  name: string;
  chineseName: string;
  category: 'beast_material' | 'ore' | 'herb' | 'tribulation_treasure' | 'pill' | 'equipment';
  description: string;
  quantity: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'divine';
  sellValueInBronze: number;
  tribulationBonus?: number; // e.g. 0.15 = +15% survival
  cultivationBonus?: number; // e.g. 500 = +500 exp
  equipStats?: {
    attack?: number;
    defense?: number;
    hp?: number;
    speed?: number;
    critRate?: number;
  };
}

export interface SoulQuest {
  id: string;
  title: string;
  chineseTitle: string;
  category: 'hunting' | 'gathering' | 'protection' | 'arena';
  rankReq: number;
  description: string;
  targetCount: number;
  currentCount: number;
  completed: boolean;
  rewardBronze: number;
  rewardExp: number;
  rewardItems?: { id: string; name: string; count: number }[];
}

export type BlacksmithRank = 'Apprentice' | 'Journeyman' | 'Master' | 'Grandmaster' | 'Divine Craftsman (神匠)';

export interface ForgingRecipe {
  id: string;
  name: string;
  chineseName: string;
  slot: 'weapon' | 'armor' | 'helmet' | 'boots' | 'accessory';
  minRank: BlacksmithRank;
  requiredMaterials: { id: string; name: string; count: number }[];
  costBronze: number;
  stats: {
    attack?: number;
    defense?: number;
    hp?: number;
    speed?: number;
    critRate?: number;
  };
  description: string;
}

export interface PlayerStats {
  name: string;
  rank: number;
  currentExp: number;
  maxExp: number;
  hp: number;
  maxHp: number;
  sp: number;
  maxSp: number;
  attack: number;
  defense: number;
  critRate: number; // e.g. 0.15 = 15%
  evasion: number; // e.g. 0.10 = 10%
  speed: number;
  gold: number; // Stored in unified Gold, converted via SoulCurrency
  totalBronzeCoins?: number; // Precise base currency
  soulCrystals: number;
  primarySoul: MartialSoul;
  secondarySoul?: MartialSoul;
  activeSoulIndex: 0 | 1;
  soulRings: SoulRing[];
  secondarySoulRings?: SoulRing[];
  spiritBones: SpiritBone[];
  tangSectArts: TangSectArt[];
  hiddenWeapons: HiddenWeapon[];
  equippedWeapon?: HiddenWeapon;
  equippedArmor?: ResourceItem;
  unlockedZones: string[];
  arenaRankPoints: number;
  godTrialStage: number; // 0 to 9 (Sea God Nine Trials)
  inGameMonths?: number;
  // Inventory & Economy
  inventory: ResourceItem[];
  blacksmithRank: BlacksmithRank;
  blacksmithExp: number;
  tribulationSurvivedCount: number;
  tribulationBonusChance: number;
}

export type ActiveTab =
  | 'cultivation'
  | 'forest'
  | 'arena'
  | 'tangsect'
  | 'spiritbones'
  | 'mall'
  | 'quests'
  | 'blacksmith'
  | 'profile';
