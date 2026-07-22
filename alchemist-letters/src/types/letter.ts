// ===== 편지 시스템 타입 =====

import type { CharacterEffects } from './game'

export type LetterType = 'normal' | 'result' | 'flashback' | 'urgent' | 'diary'

export type LetterView = 'letterbox' | 'letter' | 'alchemy' | 'reply' | 'notebook'

export interface ReplyOption {
  id: string
  text: string
  type: 'strict' | 'kind' | 'risky' | 'neutral'
  effects: CharacterEffects
  recipeRequired?: string
  replyText: string
}

export interface ChapterOutcome {
  nextLetterContent: string[]
  effects: CharacterEffects
  unlocks?: string[]
}

export interface Chapter {
  id: string
  title: string
  act: 1 | 2 | 3
  letter: {
    from: 'marco' | 'other' | 'memory'
    content: string[]
    postscript?: string
  }
  symptoms?: string
  requiredEffects?: string[]
  replyOptions: ReplyOption[]
  result: {
    success: ChapterOutcome
    failure: ChapterOutcome
    disaster?: ChapterOutcome
  }
  unlockConditions?: {
    requiredAffection?: number
    requiredConfidence?: number
  }
}

export interface LetterEntry {
  chapterId: string
  title: string
  from: string
  date: string
  type: LetterType
  isRead: boolean
}
