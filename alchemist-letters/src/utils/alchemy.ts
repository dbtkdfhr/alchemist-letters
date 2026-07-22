import type { Ingredient, RecipeResult, Attribute } from '../types'
import { findRecipeByIngredients } from '../data/recipes'

function getComboKey(ingredientIds: string[]): string {
  return [...ingredientIds].sort().join('+')
}

export { getComboKey }

export function evaluateCombo(
  ingredients: Ingredient[],
  attemptedCombos: string[]
): { result: RecipeResult; isNew: boolean } {
  const ids = ingredients.map((i) => i.id)
  const key = getComboKey(ids)
  const isNew = !attemptedCombos.includes(key)

  const matched = findRecipeByIngredients(ids)

  if (matched) {
    return { result: matched.result, isNew }
  }

  // 매칭되는 레시피가 없으면 속성 기반 평가
  const allAttrs = ingredients.flatMap((i) => [i.mainAttributes, i.subAttribute].filter(Boolean) as Attribute[][]).flat()

  const ignis = allAttrs.filter((a) => a === 'ignis').length
  const glacies = allAttrs.filter((a) => a === 'glacies').length
  const vita = allAttrs.filter((a) => a === 'vita').length
  const mortis = allAttrs.filter((a) => a === 'mortis').length

  const hasOpposition = (ignis > 0 && glacies > 0) || (vita > 0 && mortis > 0)

  if (hasOpposition && ingredients.length >= 2) {
    const clashCount = (ignis > 0 && glacies > 0 ? 1 : 0) + (vita > 0 && mortis > 0 ? 1 : 0)
    if (clashCount >= 2 || (clashCount === 1 && ingredients.length >= 3)) {
      return {
        result: {
          effect: '대참사',
          grade: 'disaster',
          description: '속성들이 격렬하게 충돌했다! 폭발과 함께 연기가 피어오른다.',
          potency: 0,
        },
        isNew,
      }
    }
    return {
      result: {
        effect: '조합 실패',
        grade: 'failure',
        description: '상반된 속성이 충돌하여 효과가 상쇄되었다. 녹색 연기만 피어오를 뿐이다.',
        potency: 0,
      },
      isNew,
    }
  }

  // 알려지지 않은 조합이지만 충돌이 없는 경우
  return {
    result: {
      effect: '불명',
      grade: 'minor',
      description: '뚜렷한 효과는 없지만, 재료들이 조용히 섞였다. 무언가 될 수도 있을 것 같다.',
      potency: 1,
    },
    isNew,
  }
}
