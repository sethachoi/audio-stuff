import { MutableRefObject, RefObject } from 'react'

export type WordType = {
  startTime: string
  endTime: string
  word: string
}

export type TranscriptType = {
  transcript_text: string[]
  word_timings: WordType[][]
}

export interface TranscriptContextType {
  transcriptData: TranscriptType
  audioRef: MutableRefObject<HTMLAudioElement> | RefObject<null>
  speed: string
  playing: boolean
  duration: number
  currentTime: number
  togglePlay(): void
  seekByAmount(amount: number): void
  seekToExact(time: number): void
  switchSpeed(): void
}
