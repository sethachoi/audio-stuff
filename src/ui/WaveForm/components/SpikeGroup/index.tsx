import React, { ReactNode } from 'react'
import { Grid, Typography } from '@material-ui/core'
import useStyles from './styles'

type Props = {
  percentage: string
  owner: string
  children: ReactNode
}

const SpikeGroup: React.FunctionComponent<Props> = ({
  children,
  percentage,
  owner,
}: Props) => {
  const classes = useStyles()

  return (
    <Grid item container xs={12}>
      <Grid container className={classes.nameContainer} item xs={1}>
        <Grid item xs={4}>
          <Typography variant="subtitle2" color="secondary">
            {percentage}
          </Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="subtitle2" color="secondary">
            {owner}
          </Typography>
        </Grid>
      </Grid>
      <Grid item container xs={11} justify="space-around">
        {children}
      </Grid>
    </Grid>
  )
}

export default SpikeGroup
