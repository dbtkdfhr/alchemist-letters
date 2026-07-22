import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { TeachingStyle, CharacterEffects, ChapterOutcome } from '../types'
import { getChapterByIndex } from '../data/chapters'
import { applyEffects, createInitialSaveData, CHAPTER_COUNT } from '../utils/storage'

export type Ending = 'independence' | 'bittersweet' | 'tragedy' | null

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
  ending: Ending
  lastOutcome: 'success' | 'failure' | 'disaster' | null

  startNewGame: () => void
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  selectReply: (chapterId: string, optionId: string, effects: CharacterEffects) => void
  completeChapter: (chapterIdx: number, outcome: ChapterOutcome, outcomeType?: 'success' | 'failure' | 'disaster') => void
  getMarcoState: () => 'confident' | 'timid' | 'balanced'
  determineEnding: () => Ending
  resetGame: () => void
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      ...createInitialSaveData(),
      gameStarted: false,
      gameFinished: false,
      ending: null,
      lastOutcome: null,

      startNewGame: () => {
        set({ ...createInitialSaveData(), gameStarted: true, gameFinished: false, ending: null, lastOutcome: null })
      },

      nextPage: () => {
        const { currentPage, pageHistory } = get()
        set({ currentPage: currentPage + 1, pageHistory: [...pageHistory, currentPage] })
      },

      prevPage: () => {
        const { pageHistory } = get()
        if (pageHistory.length > 0) {
          const prev = pageHistory[pageHistory.length - 1]
          set({ currentPage: prev, pageHistory: pageHistory.slice(0, -1) })
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

        let style: TeachingStyle = state.teachingStyle
        if (newAffection > 15 && newConfidence > 0) style = 'kind'
        else if (newAffection < -10) style = 'strict'
        else style = 'neutral'

        set({
          marcoAffection: newAffection,
          marcoConfidence: newConfidence,
          pastOpenness: newOpenness,
          teachingStyle: style,
          sentReplies: { ...state.sentReplies, [chapterId]: optionId },
          readLetters: state.readLetters.includes(chapterId) ? state.readLetters : [...state.readLetters, chapterId],
        })
      },

      completeChapter: (chapterIdx, outcome, outcomeType = 'success') => {
        const state = get()
        const chapter = getChapterByIndex(chapterIdx)
        if (!chapter) return

        const newState = applyEffects(outcome.effects, state as any)
        const completed = state.completedChapters.includes(chapterIdx)
          ? state.completedChapters
          : [...state.completedChapters, chapterIdx]

        const unlocked = outcome.unlocks ?? []
        const nextChapterNum = chapterIdx + 2
        const nextChapterId = `ch${String(nextChapterNum).padStart(2, '0')}`
        const isLastChapter = chapterIdx + 1 >= CHAPTER_COUNT

        let ending: Ending = null
        if (isLastChapter) {
          ending = get().determineEnding()
        }

        set({
          currentChapter: chapterIdx + 1,
          completedChapters: completed,
          readLetters: state.readLetters.includes(chapter.id)
            ? state.readLetters
            : [...state.readLetters, chapter.id],
          marcoAffection: newState.marcoAffection,
          marcoConfidence: newState.marcoConfidence,
          pastOpenness: newState.pastOpenness,
          lastOutcome: outcomeType,
          unlockedLetters: [
            ...new Set([...state.unlockedLetters, ...unlocked, nextChapterId].filter(Boolean))
          ],
          currentPage: 0,
          pageHistory: [],
          gameFinished: isLastChapter,
          ending: isLastChapter ? ending : state.ending,
        })
      },

      getMarcoState: () => {
        const state = get()
        if (state.marcoConfidence > 30) return 'confident'
        if (state.marcoConfidence < -20) return 'timid'
        return 'balanced'
      },

      determineEnding: () => {
        const state = get()
        if (state.marcoAffection > 20 && state.marcoConfidence > 20) return 'independence'
        if (state.marcoConfidence < 0 || state.marcoAffection < -20) return 'bittersweet'
        return 'tragedy'
      },

      resetGame: () => {
        set({ ...createInitialSaveData(), gameStarted: false, gameFinished: false, ending: null, lastOutcome: null })
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
        ending: state.ending,
        lastOutcome: state.lastOutcome,
        currentPage: state.currentPage,
        pageHistory: state.pageHistory,
      }),
    }
  )
)

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}
