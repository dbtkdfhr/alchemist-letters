import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TeachingStyle, CharacterEffects, ChapterOutcome } from '../types'
import { getChapterByIndex } from '../data/chapters'
import { applyEffects, createInitialSaveData, CHAPTER_COUNT } from '../utils/storage'

interface GameState {
  currentChapter: number
  completedChapters: number[]
  currentPage: number
  pageHistory: number[]
  marcoAffection: number
  marcoConfidence: number
  teachingStyle: TeachingStyle
  pastOpenness: number
  readLetters: string[]
  unlockedLetters: string[]
  sentReplies: Record<string, string>
  gameStarted: boolean
  gameFinished: boolean

  startNewGame: () => void
  loadGame: () => boolean
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  selectReply: (chapterId: string, optionId: string, effects: CharacterEffects) => void
  completeChapter: (chapterIdx: number, outcome: ChapterOutcome) => void
  unlockNextChapter: () => void
  getMarcoState: () => string
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...createInitialSaveData(),
      gameStarted: false,
      gameFinished: false,

      startNewGame: () => {
        set({ ...createInitialSaveData(), gameStarted: true, gameFinished: false })
      },

      loadGame: () => {
        const state = get()
        return state.gameStarted
      },

      nextPage: () => {
        const { currentPage, pageHistory } = get()
        const newPage = currentPage + 1
        set({ currentPage: newPage, pageHistory: [...pageHistory, currentPage] })
      },

      prevPage: () => {
        const { pageHistory } = get()
        if (pageHistory.length > 0) {
          const prev = pageHistory[pageHistory.length - 1]
          set({
            currentPage: prev,
            pageHistory: pageHistory.slice(0, -1),
          })
        }
      },

      goToPage: (page) => {
        set({ currentPage: page, pageHistory: [] })
      },

      selectReply: (chapterId, optionId, effects) => {
        const state = get()
        const newAffection = clamp(state.marcoAffection + (effects.affection ?? 0), -100, 100)
        const newConfidence = clamp(state.marcoConfidence + (effects.confidence ?? 0), -100, 100)
        const newOpenness = clamp(state.pastOpenness + (effects.pastOpenness ?? 0), 0, 100)

        let style = state.teachingStyle
        if (newAffection > state.marcoAffection && newAffection > 20) style = 'kind'
        else if (newConfidence < state.marcoConfidence && newAffection < -20) style = 'strict'
        else if (Math.abs(newAffection) < 10) style = 'neutral'

        set({
          marcoAffection: newAffection,
          marcoConfidence: newConfidence,
          pastOpenness: newOpenness,
          teachingStyle: style,
          sentReplies: { ...state.sentReplies, [chapterId]: optionId },
          readLetters: state.readLetters.includes(chapterId) ? state.readLetters : [...state.readLetters, chapterId],
        })
      },

      completeChapter: (chapterIdx, outcome) => {
        const state = get()
        const chapter = getChapterByIndex(chapterIdx)
        if (!chapter) return

        const newState = applyEffects(outcome.effects, state as any)
        const completed = state.completedChapters.includes(chapterIdx)
          ? state.completedChapters
          : [...state.completedChapters, chapterIdx]

        const unlocked = outcome.unlocks ?? []

        set({
          currentChapter: chapterIdx + 1,
          completedChapters: completed,
          marcoAffection: newState.marcoAffection,
          marcoConfidence: newState.marcoConfidence,
          pastOpenness: newState.pastOpenness,
          unlockedLetters: [...state.unlockedLetters, ...unlocked, `ch${String(chapterIdx + 2).padStart(2, '0')}`].filter(
            (v, i, a) => a.indexOf(v) === i
          ),
          currentPage: 0,
          pageHistory: [],
          gameFinished: chapterIdx + 1 >= CHAPTER_COUNT,
        })
      },

      unlockNextChapter: () => {
        const state = get()
        const next = state.currentChapter + 1
        if (next < CHAPTER_COUNT) {
          set({ currentChapter: next })
        }
      },

      getMarcoState: () => {
        const state = get()
        if (state.marcoConfidence > 30) return 'confident'
        if (state.marcoConfidence < -20) return 'timid'
        return 'balanced'
      },

      resetGame: () => {
        set({ ...createInitialSaveData(), gameStarted: false, gameFinished: false })
      },
    }),
    {
      name: 'alchemist-game',
      partialize: (state) => ({
        currentChapter: state.currentChapter,
        completedChapters: state.completedChapters,
        marcoAffection: state.marcoAffection,
        marcoConfidence: state.marcoConfidence,
        teachingStyle: state.teachingStyle,
        pastOpenness: state.pastOpenness,
        readLetters: state.readLetters,
        unlockedLetters: state.unlockedLetters,
        sentReplies: state.sentReplies,
        gameStarted: state.gameStarted,
        gameFinished: state.gameFinished,
        currentPage: state.currentPage,
        pageHistory: state.pageHistory,
      }),
    }
  )
)

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
