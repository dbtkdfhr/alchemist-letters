import { useRef, useCallback, useEffect } from 'react'
import { useUIStore } from '../store'

// Web Audio API로 생성한 앰비언트 BGM (프로토타입용 무료 사운드)
function createAmbientDrone(ctx: AudioContext): { start: () => void; stop: () => void } {
  const masterGain = ctx.createGain()
  masterGain.gain.setValueAtTime(0, ctx.currentTime)
  masterGain.connect(ctx.destination)

  // 낮은 화음 드론 (편지 읽기에 집중할 수 있는 잔잔한 배경)
  const osc1 = ctx.createOscillator()
  osc1.type = 'sine'
  osc1.frequency.setValueAtTime(55, ctx.currentTime) // A1

  const osc2 = ctx.createOscillator()
  osc2.type = 'sine'
  osc2.frequency.setValueAtTime(65.41, ctx.currentTime) // C2

  const osc3 = ctx.createOscillator()
  osc3.type = 'sine'
  osc3.frequency.setValueAtTime(82.41, ctx.currentTime) // E2

  // 부드러운 볼륨 변화
  const lfo = ctx.createOscillator()
  lfo.type = 'sine'
  lfo.frequency.setValueAtTime(0.1, ctx.currentTime)
  const lfoGain = ctx.createGain()
  lfoGain.gain.setValueAtTime(0.02, ctx.currentTime)
  lfo.connect(lfoGain)
  lfoGain.connect(masterGain.gain)

  const volume = 0.04 // 매우 작은 볼륨

  const oscGain1 = ctx.createGain()
  oscGain1.gain.setValueAtTime(volume, ctx.currentTime)
  osc1.connect(oscGain1)
  oscGain1.connect(masterGain)

  const oscGain2 = ctx.createGain()
  oscGain2.gain.setValueAtTime(volume * 0.6, ctx.currentTime)
  osc2.connect(oscGain2)
  oscGain2.connect(masterGain)

  const oscGain3 = ctx.createGain()
  oscGain3.gain.setValueAtTime(volume * 0.3, ctx.currentTime)
  osc3.connect(oscGain3)
  oscGain3.connect(masterGain)

  return {
    start: () => {
      osc1.start()
      osc2.start()
      osc3.start()
      lfo.start()
      // 볼륨 서서히 증가
      masterGain.gain.linearRampToValueAtTime(0.15, ctx.currentTime + 2)
    },
    stop: () => {
      masterGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.5)
      setTimeout(() => {
        osc1.stop()
        osc2.stop()
        osc3.stop()
        lfo.stop()
      }, 500)
    },
  }
}

export function useBGM() {
  const bgmRef = useRef<ReturnType<typeof createAmbientDrone> | null>(null)
  const ctxRef = useRef<AudioContext | null>(null)
  const bgmPlaying = useUIStore((s) => s.bgmPlaying)

  const startBGM = useCallback(() => {
    if (bgmRef.current) return
    try {
      const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
      ctxRef.current = ctx
      const bgm = createAmbientDrone(ctx)
      bgmRef.current = bgm
      bgm.start()
      useUIStore.getState().setBgm(true)
    } catch {
      // AudioContext not available
    }
  }, [])

  const stopBGM = useCallback(() => {
    if (bgmRef.current) {
      bgmRef.current.stop()
      bgmRef.current = null
    }
    if (ctxRef.current) {
      ctxRef.current.close()
      ctxRef.current = null
    }
    useUIStore.getState().setBgm(false)
  }, [])

  const toggleBGM = useCallback(() => {
    if (bgmPlaying) {
      stopBGM()
    } else {
      startBGM()
    }
  }, [bgmPlaying, startBGM, stopBGM])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (bgmRef.current) {
        bgmRef.current.stop()
      }
      if (ctxRef.current) {
        ctxRef.current.close()
      }
    }
  }, [])

  return { startBGM, stopBGM, toggleBGM, isPlaying: bgmPlaying }
}
