import { useCallback } from 'react'

export type SoundType = 'pageTurn' | 'letterArrive' | 'combineSuccess' | 'combineFail' | 'explosion' | 'send' | 'click'

// Try to load real audio file, fall back to Web Audio API synthesis
const audioCache = new Map<string, HTMLAudioElement>()

function preloadSound(name: string): HTMLAudioElement | null {
  if (audioCache.has(name)) return audioCache.get(name) ?? null
  const audio = new Audio(`/sounds/${name}.mp3`)
  audio.preload = 'auto'
  audioCache.set(name, audio)
  return audio
}

function playAudioFile(name: string, volume = 0.5): boolean {
  try {
    const audio = preloadSound(name)
    if (!audio) return false
    const clone = audio.cloneNode() as HTMLAudioElement
    clone.volume = volume
    clone.play().catch(() => {}) // Ignore play() failures — will use synth fallback
    return true
  } catch {
    return false
  }
}

// Web Audio API synthesis fallback
function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)()
  } catch {
    return null
  }
}

function playTone(ctx: AudioContext, frequency: number, duration: number, type: OscillatorType = 'sine', volume = 0.15) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(frequency, ctx.currentTime)
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(ctx.currentTime)
  osc.stop(ctx.currentTime + duration)
}

function playNoise(ctx: AudioContext, duration: number, volume = 0.05) {
  const bufferSize = ctx.sampleRate * duration
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
  const data = buffer.getChannelData(0)
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2)
  }
  const source = ctx.createBufferSource()
  source.buffer = buffer
  const gain = ctx.createGain()
  gain.gain.setValueAtTime(volume, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration)
  source.connect(gain)
  gain.connect(ctx.destination)
  source.start()
}

function playSynthSounds(sounds: SoundType[]) {
  const ctx = createAudioContext()
  if (!ctx) return

  sounds.forEach((sound) => {
    switch (sound) {
      case 'pageTurn':
        playNoise(ctx, 0.15, 0.03)
        playTone(ctx, 800, 0.05, 'sine', 0.02)
        break
      case 'letterArrive':
        playTone(ctx, 440, 0.15, 'sine', 0.1)
        setTimeout(() => playTone(ctx, 554, 0.2, 'sine', 0.1), 100)
        break
      case 'combineSuccess':
        playTone(ctx, 523, 0.1, 'sine', 0.12)
        setTimeout(() => playTone(ctx, 659, 0.1, 'sine', 0.1), 80)
        setTimeout(() => playTone(ctx, 784, 0.15, 'sine', 0.08), 160)
        break
      case 'combineFail':
        playTone(ctx, 200, 0.2, 'sawtooth', 0.05)
        playNoise(ctx, 0.15, 0.03)
        break
      case 'explosion':
        playNoise(ctx, 0.3, 0.08)
        playTone(ctx, 100, 0.3, 'sawtooth', 0.06)
        break
      case 'send':
        playTone(ctx, 350, 0.1, 'triangle', 0.08)
        setTimeout(() => playTone(ctx, 400, 0.08, 'triangle', 0.06), 80)
        break
      case 'click':
        playTone(ctx, 600, 0.03, 'sine', 0.05)
        break
    }
  })
}

// Map of sound names to their audio file names
const SOUND_FILES: Record<SoundType, { file: string; volume: number } | null> = {
  pageTurn: null,        // null = use synth
  letterArrive: null,
  combineSuccess: null,
  combineFail: null,
  explosion: null,
  send: null,
  click: null,
}

export function useSound() {
  const play = useCallback((...sounds: SoundType[]) => {
    // Try real audio files first
    const needsSynth: SoundType[] = []
    for (const sound of sounds) {
      const config = SOUND_FILES[sound]
      if (config && playAudioFile(config.file, config.volume)) {
        continue // Played real audio
      }
      needsSynth.push(sound)
    }
    // Fallback to synthesis for sounds without real files
    if (needsSynth.length > 0) {
      playSynthSounds(needsSynth)
    }
  }, [])

  return { play }
}
