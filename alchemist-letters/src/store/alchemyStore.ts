import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { RecipeResult, RecipeEntry } from '../types'
import { evaluateCombo, getComboKey } from '../utils/alchemy'
import { getIngredient, INGREDIENTS } from '../data/ingredients'
import { getRecipe } from '../data/recipes'

interface AlchemyState {
  selectedSlots: string[]  // 선택된 재료 ID (최대 3개)
  attemptedCombos: string[]
  discoveredRecipes: Record<string, RecipeEntry>
  lastResult: { result: RecipeResult; isNew: boolean } | null
  returnToLetter: boolean  // 편지 읽기 → 실험하러 오기 플래그

  selectIngredient: (id: string) => void
  removeIngredient: (index: number) => void
  clearSlots: () => void
  performCombine: () => { result: RecipeResult; isNew: boolean } | null
  renameRecipe: (recipeId: string, name: string) => void
  getAllIngredients: () => typeof INGREDIENTS
  getDiscoveredRecipes: () => RecipeEntry[]
  hasAttempted: (ids: string[]) => boolean
  isRecipeDiscovered: (recipeId: string) => boolean
  setReturnToLetter: (v: boolean) => void
}

export const useAlchemyStore = create<AlchemyState>()(
  persist(
    (set, get) => ({
      selectedSlots: [],
      attemptedCombos: [],
      discoveredRecipes: {},
      lastResult: null,

      selectIngredient: (id) => {
        const state = get()
        if (state.selectedSlots.length >= 3) return
        if (state.selectedSlots.includes(id)) return
        set({ selectedSlots: [...state.selectedSlots, id] })
      },

      removeIngredient: (index) => {
        const state = get()
        const newSlots = state.selectedSlots.filter((_, i) => i !== index)
        set({ selectedSlots: newSlots })
      },

      clearSlots: () => {
        set({ selectedSlots: [], lastResult: null })
      },

      performCombine: () => {
        const state = get()
        if (state.selectedSlots.length < 2) return null

        const ingredients = state.selectedSlots
          .map((id) => getIngredient(id))
          .filter((i): i is NonNullable<typeof i> => i !== undefined)

        if (ingredients.length < 2) return null

        const { result, isNew } = evaluateCombo(ingredients, state.attemptedCombos)
        const key = getComboKey(state.selectedSlots)

        set({ lastResult: { result, isNew } })

        if (isNew) {
          const newAttempted = [...state.attemptedCombos, key]
          const updates: Partial<AlchemyState> = { attemptedCombos: newAttempted }

          // 성공 이상 등급이면 레시피로 저장
          if (result.grade === 'success' || result.grade === 'perfect') {
            const recipeId = `recipe_${key}`
            const newRecipe: RecipeEntry = {
              recipeId,
              customName: result.effect,
              ingredients: [...state.selectedSlots].sort(),
              result,
              discoveredAt: Date.now(),
            }
            updates.discoveredRecipes = {
              ...state.discoveredRecipes,
              [recipeId]: newRecipe,
            }
          }

          set(updates)
        }

        return { result, isNew }
      },

      renameRecipe: (recipeId, name) => {
        const state = get()
        const recipe = state.discoveredRecipes[recipeId]
        if (recipe) {
          set({
            discoveredRecipes: {
              ...state.discoveredRecipes,
              [recipeId]: { ...recipe, customName: name },
            },
          })
        }
      },

      getAllIngredients: () => INGREDIENTS,
      getDiscoveredRecipes: () => Object.values(get().discoveredRecipes),

      hasAttempted: (ids) => {
        const key = getComboKey(ids)
        return get().attemptedCombos.includes(key)
      },

      isRecipeDiscovered: (recipeId) => {
        const recipe = getRecipe(recipeId)
        if (!recipe) return false
        const key = getComboKey(recipe.ingredients)
        const rid = `recipe_${key}`
        return rid in get().discoveredRecipes
      },

      returnToLetter: false,

      setReturnToLetter: (v) => set({ returnToLetter: v }),
    }),
    {
      name: 'alchemist-alchemy',
      partialize: (state) => ({
        attemptedCombos: state.attemptedCombos,
        discoveredRecipes: state.discoveredRecipes,
      }),
    }
  )
)
