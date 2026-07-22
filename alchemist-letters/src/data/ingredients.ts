import type { Ingredient } from '../types'

export const INGREDIENTS: Ingredient[] = [
  // Chapter 1
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

  // Chapters 2-3
  {
    id: 'shadow_mushroom',
    name: '그림자 버섯',
    description: '빛이 닿지 않는 곳에서 자라는 보랏빛 버섯. 강한 독성을 지녔다.',
    category: 'plant',
    mainAttributes: ['mortis'],
    subAttribute: 'glacies',
    rarity: 'uncommon',
    unlockChapter: 2,
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

  // Chapters 4-6
  {
    id: 'dawn_petal',
    name: '새벽 꽃잎',
    description: '동틀 무렵에만 피는 꽃의 잎. 생명력이 가장 왕성하다.',
    category: 'plant',
    mainAttributes: ['vita', 'spiritus'],
    rarity: 'uncommon',
    unlockChapter: 4,
  },
  {
    id: 'ash_root',
    name: '잿빛 뿌리',
    description: '화산재에서 자라는 검은 뿌리. 강한 열기를 품고 있다.',
    category: 'plant',
    mainAttributes: ['ignis'],
    subAttribute: 'mortis',
    rarity: 'uncommon',
    unlockChapter: 4,
  },
  {
    id: 'frost_salt',
    name: '서리 소금',
    description: '영구 동토층에서 채취하는 결정 소금. 차가운 기운을 저장한다.',
    category: 'mineral',
    mainAttributes: ['glacies'],
    subAttribute: 'spiritus',
    rarity: 'uncommon',
    unlockChapter: 5,
  },
  {
    id: 'flame_distillate',
    name: '화염 증류액',
    description: '태양열로 증류한 강력한 용매. 열을 극대화하는 촉매 역할을 한다.',
    category: 'solvent',
    mainAttributes: ['ignis'],
    subAttribute: 'spiritus',
    rarity: 'uncommon',
    unlockChapter: 5,
  },
  {
    id: 'blood_coral',
    name: '핏빛 산호',
    description: '깊은 바다에서 자라는 붉은 산호. 생명력과 독을 동시에 품고 있다.',
    category: 'animal',
    mainAttributes: ['vita', 'mortis'],
    rarity: 'uncommon',
    unlockChapter: 6,
  },

  // Chapters 7-9
  {
    id: 'dragon_scale',
    name: '용의 비늘',
    description: '매우 희귀한 용의 비늘. 강력한 보호와 치유의 힘이 깃들어 있다.',
    category: 'animal',
    mainAttributes: ['ignis', 'vita'],
    rarity: 'rare',
    unlockChapter: 7,
  },
  {
    id: 'spider_silk',
    name: '거미줄',
    description: '어둠 거미가 만든 얇고 질긴 줄. 독을 흡수하는 성질이 있다.',
    category: 'animal',
    mainAttributes: ['mortis'],
    subAttribute: 'spiritus',
    rarity: 'uncommon',
    unlockChapter: 7,
  },

  // Chapters 10-12
  {
    id: 'starlight_drop',
    name: '별빛 물방울',
    description: '별똥별이 떨어진 자리에서 맺힌 신비한 액체. 순수한 마력을 담고 있다.',
    category: 'special',
    mainAttributes: ['spiritus'],
    subAttribute: 'vita',
    rarity: 'rare',
    unlockChapter: 10,
  },
  {
    id: 'dark_essence',
    name: '어둠의 진액',
    description: '그림자 세계에서 스며든 검은 액체. 강한 부패와 변환의 힘을 가졌다.',
    category: 'special',
    mainAttributes: ['mortis'],
    subAttribute: 'ignis',
    rarity: 'rare',
    unlockChapter: 10,
  },
  {
    id: 'golden_nectar',
    name: '황금 화밀',
    description: '희귀한 황금벌이 만든 꿀. 모든 속성을 부드럽게 연결해준다.',
    category: 'special',
    mainAttributes: ['vita'],
    subAttribute: 'spiritus',
    rarity: 'uncommon',
    unlockChapter: 11,
  },

  // Chapters 13-18
  {
    id: 'phoenix_feather',
    name: '불사조 깃털',
    description: '불사조가 남긴 전설적인 깃털. 부활과 재생의 궁극적인 힘을 지녔다.',
    category: 'animal',
    mainAttributes: ['ignis', 'vita'],
    rarity: 'rare',
    unlockChapter: 13,
  },
  {
    id: 'void_crystal',
    name: '공허 수정',
    description: '차원의 틈새에서 자라난 수정. 모든 속성을 흡수하고 변환한다.',
    category: 'mineral',
    mainAttributes: ['spiritus', 'mortis'],
    rarity: 'rare',
    unlockChapter: 14,
  },
  {
    id: 'primordial_earth',
    name: '태초의 흙',
    description: '세계가 시작될 때부터 존재했다는 흙. 모든 생명의 근원을 담고 있다.',
    category: 'special',
    mainAttributes: ['vita', 'glacies'],
    rarity: 'rare',
    unlockChapter: 15,
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
