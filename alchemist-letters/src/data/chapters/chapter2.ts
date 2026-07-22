import type { Chapter } from '../../types'

export const chapter2: Chapter = {
  id: 'ch02',
  title: '화상 입은 대장장이',
  act: 1,
  letter: {
    from: 'marco',
    content: [
      '스승님, 안녕하세요?\n\n전에 치료해드린 엘레나 님이 또 오셨습니다. 이번에는 손님이 아니라 선물을 갖고 왔어요.\n"덕분에 손이 다 나았다. 앞으로 마르코의 가게는 내가 지킨다!" 하시면서\n제게 맞춤 제작한 약재 보관함을 선물로 주셨습니다. 참 고마운 분이에요.',
      '그런데 스승님, 오늘 다른 손님이 찾아왔습니다.\n\n마을 귀부인 레아 님이셨는데, 한 달째 잠을 거의 이루지 못했다고 합니다.\n밤이면 심장이 두근거리고 불안해서 눈을 뜨고 있다고 해요.\n피부는 창백하고 손끝이 차갑더군요.',
      '불면증에는 진정 효과가 있는 약재가 필요할 것 같습니다.\n가게에 있는 재료로 뭔가 만들어보려 하는데...\n달빛 이끼는 마음을 가라앉히고, 수정 가루는 흩어진 기운을 모아줄 것 같아요.\n\n스승님의 조언을 부탁드립니다.',
      '    — 제자 마르코 드림',
    ],
  },
  symptoms: '불면증 — ❄️(냉) 기운은 부족하지 않지만 ⚡(기)가 불안정하게 흩어져 있음. 진정과 균형이 필요.',
  requiredEffects: ['진정', '균형'],
  requiredRecipe: 'sleep_potion',
  replyOptions: [
    {
      id: 'a',
      text: '달빛 이끼(❄️) + 수정 가루(⚡)를 추천한다. 진정과 균형을 동시에 잡아준다고 설명.',
      type: 'strict',
      replyText: '레아 님의 증상을 잘 관찰했구나.\n\n손끝이 차갑다는 것은 단순히 기운이 부족한 것이 아니라,\n흩어진 기운이 제대로 순환하지 못한다는 뜻이다.\n\n달빛 이끼(❄️)는 진정 효과로 불안을 가라앉히고,\n수정 가루(⚡)는 흩어진 기운을 균형 잡아줄 것이다.\n\n두 가지를 섞어 달빛 아래서 밤새 우려내어 차로 만들어 보내거라.',
      effects: { affection: 0, confidence: 5, pastOpenness: 0 },
      recipeRequired: 'sleep_potion',
    },
    {
      id: 'b',
      text: '직접적인 레시피 대신 "진정과 균형이 필요하다"는 힌트만 준다.',
      type: 'kind',
      replyText: '마르코, 네가 증상을 제대로 파악하고 있구나. 장하다.\n\n불면증은 보통 두 가지 접근이 필요하단다.\n첫째는 불안한 마음을 가라앉히는 진정(❄️).\n둘째는 흩어진 기운을 모으는 균형(⚡).\n\n네 가게에 있는 재료들 중에서 이 두 가지 효과를 낼 수 있는 조합을\n한번 스스로 찾아보겠니?\n실패해도 괜찮다. 도전하는 과정이 중요하단다.',
      effects: { affection: 10, confidence: 10, pastOpenness: 0 },
    },
    {
      id: 'c',
      text: '이미 알고 있을 거라 믿고 간단한 조언만 한다.',
      type: 'neutral',
      replyText: '진정이 필요하니 달빛 이끼를 쓰고,\n균형을 위해 수정 가루를 더하거라.\n\n달빛 아래서 밤새 우려내 차로 만들면 될 것이다.',
      effects: { affection: -3, confidence: 0, pastOpenness: 0 },
      recipeRequired: 'sleep_potion',
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님! 레아 님의 불면증이 확실히 나아졌습니다!\n\n며칠 전부터 차를 드시기 시작했는데,\n"한 달 만에 처음으로 푹 잤다"며 무척 기뻐하셨어요.\n덕분에 제 가게 소문이 귀부인 사교계에 퍼지기 시작했습니다.',
        '스승님의 가르침 덕분입니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 5, confidence: 8, pastOpenness: 0 },
      unlocks: [],
    },
    failure: {
      nextLetterContent: [
        '스승님, 레아 님의 증상이 조금은 나아졌지만 완전히 낫지는 않았습니다.\n\n제가 만든 차의 효과가 좀 약했던 것 같아요.\n레아 님은 여전히 밤에 자주 깨신다고 합니다.\n\n다른 방법이 있을까요?',
      ],
      effects: { affection: 0, confidence: -3, pastOpenness: 0 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 제가 실수했습니다.\n\n레아 님께 드릴 차를 만들다가 불꽃꽃을 잘못 넣었는지...\n마시고 나서 레아 님이 더 뜨겁고 불안해하셨어요.\n다행히 시간이 지나면 괜찮아진다고 합니다.',
        '앞으로는 더 신중할게요.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: -5, confidence: -8, pastOpenness: 0 },
    },
  },
}
