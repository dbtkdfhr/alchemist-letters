# 연금술사의 편지 (The Alchemist's Letters)

> 편지를 읽고, 단서를 따라 재료를 조합하며 답장을 완성하는 편지 연금술 게임.

오래된 스승이 보낸 편지에는 언제나 하나의 레시피가 숨겨져 있다.
재료 상자 속 아이템을 조합해 레시피를 발견하고, 올바른 답장을 골라 이야기를 진행시켜 나가는 **내러티브 퍼즐 게임**.

## 게임 흐름

1. **편지함** — 도착한 편지를 선택한다
2. **편지 읽기** — 편지 속 단서를 통해 필요한 레시피를 유추한다
3. **연금술 실험** — 재료를 조합해 레시피를 발견한다
4. **답장 선택** — 발견한 레시피를 바탕으로 적절한 답장을 작성한다
5. **이야기 진행** — 선택에 따라 변화하는 스토리를 경험한다

## 조합 시스템

- 3개의 슬롯에 재료를 배치하여 조합
- 등급: 완벽(perfect) > 성공(success) > 미미(minor) > 실패(failure) > 대참사(disaster)
- 성공 이상의 등급을 받으면 레시피로 저장되어 이후에 재사용 가능
- 각 재료는 고유한 속성(불/냉/생/사/기)을 가지며 조합 결과에 영향을 줌

## 기술 스택

- **Frontend**: React 19, TypeScript 6, TailwindCSS 3
- **상태 관리**: Zustand (persist middleware로 로컬 저장)
- **빌드 도구**: Vite 8
- **디자인 시스템**: React + TailwindCSS 기반 커스텀 UI
- **런트**: oxlint

## 실행

```bash
npm run dev
```

## Vibe Coding

이 프로젝트는 **단 한 줄의 코드도 직접 작성되지 않았습니다.**
OpenCode(Sisyphus) 에이전트와의 대화만으로 모든 기능이 구현되었습니다.
구현 방향을 제시하고, 검토하고, 수정을 요청하는 과정만으로 완성된 게임입니다.

> "Vibe coding is a new paradigm of programming where you just talk to the AI and it builds the software for you."
