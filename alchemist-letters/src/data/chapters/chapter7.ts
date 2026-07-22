import type { Chapter } from '../../types'

export const chapter7: Chapter = {
  id: 'ch07',
  title: '의문의 손님',
  act: 2,
  letter: {
    from: 'marco',
    content: [
      '스승님께,\n\n해가 지고 난 뒤에만 오는 손님이 있습니다. 문 앞 종이 울릴 때마다 등불이 먼저 흔들리고, 그다음에야 검은 외투 자락이 보입니다. 낮에는 한 번도 뵌 적이 없어요. 피부는 종잇장처럼 창백하고, 목소리는 오래 닫혀 있던 서랍처럼 낮았습니다.',
      '그분은 햇빛에 닿으면 살갗이 타는 듯 아프고, 은으로 된 잔을 잡으면 손끝이 저리다고 했습니다. 이상하게도 상처는 금방 아물지만, 아문 자리마다 푸른 그림자가 남습니다.\n\n더 이상한 일도 있었습니다. 지난번 그 수상한 여행자가 다시 찾아와 말없이 작은 꾸러미를 두고 갔어요. 용의 비늘과 어둠 거미의 줄이었습니다.\n\n용의 비늘은 지키는 힘이 있고, 달빛 오일은 진정시키는 기운이 있다고 배웠습니다. 이 둘을 함께 쓰면 보호가 될까요?',
      '여행자는 떠나며 이렇게 말했습니다. "네 스승이라면 밤의 병을 알아볼 것이다."\n\n스승님, 이 병은 보통 병이 아닌 것 같습니다. 제가 무엇을 만들어야 할까요?\n\n    — 제자 마르코 드림',
    ],
    postscript: '그 손님은 거울 앞에 오래 서 있지 못했습니다. 제 착각일까요?',
  },
  symptoms: '밤에만 나타나는 손님 — 햇빛과 은에 약하고 상처가 빠르게 아물지만 푸른 그림자가 남음. 보호(🔥🌱❄️)와 독성 흡수(💀🌱) 중 어느 쪽을 우선할지 판단해야 함.',
  requiredEffects: ['보호', '치유'],
  requiredRecipe: 'dragon_protection',
  replyOptions: [
    {
      id: 'a',
      text: '용의 비늘과 달빛 오일로 피부를 보호하는 연고를 만들라고 한다.',
      type: 'strict',
      replyText: '마르코야, 네가 본 것은 병이라기보다 오래된 저주의 흔적에 가깝다.\n\n햇빛과 은에 반응한다면, 먼저 몸을 보호해야 한다. 용의 비늘(🔥🌱)은 외부의 해를 막고, 달빛 오일(❄️🌱)은 과열된 살갗을 진정시킨다. 두 재료를 낮의 빛이 들지 않는 곳에서 천천히 섞어 연고를 만들거라.\n\n그 손님에게 정체를 묻지는 마라. 치료는 호기심보다 먼저다.',
      effects: { affection: 0, confidence: 6, pastOpenness: 0 },
      recipeRequired: 'dragon_protection',
    },
    {
      id: 'b',
      text: '두려워하지 말라고 격려하고, 관찰한 내용을 바탕으로 보호 연고를 만들게 한다.',
      type: 'kind',
      replyText: '마르코, 무서웠을 텐데도 잘 관찰했구나. 네 편지 속에는 이미 답의 절반이 들어 있다.\n\n그분에게 필요한 것은 공격하는 약이 아니라 견디게 해주는 약이다. 용의 비늘과 달빛 오일을 함께 써 보렴. 비늘은 지키고, 오일은 달래준다.\n\n낯선 이를 두려워하되 밀어내지는 말거라. 밤에 사는 이에게도 따뜻한 등이 필요하단다.',
      effects: { affection: 10, confidence: 8, pastOpenness: 3 },
      recipeRequired: 'dragon_protection',
    },
    {
      id: 'c',
      text: '거미줄과 새벽 꽃잎으로 푸른 그림자의 독을 먼저 빼내보라고 한다.',
      type: 'risky',
      replyText: '푸른 그림자가 독의 흔적일 수도 있다. 어둠 거미의 줄은 독을 붙잡고, 새벽 꽃잎은 붙잡힌 독을 생명 쪽으로 되돌린다.\n\n다만 조심하거라. 원인이 저주라면 독만 빼내는 처방은 너무 날카로울 수 있다. 손님의 맥박이 차분하고 상처가 검게 번질 때에만 쓰도록 해라.',
      effects: { affection: 3, confidence: 4, pastOpenness: 5 },
      recipeRequired: 'spider_antidote',
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님, 밤의 손님이 다시 찾아왔습니다. 제가 만든 연고를 바르자 푸른 그림자가 옅어지고, 창가의 달빛 아래에서도 손등이 갈라지지 않았어요.\n\n그분은 아주 오래 침묵하다가 "네 스승은 아직도 사람을 살리는 법을 기억하는군" 하고 말했습니다.',
        '그 말이 마음에 걸립니다. 여행자도, 이 손님도 스승님을 알고 있는 것 같아요.\n\n그래도 오늘은 누군가의 밤이 조금 덜 아팠다는 사실만 기억하려 합니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 6, confidence: 7, pastOpenness: 4 },
      unlocks: ['dragon_scale', 'spider_silk'],
    },
    failure: {
      nextLetterContent: [
        '스승님, 처방이 완전히 빗나가지는 않았지만 손님의 푸른 그림자는 여전히 남아 있습니다. 그분은 고맙다고 했지만, 문을 나서며 조금 비틀거렸어요.\n\n제가 더 깊이 보았어야 했던 걸까요?',
      ],
      effects: { affection: 0, confidence: -4, pastOpenness: 2 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 제가 성급했습니다. 은빛 그릇에 약을 담아 드렸더니 손님의 손바닥이 하얗게 타들어 갔습니다. 다행히 생명에는 지장이 없었지만, 그분은 다시는 낮의 물건을 믿지 않겠다고 했어요.\n\n제 무지가 누군가의 밤을 더 어둡게 만들었습니다.',
      ],
      effects: { affection: -6, confidence: -10, pastOpenness: 0 },
    },
  },
}
