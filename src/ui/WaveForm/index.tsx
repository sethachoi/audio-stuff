import React, { useContext, useMemo, useState, useEffect } from 'react'
import { Grid, Divider, Paper, Typography } from '@material-ui/core'
import { WordType } from 'types'
import { TranscriptContext } from 'state'
import { convertToTimeString } from 'utils'
import useStyles from './styles'
import { Spike, SpikeGroup } from './components'

type OwnedWord = WordType & {
  isMe: boolean
  start: number
  end: number
  word: string
}

const WaveForm: React.FunctionComponent = () => {
  const TranscriptState = useContext(TranscriptContext)
  const [previewTime, setPreviewTime] = useState(0)
  const [showPreview, setShowPreview] = useState(false)
  const [myPercentage, setMyPercentage] = useState('0%')
  const [otherPercentage, setOtherPercentage] = useState('0%')

  const classes = useStyles()

  const mergedWords: OwnedWord[] = useMemo((): OwnedWord[] => {
    let isMe = true
    return TranscriptState.transcriptData.word_timings.reduce<OwnedWord[]>(
      (acc, item): OwnedWord[] => {
        const returnItem = [
          ...acc,
          ...item.map(
            (wordItem): OwnedWord => {
              const newWord = {
                ...wordItem,
                start: parseFloat(wordItem.startTime),
                end: parseFloat(wordItem.endTime),
                word: wordItem.word,
                isMe,
              }
              return newWord
            }
          ),
        ]
        isMe = !isMe
        return returnItem
      },
      []
    )
  }, [TranscriptState.transcriptData.word_timings])

  useEffect(() => {
    const total = mergedWords.length
    const myTotal = mergedWords.filter((item: OwnedWord) => item.isMe).length
    const otherTotal = total - myTotal
    const myPercentageString = `${((myTotal / total) * 100).toFixed(0)}%`
    const otherPercentageString = `${((otherTotal / total) * 100).toFixed(0)}%`
    setMyPercentage(myPercentageString)
    setOtherPercentage(otherPercentageString)
  }, [mergedWords])

  const calculateHasPassed = (end: number): boolean =>
    TranscriptState.currentTime > end

  const enablePreview = (time: number) => {
    setShowPreview(true)
    setPreviewTime(time)
  }

  const disablePreview = () => {
    setShowPreview(false)
  }

  const generateTimeString = (): string => {
    if (showPreview) {
      return convertToTimeString(previewTime)
    }
    return convertToTimeString(TranscriptState.currentTime)
  }

  return (
    <Grid
      item
      container
      xs={12}
      direction="column"
      className={classes.mainContainer}
    >
      <Grid item container xs={12}>
        <Paper className={classes.time} elevation={0}>
          <Typography variant="caption">
            {generateTimeString()} /{' '}
            {convertToTimeString(TranscriptState.duration)}
          </Typography>
        </Paper>
      </Grid>
      <SpikeGroup owner={'You'} percentage={myPercentage}>
        <>
          {mergedWords.map((item) => (
            <Spike
              key={`item-${item.startTime}-${item.word}-${item.endTime}-me`}
              person="Me"
              onClick={() => {
                TranscriptState.seekToExact(item.start)
              }}
              hiddenSpike={!item.isMe}
              hasPassed={calculateHasPassed(item.end)}
              enablePreview={() => {
                enablePreview(item.end)
              }}
              disablePreview={disablePreview}
            />
          ))}
        </>
      </SpikeGroup>
      <Grid item container xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <SpikeGroup owner={'Michael B.'} percentage={otherPercentage}>
        <>
          {mergedWords.map((item) => (
            <Spike
              key={`item-${item.startTime}-${item.word}-${item.endTime}-other`}
              person="other"
              onClick={() => {
                TranscriptState.seekToExact(item.start)
              }}
              hiddenSpike={item.isMe}
              hasPassed={calculateHasPassed(item.end)}
              enablePreview={() => {
                enablePreview(item.end)
              }}
              disablePreview={disablePreview}
            />
          ))}
        </>
      </SpikeGroup>
    </Grid>
  )
}

export default WaveForm
