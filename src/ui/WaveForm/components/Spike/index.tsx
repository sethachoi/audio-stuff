import React from 'react'
import { ButtonBase, Box } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  hiddenSpike?: boolean
  hasPassed?: boolean
  person: 'Me' | string
  onClick(event: React.MouseEvent<HTMLElement>): void
}

const Spike: React.FunctionComponent<Props> = ({
  hiddenSpike = false,
  hasPassed = false,
  person,
  onClick,
}: Props) => {
  const classes = useStyles({ hasPassed, person, hiddenSpike })
  return (
    <Box className={classes.spike} onClick={onClick}>
      <ButtonBase>
        <div className={classes.spikeFiller} />
      </ButtonBase>
    </Box>
  )
}

export default Spike
