import { useGameStore, useUIStore } from '../../store'
import type { Ending } from '../../store/gameStore'

const ENDING_CONTENT: Record<Exclude<Ending, null>, {
  title: string
  subtitle: string
  description: string
  epilogue: string[]
  color: string
}> = {
  independence: {
    title: '독립 (Independence)',
    subtitle: '제자의 독립',
    color: 'text-amber-800',
    description: '마르코가 진정한 연금술사로 성장했습니다.',
    epilogue: [
      '몇 년 후, 마르코의 가게는 마을에서 가장 유명한 연금술 가게가 되었습니다.',
      '그의 조제 약은 정확했고, 그의 처방은 신중했습니다. 더 이상 스승의 도움이 필요 없을 만큼 성장했지만, 가끔은 여전히 편지를 보내왔습니다.',
      '"스승님, 오늘은 특별한 연금술을 발견했습니다. 함께 나누고 싶어서요."',
      '당신은 미소 지으며 편지를 읽습니다. 제자가 스승을 넘어섰습니다. 그것이 진정한 스승의 기쁨입니다.',
      '그리고 당신은 문득 깨닫습니다. 연금술이란 단순한 물질의 변환이 아니라, 한 인간이 성장해가는 과정 자체라는 것을.',
    ],
  },
  bittersweet: {
    title: '이별 (Bittersweet)',
    subtitle: '아쉬운 이별',
    color: 'text-blue-800',
    description: '마르코는 성장했지만, 당신과의 인연은 멀어졌습니다.',
    epilogue: [
      '마르코의 편지는 점점 줄어들었습니다. 바쁘다는 핑계로, 혼자 해보고 싶다는 핑계로.',
      '어느 날, 마르코의 편지가 도착했습니다. "스승님, 감사했습니다. 이제 저 혼자서도 충분히 할 수 있을 것 같습니다."',
      '그 편지에는 차가운 정중함만이 담겨 있었습니다. 한때 가르침을 구하던 따뜻함은 사라지고 없었습니다.',
      '당신은 편지를 조심히 접어 보관함에 넣습니다. 모든 제자는 언젠가 스승의 곁을 떠납니다. 그것이 자연스러운 이치입니다.',
      '하지만 가끔은 문득 생각납니다. 좀 더 다정하게 대해줄 걸, 좀 더 많은 것을 알려줄 걸, 하고.',
    ],
  },
  tragedy: {
    title: '비극 (Tragedy)',
    subtitle: '되돌릴 수 없는 실수',
    color: 'text-red-800',
    description: '마르코가 치명적인 실수를 저질렀습니다.',
    epilogue: [
      '그날, 편지 대신 한 소식이 전해졌습니다. 마을 외곽에서 작은 폭발이 있었다고.',
      '마르코가 무언가를 잘못 조제했습니다. 다행히 생명에는 지장이 없었지만, 그의 연금술 가게는 완전히 소실되었습니다.',
      '며칠 후, 마르코의 마지막 편지가 도착했습니다. "스승님, 죄송합니다. 당신의 가르침을 제대로 따르지 못했습니다."',
      '당신은 편지를 수없이 읽었습니다. 다른 선택을 했더라면, 더 자세히 가르쳤더라면, 하는 생각이 괴롭힙니다.',
      '연금술은 완벽한 학문입니다. 그러나 인간은 완벽할 수 없습니다. 그것이 이 이야기의 교훈입니다.',
    ],
  },
}

export function EndingScreen() {
  const ending = useGameStore((s) => s.ending)
  const resetGame = useGameStore((s) => s.resetGame)
  const setView = useUIStore((s) => s.setView)

  if (!ending) return null

  const content = ENDING_CONTENT[ending]

  const handleReset = () => {
    resetGame()
    setView('letterbox')
  }

  return (
    <div className="min-h-svh paper-bg flex flex-col items-center justify-center px-6 py-12">
      {/* 엔딩 헤더 */}
      <div className="text-center mb-8 animate-fade-in">
        <span className="font-ui text-xs text-ink-light/50 tracking-widest uppercase">
          Ending
        </span>
        <h1 className={`font-handwriting text-4xl md:text-5xl mt-2 mb-2 ${content.color}`}>
          {content.title}
        </h1>
        <p className="font-ui text-sm text-ink-light/70">
          {content.subtitle}
        </p>
        <div className="w-20 h-px bg-ink-light/20 mx-auto mt-4" />
      </div>

      {/* 에필로그 */}
      <div className="max-w-lg mx-auto w-full">
        <div className="letter-bg rounded-sm p-6 md:p-8 border border-ink-light/10 space-y-4">
          {content.epilogue.map((paragraph, i) => (
            <p
              key={i}
              className="font-handwriting text-base text-ink leading-relaxed"
              style={{ animationDelay: `${i * 300}ms` }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* 통계 */}
        <div className="mt-8 text-center space-y-2">
          <p className="font-ui text-xs text-ink-light/40">
            — 엔딩 —
          </p>
        </div>
      </div>

      {/* 액션 버튼 */}
      <div className="mt-10 flex flex-col gap-3 w-full max-w-xs">
        <button
          onClick={handleReset}
          className="
            w-full py-3 rounded-lg font-handwriting text-lg
            bg-accent-brown text-paper-bg hover:bg-[#7A3B10]
            transition-all duration-200 shadow-sm
          "
        >
          처음부터 다시하기
        </button>
        <button
          onClick={() => setView('letterbox')}
          className="
            w-full py-3 rounded-lg font-handwriting text-base
            text-ink-light hover:text-ink
            border border-ink-light/20 hover:border-ink-light/40
            transition-all duration-200
          "
        >
          편지 보관함으로
        </button>
      </div>
    </div>
  )
}
