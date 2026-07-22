import { create } from 'zustand'
import type { LetterView } from '../types'

interface UIState {
  currentView: LetterView
  isTransitioning: boolean
  bgmPlaying: boolean
  currentBgm: string | null
  modalOpen: boolean
  modalContent: string | null

  setView: (view: LetterView) => void
  setTransitioning: (v: boolean) => void
  setBgm: (playing: boolean, bgm?: string | null) => void
  openModal: (content: string) => void
  closeModal: () => void
}

export const useUIStore = create<UIState>((set) => ({
  currentView: 'letterbox',
  isTransitioning: false,
  bgmPlaying: false,
  currentBgm: null,
  modalOpen: false,
  modalContent: null,

  setView: (view) => set({ currentView: view }),
  setTransitioning: (v) => set({ isTransitioning: v }),
  setBgm: (playing, bgm) => set({ bgmPlaying: playing, currentBgm: bgm ?? null }),
  openModal: (content) => set({ modalOpen: true, modalContent: content }),
  closeModal: () => set({ modalOpen: false, modalContent: null }),
}))
