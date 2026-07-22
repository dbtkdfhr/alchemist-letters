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
  unlockConditions?: UnlockConditions
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
  unlockConditions?: UnlockConditions

  /** 이 챕터의 편지를 읽은 후, 답장을 쓰기 위해 반드시 발견해야 하는 레시피 ID */
  requiredRecipe?: string
}

export interface UnlockConditions {
  minAffection?: number
  maxAffection?: number
  minConfidence?: number
  maxConfidence?: number
  minPastOpenness?: number
  maxPastOpenness?: number
}

export interface LetterEntry {
  chapterId: string
  title: string
  from: string
  date: string
  type: LetterType
  isRead: boolean
}
