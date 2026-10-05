/**
 * Real-time synthesized Douluo Dalu MMORPG Background Music (BGM) & Sound Effects engine.
 * Generates continuous oriental fantasy orchestral & battle music using pure Web Audio API.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private bgmGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;
  private isBgmPlaying: boolean = false;
  private bgmInterval: number | null = null;
  private combatMode: boolean = false;

  private currentBeat: number = 0;

  public init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();

        // Master BGM gain
        this.bgmGain = this.ctx.createGain();
        this.bgmGain.gain.setValueAtTime(0.22, this.ctx.currentTime);
        this.bgmGain.connect(this.ctx.destination);

        // Master SFX gain
        this.sfxGain = this.ctx.createGain();
        this.sfxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
        this.sfxGain.connect(this.ctx.destination);
      }
    }

    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setCombatState(inCombat: boolean) {
    this.combatMode = inCombat;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.bgmGain && this.ctx) {
      this.bgmGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.ctx.currentTime);
    }
    if (this.sfxGain && this.ctx) {
      this.sfxGain.gain.setValueAtTime(this.isMuted ? 0 : 0.4, this.ctx.currentTime);
    }
    return !this.isMuted;
  }

  public isAudioActive(): boolean {
    return !this.isMuted && !!this.ctx;
  }

  /**
   * Start the continuous Douluo Dalu ambient & battle orchestral music loop
   */
  public startBGM() {
    this.init();
    if (!this.ctx || this.isBgmPlaying) return;
    this.isBgmPlaying = true;

    // Pentatonic scale frequencies (Chinese Guqin / Flute intervals: D, F, G, A, C)
    const scale = [
      146.83, 174.61, 196.00, 220.00, 261.63, // D3, F3, G3, A3, C4
      293.66, 349.23, 392.00, 440.00, 523.25, // D4, F4, G4, A4, C5
      587.33, 698.46, 783.99, 880.00          // D5, F5, G5, A5
    ];

    // Harmony chords
    const chordProgressions = [
      [146.83, 220.00, 293.66], // D minor
      [174.61, 261.63, 349.23], // F major
      [196.00, 293.66, 392.00], // G minor
      [130.81, 196.00, 261.63], // C major
    ];

    const stepDuration = 0.26; // ~115 BPM 16th notes

    const tick = () => {
      if (!this.isBgmPlaying || !this.ctx || !this.bgmGain) return;
      const now = this.ctx.currentTime;
      const beat = this.currentBeat % 32;
      this.currentBeat++;

      // 1. Play drum / pulse on quarter beats
      if (beat % 4 === 0) {
        this.playTaikoDrum(now, beat % 8 === 0 ? 90 : 65);
      }

      // Faster battle hi-hat rhythm when in combat
      if (this.combatMode && beat % 2 === 0) {
        this.playShaker(now);
      }

      // 2. Play warm sustained chord every 8 beats
      if (beat % 8 === 0) {
        const chordIndex = Math.floor(beat / 8) % chordProgressions.length;
        const chord = chordProgressions[chordIndex];
        chord.forEach(freq => {
          this.playPadNote(now, freq, 2.0);
        });
      }

      // 3. Play Oriental Pentatonic Melody
      const melodyChances = this.combatMode ? 0.85 : 0.6;
      if (Math.random() < melodyChances) {
        const noteIdx = Math.floor(Math.random() * (scale.length - 4)) + 4;
        const freq = scale[noteIdx];
        this.playFluteNote(now, freq, this.combatMode ? 0.35 : 0.7);
      }

      // 4. Bass pulse
      if (beat % 4 === 0) {
        const bassFreq = chordProgressions[Math.floor(beat / 8) % chordProgressions.length][0] / 2;
        this.playBassPluck(now, bassFreq);
      }
    };

    // Schedule next ticks
    this.bgmInterval = window.setInterval(tick, stepDuration * 1000);
  }

  public stopBGM() {
    this.isBgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  private playTaikoDrum(time: number, freq: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.28);

    gain.gain.setValueAtTime(this.combatMode ? 0.35 : 0.18, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.28);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.28);
  }

  private playShaker(time: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const bufferSize = this.ctx.sampleRate * 0.05;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 6000;

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.08, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.bgmGain);

    noise.start(time);
    noise.stop(time + 0.05);
  }

  private playPadNote(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.08, time + 0.4);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + duration);
  }

  private playFluteNote(time: number, freq: number, duration: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    // Subtle vibrato
    osc.frequency.linearRampToValueAtTime(freq * 1.01, time + duration * 0.5);
    osc.frequency.linearRampToValueAtTime(freq, time + duration);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(this.combatMode ? 0.14 : 0.09, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + duration);
  }

  private playBassPluck(time: number, freq: number) {
    if (!this.ctx || !this.bgmGain || this.isMuted) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0.12, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.4);

    osc.connect(gain);
    gain.connect(this.bgmGain);
    osc.start(time);
    osc.stop(time + 0.4);
  }

  // ================= ACTION SFX =================

  // Weapon swing whoosh
  public playAttackSwing() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + 0.14);

    gain.gain.setValueAtTime(0.35, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.14);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.14);
  }

  // Heavy weapon hit on beast
  public playHitImpact(isCrit: boolean = false) {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = isCrit ? 'sawtooth' : 'triangle';
    osc.frequency.setValueAtTime(isCrit ? 220 : 160, time);
    osc.frequency.exponentialRampToValueAtTime(30, time + 0.25);

    gain.gain.setValueAtTime(isCrit ? 0.6 : 0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.25);
  }

  // Clear Sky Hammer Ground Slam Explosion
  public playHammerSlam() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    // Sub bass shockwave
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(120, time);
    osc.frequency.exponentialRampToValueAtTime(25, time + 0.6);

    gain.gain.setValueAtTime(0.7, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.6);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.6);

    // Shockwave noise
    const bufferSize = this.ctx.sampleRate * 0.3;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (this.ctx.sampleRate * 0.08));
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.5, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
    noise.connect(noiseGain);
    noiseGain.connect(this.sfxGain);
    noise.start(time);
    noise.stop(time + 0.3);
  }

  // Blue Silver Grass Vine Entanglement
  public playVineCast() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, time);
    osc.frequency.linearRampToValueAtTime(800, time + 0.2);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.35);
  }

  // Dragon Lightning Thunder
  public playDragonThunder() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(700, time);
    osc.frequency.linearRampToValueAtTime(90, time + 0.15);
    osc.frequency.linearRampToValueAtTime(350, time + 0.35);

    gain.gain.setValueAtTime(0.5, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.45);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.45);
  }

  // True Avatar Awakening Roar / Power Surge
  public playAvatarTransformation() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    [110, 220, 330, 440, 554, 659].forEach((freq, i) => {
      if (!this.ctx || !this.sfxGain) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq * 0.8, time + i * 0.05);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, time + i * 0.05 + 0.6);

      gain.gain.setValueAtTime(0.001, time + i * 0.05);
      gain.gain.linearRampToValueAtTime(0.2, time + i * 0.05 + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.001, time + i * 0.05 + 0.8);

      osc.connect(gain);
      gain.connect(this.sfxGain);
      osc.start(time + i * 0.05);
      osc.stop(time + i * 0.05 + 0.8);
    });
  }

  // Beast Roar
  public playBeastRoar() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(95, time);
    osc.frequency.linearRampToValueAtTime(140, time + 0.2);
    osc.frequency.exponentialRampToValueAtTime(45, time + 0.7);

    gain.gain.setValueAtTime(0.4, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.7);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.7);
  }

  // Dash / Ghost Shadow Step
  public playDash() {
    this.init();
    if (!this.ctx || !this.sfxGain || this.isMuted) return;
    const time = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(900, time);
    osc.frequency.exponentialRampToValueAtTime(200, time + 0.18);

    gain.gain.setValueAtTime(0.3, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start(time);
    osc.stop(time + 0.18);
  }
}

export const audio = new AudioEngine();
