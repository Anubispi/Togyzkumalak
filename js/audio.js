class TogyzkumalakAudio {
    constructor() {
        this.ctx = null;
    }

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (this.ctx.state === 'suspended') {
            this.ctx.resume();
        }
    }

    playStoneDrop(delay = 0, pitchMultiplier = 1.0) {
        this.init();
        const time = this.ctx.currentTime + delay;

        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';

        const startFreq = (500 + Math.random() * 150) * pitchMultiplier;
        const endFreq = 120 * pitchMultiplier;

        osc.frequency.setValueAtTime(startFreq, time);
        osc.frequency.exponentialRampToValueAtTime(endFreq, time + 0.04);

        gain.gain.setValueAtTime(0.25, time);
        gain.gain.exponentialRampToValueAtTime(0.005, time + 0.06);

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1000, time);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(time);
        osc.stop(time + 0.07);
    }

    playSowSequence(stoneCount) {
        for (let i = 0; i < stoneCount; i++) {
            const pitch = 1.0 - (i * 0.015);
            this.playStoneDrop(i * 0.15, pitch);
        }
    }

    playCapture() {
        this.init();
        const now = this.ctx.currentTime;

        const stoneDropsCount = 6;
        for (let i = 0; i < stoneDropsCount; i++) {
            const delay = i * 0.06 + Math.random() * 0.02;
            const pitch = 1.2 + (i * 0.05) + (Math.random() * 0.1);
            this.playStoneDrop(delay, pitch);
        }

        const chimeOsc = this.ctx.createOscillator();
        const chimeGain = this.ctx.createGain();

        chimeOsc.type = 'sine';
        chimeOsc.frequency.setValueAtTime(1200, now + 0.1);
        chimeOsc.frequency.exponentialRampToValueAtTime(1600, now + 0.3);

        chimeGain.gain.setValueAtTime(0.0, now);
        chimeGain.gain.linearRampToValueAtTime(0.12, now + 0.1);
        chimeGain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

        chimeOsc.connect(chimeGain);
        chimeGain.connect(this.ctx.destination);
        chimeOsc.start(now);
        chimeOsc.stop(now + 0.5);
    }

    playTuzdyq() {
        this.init();
        const now = this.ctx.currentTime;
        const frequencies = [329.63, 440.00, 554.37, 659.25];

        frequencies.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, now + idx * 0.05);

            const vibrato = this.ctx.createOscillator();
            const vibratoGain = this.ctx.createGain();
            vibrato.frequency.setValueAtTime(6, now);
            vibratoGain.gain.setValueAtTime(3, now);

            vibrato.connect(vibratoGain);
            vibratoGain.connect(osc.frequency);
            vibrato.start(now);
            vibrato.stop(now + 1.5);

            gain.gain.setValueAtTime(0.0, now);
            gain.gain.linearRampToValueAtTime(0.06, now + idx * 0.05 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.1);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.05);
            osc.stop(now + 1.5);
        });
    }

    playVictory() {
        this.init();
        const now = this.ctx.currentTime;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, now + idx * 0.1);

            gain.gain.setValueAtTime(0.0, now);
            gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.1 + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.1 + 0.4);

            osc.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.1);
            osc.stop(now + idx * 0.1 + 0.4);
        });
    }

    playDefeat() {
        this.init();
        const now = this.ctx.currentTime;
        const notes = [220.00, 196.00, 174.61, 146.83, 110.00];
        notes.forEach((freq, idx) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(freq, now + idx * 0.2);

            const filter = this.ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(300, now);

            gain.gain.setValueAtTime(0.0, now);
            gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.2 + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.2 + 0.7);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(this.ctx.destination);

            osc.start(now + idx * 0.2);
            osc.stop(now + idx * 0.2 + 0.8);
        });
    }

    playUiClick() {
        this.init();
        const now = this.ctx.currentTime;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start();
        osc.stop(now + 0.06);
    }
}

const gameAudio = new TogyzkumalakAudio();
