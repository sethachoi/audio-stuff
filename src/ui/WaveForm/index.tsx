import React, { useContext, useMemo, useState, useEffect } from 'react'
import { Grid, Divider, Paper, Typography } from '@material-ui/core'
import { WordType } from 'types'
import { TranscriptContext } from 'state'
import { convertToTimeString } from 'utils'
import useStyles from './styles'
import { Spike } from './components'

type OwnedWord = WordType & {
  isMe: boolean
  start: number
  end: number
  word: string
}

const WaveForm: React.FunctionComponent = () => {
  const TranscriptState = useContext(TranscriptContext)
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

  const calculateHasPassed = (end: number): boolean => currentTime > end

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
            {convertToTimeString(currentTime)} / {convertToTimeString(duration)}
          </Typography>
        </Paper>
      </Grid>
      <Grid item container xs={12}>
        <Grid container className={classes.nameContainer} item xs={1}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="secondary">
              {myPercentage}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="secondary">
              You
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={11} justify="space-around">
          {mergedWords.map((item) => (
            <Spike
              key={`item-${item.startTime}-${item.word}-${item.endTime}-me`}
              person="Me"
              onClick={() => {
                TranscriptState.seekToExact(item.start)
              }}
              hiddenSpike={!item.isMe}
              hasPassed={calculateHasPassed(item.end)}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item container xs={12}>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item container xs={12}>
        <Grid container className={classes.nameContainer} item xs={1}>
          <Grid item xs={4}>
            <Typography variant="subtitle2" color="primary">
              {otherPercentage}
            </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="subtitle2" color="primary">
              Michael B.
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={11} justify="space-around">
          {mergedWords.map((item) => (
            <Spike
              key={`item-${item.startTime}-${item.word}-${item.endTime}-other`}
              person="other"
              onClick={() => {
                TranscriptState.seekToExact(item.start)
              }}
              hiddenSpike={item.isMe}
              hasPassed={calculateHasPassed(item.end)}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  )
}

export default WaveForm
