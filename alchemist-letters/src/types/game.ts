// ===== 게임 핵심 타입 =====

export type Attribute = 'ignis' | 'glacies' | 'vita' | 'mortis' | 'spiritus'

export const ATTRIBUTE_LABELS: Record<Attribute, string> = {
  ignis: '열',
  glacies: '냉',
  vita: '생',
  mortis: '사',
  spiritus: '기',
}

export const ATTRIBUTE_SYMBOLS: Record<Attribute, string> = {
  ignis: '🔥',
  glacies: '❄️',
  vita: '🌱',
  mortis: '💀',
  spiritus: '⚡',
}

export type TeachingStyle = 'strict' | 'kind' | 'neutral'
export type ActNumber = 1 | 2 | 3

export interface CharacterEffects {
  affection?: number
  confidence?: number
  pastOpenness?: number
}
