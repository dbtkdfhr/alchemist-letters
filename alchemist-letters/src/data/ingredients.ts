import type { Ingredient } from '../types'

export const INGREDIENTS: Ingredient[] = [
  {
    id: 'moon_moss',
    name: '달빛 이끼',
    description: '그늘진 곳에서 자라는 은빛 이끼. 촉감이 차갑고 촉촉하다.',
    category: 'plant',
    mainAttributes: ['glacies'],
    subAttribute: 'vita',
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'fire_bloom',
    name: '불꽃꽃',
    description: '항상 미지근한 온기를 띠는 붉은 꽃. 만지면 따뜻하다.',
    category: 'plant',
    mainAttributes: ['ignis'],
    subAttribute: 'spiritus',
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'silver_herb',
    name: '은빛 허브',
    description: '은빛 잎을 가진 약초. 상처 치유에 효과적이다.',
    category: 'plant',
    mainAttributes: ['vita'],
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'crystal_powder',
    name: '수정 가루',
    description: '수정을 곱게 간 가루. 마법적인 균형을 맞추는 촉매제다.',
    category: 'mineral',
    mainAttributes: ['spiritus'],
    subAttribute: 'glacies',
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'purified_water',
    name: '정제수',
    description: '불순물을 제거한 깨끗한 물. 중성적인 성질을 띤다.',
    category: 'solvent',
    mainAttributes: ['spiritus'],
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'moon_oil',
    name: '달빛 오일',
    description: '달빛 아래서 정제한 오일. 차가우면서도 생명력을 품고 있다.',
    category: 'solvent',
    mainAttributes: ['glacies', 'vita'],
    rarity: 'common',
    unlockChapter: 1,
  },
  {
    id: 'shadow_mushroom',
    name: '그림자 버섯',
    description: '빛이 닿지 않는 곳에서 자라는 보랏빛 버섯. 강한 독성을 지녔다.',
    category: 'plant',
    mainAttributes: ['mortis'],
    subAttribute: 'glacies',
    rarity: 'uncommon',
    unlockChapter: 3,
  },
  {
    id: 'iron_powder',
    name: '철광석 분말',
    description: '철광석을 빻은 무거운 가루. 단단함과 안정을 상징한다.',
    category: 'mineral',
    mainAttributes: ['ignis', 'spiritus'],
    rarity: 'common',
    unlockChapter: 2,
  },
]

export const INGREDIENT_MAP: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((i) => [i.id, i])
)

export function getIngredient(id: string): Ingredient | undefined {
  return INGREDIENT_MAP[id]
}

export function getIngredientsByChapter(chapter: number): Ingredient[] {
  return INGREDIENTS.filter((i) => i.unlockChapter <= chapter)
}
