import { useCallback } from 'react'

type SoundType = 'pageTurn' | 'letterArrive' | 'combineSuccess' | 'combineFail' | 'explosion' | 'send' | 'click'

// Web Audio API로 간단한 SFX 생성 (프로토타입용)
function createAudioContext(): AudioContext | null {
  try {
    return new (window.AudioContext || (window as any).webkitAudioContext)()
  } catch {
    return null
  }
}

function playTone(
  ctx: AudioContext,
  frequency: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.15
) {
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

function playSounds(sounds: SoundType[]) {
  const ctx = createAudioContext()
  if (!ctx) return

  sounds.forEach((sound) => {
    switch (sound) {
      case 'pageTurn':
        // 종이 넘기는 소리 (짧은 노이즈)
        playNoise(ctx, 0.15, 0.03)
        playTone(ctx, 800, 0.05, 'sine', 0.02)
        break

      case 'letterArrive':
        // 편지 도착 (두근)
        playTone(ctx, 440, 0.15, 'sine', 0.1)
        setTimeout(() => playTone(ctx, 554, 0.2, 'sine', 0.1), 100)
        break

      case 'combineSuccess':
        // 조합 성공 ('칭')
        playTone(ctx, 523, 0.1, 'sine', 0.12)
        setTimeout(() => playTone(ctx, 659, 0.1, 'sine', 0.1), 80)
        setTimeout(() => playTone(ctx, 784, 0.15, 'sine', 0.08), 160)
        break

      case 'combineFail':
        // 조합 실패 ('푸')
        playTone(ctx, 200, 0.2, 'sawtooth', 0.05)
        playNoise(ctx, 0.15, 0.03)
        break

      case 'explosion':
        // 폭발 ('펑')
        playNoise(ctx, 0.3, 0.08)
        playTone(ctx, 100, 0.3, 'sawtooth', 0.06)
        break

      case 'send':
        // 편지 보내기 (봉투 봉함)
        playTone(ctx, 350, 0.1, 'triangle', 0.08)
        setTimeout(() => playTone(ctx, 400, 0.08, 'triangle', 0.06), 80)
        break

      case 'click':
        // 버튼 클릭 ('딸깍')
        playTone(ctx, 600, 0.03, 'sine', 0.05)
        break
    }
  })
}

export function useSound() {
  const play = useCallback((...sounds: SoundType[]) => {
    playSounds(sounds)
  }, [])

  return { play }
}
