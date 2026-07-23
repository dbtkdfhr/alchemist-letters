// ===== 연금술 시스템 타입 =====

import type { Attribute } from './game'

export type IngredientCategory = 'plant' | 'mineral' | 'animal' | 'special' | 'solvent'
export type Rarity = 'common' | 'uncommon' | 'rare'
export type RecipeGrade = 'perfect' | 'success' | 'minor' | 'failure' | 'disaster'

export interface Ingredient {
  id: string
  name: string
  description: string
  category: IngredientCategory
  mainAttributes: Attribute[]
  subAttribute?: Attribute
  rarity: Rarity
  unlockChapter: number
  /** 이 레시피를 발견해야 재료가 해금됨 */
  unlockRecipe?: string
}

export interface RecipeResult {
  effect: string
  grade: RecipeGrade
  description: string
  potency: number
}

export interface Recipe {
  id: string
  name: string
  ingredients: string[]
  result: RecipeResult
  attributeMatch: {
    primary: Attribute[]
    secondary?: Attribute[]
  }
}

export interface RecipeEntry {
  recipeId: string
  customName: string
  ingredients: string[]
  result: RecipeResult
  discoveredAt: number
}

export interface AlchemyAttempt {
  ingredients: string[]
  result: RecipeResult
  isNew: boolean
  timestamp: number
}
