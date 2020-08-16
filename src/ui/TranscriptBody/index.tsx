import React, { useContext } from 'react'
import { TranscriptContext } from 'state'
import { Grid } from '@material-ui/core'
import { TranscriptParagraph } from './components'

const TranscriptBody: React.FunctionComponent = () => {
  const {
    transcriptData: { word_timings: wordTimings },
  } = useContext(TranscriptContext)

  return (
    <Grid>
      {wordTimings.map((currParagraph, index) => (
        <TranscriptParagraph
          key={`paragraph${index}`}
          words={currParagraph}
          owner={index % 2 ? 'other' : 'Me'}
        />
      ))}
    </Grid>
  )
}

export default TranscriptBody
