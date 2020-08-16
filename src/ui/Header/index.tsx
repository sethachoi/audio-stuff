import React, { useContext } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Grid,
  Button,
} from '@material-ui/core'
import {
  RotateLeft,
  RotateRight,
  PauseCircleFilled,
  PlayCircleFilled,
  Reply,
} from '@material-ui/icons'
import { TranscriptContext } from 'state'
import useStyles from './styles'

const Header: React.FunctionComponent = () => {
  const TranscriptState = useContext(TranscriptContext)

  const classes = useStyles()

  const shareAction = () => {
    console.log('sharing, I guess?')
  }

  const togglePlayAction = () => {
    TranscriptState.togglePlay()
  }

  return (
    <AppBar position="static" className={classes.header}>
      <Toolbar className={classes.toolBar}>
        <Grid>
          <IconButton
            className={classes.hoverButton}
            color="primary"
            onClick={() => {
              TranscriptState.seekByAmount(-10)
            }}
          >
            <RotateLeft color="inherit" />
          </IconButton>
          {TranscriptState.playing && (
            <IconButton color="primary" onClick={togglePlayAction}>
              <PauseCircleFilled fontSize="large" />
            </IconButton>
          )}
          {!TranscriptState.playing && (
            <IconButton color="primary" onClick={togglePlayAction}>
              <PlayCircleFilled fontSize="large" />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              TranscriptState.seekByAmount(10)
            }}
            className={classes.hoverButton}
            color="primary"
          >
            <RotateRight />
          </IconButton>
          <Chip
            label={TranscriptState.speed}
            variant="outlined"
            size="small"
            clickable
            className={classes.chip}
            onClick={() => {
              TranscriptState.switchSpeed()
            }}
          />
        </Grid>
        <Grid>
          <Button
            className={classes.shareButton}
            size="large"
            variant="outlined"
            onClick={shareAction}
          >
            <Reply className={classes.shareIcon} /> Share
          </Button>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

export default Header
