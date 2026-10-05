import { SoulQuest } from '../types/game';

export const INITIAL_SOUL_QUESTS: SoulQuest[] = [
  {
    id: 'quest_datura_snake',
    title: 'Cull the Venomous Datura Snakes',
    chineseTitle: '猎杀外围区 · 曼陀罗蛇',
    category: 'hunting',
    rankReq: 10,
    description: 'The venomous Datura Snakes on the outer rim of Star Dou Forest threaten novice travelers. Slay 1 Datura Snake.',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    rewardBronze: 50000, // 50 Silver
    rewardExp: 200,
    rewardItems: [
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 3 },
      { id: 'beast_meat', name: 'Spirit Beast Meat (灵气兽肉)', count: 2 },
    ],
  },
  {
    id: 'quest_gather_spirit_grass',
    title: 'Gather Spirit Increasing Grass',
    chineseTitle: '采集圣魂村秘药 · 聚灵草',
    category: 'gathering',
    rankReq: 5,
    description: 'Elder Jack of Holy Soul Village requires fresh spirit herbs to prepare soothing elixirs for young apprentices.',
    targetCount: 3,
    currentCount: 0,
    completed: false,
    rewardBronze: 20000, // 20 Silver
    rewardExp: 150,
    rewardItems: [
      { id: 'spirit_grass', name: 'Spirit Increasing Grass (聚灵草)', count: 2 },
    ],
  },
  {
    id: 'quest_ghost_tiger',
    title: 'Hunt the Millennium Ghost Tiger',
    chineseTitle: '剿灭千年狂暴 · 鬼虎',
    category: 'hunting',
    rankReq: 25,
    description: 'A ferocious 4,500-Year Ghost Tiger is terrorizing the Thousand-Pace Canopy with spatial shadow clones. Subdue it.',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    rewardBronze: 200000, // 2 Gold (200 Silver)
    rewardExp: 500,
    rewardItems: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 4 },
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 5 },
    ],
  },
  {
    id: 'quest_escort_caravan',
    title: 'Escort Holy Soul Trade Caravan',
    chineseTitle: '护送圣魂村商队穿越森林',
    category: 'protection',
    rankReq: 15,
    description: 'Protect merchants transporting blacksmithing ores and spirit herbs across the perilous forest outskirts.',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    rewardBronze: 150000, // 1 Gold 50 Silver
    rewardExp: 400,
    rewardItems: [
      { id: 'cold_iron', name: 'Hundred-Refined Fine Steel (百炼精铁)', count: 2 },
      { id: 'beast_meat', name: 'Spirit Beast Meat (灵气兽肉)', count: 3 },
    ],
  },
  {
    id: 'quest_arena_glory',
    title: 'Great Spirit Arena Duelist',
    chineseTitle: '索托大斗魂场 · 首战扬名',
    category: 'arena',
    rankReq: 20,
    description: 'Enter the Suotuo Great Spirit Arena and triumph in 2 formal soul master combat duels to earn coin and renown.',
    targetCount: 2,
    currentCount: 0,
    completed: false,
    rewardBronze: 300000, // 3 Gold
    rewardExp: 600,
    rewardItems: [
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 1 },
    ],
  },
  {
    id: 'quest_man_faced_spider',
    title: 'Exterminate Man-Faced Demon Spider',
    chineseTitle: '绝杀邪恶霸主 · 人面魔蛛',
    category: 'hunting',
    rankReq: 30,
    description: 'The terrifying Eight Spider Lances demon prowls the forest depths. Destroy this menace and claim its exoskeleton.',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    rewardBronze: 500000, // 5 Gold
    rewardExp: 1000,
    rewardItems: [
      { id: 'beast_bone', name: 'Hardened Beast Bone (坚硬兽骨)', count: 6 },
      { id: 'beast_skin', name: 'Spirit Beast Leather (魂兽厚皮)', count: 4 },
      { id: 'spirit_grass', name: 'Spirit Increasing Grass (聚灵草)', count: 3 },
    ],
  },
  {
    id: 'quest_protect_novice_ring',
    title: 'Guard Spirit Master 1st Ring Hunt',
    chineseTitle: '协助诺丁学院后辈猎取第一魂环',
    category: 'protection',
    rankReq: 25,
    description: 'Grandmaster Yu Xiaogang has requested seasoned spirit masters to safeguard junior students hunting their first hundred-year ring.',
    targetCount: 1,
    currentCount: 0,
    completed: false,
    rewardBronze: 250000, // 2.5 Gold
    rewardExp: 450,
    rewardItems: [
      { id: 'spirit_grass', name: 'Spirit Increasing Grass (聚灵草)', count: 2 },
      { id: 'beast_meat', name: 'Spirit Beast Meat (灵气兽肉)', count: 4 },
    ],
  },
  {
    id: 'quest_titan_ape_domain',
    title: 'Investigate the Lake of Life Shallows',
    chineseTitle: '勘察核心圈 · 生命之湖异动',
    category: 'gathering',
    rankReq: 50,
    description: 'Ancient titan roars reverberate through the inner core. Collect rare star herbs and divine spring remnants near the lake.',
    targetCount: 3,
    currentCount: 0,
    completed: false,
    rewardBronze: 1000000, // 10 Gold
    rewardExp: 2500,
    rewardItems: [
      { id: 'cold_silver', name: 'Deep Sea Cold Silver (深海沉银)', count: 3 },
      { id: 'thunder_fruit', name: 'Three-Pattern Thunder Fruit (三纹雷劫果)', count: 1 },
    ],
  },
];

export const BOUNTY_LEADERBOARD = [
  { rank: 1, name: 'Lou Gao (Divine Craftsman)', title: 'Divine Craftsman / Blacksmith President', score: 9850, coinEarned: '45,200 Gold' },
  { rank: 2, name: 'Tang Hao (Clear Sky Douluo)', title: 'Grandmaster Blacksmith', score: 8900, coinEarned: '38,500 Gold' },
  { rank: 3, name: 'Dai Mubai (Evil Eye White Tiger)', title: 'Diamond Bounty Master', score: 6400, coinEarned: '22,100 Gold' },
  { rank: 4, name: 'Zhu Zhuqing (Nether Shadow)', title: 'Shadow Hunter Guild', score: 5800, coinEarned: '19,400 Gold' },
  { rank: 5, name: 'Ma Hongjun (Fire Phoenix)', title: 'Flame Vanguard', score: 4950, coinEarned: '14,800 Gold' },
  { rank: 6, name: 'Ning Rongrong (Glazed Treasure)', title: 'Seven Treasure Pavilion Elder', score: 4200, coinEarned: '32,000 Gold' },
];
