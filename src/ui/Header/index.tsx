import React from 'react'
import { AppBar, Toolbar } from '@material-ui/core'
import { RotateLeft, RotateRight, PauseCircleFilled } from '@material-ui/icons'
import useStyles from './styles'

const Header: React.FunctionComponent = () => {
  const styles = useStyles()
  return (
    <AppBar className={styles.header}>
      <Toolbar>
        <RotateLeft color='primary' />
        <PauseCircleFilled />
        <RotateRight />
      </Toolbar>
    </AppBar>
  )
}

export default Header
