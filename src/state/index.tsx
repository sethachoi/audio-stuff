import React, { useState, useRef, useCallback } from 'react'
import { TranscriptContextType } from 'types'
import transcript from 'data/transcript'

type Props = {
  children: React.ReactNode
}

export const TranscriptContext = React.createContext(
  {} as TranscriptContextType
)

const TranscriptProvider: React.FunctionComponent<Props> = ({
  children,
}: Props) => {
  const [transcriptData] = useState(transcript)
  const [playing, setPlaying] = useState(false)
  const [speed, setSpeed] = useState('1.0x')
  const [duration, setDuration] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const setRef = useCallback((node: HTMLAudioElement) => {
    if (node !== null) {
      audioRef.current = node
      audioRef.current.oncanplay = () => {
        setDuration(node.duration)
      }

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(node.currentTime)
      }

      audioRef.current.onended = () => {
        setPlaying(false)
      }
    }
  }, [])

  const switchSpeed = () => {
    if (audioRef.current) {
      if (speed === '0.5x') {
        setSpeed('0.75x')
        audioRef.current.playbackRate = 0.75
      } else if (speed === '0.75x') {
        setSpeed('1.0x')
        audioRef.current.playbackRate = 1
      } else if (speed === '1.0x') {
        setSpeed('1.5x')
        audioRef.current.playbackRate = 1.5
      } else if (speed === '1.5x') {
        setSpeed('2.0x')
        audioRef.current.playbackRate = 2
      } else {
        setSpeed('0.5x')
        audioRef.current.playbackRate = 0.5
      }
    }
  }

  const togglePlay = async () => {
    if (audioRef.current !== null && !playing) {
      await audioRef.current.play()
      setPlaying(!playing)
    } else if (audioRef.current !== null && playing) {
      audioRef.current.pause()
      setPlaying(!playing)
    }
  }

  const seekByAmount = (amount: number) => {
    if (audioRef.current !== null) {
      const max = audioRef.current.duration
      const current = audioRef.current.currentTime
      let desiredSeek = 0

      if (amount < 0) {
        desiredSeek = Math.max(0, current + amount)
      } else {
        desiredSeek = Math.min(max, current + amount)
      }

      audioRef.current.currentTime = desiredSeek
    }
  }

  const seekToExact = (time: number) => {
    if (audioRef.current !== null) {
      const max = audioRef.current.duration
      let desiredSeek = time

      if (time < 0) {
        desiredSeek = 0
      } else if (time > max) {
        desiredSeek = max
      }

      audioRef.current.currentTime = desiredSeek
    }
  }

  return (
    <TranscriptContext.Provider
      value={{
        transcriptData,
        audioRef,
        speed,
        playing,
        duration,
        currentTime,
        togglePlay,
        seekByAmount,
        seekToExact,
        switchSpeed,
      }}
    >
      <audio ref={setRef}>
        <source
          src={`${process.env.PUBLIC_URL}/audioTranscript.wav`}
          type="audio/wav"
        />
      </audio>
      {children}
    </TranscriptContext.Provider>
  )
}

export default TranscriptProvider
