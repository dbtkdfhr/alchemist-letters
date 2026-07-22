import type { Chapter } from '../../types'

export const chapter8: Chapter = {
  id: 'ch08',
  title: '마르코의 자신감',
  act: 2,
  letter: {
    from: 'marco',
    content: [
      '스승님, 오늘은 먼저 고백할 일이 있습니다.\n\n저는 스승님께 편지를 쓰기 전에 제 힘으로 처방을 해보았습니다. 약초상 할머니의 조카가 산에서 독거미에게 물려 왔고, 상처 가장자리가 검푸르게 번지고 있었습니다. 예전의 저라면 곧장 펜부터 들었을 겁니다.',
      '하지만 이번에는 숨을 고르고 생각했습니다. 독을 붙잡는 재료, 생명력을 되돌리는 재료. 그래서 어둠 거미의 줄과 새벽 꽃잎으로 해독제를 만들었습니다. 아이의 열은 내렸고, 검은 줄도 멈췄어요.\n\n그런데 완전히 낫지는 않았습니다. 손끝이 아직 떨린다고 합니다.',
      '제가 잘한 걸까요, 아니면 운이 좋았던 걸까요? 스승님께 칭찬을 바라는 마음과 꾸중을 들어야 한다는 마음이 함께 있습니다.\n\n    — 제자 마르코 드림',
    ],
  },
  symptoms: '독거미 교상 — 💀 독이 혈관을 따라 번졌고 🌱 회복이 필요함. 마르코가 스스로 spider_antidote를 시도했으나 여진이 남음.',
  requiredEffects: ['해독', '회복'],
  requiredRecipe: 'spider_antidote',
  replyOptions: [
    {
      id: 'a',
      text: '정확한 판단이었다고 칭찬하고 남은 떨림을 관찰하게 한다.',
      type: 'kind',
      replyText: '마르코, 너는 운이 아니라 판단으로 한 생명을 붙잡았다.\n\n어둠 거미의 줄로 독을 묶고 새벽 꽃잎으로 생명을 불러온 처방은 옳았다. 손끝의 떨림은 독이 빠져나간 뒤 기운이 다시 길을 찾는 흔적일 수 있다. 따뜻한 물과 휴식을 권하고, 하루 뒤 맥이 고르게 돌아오는지 보거라.\n\n나는 네가 자랑스럽다.',
      effects: { affection: 12, confidence: 12, pastOpenness: 2 },
      recipeRequired: 'spider_antidote',
    },
    {
      id: 'b',
      text: '성과는 인정하되 기록과 재확인을 엄격히 요구한다.',
      type: 'strict',
      replyText: '처방 자체는 옳았다. 그러나 마르코, 한 번 나아졌다고 치료가 끝나는 것은 아니다.\n\n독은 물러날 때도 흔적을 남긴다. 아이의 체온, 손끝의 떨림, 상처 색을 시간마다 적어라. 기록은 겁이 많은 연금술사의 지팡이가 아니라, 책임 있는 연금술사의 등불이다.\n\n잘했다. 이제 끝까지 잘해라.',
      effects: { affection: 0, confidence: 7, pastOpenness: 0 },
      recipeRequired: 'spider_antidote',
    },
    {
      id: 'c',
      text: '더 강한 처방을 시도해보라고 권하며 위험한 자신감을 시험한다.',
      type: 'risky',
      replyText: '네 판단은 맞았다. 이제 한 걸음 더 나아가 보아도 좋다.\n\n떨림이 남았다면 독보다 기운의 끊김이 문제일 수 있다. 수정 가루를 아주 조금 더해 균형을 잡아 보거라. 단, 쌀알 반만큼이다. 자신감은 불꽃과 같아서, 솥을 데우기도 하지만 집을 태우기도 한다.\n\n네 손이 어느 쪽인지 직접 배워야 할 때가 왔다.',
      effects: { affection: 4, confidence: 15, pastOpenness: 4 },
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님, 아이가 오늘 웃었습니다. 손끝의 떨림도 거의 사라졌고, 할머니는 제 손을 잡고 오래 울었습니다.\n\n스승님의 말씀처럼 기록을 남겼더니 두려움이 조금 작아졌습니다. 제가 무엇을 했는지, 왜 했는지, 다음에는 무엇을 보아야 하는지 알 수 있었어요.',
        '처음으로 제 가게의 등불이 제 손으로 켜진 것 같았습니다. 그래도 그 불이 어디서 배웠는지 잊지 않겠습니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 7, confidence: 10, pastOpenness: 2 },
      unlocks: [],
    },
    failure: {
      nextLetterContent: [
        '스승님, 아이는 나아졌지만 저는 마음이 놓이지 않습니다. 제가 칭찬에 들떠 관찰을 소홀히 한 것 같아요.\n\n자신감을 갖는다는 것과 방심한다는 것 사이의 선이 아직 흐립니다.',
      ],
      effects: { affection: 0, confidence: -3, pastOpenness: 0 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 제가 너무 앞서갔습니다. 더 강하게 만들려고 약을 덧섞었다가 아이가 밤새 열에 시달렸습니다. 지금은 안정되었지만, 할머니의 눈을 마주보기가 어렵습니다.\n\n제 자신감이 누군가에게 짐이 될 수 있다는 것을 배웠습니다.',
      ],
      effects: { affection: -4, confidence: -12, pastOpenness: 0 },
    },
  },
}
