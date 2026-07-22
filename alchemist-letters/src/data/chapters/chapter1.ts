import type { Chapter } from '../../types'

export const chapter1: Chapter = {
  id: 'ch01',
  title: '첫 편지',
  act: 1,
  letter: {
    from: 'marco',
    content: [
      '스승님께,\n\n오랜만에 편지를 드립니다. 그동안 잘 지내셨는지요?\n\n저는 드디어 가게를 열었습니다. 대장장이 엘레나 님이 첫 손님이셨어요.\n"손바닥이 너무 뜨겁고 빨개요. 쇠를 만지다가 그만..." 하시더군요.',
      '불꽃꽃을 으깨서 바르면 낫는다고 해서 그렇게 했는데...\n다음 날 엘레나 님이 화가 나서 다시 오셨습니다. 손바닥이 더 부어있었어요.\n\n찬 기운이 있는 달빛 이끼와, 상처를 아물게 하는 은빛 허브라면 함께 써도 괜찮을까요?\n\n제가 뭘 잘못한 걸까요? 불꽃꽃은 열을 내리는 약재 아니었나요?',
      '가르침을 부탁드립니다.\n\n    — 제자 마르코 드림',
    ],
  },
  symptoms: '손바닥 화상 — 열(🔥)이 과다한 상태. 불꽃꽃(🔥)을 발라 오히려 악화시킴.',
  requiredEffects: ['냉각', '치유'],
  requiredRecipe: 'soothing_ointment',
  replyOptions: [
    {
      id: 'a',
      text: '불꽃꽃이 왜 틀렸는지 설명하고 정확한 레시피(달빛 이끼 + 은빛 허브)를 알려준다.',
      type: 'strict',
      replyText: '마르코야, 불꽃꽃은 열을 내리는 게 아니라 열을 더하는 약재란다.\n화상은 이미 열(🔥)이 과다한 상태. 거기에 불꽃꽃을 바르면 당연히 더 나빠진다.\n\n이번에는 달빛 이끼(❄️)와 은빛 허브(🌱)를 함께 갈아 연고를 만들어라.\n냉기로 열을 식히고, 생명력으로 손상을 치유하는 원리다.\n\n앞으로는 증상의 원인부터 생각하거라.',
      effects: { affection: -5, confidence: -5, pastOpenness: 0 },
      recipeRequired: 'soothing_ointment',
    },
    {
      id: 'b',
      text: '"실수는 누구나 한다"며 위로하고 레시피(달빛 이끼 + 은빛 허브)를 알려준다.',
      type: 'kind',
      replyText: '괜찮다, 마르코. 실수는 누구나 하는 법이다.\n중요한 것은 그 실수에서 배우는 거란다.\n\n불꽃꽃은 열(🔥)을 내는 성질이 있어서 화상에는 오히려 독이 되었다.\n지금 필요한 것은 열을 식힐 냉기(❄️)와 손상을 치유할 생명력(🌱)이다.\n\n달빛 이끼와 은빛 허브를 함께 갈아 연고를 만들어 보거라.\n다음부터는 증상을 잘 관찰하는 습관을 들이도록 하고.',
      effects: { affection: 10, confidence: 5, pastOpenness: 0 },
      recipeRequired: 'soothing_ointment',
    },
    {
      id: 'c',
      text: '간단히 레시피만 알려주고 설명은 생략한다.',
      type: 'neutral',
      replyText: '달빛 이끼와 은빛 허브를 갈아 연고를 만들어 바르거라.\n\n효과가 있을 것이다.',
      effects: { affection: 0, confidence: -3, pastOpenness: 0 },
      recipeRequired: 'soothing_ointment',
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님, 가르쳐주신 대로 했더니 엘레나 님이 완쾌되셨습니다!\n\n연고를 바르자마자 손바닥의 열기가 가시기 시작하더니, 다음 날 아침에는 부기가 완전히 빠졌어요.\n엘레나 님이 매우 기뻐하셨습니다. "역시 마르코의 스승님이시다!" 하시면서요.',
        '이번 교훈을 잊지 않겠습니다. 증상을 먼저 이해하고, 그에 맞는 약재를 선택하는 것.\n\n감사합니다, 스승님.',
        '    — 제자 마르코 드림',
      ],
      effects: { affection: 5, confidence: 5, pastOpenness: 0 },
      unlocks: [],
    },
    failure: {
      nextLetterContent: [
        '스승님... 엘레나 님의 손바닥이 좀 나아지긴 했는데, 효과가 생각보다 약했어요.\n며칠 더 연고를 발라야 한다고 하더군요.\n\n제가 뭔가를 잘못한 걸까요? 아니면 더 좋은 방법이 있었을까요?',
        '다음에는 더 잘 해보고 싶습니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 0, confidence: -3, pastOpenness: 0 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 사고가 났습니다!\n\n달빛 이끼와 불꽃꽃을 같이 넣었더니 가게에서 폭발이 일어났어요...\n다행히 다친 사람은 없지만, 선반이 몇 개 넘어졌습니다.',
        '제가 너무 성급했나 봅니다.\n다음부터는 꼭 조언을 구하겠습니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: -5, confidence: -10, pastOpenness: 0 },
    },
  },
}
