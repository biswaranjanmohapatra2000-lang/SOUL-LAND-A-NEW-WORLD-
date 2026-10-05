import React from 'react';
import { X, Sparkles, BookOpen, Music, Shield, Zap, Flame, Award, Heart, Gem, UtensilsCrossed } from 'lucide-react';
import { SOUL_LAND_TRACKS } from '../utils/audio';

interface DouluoCodexModalProps {
  onClose: () => void;
}

export const DouluoCodexModal: React.FC<DouluoCodexModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-y-auto max-h-[85vh] space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-cinzel font-bold text-slate-100">
              Douluo Continent Grand Codex (斗罗大陆至尊全书)
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section 1: The 7 Ranks of Martial Souls */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-cinzel font-bold text-amber-300">
              01. Seven Spirit Ranks & Awakening Odds (武魂七大品阶与觉醒概率)
            </h3>
            <span className="text-[11px] font-mono text-cyan-400">Random Awakening Law</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-200">
              <div className="flex justify-between items-center font-bold">
                <span>1. Divine Tier (神级武魂):</span>
                <span className="bg-amber-400 text-slate-950 px-2 py-0.5 rounded">1% Chance</span>
              </div>
              <p className="text-[11px] text-amber-300/80 mt-1">Six-Winged Angel, Sea God Trident, Dragon God, Asura Demonic Sword</p>
            </div>

            <div className="p-2.5 rounded-xl bg-purple-500/20 border border-purple-400 text-purple-200">
              <div className="flex justify-between items-center font-bold">
                <span>2. Super Tier (超级武魂):</span>
                <span className="bg-purple-400 text-slate-950 px-2 py-0.5 rounded">5% Chance</span>
              </div>
              <p className="text-[11px] text-purple-300/80 mt-1">Clear Sky Hammer, Seven Kill Sword, Golden Dragon King, Ice Empress Scorpion</p>
            </div>

            <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-400 text-rose-200">
              <div className="flex justify-between items-center font-bold">
                <span>3. Top Tier (顶级武魂):</span>
                <span className="bg-rose-400 text-slate-950 px-2 py-0.5 rounded">10% Chance</span>
              </div>
              <p className="text-[11px] text-rose-300/80 mt-1">Nine-Hearted Begonia, Nine Treasure Pagoda, Blue Silver Emperor, Blue Lightning Tyrant Dragon</p>
            </div>

            <div className="p-2.5 rounded-xl bg-blue-500/20 border border-blue-400 text-blue-200">
              <div className="flex justify-between items-center font-bold">
                <span>4. High Tier (高级武魂):</span>
                <span className="bg-blue-400 text-slate-950 px-2 py-0.5 rounded">35% Chance</span>
              </div>
              <p className="text-[11px] text-blue-300/80 mt-1">Nether Civet, Seven Treasure Pagoda, Xuanwu Turtle, Diamond Mammoth, Wind Wolf</p>
            </div>

            <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-400 text-emerald-200">
              <div className="flex justify-between items-center font-bold">
                <span>5. Intermediate Tier (中级武魂):</span>
                <span className="bg-emerald-400 text-slate-950 px-2 py-0.5 rounded">45% Chance</span>
              </div>
              <p className="text-[11px] text-emerald-300/80 mt-1">Recovery Big Sausage, Ghost Shadow Bamboo, Iron Armor Rhino, Flame Hound</p>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-600 text-slate-200">
              <div className="flex justify-between items-center font-bold">
                <span>6. Normal Tier (普通武魂):</span>
                <span className="bg-slate-600 text-slate-100 px-2 py-0.5 rounded">65% Chance</span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">Tempered Iron Sword, Mountain Wild Boar, Gray Wolf, Willow Branch</p>
            </div>

            <div className="sm:col-span-2 p-2.5 rounded-xl bg-stone-900 border border-stone-700 text-stone-300">
              <div className="flex justify-between items-center font-bold">
                <span>7. Waste Spirit Rank (废武魂):</span>
                <span className="bg-stone-700 text-stone-200 px-2 py-0.5 rounded">80% Base Rate</span>
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Blue Silver Grass (unawakened weed), Luo Sanpao, Rusty Sickle, Ceramic Teacup. *Note: Tang San awakened Blue Silver Grass with Innate Full Spirit Power Rank 10!
              </p>
            </div>
          </div>
        </div>

        {/* Section 2: Combat Specializations & Categories */}
        <div className="space-y-2">
          <h3 className="text-sm font-cinzel font-bold text-amber-300">
            02. Specialization Categories (武魂战斗系别分类)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In Soul Land novels, spirit masters form balanced battle teams comprising 12 specialized combat disciplines:
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono pt-1">
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-rose-300">
              <strong>Healing Type (治疗系):</strong> Nine-Hearted Begonia
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300">
              <strong>Gem Type (宝石系):</strong> Glazed Tile Pagoda
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-orange-300">
              <strong>Food Type (食物系):</strong> Big Sausage, Steamed Bun
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-amber-300">
              <strong>Strength Type (强攻系):</strong> Clear Sky Hammer, White Tiger
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-purple-300">
              <strong>Agility Type (敏攻系):</strong> Nether Civet, Swift Wind Wolf
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-emerald-300">
              <strong>Control Type (控制系):</strong> Blue Silver Emperor, Spider
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-teal-300">
              <strong>Defense Type (防御系):</strong> Xuanwu Turtle, Mammoth
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-yellow-300">
              <strong>Elemental Type (元素系):</strong> Phoenix Fire, Extreme Ice
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-blue-300">
              <strong>Beast Type (兽武魂):</strong> Tyrant Dragon, Devilgod Tiger
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-green-300">
              <strong>Plant Type (植物系):</strong> Blue Silver Grass, Bamboo
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-indigo-300">
              <strong>Tool Type (器武魂):</strong> Seven Kill Sword, Trident
            </div>
            <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-pink-300">
              <strong>Auxiliary Type (辅助系):</strong> Star Crown, Nine Pagoda
            </div>
          </div>
        </div>

        {/* Section 3: Official Soul Land Anime Songs */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Music className="w-4 h-4 text-amber-400" />
            <h3 className="text-sm font-cinzel font-bold text-amber-300">
              03. Official Soul Land Donghua Songs (动画全集原声歌曲)
            </h3>
          </div>
          <p className="text-xs text-slate-300">
            Listen to official anime theme songs in the bottom music player with full lyrics, singers, and scene context:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
            {SOUL_LAND_TRACKS.map(t => (
              <div key={t.id} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-amber-300 font-bold">{t.chineseName}</span>
                  <span className="text-[11px] text-slate-400 block">{t.artist}</span>
                </div>
                <span className="text-[10px] text-cyan-400/90 mt-1">{t.themeType}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Soul Rings & Spirit Elder Rule */}
        <div className="space-y-2">
          <h3 className="text-sm font-cinzel font-bold text-amber-300">
            04. Soul Rings & Spirit Elder Rule (魂环与魂尊三环法则)
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In canon, a <strong>Spirit Elder (魂尊 - Rank 30 to 40)</strong> always commands <strong>Three Soul Rings</strong> (Yellow, Purple, Purple). The game auto-synchronizes and enforces all 3 rings across 3D horizontal views and battle mechanics!
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-cinzel font-bold text-xs uppercase tracking-wider rounded-2xl transition-all shadow"
        >
          Understood, Close Codex (知晓大典)
        </button>
      </div>
    </div>
  );
};
