import { makeStyles } from '@material-ui/core/styles'

type Props = {
  hiddenSpike: boolean
  hasPassed: boolean
  person: 'Me' | string
}

const useStyles = makeStyles((theme) => ({
  spike: {
    flex: 1,
    height: '100%',
    margin: '0 1px',
    backgroundColor: ({ hasPassed, person, hiddenSpike }: Props) => {
      if (hiddenSpike) {
        return 'none'
      }

      if (hasPassed) {
        return '#B7C0CE'
      }

      if (person === 'Me') {
        return theme.palette.secondary.main
      }

      return theme.palette.primary.main
    },
    cursor: 'pointer',
  },
  spikeFiller: {
    width: '100%',
    height: '100%',
  },
}))

export default useStyles
