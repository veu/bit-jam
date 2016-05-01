class Speaker {
  constructor() {
    this.isActive = false;
  }

  start() {
    if (!this.oscillator) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();

      this.oscillator = this.audioContext.createOscillator();
      this.oscillator.type = 'sine';
      this.oscillator.frequency.value = 200;
      this.oscillator.start();
    }

    this.oscillator.connect(this.audioContext.destination);
    this.isActive = true;
  }

  stop() {
    this.oscillator.disconnect();
    this.isActive = false;
  }

  toggle() {
    if (this.isActive) {
      this.stop();
    } else {
      this.start();
    }
  }
  
  setColor(black) {
    if (this.isActive) {
      this.oscillator.frequency.value = black ? 196 : 220;
    }
  }
}
