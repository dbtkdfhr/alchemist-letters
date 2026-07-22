import type { Chapter } from '../../types'

export const chapter10: Chapter = {
  id: 'ch10',
  title: '전염병 소문',
  act: 2,
  letter: {
    from: 'marco',
    content: [
      '스승님, 급히 씁니다.\n\n마을 동쪽에서 이상한 병이 번지고 있습니다. 처음에는 감기처럼 시작되지만, 해가 지면 환자들의 그림자가 몸보다 먼저 움직입니다. 열은 높지 않은데 눈동자에 별빛 같은 점이 떠오르고, 잠든 사람은 같은 꿈을 꾼다고 합니다. 검은 우물, 닫힌 문, 누군가의 이름.',
      '수상한 여행자가 다시 왔습니다. 이번에는 웃지 않았어요. 그는 별빛 물방울과 어둠의 진액을 내밀며 말했습니다. "네 스승이 시작한 일이 아직 끝나지 않았다."\n\n별빛 물방울은 순수한 마력, 수정 가루는 그것을 안정시키는 촉매라고 들었습니다. 둘로 무너진 균형을 회복할 수 있을까요?\n\n저는 그 말의 뜻을 묻지 못했습니다. 환자들이 너무 많았고, 엘레나 님까지 기침을 시작했습니다.',
      '무엇을 만들어야 합니까? 별빛으로 균형을 잡아야 할까요, 어둠을 어둠으로 끌어내야 할까요?\n\n스승님, 이번에는 한 사람의 병이 아닙니다.\n\n    — 제자 마르코 드림',
    ],
  },
  symptoms: '마을 전염병 — 그림자가 어긋나고 꿈이 공유됨. ⚡ 마력 균형 붕괴와 💀 부패가 함께 나타남. starlight_drop, dark_essence, golden_nectar 계열 처방 필요.',
  requiredEffects: ['정화', '균형', '치유'],
  requiredRecipe: 'starlight_elixir',
  replyOptions: [
    {
      id: 'a',
      text: '별빛 물방울과 수정 가루로 마력 균형부터 회복하라고 한다.',
      type: 'strict',
      replyText: '마르코, 전염처럼 보이지만 먼저 마력의 균형이 무너진 것이다. 그림자가 먼저 움직인다는 것은 몸과 기운의 박자가 어긋났다는 뜻이다.\n\n별빛 물방울(⚡)을 수정 가루(⚡❄️)로 안정시켜 별빛 비약을 만들거라. 모든 환자에게 같은 양을 쓰지 말고, 눈동자의 별점이 흐려질 때까지만 먹여라.\n\n어둠의 진액은 아직 쓰지 마라. 부패를 건드리기 전에 균형을 세워야 한다.',
      effects: { affection: 0, confidence: 7, pastOpenness: 3 },
      recipeRequired: 'starlight_elixir',
    },
    {
      id: 'b',
      text: '어둠의 진액과 황금 화밀로 부패를 치유로 전환하되 대가를 경고한다.',
      type: 'risky',
      replyText: '네가 본 검은 우물은 단순한 꿈이 아닐 수 있다. 부패가 이미 뿌리내렸다면 별빛만으로는 늦다.\n\n어둠의 진액(💀)에 황금 화밀(🌱⚡)을 더해 어둠의 치료제를 만들거라. 황금 화밀은 어둠을 생명 쪽으로 묶어주는 끈이 된다. 하지만 기억해라. 어둠을 약으로 바꿀 때는 반드시 대가가 생긴다.\n\n환자 한 명에게 먼저 쓰고, 우물물과 풀잎의 변화를 함께 살펴라.',
      effects: { affection: 5, confidence: 8, pastOpenness: 8 },
      recipeRequired: 'dark_cure',
    },
    {
      id: 'c',
      text: '두려운 마음을 붙잡아주며 황금 균형제로 속성 충돌을 중화하라고 한다.',
      type: 'kind',
      replyText: '마르코, 숨부터 쉬어라. 많은 환자 앞에서 손이 떨리는 것은 네가 약해서가 아니라, 그만큼 사람을 귀히 여기기 때문이다.\n\n지금은 강한 처방보다 안전한 다리가 필요하다. 황금 화밀과 정제수로 황금 균형제를 만들어 환자들의 속성 충돌을 먼저 가라앉혀라. 완치는 아니어도 병이 번지는 속도를 늦출 수 있다.\n\n그 사이 더 정확한 증상을 적어 보내다오. 너는 혼자가 아니다.',
      effects: { affection: 12, confidence: 5, pastOpenness: 4 },
      recipeRequired: 'golden_balance',
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님, 병의 속도가 늦춰졌습니다. 환자들의 그림자가 다시 발밑으로 돌아오기 시작했고, 엘레나 님도 밤새 같은 꿈을 꾸지 않았다고 합니다.\n\n하지만 완전히 끝난 것은 아닙니다. 우물가 돌틈에서 검은 이끼가 자라고 있어요.',
        '수상한 여행자는 그것을 보고 낮게 말했습니다. "문이 다시 열리려 한다."\n\n스승님, 저는 이제 묻지 않을 수 없습니다. 예전에 무슨 일이 있었던 건가요?\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 8, confidence: 8, pastOpenness: 6 },
      unlocks: ['starlight_drop', 'dark_essence', 'golden_nectar'],
    },
    failure: {
      nextLetterContent: [
        '스승님, 환자 몇몇은 나아졌지만 병은 아직 번지고 있습니다. 제가 만든 약이 너무 약했거나, 병의 뿌리를 잘못 본 것 같습니다.\n\n마을 사람들이 제 가게 앞에 모여 있습니다. 기대와 두려움이 같은 얼굴을 하고 있어요.',
      ],
      effects: { affection: 0, confidence: -6, pastOpenness: 3 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 우물물이 검게 변했습니다. 제가 너무 강한 약을 한꺼번에 쓴 탓인지 환자들의 열은 내렸지만, 마을의 닭들이 새벽 전에 울고 풀잎 끝이 잿빛으로 말랐습니다.\n\n이것이 스승님이 말하지 않던 대가인가요?',
      ],
      effects: { affection: -8, confidence: -12, pastOpenness: 6 },
    },
  },
}
