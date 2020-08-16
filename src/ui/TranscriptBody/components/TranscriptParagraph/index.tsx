import React, { useState, useContext, useEffect } from 'react'
import { Grid, Typography, Button } from '@material-ui/core'
import { WordType } from 'types'
import { TranscriptContext } from 'state'
import { convertToTimeString } from 'utils'
import useStyles from './styles'

type Props = {
  owner: 'Me' | string
  words: WordType[]
}

const TranscriptParagraph: React.FunctionComponent<Props> = ({
  owner,
  words,
}: Props) => {
  const TranscriptState = useContext(TranscriptContext)
  const [showShare, setShowShare] = useState(false)
  const [isActive, setIsActive] = useState(false)

  const seekToWord = (timeString: string) => {
    const time = parseFloat(timeString)
    TranscriptState.seekToExact(time)
  }

  const showShareButton = () => {
    setShowShare(true)
  }

  const hideShareButton = () => {
    setShowShare(false)
  }

  const shareAction = () => {
    console.log('we sharin')
  }

  const generateKeyString = (currWord: WordType): string =>
    `word-${currWord.startTime}-${currWord.word}-${currWord.endTime}`

  const generateKeyFrame = (): string => {
    const time = parseFloat(words[0].startTime)
    const timeString = convertToTimeString(time)
    return timeString
  }

  useEffect(() => {
    const startKeyFrame = parseFloat(words[0].startTime)
    const endKeyFrame = parseFloat(words[words.length - 1].endTime)
    setIsActive(currentTime >= startKeyFrame && currentTime < endKeyFrame)
  }, [TranscriptState.currentTime, words])

  const classes = useStyles({ owner, isActive })

  return (
    <Grid
      onMouseEnter={showShareButton}
      onMouseLeave={hideShareButton}
      className={classes.paragraph}
      container
    >
      {owner !== 'Me' && <Grid item xs={1} />}
      <Grid container item xs={1} justify="flex-end">
        <Typography
          color={owner !== 'Me' ? 'primary' : 'secondary'}
          className={classes.time}
        >
          {generateKeyFrame()}
        </Typography>
      </Grid>
      <Grid
        className={classes.textWithDivider}
        container
        item
        xs={9}
        direction="column"
        alignItems="flex-start"
      >
        <Grid container item>
          {words.map((currWord: WordType) => (
            <Typography
              variant="body2"
              className={classes.word}
              onClick={() => {
                seekToWord(currWord.startTime)
              }}
              key={generateKeyString(currWord)}
            >
              {`${currWord.word} `}
            </Typography>
          ))}
        </Grid>
        {showShare && (
          <Button
            size="small"
            onClick={shareAction}
            color={owner !== 'Me' ? 'primary' : 'secondary'}
          >
            Share
          </Button>
        )}
      </Grid>
    </Grid>
  )
}

export default TranscriptParagraph
