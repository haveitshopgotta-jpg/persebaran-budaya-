/**
 * Ambient Gamelan & Calung Banyumasan Audio Synthesizer
 * Uses Web Audio API to generate authentic, peaceful traditional Javanese Slendro ambient sounds
 * without relying on external MP3 downloads or unverified CDN links.
 */

class GamelanCalungAmbient {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private intervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private volume = 0.45;
  private step = 0;

  // Traditional Slendro scale frequencies (Hz)
  // 1 (Barang/Panunggul), 2 (Gulu), 3 (Dhadha), 5 (Lima), 6 (Nem), and octave
  private slendroScale = [272, 311, 355, 416, 475, 544, 622, 710];

  public init() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a bamboo calung note with marimba-like acoustic wood resonance
  private playCalungNote(freq: number, time: number, intensity = 0.5) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    // Calung bamboo characteristic: triangle / soft sine with woody bandpass
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(freq * 1.5, time);
    filter.Q.setValueAtTime(3.0, time);

    // Envelope: quick attack, natural wooden decay
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(intensity * 0.4, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.85);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    osc.stop(time + 0.9);
  }

  // Play a metallic Saron / Bonang bell chime
  private playSaronNote(freq: number, time: number, intensity = 0.3) {
    if (!this.ctx || !this.masterGain) return;

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, time);

    // Subtle metallic overtone (harmonic ratio)
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2.76, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(intensity * 0.2, time + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 1.6);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 1.7);
    osc2.stop(time + 1.7);
  }

  // Play deep resonant Gong Ageng
  private playGong(time: number) {
    if (!this.ctx || !this.masterGain) return;

    const osc = this.ctx.createOscillator();
    const subOsc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(68, time); // Deep Gamelan Gong
    osc.frequency.exponentialRampToValueAtTime(62, time + 3.0);

    subOsc.type = 'sine';
    subOsc.frequency.setValueAtTime(136, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(180, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(0.6, time + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 4.2);

    osc.connect(filter);
    subOsc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(time);
    subOsc.start(time);
    osc.stop(time + 4.5);
    subOsc.stop(time + 4.5);
  }

  public play() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Peaceful 78 BPM Calung/Gamelan ostinato rhythm
    const stepDuration = 380; // milliseconds per beat

    const runRhythm = () => {
      if (!this.isPlaying || !this.ctx) return;
      const now = this.ctx.currentTime;

      // Gong on beat 0 every 16 steps
      if (this.step % 16 === 0) {
        this.playGong(now);
      }

      // Traditional Calung & Saron melodic weave
      const pattern = [0, 2, 4, 1, 3, 5, 2, 4, 1, 3, 6, 4, 2, 5, 3, 1];
      const noteIndex = pattern[this.step % pattern.length];
      const freq = this.slendroScale[noteIndex];

      // Bamboo calung runs on each beat
      this.playCalungNote(freq, now, 0.4);

      // Saron accents on even beats
      if (this.step % 2 === 0) {
        this.playSaronNote(this.slendroScale[(noteIndex + 2) % this.slendroScale.length], now + 0.05, 0.25);
      }

      this.step = (this.step + 1) % 64;
    };

    // First note
    runRhythm();
    this.intervalId = window.setInterval(runRhythm, stepDuration);
  }

  public pause() {
    this.isPlaying = false;
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }
}

export const gamelanAmbientPlayer = new GamelanCalungAmbient();
