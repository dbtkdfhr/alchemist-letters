import type { Chapter } from '../../types'

export const chapter11: Chapter = {
  id: 'ch11',
  title: '마르코의 제안',
  act: 2,
  letter: {
    from: 'marco',
    content: [
      '스승님, 오늘은 처방보다 먼저 허락을 구하고 싶습니다.\n\n전염병은 조금 가라앉았지만, 동쪽 골목의 노인들과 아이들은 제 가게까지 올 힘이 없습니다. 약을 보내는 것만으로는 부족합니다. 환자의 숨소리, 그림자의 길이, 물그릇에 비치는 별점을 직접 봐야 합니다.',
      '그래서 제가 그곳으로 가고 싶습니다. 엘레나 님은 위험하다고 말렸고, 수상한 여행자는 "네 스승이 막을 것이다"라고 했습니다. 그 말이 이상하게 저를 더 가고 싶게 했습니다.\n\n가기 전에 안전한 약을 준비해야 합니다. 황금 화밀은 속성을 연결하고, 정제수는 충돌을 중화시킨다고 배웠어요.\n\n저는 아직 제자입니다. 하지만 제자가 언제까지 문 안에서만 배울 수는 없지 않을까요?',
      '스승님, 제가 직접 가도 되겠습니까? 아니면 가게에 남아 약을 만드는 편이 옳을까요? 어떤 대답이든 따르겠습니다.\n\n    — 제자 마르코 드림',
    ],
  },
  symptoms: '마르코의 현장 치료 제안 — 환자 관찰이 필요하지만 감염과 정체불명의 저주 위험이 큼. 신뢰와 안전 사이 선택.',
  requiredEffects: ['판단', '용기'],
  requiredRecipe: 'golden_balance',
  replyOptions: [
    {
      id: 'a',
      text: '마르코를 믿고 현장으로 보내되 안전 규칙과 별빛 비약을 챙기게 한다.',
      type: 'risky',
      replyText: '가거라, 마르코.\n\n이 말이 얼마나 무거운지 나도 안다. 하지만 네가 편지 속에서 이미 환자 곁에 서 있다는 것을 느꼈다. 직접 보아야 할 때가 있다. 별빛 비약을 세 병 챙기고, 황금 균형제를 작은 병에 나누어 담아라. 해가 진 뒤에는 혼자 움직이지 말고, 우물가에는 절대 가까이 가지 마라.\n\n용기는 두려움이 없는 것이 아니라, 두려움을 데리고도 필요한 곳으로 가는 것이다.',
      effects: { affection: 10, confidence: 15, pastOpenness: 6 },
      recipeRequired: 'starlight_elixir',
    },
    {
      id: 'b',
      text: '가게에 남아 약을 안정적으로 만들라고 한다.',
      type: 'strict',
      replyText: '아직은 가지 마라.\n\n현장에 가는 것만이 책임은 아니다. 네 가게가 멈추면 약도 멈춘다. 지금 마을에 필요한 것은 한 사람의 용맹보다 흔들리지 않는 공급이다. 환자의 증상은 엘레나와 여행자를 통해 받아 적고, 너는 별빛 비약과 황금 균형제를 정확히 만들어라.\n\n문을 지키는 일도 싸움이다.',
      effects: { affection: -2, confidence: -3, pastOpenness: 2 },
      recipeRequired: 'golden_balance',
    },
    {
      id: 'c',
      text: '혼자 가지 말고 동행과 역할을 정해 제한적으로 방문하게 한다.',
      type: 'kind',
      replyText: '네 마음을 막고 싶지는 않다. 다만 혼자 보내고 싶지도 않구나.\n\n엘레나 님과 함께 낮에만 다녀오너라. 너는 환자를 보고, 엘레나는 길과 사람을 살핀다. 약은 별빛 비약과 황금 균형제를 나누어 가져가고, 어둠의 치료제는 마지막 수단으로만 써라.\n\n제자는 문을 나서도 제자다. 그러니 돌아와 다시 편지를 쓰겠다고 약속하렴.',
      effects: { affection: 12, confidence: 10, pastOpenness: 5 },
      recipeRequired: 'golden_balance',
    },
  ],
  result: {
    success: {
      nextLetterContent: [
        '스승님, 다녀왔습니다. 손이 아직 떨리지만 살아서, 그리고 조금은 달라져서 돌아왔습니다.\n\n직접 본 환자들의 그림자는 모두 우물 쪽을 향하고 있었습니다. 병은 사람 사이로만 번지는 것이 아니라, 오래된 장소에서 흘러나오고 있는 것 같습니다.',
        '엘레나 님이 제 곁에 있어 주셨고, 저는 도망치지 않았습니다. 한 아이가 제 소매를 잡고 "연금술사님"이라고 불렀어요. 저는 아직 그 이름이 두렵지만, 이제 아주 조금은 받아들일 수 있을 것 같습니다.\n\n    — 제자 마르코 드림',
      ],
      effects: { affection: 9, confidence: 12, pastOpenness: 7 },
      unlocks: [],
    },
    failure: {
      nextLetterContent: [
        '스승님, 저는 가게에 남았습니다. 약은 끊기지 않았고 환자들도 버텼습니다. 하지만 밤이 되자 창밖에서 동쪽 골목의 종소리가 들렸고, 제 발은 문턱 앞에서 오래 멈춰 있었습니다.\n\n안전한 선택이었지만 마음은 안전하지 않았습니다.',
      ],
      effects: { affection: 0, confidence: -4, pastOpenness: 3 },
    },
    disaster: {
      nextLetterContent: [
        '스승님, 제가 혼자 갔다가 길을 잃었습니다. 해가 진 뒤 골목의 그림자가 모두 같은 방향으로 기울었고, 우물에서 제 이름이 들렸습니다. 수상한 여행자가 저를 끌어내지 않았다면 돌아오지 못했을 겁니다.\n\n용기와 무모함을 구별하지 못했습니다.',
      ],
      effects: { affection: -6, confidence: -10, pastOpenness: 5 },
    },
  },
  unlockConditions: { minConfidence: 20 },
}
