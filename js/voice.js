/**
 * Web Speech API Voice Output Engine
 * Native browser text-to-speech for ask-arya.sh terminal assistant
 */

class VoiceEngine {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.voice = null;
    this.isMuted = false;
    this.isSupported = !!this.synth;

    if (this.isSupported) {
      this.initVoice();
    }
  }

  initVoice() {
    if (!this.synth) return;

    const loadVoices = () => {
      const voices = this.synth.getVoices();
      // Find a natural English voice
      this.voice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Daniel'))) 
                 || voices.find(v => v.lang.startsWith('en')) 
                 || voices[0];
    };

    loadVoices();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = loadVoices;
    }
  }

  speak(text, onStartCallback, onEndCallback) {
    if (!this.isSupported || this.isMuted || !text) return;

    // Clean text by stripping markdown symbols and links before speaking
    const cleanText = text
      .replace(/•/g, '')
      .replace(/🥇|🥈|🏆|💡|🤖|🎬|📸|⚡/g, '')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/http\S+/g, '')
      .replace(/\n+/g, '. ');

    // Cancel active speech
    this.synth.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    if (this.voice) utterance.voice = this.voice;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      if (typeof onStartCallback === 'function') onStartCallback();
    };

    utterance.onend = () => {
      if (typeof onEndCallback === 'function') onEndCallback();
    };

    utterance.onerror = () => {
      if (typeof onEndCallback === 'function') onEndCallback();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stop();
    }
    return this.isMuted;
  }
}

window.voiceEngine = new VoiceEngine();
