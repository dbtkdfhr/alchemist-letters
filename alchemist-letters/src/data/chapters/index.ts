import { chapter1 } from './chapter1'
import { chapter2 } from './chapter2'
import { chapter3 } from './chapter3'
import type { Chapter } from '../../types'

const CHAPTERS: Chapter[] = [chapter1, chapter2, chapter3]

export const CHAPTER_MAP: Record<string, Chapter> = Object.fromEntries(
  CHAPTERS.map((c) => [c.id, c])
)

export function getChapter(id: string): Chapter | undefined {
  return CHAPTER_MAP[id]
}

export function getChapterByIndex(index: number): Chapter | undefined {
  return CHAPTERS[index]
}

export function getChapterCount(): number {
  return CHAPTERS.length
}

export { chapter1, chapter2, chapter3 }
export default CHAPTERS
