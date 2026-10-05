import React, { useState, useEffect } from 'react';
import { sound, SOUL_LAND_TRACKS, MusicTrack } from '../utils/audio';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
  VolumeX,
  ListMusic,
  Disc3,
  ChevronDown,
  FileText,
  Sparkles,
  Info,
} from 'lucide-react';

export const SoulLandMusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState<boolean>(sound.isBgmActive());
  const [currentTrack, setCurrentTrack] = useState<MusicTrack>(sound.getCurrentTrack());
  const [volume, setVolume] = useState<number>(sound.getVolume());
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [showTrackList, setShowTrackList] = useState<boolean>(false);
  const [showLyrics, setShowLyrics] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'theme' | 'romance' | 'battle'>('all');

  useEffect(() => {
    const unsubscribe = sound.subscribe(() => {
      setIsPlaying(sound.isBgmActive());
      setCurrentTrack(sound.getCurrentTrack());
      setVolume(sound.getVolume());
    });
    return unsubscribe;
  }, []);

  const handleTogglePlay = () => {
    sound.unlock();
    if (isPlaying) {
      sound.pauseBGM();
    } else {
      sound.resumeBGM();
    }
  };

  const handleSelectTrack = (trackId: string) => {
    sound.unlock();
    sound.setTrack(trackId);
    setShowTrackList(false);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
  };

  const filteredTracks = SOUL_LAND_TRACKS.filter(track => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'theme') return track.id === 'po_jian' || track.id === 'douluo_anthem';
    if (activeCategory === 'romance') return track.id === 'bu_she' || track.id === 'juan_lian' || track.id === 'luo_dan_de_xing';
    if (activeCategory === 'battle') return track.id === 'zhan_shen' || track.id === 'jue_shuang' || track.id === 'su_ming_kuang_lan' || track.id === 'yi_zhi_jue_qian_kun';
    return true;
  });

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none">
      {/* ================= LYRICS & SCENE DRAWER ================= */}
      {showLyrics && (
        <div className="absolute bottom-full right-0 mb-3 w-80 sm:w-96 bg-slate-900/95 border-2 border-amber-400/60 rounded-3xl p-4 shadow-2xl backdrop-blur-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <FileText className="w-4 h-4 text-amber-300" />
              <span className="font-bold tracking-wider">OFFICIAL ANIME LYRICS · 原声歌词</span>
            </div>
            <button
              onClick={() => setShowLyrics(false)}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded-lg bg-slate-800"
            >
              Close
            </button>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-cinzel font-bold text-amber-200">{currentTrack.chineseName}</h4>
            <p className="text-[11px] text-slate-400">{currentTrack.artist}</p>
            {currentTrack.sceneContext && (
              <div className="flex items-start gap-1.5 p-2 rounded-xl bg-slate-950/70 border border-slate-800 text-[10px] text-amber-300/90 font-mono">
                <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{currentTrack.sceneContext}</span>
              </div>
            )}
          </div>

          <div className="space-y-2 max-h-56 overflow-y-auto pr-1 scrollbar-thin bg-slate-950/60 p-3 rounded-2xl border border-slate-800/80">
            {currentTrack.lyrics && currentTrack.lyrics.length > 0 ? (
              currentTrack.lyrics.map((line, idx) => (
                <p
                  key={idx}
                  className={`text-xs leading-relaxed transition-colors ${
                    idx === 0
                      ? 'text-amber-300 font-semibold'
                      : 'text-slate-300'
                  }`}
                >
                  {line}
                </p>
              ))
            ) : (
              <p className="text-xs text-slate-400 italic">Instrumental cultivation meditation theme.</p>
            )}
          </div>
        </div>
      )}

      {/* ================= PLAYLIST DRAWER ================= */}
      {showTrackList && (
        <div className="absolute bottom-full right-0 mb-3 w-80 sm:w-96 bg-slate-900/95 border border-amber-500/40 rounded-3xl p-4 shadow-2xl backdrop-blur-xl space-y-3 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <Disc3 className="w-4 h-4 animate-spin-slow" />
              <span className="font-bold tracking-wider">SOUL LAND ANIME SONGS · 动画全部原声</span>
            </div>
            <button
              onClick={() => setShowTrackList(false)}
              className="text-xs text-slate-400 hover:text-slate-200 px-2 py-0.5 rounded-lg bg-slate-800"
            >
              Close
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            {[
              { id: 'all', label: 'All Songs (全部)' },
              { id: 'theme', label: 'Themes (主打)' },
              { id: 'romance', label: 'Romance (唯美)' },
              { id: 'battle', label: 'Battle (燃战)' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`text-[10px] font-mono px-2 py-1 rounded-xl whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1 scrollbar-thin">
            {filteredTracks.map(track => {
              const isSelected = track.id === currentTrack.id;
              return (
                <button
                  key={track.id}
                  onClick={() => handleSelectTrack(track.id)}
                  className={`w-full p-2.5 rounded-2xl text-left transition-all border flex items-center justify-between gap-3 ${
                    isSelected
                      ? 'bg-amber-500/20 border-amber-400/80 text-amber-200 shadow-[0_0_15px_rgba(245,158,11,0.25)]'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-300 hover:bg-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold font-cinzel truncate">{track.chineseName}</span>
                      {isSelected && isPlaying && (
                        <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      )}
                    </div>
                    <span className="text-[11px] text-slate-400 block truncate">{track.artist}</span>
                    <span className="text-[10px] text-amber-400/80 font-mono block mt-0.5">{track.themeType}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= MAIN FLOATING PLAYER BAR ================= */}
      <div className="bg-slate-900/90 border border-slate-700/80 hover:border-amber-400/60 rounded-3xl p-3 shadow-2xl backdrop-blur-xl flex items-center gap-3 transition-all max-w-[360px] sm:max-w-[430px]">
        {/* Animated Disc / Vinyl Icon */}
        <button
          onClick={handleTogglePlay}
          className="relative w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-700 p-0.5 flex items-center justify-center shrink-0 shadow-lg group active:scale-95 transition-transform"
          title={isPlaying ? 'Pause Music' : 'Play Soul Land Music'}
        >
          <div className="w-full h-full bg-slate-950 rounded-2xl flex items-center justify-center overflow-hidden relative">
            <Disc3
              className={`w-6 h-6 text-amber-400 ${
                isPlaying ? 'animate-spin-slow' : 'opacity-70'
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-amber-400/10 pointer-events-none" />
            )}
          </div>
        </button>

        {/* Track Info & Visualizer */}
        <div
          onClick={() => setShowTrackList(!showTrackList)}
          className="flex-1 min-w-0 cursor-pointer group"
          title="Click to choose Soul Land soundtrack"
        >
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-100 font-cinzel truncate group-hover:text-amber-300 transition-colors">
              {currentTrack.chineseName}
            </span>
            {/* Equalizer Waveform bars */}
            <div className="flex items-end gap-0.5 h-3 shrink-0">
              <span className={`w-0.5 rounded-full bg-amber-400 ${isPlaying ? 'animate-bounce h-3' : 'h-1'}`} />
              <span className={`w-0.5 rounded-full bg-amber-300 ${isPlaying ? 'animate-bounce h-2 delay-75' : 'h-1.5'}`} />
              <span className={`w-0.5 rounded-full bg-amber-400 ${isPlaying ? 'animate-bounce h-3 delay-150' : 'h-1'}`} />
            </div>
          </div>
          <p className="text-[11px] text-slate-400 truncate">
            {currentTrack.name}
          </p>
        </div>

        {/* Playback Controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Lyrics Button */}
          <button
            onClick={() => {
              setShowLyrics(!showLyrics);
              setShowTrackList(false);
            }}
            className={`p-1.5 rounded-xl transition-colors ${
              showLyrics ? 'bg-amber-400 text-slate-950' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="View Song Lyrics"
          >
            <FileText className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              sound.unlock();
              sound.prevTrack();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            title="Previous Track"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleTogglePlay}
            className="p-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl shadow transition-transform active:scale-90"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
          </button>

          <button
            onClick={() => {
              sound.unlock();
              sound.nextTrack();
            }}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            title="Next Track"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setShowTrackList(!showTrackList);
              setShowLyrics(false);
            }}
            className={`p-1.5 rounded-xl transition-colors ${
              showTrackList ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
            }`}
            title="Playlist"
          >
            <ListMusic className="w-3.5 h-3.5" />
          </button>

          {/* Volume toggle */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-xl transition-colors"
            title="Volume Settings"
          >
            {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Expanded Volume Slider Bar */}
      {isExpanded && (
        <div className="mt-2 bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 shadow-xl backdrop-blur-xl flex items-center gap-2 animate-in fade-in slide-in-from-bottom-1">
          <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full accent-amber-400 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
          />
          <Volume2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="text-[10px] font-mono text-slate-400 w-8 text-right">
            {Math.round(volume * 100)}%
          </span>
        </div>
      )}
    </div>
  );
};
