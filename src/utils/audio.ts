/**
 * Bulletproof Web Audio API Sound & Music Controller for Soul Land Cultivation
 * Guaranteed to unlock on first user gesture anywhere on screen.
 */

export interface MusicTrack {
  id: string;
  name: string;
  chineseName: string;
  artist: string;
  themeType: string;
  description: string;
  sceneContext?: string;
  lyrics: string[];
}

export const SOUL_LAND_TRACKS: MusicTrack[] = [
  {
    id: 'po_jian',
    name: 'Break the Cocoon (Po Jian)',
    chineseName: '《破茧》· 张韶涵',
    artist: 'Angela Zhang · Official Donghua Opening Theme',
    themeType: 'Battle Climax Anthemic',
    sceneContext: 'Epic battle moments: Shrek Seven Devils championship finals & Spirit Hall war.',
    description: 'The definitive Soul Land donghua battle anthem. Driving drums, soaring vocals, and indomitable martial will against insurmountable odds.',
    lyrics: [
      '如果在逆境中破茧 (If breaking the cocoon amidst adversity)',
      '绝不向命运妥协！ (Never compromise with destiny!)',
      '痛也从容，狂澜中执着守候 (Pain embraced with grace, standing firm in wild surges)',
      '哪怕这世界被黑暗吞没，为你点燃永恒星火 (Even if the world is swallowed by darkness, I kindle an eternal spark for you)',
      '无畏前行，踏碎神界苍穹！ (Forge ahead fearlessly, shatter the vault of the Divine Realm!)',
    ],
  },
  {
    id: 'bu_she',
    name: 'Reluctant to Part (Bu She)',
    chineseName: '《不舍》· 徐佳莹',
    artist: 'Lala Hsu · Tang San & Xiao Wu Romance Theme',
    themeType: 'Emotional Guzheng & Dizi Flute',
    sceneContext: 'The heartbreaking Star Dou Great Forest sacrifice scene of Xiao Wu.',
    description: 'Soul-stirring Chinese bamboo flute and Guzheng arpeggios honoring the eternal bond between Tang San and Xiao Wu.',
    lyrics: [
      '一吻便偷一个人的心，像偷走整个天下 (A single kiss steals a heart, as if stealing the entire world)',
      '哪怕献祭灵魂化作柔骨兔，也要护你周全 (Even sacrificing my soul into the Soft Bone Rabbit, I will keep you safe)',
      '哥，替我好好活下去... (Ge, live well for me...)',
      '生生世世，相思断肠红永不凋零 (Lifetime after lifetime, the Heartbroken Red flower never withers)',
      '泪洒星斗大森林，魂环血染九重天 (Tears drench the Star Dou Great Forest, soul ring bathes the heavens in crimson)',
    ],
  },
  {
    id: 'juan_lian',
    name: 'Deep Affection (Juan Lian)',
    chineseName: '《眷恋》· 周深',
    artist: 'Zhou Shen · Sea God Island & Resurrection Theme',
    themeType: 'Ethereal Celestial Vocal & Strings',
    sceneContext: 'Sea God Island Nine Trials & Tang San reviving Xiao Wu with 100k-year resurrection.',
    description: 'Zhou Shen\'s sublime celestial vibrato evoking the vastness of the Endless Sea and eternal devotion.',
    lyrics: [
      '穿越海神千重浪，只为追寻你眼眸的星芒 (Crossing thousand surges of the Sea God, only to chase the starlight in your eyes)',
      '这一生执念，化作瀚海无垠的眷恋 (This lifetime devotion turns into the boundless affection of the vast sea)',
      '海神九考，九死一生，为你重塑肉身 (Nine Trials of the Sea God, near death nine times, to reshape your mortal body)',
      '海风吹过，你依然在彼岸等我 (The sea breeze blows, you are still waiting for me on the shore)',
    ],
  },
  {
    id: 'jue_shuang',
    name: 'Unrivaled Pair (Jue Shuang)',
    chineseName: '《绝双》· 汪苏泷',
    artist: 'Silence Wang · Shrek Seven Devils Synergy Theme',
    themeType: 'Youthful Rock & Battle Pop',
    sceneContext: 'Shrek Seven Devils fighting side-by-side in the Continental Advanced Spirit Master Academy Elite Tournament.',
    description: 'Passionate and uplifting battle melody celebrating the unbreakable friendship of the Shrek Seven Devils.',
    lyrics: [
      '七怪齐聚，剑啸苍穹！ (Seven Devils assemble, swords whistling through the heavens!)',
      '绝双配合，破尽万重阵法 (Unrivaled harmony breaking through myriad formations)',
      '生死相托的挚友，并肩撕裂绝境 (Brothers bound by life and death, tearing through despair together)',
      '浩瀚乾坤，谁与争锋！ (Across the vast universe, who dares contest!)',
    ],
  },
  {
    id: 'luo_dan_de_xing',
    name: 'The Solitary Star (Luo Dan De Xing)',
    chineseName: '《落单的星》· 单依纯',
    artist: 'Shan Yichun · Tang San Seclusion & Missing Xiao Wu Theme',
    themeType: 'Melancholic Piano & Cello',
    sceneContext: 'Tang San cultivating alone under moonlight gazing at the rabbit pouch.',
    description: 'Tender and intimate piano ballad conveying loneliness and enduring hope across long cultivation nights.',
    lyrics: [
      '夜空深处落单的星，静静凝望你沉睡的面容 (A solitary star deep in the night sky, quietly gazing at your sleeping face)',
      '蓝银草织成守护的梦境 (Blue silver grass weaves a protective dreamland)',
      '纵然前路漫漫风雪寒凉，心依然温热 (Though the road ahead is cold with endless wind and snow, the heart remains warm)',
      '等晨曦破晓，与你重逢 (Waiting for the dawn to break, to reunite with you)',
    ],
  },
  {
    id: 'zhan_shen',
    name: 'God of War (Zhan Shen)',
    chineseName: '《战神》· 萧敬腾',
    artist: 'Jam Hsiao · Jialing Pass Decisive War Theme',
    themeType: 'High-Octane Hard Rock War Anthem',
    sceneContext: 'The climactic battle of Jialing Pass: Tang San wielding the Asura God Sword against Spirit Hall.',
    description: 'Explosive hard rock guitar riffs and thundering war drums depicting the battle between gods.',
    lyrics: [
      '战鼓震天，烽烟燃尽神界！ (War drums shake the heavens, beacon fire burns through the God Realm!)',
      '昊天神锤，荡平武魂殿千军万马！ (Clear Sky Divine Hammer sweeps across Spirit Hall thousands of troops!)',
      '天生双生，傲视九霄，神王降临！ (Born with twin souls, gazing proudly over the nine skies, God King descends!)',
      '修罗审判，斩断一切宿命枷锁！ (Asura Judgment, sever all chains of fate!)',
    ],
  },
  {
    id: 'yi_zhi_jue_qian_kun',
    name: 'Decisive Throw (Yi Zhi Jue Qian Kun)',
    chineseName: '《一掷决乾坤》· 毛不易',
    artist: 'Mao Buyi · Tang Sect Heritage & Hidden Weapons Theme',
    themeType: 'Epic Folk Guqin & Chinese Flute',
    sceneContext: 'Tang San founding the new Tang Sect and crafting mechanical God-tier hidden weapons.',
    description: 'Poetic, narrative storytelling celebrating the Mysterious Heaven Method and Buddha\'s Fury Tang Lotus.',
    lyrics: [
      '暗器无声破长空，佛怒唐莲一掷决乾坤 (Hidden weapons soundlessly pierce the sky, Buddha\'s Fury Tang Lotus decides destiny in one throw)',
      '紫极魔瞳洞察秋毫，玄天宝录铸就传奇 (Purple Demon Eyes discern the finest detail, Mysterious Heaven Treasure Record forges legends)',
      '唐门辉煌，再现斗罗大陆！ (Tang Sect glory shines once more across Douluo Continent!)',
      '暗箭明锋，只留人间正道！ (Hidden arrows, shining blades, defending righteousness in the mortal realm!)',
    ],
  },
  {
    id: 'su_ming_kuang_lan',
    name: 'Wild Surges of Fate (Su Ming Kuang Lan)',
    chineseName: '《宿命狂澜》· 阿云嘎',
    artist: 'Ayanga · Clear Sky Clan Heritage Theme',
    themeType: 'Symphonic Operatic Grandeur',
    sceneContext: 'Tang San returning to the Clear Sky Clan to pay respects to the clan elders and ancestors.',
    description: 'Thunderous orchestral brass and operatic vocals capturing the tragic history and triumphant resurgence of Clear Sky Clan.',
    lyrics: [
      '狂澜卷起宿命长歌，血脉沸腾撕裂长夜 (Wild surges sweep up fate\'s epic hymn, boiling blood tears through the long night)',
      '十万年魂环璀璨绽放，神祇传承照耀万古 (Hundred-thousand-year soul rings bloom in radiance, divine god inheritance illuminates eternity)',
      '昊天九绝，重塑宗门铁血荣光！ (Nine Clear Sky Arts, restore the iron-blooded glory of our clan!)',
    ],
  },
  {
    id: 'douluo_anthem',
    name: 'Douluo Dalu Battle March',
    chineseName: '《斗罗大陆》· ONER',
    artist: 'ONER · Season 1 Opening Anthem',
    themeType: 'Heroic Orchestral March',
    sceneContext: 'Classic Season 1 journey beginning at Nuoding Academy and Shrek village.',
    description: 'The original official opening song of Douluo Dalu donghua that introduced millions to the world of soul masters.',
    lyrics: [
      '这里是斗罗大陆，魂力咆哮 (This is Douluo Continent, soul power roars!)',
      '用不灭的热血，铸造武魂的骄傲 (With inextinguishable passion, forge martial soul pride!)',
      '史莱克七怪，破空而出 (Shrek Seven Devils burst through the sky)',
      '九死不悔，战至巅峰神界！ (No regrets through ten deaths, battle to the peak divine realm!)',
    ],
  },
  {
    id: 'sanctum_qi',
    name: 'Sanctum Daoist Meditation',
    chineseName: '《入定神游》· 洞天冥想曲',
    artist: 'Ancient Guqin & 432Hz Singing Bowls',
    themeType: 'Zen Qi Cultivation',
    sceneContext: 'Deep meditation in the Ice and Fire Yin-Yang Well & Tang San refining meridians.',
    description: 'Peaceful 432Hz singing bowl swells, mountain stream chimes, and ancient plucked Guqin harmonics for deep seclusion.',
    lyrics: [
      '冰火两仪眼，乾坤化阴阳 (Ice and Fire Yin-Yang Well, universe manifests yin and yang)',
      '玄天功真气流转奇经八脉 (Mysterious Heaven Method Qi circulates through the Eight Extraordinary Meridians)',
      '心沉丹田，天地与我共鸣 (Mind sinks into Dantian, heaven and earth resonate with me)',
    ],
  },
  {
    id: 'lake_of_life',
    name: 'Lake of Life Titan Mystery',
    chineseName: '《生命之湖》· 苍茫秘境',
    artist: 'Star Dou Ancient Forest OST',
    themeType: 'Mystical Titan Ambient',
    sceneContext: 'Da Ming (Sky Azure Bull Python) and Er Ming (Titan Giant Ape) guarding the sacred lake.',
    description: 'Ethereal ambient pads and sacred water drop chimes echoing across sacred titan waters.',
    lyrics: [
      '万年碧波生灵水，十万年巨兽长啸天地 (Ten-thousand-year emerald waves of life water, hundred-thousand-year beasts roar across heaven and earth)',
      '星斗核心禁地，守护不灭红颜 (Star Dou core forbidden ground, guarding the eternal maiden)',
    ],
  },
];

class SoundController {
  private ctx: AudioContext | null = null;
  private isUnlocked: boolean = false;
  private soundEnabled: boolean = true;
  private masterGain: GainNode | null = null;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private bgmTimer: number | null = null;
  private isBgmPlaying: boolean = false;
  private bgmMode: 'cultivate' | 'battle' = 'cultivate';
  private currentTrackId: string = 'po_jian';
  private currentVolume: number = 0.55;
  private listeners: (() => void)[] = [];

  private isInitializing: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const unlockAudio = () => {
        this.ensureContext();
      };
      window.addEventListener('click', unlockAudio, { once: false, passive: true });
      window.addEventListener('touchstart', unlockAudio, { once: false, passive: true });
      window.addEventListener('keydown', unlockAudio, { once: false, passive: true });
    }
  }

  private ensureContext() {
    if (this.isInitializing) return;
    this.isInitializing = true;

    try {
      if (!this.ctx && typeof window !== 'undefined') {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
          this.masterGain = this.ctx.createGain();
          this.masterGain.gain.setValueAtTime(this.soundEnabled ? 0.7 : 0, this.ctx.currentTime);
          this.masterGain.connect(this.ctx.destination);

          this.bgmGain = this.ctx.createGain();
          this.bgmGain.gain.setValueAtTime(0.3, this.ctx.currentTime);
          this.bgmGain.connect(this.masterGain);

          this.sfxGain = this.ctx.createGain();
          this.sfxGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
          this.sfxGain.connect(this.masterGain);
        }
      }

      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume().catch(() => {});
      }
    } finally {
      this.isInitializing = false;
    }
  }

  public unlock() {
    this.ensureContext();
  }

  public toggleSound(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.soundEnabled ? 0.7 : 0, this.ctx.currentTime);
    }
    if (this.soundEnabled) {
      this.ensureContext();
      this.playChime(660);
      if (!this.isBgmPlaying) {
        this.startBGM();
      }
    }
    return this.soundEnabled;
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setMode(mode: 'cultivate' | 'battle') {
    this.bgmMode = mode;
  }

  public getTracks(): MusicTrack[] {
    return SOUL_LAND_TRACKS;
  }

  public getCurrentTrack(): MusicTrack {
    return SOUL_LAND_TRACKS.find(t => t.id === this.currentTrackId) || SOUL_LAND_TRACKS[0];
  }

  public getTrackId(): string {
    return this.currentTrackId;
  }

  public setTrack(trackId: string) {
    if (this.currentTrackId === trackId && this.isBgmPlaying) return;
    this.currentTrackId = trackId;
    this.notifyListeners();
    if (this.isBgmPlaying) {
      this.stopBGM();
      this.startBGM();
    }
  }

  public nextTrack() {
    const idx = SOUL_LAND_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const nextIdx = (idx + 1) % SOUL_LAND_TRACKS.length;
    this.setTrack(SOUL_LAND_TRACKS[nextIdx].id);
  }

  public prevTrack() {
    const idx = SOUL_LAND_TRACKS.findIndex(t => t.id === this.currentTrackId);
    const prevIdx = (idx - 1 + SOUL_LAND_TRACKS.length) % SOUL_LAND_TRACKS.length;
    this.setTrack(SOUL_LAND_TRACKS[prevIdx].id);
  }

  public setVolume(vol: number) {
    this.currentVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.currentVolume * 0.4, this.ctx.currentTime);
    }
    this.notifyListeners();
  }

  public getVolume(): number {
    return this.currentVolume;
  }

  public isBgmActive(): boolean {
    return this.isBgmPlaying;
  }

  public subscribe(listener: () => void): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(l => {
      try { l(); } catch { /* ignore */ }
    });
  }

  public stopBGM() {
    if (this.bgmTimer) {
      clearInterval(this.bgmTimer);
      this.bgmTimer = null;
    }
    this.isBgmPlaying = false;
    this.notifyListeners();
  }

  public pauseBGM() {
    this.stopBGM();
  }

  public resumeBGM() {
    this.startBGM();
  }

  // Continuous background ambient / battle music generator
  public startBGM() {
    if (this.isBgmPlaying) return;
    this.ensureContext();
    if (!this.ctx || !this.soundEnabled) return;
    this.isBgmPlaying = true;
    this.notifyListeners();

    // Notes for Soul Land melodies (Hz frequencies)
    const N = {
      E2: 82.41, G2: 98.00, A2: 110.00, B2: 123.47,
      C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.00, A3: 220.00, B3: 246.94,
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, Fs4: 369.99, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, Fs5: 739.99, G5: 783.99, A5: 880.00, B5: 987.77,
      C6: 1046.5,
    };

    // Track 1: 《破茧》 (Break the Cocoon) - Angela Zhang
    // Melodic Motifs: "如果在逆境中破茧，绝不向命运妥协"
    const poJianMelody = [
      N.B4, N.G4, N.A4, N.B4, N.D5, N.B4, N.A4, N.G4,
      N.E4, N.G4, N.A4, N.B4, N.D5, N.E5, N.D5, N.B4,
      N.A4, N.G4, N.E4, N.G4, N.A4, N.B4, N.A4, N.G4,
      N.E4, N.B4, N.D5, N.E5, N.G5, N.E5, N.D5, N.B4,
    ];
    const poJianBass = [N.E2, N.C3, N.G2, N.D3];

    // Track 2: 《不舍》 (Reluctant to Part) - Lala Hsu
    // Flute & Guzheng: Sorrowful & beautiful romance theme
    const buSheMelody = [
      N.Fs4, N.A4, N.B4, N.D5, N.E5, N.Fs5, N.E5, N.D5,
      N.B4, N.A4, N.B4, N.D5, N.A4, N.Fs4, N.E4, N.D4,
      N.E4, N.Fs4, N.A4, N.B4, N.D5, N.E5, N.Fs5, N.A5,
      N.Fs5, N.E5, N.D5, N.B4, N.A4, N.Fs4, N.D4, N.E4,
    ];
    const buSheArp = [N.D4, N.Fs4, N.A4, N.D5, N.A4, N.Fs4];

    // Track 3: 《斗罗大陆》 (Douluo Dalu Battle March)
    const douluoMelody = [
      N.D4, N.F4, N.G4, N.A4, N.D5, N.C5, N.A4, N.G4,
      N.F4, N.D4, N.F4, N.G4, N.A4, N.D5, N.F5, N.E5,
      N.D5, N.A4, N.C5, N.D5, N.G5, N.F5, N.D5, N.C5,
      N.A4, N.G4, N.F4, N.G4, N.A4, N.C5, N.D5, N.D5,
    ];

    // Track 4: 《眷恋》 (Deep Affection) - Zhou Shen
    const juanLianMelody = [
      N.E5, N.G5, N.A5, N.B5, N.C6, N.B5, N.A5, N.G5,
      N.E5, N.D5, N.E5, N.G5, N.A5, N.G5, N.E5, N.D5,
      N.C5, N.D5, N.E5, N.G5, N.A5, N.C6, N.B5, N.A5,
      N.G5, N.E5, N.D5, N.C5, N.D5, N.E5, N.G5, N.A5,
    ];

    // Track 5: 《绝双》 (Unrivaled Pair) - Silence Wang
    const jueShuangMelody = [
      N.D5, N.D5, N.C5, N.A4, N.C5, N.D5, N.F5, N.E5,
      N.D5, N.A4, N.C5, N.D5, N.E5, N.D5, N.C5, N.A4,
      N.G4, N.A4, N.C5, N.D5, N.F5, N.G5, N.F5, N.D5,
      N.C5, N.A4, N.C5, N.D5, N.D5, N.D5, N.F5, N.D5,
    ];

    // Track 6: 《落单的星》 (The Solitary Star) - Shan Yichun
    const luoDanMelody = [
      N.A4, N.C5, N.E5, N.G5, N.Fs5, N.D5, N.B4, N.G4,
      N.A4, N.C5, N.D5, N.E5, N.C5, N.B4, N.A4, N.G4,
      N.F4, N.A4, N.C5, N.E5, N.D5, N.B4, N.G4, N.E4,
      N.A4, N.B4, N.C5, N.D5, N.E5, N.Fs5, N.G5, N.A5,
    ];

    // Track 7: 《战神》 (God of War) - Jam Hsiao
    const zhanShenMelody = [
      N.E4, N.E4, N.G4, N.A4, N.B4, N.B4, N.D5, N.E5,
      N.G5, N.E5, N.D5, N.B4, N.A4, N.G4, N.E4, N.E4,
      N.E4, N.G4, N.A4, N.B4, N.D5, N.E5, N.G5, N.A5,
      N.G5, N.E5, N.D5, N.B4, N.A4, N.G4, N.E4, N.E4,
    ];

    // Track 8: 《一掷决乾坤》 (Decisive Throw) - Mao Buyi
    const yiZhiMelody = [
      N.D4, N.E4, N.G4, N.A4, N.B4, N.D5, N.B4, N.A4,
      N.G4, N.E4, N.G4, N.A4, N.D5, N.E5, N.D5, N.B4,
      N.A4, N.B4, N.D5, N.E5, N.G5, N.E5, N.D5, N.B4,
      N.A4, N.G4, N.E4, N.D4, N.E4, N.G4, N.A4, N.G4,
    ];

    // Track 9: 《宿命狂澜》 (Wild Surges of Fate) - Ayanga
    const suMingMelody = [
      N.C4, N.E4, N.G4, N.C5, N.B4, N.G4, N.A4, N.F4,
      N.G4, N.E4, N.D4, N.C4, N.G3, N.C4, N.E4, N.D4,
      N.C4, N.E4, N.G4, N.C5, N.D5, N.E5, N.D5, N.C5,
      N.B4, N.A4, N.G4, N.F4, N.E4, N.D4, N.C4, N.C4,
    ];

    // Track 10: 《入定神游》 (Sanctum Qi Cultivation)
    const sanctumChords = [N.D4, N.G4, N.A4, N.C5, N.D5, N.E5];

    // Track 11: 《生命之湖》 (Lake of Life Mystery)
    const lakePitches = [N.E4, N.G4, N.B4, N.D5, N.E5, N.G5, N.B5];

    let step = 0;

    const loop = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain || !this.soundEnabled) return;
      const now = this.ctx.currentTime;
      step++;

      const track = this.currentTrackId;

      if (track === 'po_jian') {
        // Track 1: Break the Cocoon
        const noteIdx = step % poJianMelody.length;
        const pitch = poJianMelody[noteIdx];

        // Lead synth melody with warm saturation
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12 * this.currentVolume, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.28);

        // Sub bass pulse on every 8 steps
        if (step % 8 === 0) {
          const bassPitch = poJianBass[(step / 8) % poJianBass.length];
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(bassPitch, now);
          bassGain.gain.setValueAtTime(0.22 * this.currentVolume, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGain);
          bassOsc.start(now);
          bassOsc.stop(now + 1.2);
        }

        // Taiko drum beat every 4 steps
        if (step % 4 === 0) {
          this.playTaikoTone(now, 85, 0.25 * this.currentVolume);
        }
        if (step % 2 === 0) {
          this.playHiHatTone(now, 0.04 * this.currentVolume);
        }
      } else if (track === 'bu_she') {
        // Track 2: Reluctant to Part (Gentle Flute & Guzheng)
        const noteIdx = step % buSheMelody.length;
        const pitch = buSheMelody[noteIdx];

        // Chinese Bamboo Flute tone (Sine with vibrato feel)
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.linearRampToValueAtTime(pitch * 1.01, now + 0.18);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.15 * this.currentVolume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.45);

        // Guzheng plucked chime arpeggio
        if (step % 3 === 0) {
          const arpPitch = buSheArp[(step / 3) % buSheArp.length];
          const zhengOsc = this.ctx.createOscillator();
          const zhengGain = this.ctx.createGain();
          zhengOsc.type = 'triangle';
          zhengOsc.frequency.setValueAtTime(arpPitch, now);
          zhengGain.gain.setValueAtTime(0.1 * this.currentVolume, now);
          zhengGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
          zhengOsc.connect(zhengGain);
          zhengGain.connect(this.bgmGain);
          zhengOsc.start(now);
          zhengOsc.stop(now + 0.6);
        }

        if (step % 8 === 0) {
          this.playTaikoTone(now, 60, 0.15 * this.currentVolume);
        }
      } else if (track === 'douluo_anthem') {
        // Track 3: Battle March
        const noteIdx = step % douluoMelody.length;
        const pitch = douluoMelody[noteIdx];

        // Heroic horn / brass synth
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.16 * this.currentVolume, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.25);

        // Driving war drums
        if (step % 2 === 0) {
          this.playTaikoTone(now, step % 4 === 0 ? 100 : 75, 0.3 * this.currentVolume);
        }
        this.playHiHatTone(now, 0.05 * this.currentVolume);
      } else if (track === 'juan_lian') {
        // Track 4: 《眷恋》 - Zhou Shen (Celestial Ethereal Voice & Strings)
        const noteIdx = step % juanLianMelody.length;
        const pitch = juanLianMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(pitch, now);
        osc.frequency.linearRampToValueAtTime(pitch * 1.008, now + 0.25); // Gentle vibrato

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.16 * this.currentVolume, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.5);

        // Ocean wave pad pulse
        if (step % 8 === 0) {
          const bassOsc = this.ctx.createOscillator();
          const bassGain = this.ctx.createGain();
          bassOsc.type = 'triangle';
          bassOsc.frequency.setValueAtTime(N.E3, now);
          bassGain.gain.setValueAtTime(0.12 * this.currentVolume, now);
          bassGain.gain.exponentialRampToValueAtTime(0.001, now + 1.6);
          bassOsc.connect(bassGain);
          bassGain.connect(this.bgmGain);
          bassOsc.start(now);
          bassOsc.stop(now + 1.6);
        }
      } else if (track === 'jue_shuang') {
        // Track 5: 《绝双》 - Silence Wang (Upbeat Youthful Battle Pop)
        const noteIdx = step % jueShuangMelody.length;
        const pitch = jueShuangMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.13 * this.currentVolume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.22);

        if (step % 2 === 0) {
          this.playTaikoTone(now, 90, 0.22 * this.currentVolume);
        }
        this.playHiHatTone(now, 0.05 * this.currentVolume);
      } else if (track === 'luo_dan_de_xing') {
        // Track 6: 《落单的星》 - Shan Yichun (Tender Moonlight Piano)
        const noteIdx = step % luoDanMelody.length;
        const pitch = luoDanMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.15 * this.currentVolume, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.55);
      } else if (track === 'zhan_shen') {
        // Track 7: 《战神》 - Jam Hsiao (Aggressive Rock War Anthem)
        const noteIdx = step % zhanShenMelody.length;
        const pitch = zhanShenMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.18 * this.currentVolume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.25);

        // Thunderous war drums
        this.playTaikoTone(now, step % 4 === 0 ? 110 : 80, 0.35 * this.currentVolume);
        if (step % 2 === 0) {
          this.playHiHatTone(now, 0.06 * this.currentVolume);
        }
      } else if (track === 'yi_zhi_jue_qian_kun') {
        // Track 8: 《一掷决乾坤》 - Mao Buyi (Folk Guqin & Hidden Weapons)
        const noteIdx = step % yiZhiMelody.length;
        const pitch = yiZhiMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14 * this.currentVolume, now + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.38);

        if (step % 4 === 0) {
          this.playTaikoTone(now, 70, 0.2 * this.currentVolume);
        }
      } else if (track === 'su_ming_kuang_lan') {
        // Track 9: 《宿命狂澜》 - Ayanga (Operatic Grand Orchestral Brass)
        const noteIdx = step % suMingMelody.length;
        const pitch = suMingMelody[noteIdx];

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(pitch, now);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.17 * this.currentVolume, now + 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

        osc.connect(gain);
        gain.connect(this.bgmGain);
        osc.start(now);
        osc.stop(now + 0.42);

        if (step % 4 === 0) {
          this.playTaikoTone(now, 95, 0.28 * this.currentVolume);
        }
      } else if (track === 'sanctum_qi') {
        // Track 4: Sanctum Daoist Meditation (432Hz Singing Bowl Swells)
        if (step % 4 === 0) {
          const pitch = sanctumChords[(step / 4) % sanctumChords.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(pitch, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.18 * this.currentVolume, now + 0.2);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

          osc.connect(gain);
          gain.connect(this.bgmGain);
          osc.start(now);
          osc.stop(now + 1.8);
        }

        if (step % 16 === 0) {
          // Temple singing bowl bell
          this.playSingingBowlSwell(now, 432, 0.22 * this.currentVolume);
        }
      } else {
        // Track 5: Lake of Life Mystery (Ambient Water Pads)
        if (step % 3 === 0) {
          const pitch = lakePitches[(step / 3) % lakePitches.length];
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(pitch, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.14 * this.currentVolume, now + 0.12);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

          osc.connect(gain);
          gain.connect(this.bgmGain);
          osc.start(now);
          osc.stop(now + 1.2);
        }

        if (step % 8 === 0) {
          this.playTaikoTone(now, 55, 0.18 * this.currentVolume);
        }
      }
    };

    const intervalMs = this.currentTrackId === 'bu_she' ? 320 : this.currentTrackId === 'douluo_anthem' ? 240 : 270;
    this.bgmTimer = window.setInterval(loop, intervalMs);
  }

  // Helper percussion for synth music
  private playTaikoTone(time: number, freq: number, gainVal: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(25, time + 0.25);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  private playHiHatTone(time: number, gainVal: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(3200, time);
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.05);
    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.05);
  }

  private playSingingBowlSwell(time: number, freq: number, gainVal: number) {
    if (!this.ctx || !this.bgmGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(gainVal, time + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 3.0);
    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 3.0);
  }

  // ================= CULTIVATION SOUNDS =================

  // Meditate / Qi gathering singing bowl chime
  public playCultivate() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;

    // Harmonic singing bowl chime chords (432Hz tuning)
    const freqs = [432, 648, 864];
    freqs.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25 / (idx + 1), now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.2);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(now);
      osc.stop(now + 0.8 + idx * 0.2);
    });
  }

  // Heavenly breakthrough fanfare
  public playBreakthrough() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.5]; // C major ascension

    notes.forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.3, t + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.9);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.9);
    });
  }

  // Soul Ring Resonance Bell
  public playRingResonance(tier: string = 'yellow') {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const baseFreq = tier === 'gold' ? 987.77 : tier === 'red' ? 783.99 : tier === 'black' ? 587.33 : tier === 'purple' ? 493.88 : 392.00;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(baseFreq, now);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.4);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.85);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.85);
  }

  // Simple pure chime
  public playChime(freq: number = 880) {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.5);
  }

  // ================= FIGHTING & COMBAT SOUNDS =================

  // Quick sword / martial soul slash whoosh
  public playSlash() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.exponentialRampToValueAtTime(140, now + 0.16);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.16);
  }

  // Heavy weapon impact crunch
  public playHeavyImpact(isCrit: boolean = false) {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isCrit ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(isCrit ? 240 : 160, now);
    osc.frequency.exponentialRampToValueAtTime(35, now + 0.35);

    gain.gain.setValueAtTime(isCrit ? 0.75 : 0.55, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.35);
  }

  // Clear Sky Hammer ground smash detonation
  public playHammerSlam() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.exponentialRampToValueAtTime(25, now + 0.55);

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.55);
  }

  // Dragon lightning thunder clap
  public playLightning() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(750, now);
    osc.frequency.linearRampToValueAtTime(90, now + 0.14);
    osc.frequency.linearRampToValueAtTime(400, now + 0.32);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.4);
  }

  // Vine whip snap
  public playVineSnap() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.linearRampToValueAtTime(1100, now + 0.12);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Beast roar
  public playBeastRoar() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(130, now);
    osc.frequency.linearRampToValueAtTime(200, now + 0.2);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.7);

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // True Avatar Awakening Roar
  public playAvatarAwaken() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;

    [110, 220, 330, 440, 660, 880].forEach((freq, idx) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = now + idx * 0.05;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 0.8, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, t + 0.6);

      gain.gain.setValueAtTime(0.01, t);
      gain.gain.linearRampToValueAtTime(0.22, t + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(t);
      osc.stop(t + 0.8);
    });
  }

  // Tang Sect Hidden Weapon release
  public playDartRelease() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1300, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.15);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.15);
  }

  // Buddha's Fury Lotus detonation explosion
  public playExplosion() {
    this.unlock();
    if (!this.ctx || !this.sfxGain || !this.soundEnabled) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(20, now + 0.65);

    gain.gain.setValueAtTime(0.85, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(now);
    osc.stop(now + 0.65);
  }
}

export const sound = new SoundController();
export const audio = sound;
