import React from 'react'
import { ButtonBase, Box } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  hiddenSpike?: boolean
  hasPassed?: boolean
  person: 'Me' | string
  onClick(event: React.MouseEvent<HTMLElement>): void
  enablePreview(event: React.MouseEvent<HTMLElement>): void
  disablePreview(event: React.MouseEvent<HTMLElement>): void
}

const Spike: React.FunctionComponent<Props> = ({
  hiddenSpike = false,
  hasPassed = false,
  person,
  onClick,
  enablePreview,
  disablePreview,
}: Props) => {
  const classes = useStyles({ hasPassed, person, hiddenSpike })
  return (
    <Box
      onMouseEnter={enablePreview}
      onMouseLeave={disablePreview}
      className={classes.spike}
      onClick={onClick}
    >
      <ButtonBase>
        <div className={classes.spikeFiller} />
      </ButtonBase>
    </Box>
  )
}

export default Spike
