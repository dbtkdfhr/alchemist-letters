import type { Recipe } from '../types'

export const RECIPES: Recipe[] = [
  {
    id: 'soothing_ointment',
    name: '진정 연고',
    ingredients: ['moon_moss', 'silver_herb'],
    result: {
      effect: '화상 치유',
      grade: 'success',
      description: '차가운 이끼와 은빛 허브의 조합으로 화상을 가라앉히고 치유한다.',
      potency: 6,
    },
    attributeMatch: {
      primary: ['glacies', 'vita'],
    },
  },
  {
    id: 'minor_healing_potion',
    name: '약한 치유 물약',
    ingredients: ['silver_herb', 'purified_water'],
    result: {
      effect: '기본 치유',
      grade: 'minor',
      description: '은빛 허브를 정제수에 우려낸 약한 치유 물약. 효과는 미미하다.',
      potency: 3,
    },
    attributeMatch: {
      primary: ['vita'],
    },
  },
  {
    id: 'strong_healing_potion',
    name: '강력 치유 물약',
    ingredients: ['silver_herb', 'moon_oil'],
    result: {
      effect: '강력 치유',
      grade: 'success',
      description: '은빛 허브와 달빛 오일의 상승 효과로 뛰어난 치유력을 발휘한다.',
      potency: 7,
    },
    attributeMatch: {
      primary: ['vita'],
      secondary: ['glacies'],
    },
  },
  {
    id: 'explosive_failure',
    name: '폭발성 혼합물',
    ingredients: ['moon_moss', 'fire_bloom'],
    result: {
      effect: '대립 폭발',
      grade: 'failure',
      description: '냉기와 열기가 충돌하여 작은 폭발이 일어났다. 녹색 연기가 피어오른다.',
      potency: 0,
    },
    attributeMatch: {
      primary: ['glacies', 'ignis'],
    },
  },
  {
    id: 'sleep_potion',
    name: '수면제',
    ingredients: ['moon_moss', 'crystal_powder'],
    result: {
      effect: '진정 및 수면 유도',
      grade: 'success',
      description: '달빛 이끼의 진정 효과와 수정 가루의 균형 작용이 만나 깊은 잠을 유도한다.',
      potency: 6,
    },
    attributeMatch: {
      primary: ['glacies', 'spiritus'],
    },
  },
  {
    id: 'energy_potion',
    name: '활력 물약',
    ingredients: ['fire_bloom', 'moon_oil'],
    result: {
      effect: '활력 충전',
      grade: 'success',
      description: '불꽃꽃의 활성화와 달빛 오일의 생명력이 만나 기운을 북돋운다.',
      potency: 6,
    },
    attributeMatch: {
      primary: ['ignis', 'vita'],
    },
  },
]

export const RECIPE_MAP: Record<string, Recipe> = Object.fromEntries(
  RECIPES.map((r) => [r.id, r])
)

export function getRecipe(id: string): Recipe | undefined {
  return RECIPE_MAP[id]
}

export function findRecipeByIngredients(ingredientIds: string[]): Recipe | undefined {
  const sorted = [...ingredientIds].sort()
  return RECIPES.find((r) => {
    const rSorted = [...r.ingredients].sort()
    return rSorted.length === sorted.length && rSorted.every((id, i) => id === sorted[i])
  })
}
