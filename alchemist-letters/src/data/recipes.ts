import type { Recipe } from '../types'
import { INGREDIENTS } from './ingredients'

export const RECIPES: Recipe[] = [
  // Chapters 1-3
  {
    id: 'soothing_ointment',
    name: '진정 연고',
    ingredients: ['moon_moss', 'silver_herb'],
    result: {
      effect: '화상 치유', grade: 'success',
      description: '차가운 이끼와 은빛 허브의 조합으로 화상을 가라앉히고 치유한다.', potency: 6,
    },
    attributeMatch: { primary: ['glacies', 'vita'] },
  },
  {
    id: 'minor_healing_potion',
    name: '약한 치유 물약',
    ingredients: ['silver_herb', 'purified_water'],
    result: {
      effect: '기본 치유', grade: 'minor',
      description: '은빛 허브를 정제수에 우려낸 약한 치유 물약. 효과는 미미하다.', potency: 3,
    },
    attributeMatch: { primary: ['vita'] },
  },
  {
    id: 'strong_healing_potion',
    name: '강력 치유 물약',
    ingredients: ['silver_herb', 'moon_oil'],
    result: {
      effect: '강력 치유', grade: 'success',
      description: '은빛 허브와 달빛 오일의 상승 효과로 뛰어난 치유력을 발휘한다.', potency: 7,
    },
    attributeMatch: { primary: ['vita'], secondary: ['glacies'] },
  },
  {
    id: 'explosive_failure',
    name: '폭발성 혼합물',
    ingredients: ['moon_moss', 'fire_bloom'],
    result: {
      effect: '대립 폭발', grade: 'disaster',
      description: '냉기와 열기가 충돌하여 작은 폭발이 일어났다. 녹색 연기가 피어오른다.', potency: 0,
    },
    attributeMatch: { primary: ['glacies', 'ignis'] },
  },
  {
    id: 'sleep_potion',
    name: '수면제',
    ingredients: ['moon_moss', 'crystal_powder'],
    result: {
      effect: '진정 및 수면 유도', grade: 'success',
      description: '달빛 이끼의 진정 효과와 수정 가루의 균형 작용이 만나 깊은 잠을 유도한다.', potency: 6,
    },
    attributeMatch: { primary: ['glacies', 'spiritus'] },
  },
  {
    id: 'energy_potion',
    name: '활력 물약',
    ingredients: ['fire_bloom', 'moon_oil'],
    result: {
      effect: '활력 충전', grade: 'success',
      description: '불꽃꽃의 활성화와 달빛 오일의 생명력이 만나 기운을 북돋운다.', potency: 6,
    },
    attributeMatch: { primary: ['ignis', 'vita'] },
  },

  // Chapters 4-6
  {
    id: 'antidote',
    name: '해독제',
    ingredients: ['silver_herb', 'shadow_mushroom'],
    result: {
      effect: '중독 해독', grade: 'success',
      description: '은빛 허브가 그림자 버섯의 독을 중화한다. 위험하지만 효과적인 조합.', potency: 7,
    },
    attributeMatch: { primary: ['vita', 'mortis'] },
  },
  {
    id: 'burn_salve',
    name: '화상 연고',
    ingredients: ['moon_moss', 'frost_salt'],
    result: {
      effect: '강력 냉각', grade: 'success',
      description: '달빛 이끼와 서리 소금의 극한 냉기가 화상을 즉시 가라앉힌다.', potency: 8,
    },
    attributeMatch: { primary: ['glacies'] },
  },
  {
    id: 'dawn_elixir',
    name: '새벽 비약',
    ingredients: ['dawn_petal', 'moon_oil'],
    result: {
      effect: '생명력 회복', grade: 'success',
      description: '새벽 꽃잎의 왕성한 생명력과 달빛 오일이 만나 고갈된 기력을 채운다.', potency: 7,
    },
    attributeMatch: { primary: ['vita', 'spiritus'] },
  },
  {
    id: 'ash_poultice',
    name: '잿빛 찜질약',
    ingredients: ['ash_root', 'iron_powder'],
    result: {
      effect: '관절염 완화', grade: 'success',
      description: '잿빛 뿌리의 열기와 철가루의 안정력이 깊은 곳의 통증을 완화한다.', potency: 6,
    },
    attributeMatch: { primary: ['ignis', 'spiritus'] },
  },
  {
    id: 'coral_blend',
    name: '산호 혼합물',
    ingredients: ['blood_coral', 'purified_water'],
    result: {
      effect: '상처 소독', grade: 'minor',
      description: '핏빛 산호의 이중성이 정제수와 만나 약한 살균 효과를 낸다.', potency: 4,
    },
    attributeMatch: { primary: ['vita', 'mortis'] },
  },
  {
    id: 'frost_fire_balance',
    name: '상생의 물약',
    ingredients: ['frost_salt', 'flame_distillate'],
    result: {
      effect: '속성 균형', grade: 'perfect',
      description: '서리와 화염이 완벽한 균형을 이룬다. 매우 안정적인 치유의 기반이 된다.', potency: 9,
    },
    attributeMatch: { primary: ['glacies', 'ignis', 'spiritus'] },
  },

  // Chapters 7-9
  {
    id: 'dragon_protection',
    name: '용의 수호 연고',
    ingredients: ['dragon_scale', 'moon_oil'],
    result: {
      effect: '강력 보호 및 치유', grade: 'perfect',
      description: '용의 비늘의 생명력이 달빛 오일과 융합하여 놀라운 치유와 보호 효과를 낸다.', potency: 9,
    },
    attributeMatch: { primary: ['ignis', 'vita', 'glacies'] },
  },
  {
    id: 'spider_antidote',
    name: '거미 해독제',
    ingredients: ['spider_silk', 'dawn_petal'],
    result: {
      effect: '모든 독 제거', grade: 'success',
      description: '거미줄의 독 흡수력과 새벽 꽃잎의 생명력이 합쳐져 강력한 해독제가 탄생한다.', potency: 8,
    },
    attributeMatch: { primary: ['mortis', 'vita'] },
  },
  {
    id: 'dragon_fury',
    name: '용의 분노',
    ingredients: ['dragon_scale', 'ash_root'],
    result: {
      effect: '맹렬한 활성화', grade: 'success',
      description: '두 강한 열기의 재료가 만나 극대화된 활성 효과를 낸다.', potency: 8,
    },
    attributeMatch: { primary: ['ignis'] },
  },

  // Chapters 10-12
  {
    id: 'starlight_elixir',
    name: '별빛 비약',
    ingredients: ['starlight_drop', 'crystal_powder'],
    result: {
      effect: '마력 회복', grade: 'success',
      description: '별빛의 순수한 마력이 수정 가루로 안정화된다. 모든 속성의 균형을 회복한다.', potency: 8,
    },
    attributeMatch: { primary: ['spiritus'] },
  },
  {
    id: 'dark_cure',
    name: '어둠의 치료제',
    ingredients: ['dark_essence', 'golden_nectar'],
    result: {
      effect: '강력 변환 치유', grade: 'success',
      description: '어둠의 진액이 황금 화밀의 생명력과 만나 부패를 치유로 전환한다.', potency: 8,
    },
    attributeMatch: { primary: ['mortis', 'vita'] },
  },
  {
    id: 'golden_balance',
    name: '황금 균형제',
    ingredients: ['golden_nectar', 'purified_water'],
    result: {
      effect: '속성 중화', grade: 'success',
      description: '황금 화밀의 연결력이 정제수와 만나 모든 속성 충돌을 중화한다.', potency: 7,
    },
    attributeMatch: { primary: ['vita', 'spiritus'] },
  },
  {
    id: 'starlight_cure_all',
    name: '만병통치약',
    ingredients: ['starlight_drop', 'dawn_petal', 'golden_nectar'],
    result: {
      effect: '전방위 치유', grade: 'perfect',
      description: '세 가지 고귀한 재료의 완벽한 조화. 모든 증상을 근본부터 치유한다.', potency: 10,
    },
    attributeMatch: { primary: ['spiritus', 'vita'] },
  },

  // Chapters 13-18
  {
    id: 'phoenix_rebirth',
    name: '불사조의 재생',
    ingredients: ['phoenix_feather', 'starlight_drop'],
    result: {
      effect: '완전 재생', grade: 'perfect',
      description: '불사조의 재생력과 별빛 마력이 만나 죽어가는 생명도 되살린다.', potency: 10,
    },
    attributeMatch: { primary: ['ignis', 'vita', 'spiritus'] },
  },
  {
    id: 'void_transformation',
    name: '공허 변환제',
    ingredients: ['void_crystal', 'dark_essence'],
    result: {
      effect: '속성 변환', grade: 'success',
      description: '공허 수정이 어둠의 진액을 흡수하여 모든 속성을 변환한다.', potency: 9,
    },
    attributeMatch: { primary: ['spiritus', 'mortis'] },
  },
  {
    id: 'primordial_life',
    name: '태초의 생명수',
    ingredients: ['primordial_earth', 'phoenix_feather', 'starlight_drop'],
    result: {
      effect: '생명의 근원', grade: 'perfect',
      description: '태초의 흙에 불사조의 재생력과 별빛이 깃들어 생명 그 자체를 창조한다.', potency: 10,
    },
    attributeMatch: { primary: ['vita', 'glacies', 'ignis', 'spiritus'] },
  },
  {
    id: 'ultimate_heal',
    name: '궁극 치유',
    ingredients: ['phoenix_feather', 'primordial_earth', 'golden_nectar'],
    result: {
      effect: '모든 상태 이상 회복', grade: 'perfect',
      description: '전설의 재료가 합쳐져 모든 질병과 상처를 순식간에 치유한다.', potency: 10,
    },
    attributeMatch: { primary: ['ignis', 'vita', 'glacies'] },
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

export function getRecipesByChapter(chapter: number): Recipe[] {
  return RECIPES.filter((r) => {
    const chapters = r.ingredients.map((id) => {
      const ing = INGREDIENTS.find((i) => i.id === id)
      return ing ? ing.unlockChapter : 99
    })
    return Math.max(...chapters) <= chapter
  })
}
