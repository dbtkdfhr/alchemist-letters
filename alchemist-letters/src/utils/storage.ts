import { getChapterByIndex, getChapterCount } from '../data/chapters'
import type { CharacterEffects, TeachingStyle } from '../types'

export const CHAPTER_COUNT = getChapterCount()

export interface SaveData {
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
  discoveredRecipes: Record<string, {
    recipeId: string
    customName: string
    ingredients: string[]
    effect: string
    grade: string
    description: string
    discoveredAt: number
  }>
  attemptedCombos: string[]
}

export function createInitialSaveData(): SaveData {
  return {
    currentChapter: 0,
    completedChapters: [],
    currentPage: 0,
    pageHistory: [],
    marcoAffection: 0,
    marcoConfidence: 0,
    teachingStyle: 'neutral',
    pastOpenness: 0,
    readLetters: [],
    unlockedLetters: ['ch01'],
    sentReplies: {},
    discoveredRecipes: {},
    attemptedCombos: [],
  }
}

export function applyEffects(effects: CharacterEffects, data: SaveData): SaveData {
  return {
    ...data,
    marcoAffection: clamp(data.marcoAffection + (effects.affection ?? 0), -100, 100),
    marcoConfidence: clamp(data.marcoConfidence + (effects.confidence ?? 0), -100, 100),
    pastOpenness: clamp(data.pastOpenness + (effects.pastOpenness ?? 0), 0, 100),
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value))
}

export function getChapterCountForAct(act: number): number {
  let count = 0
  for (let i = 0; i < CHAPTER_COUNT; i++) {
    const chapter = getChapterByIndex(i)
    if (chapter && chapter.act === act) count++
  }
  return count
}
