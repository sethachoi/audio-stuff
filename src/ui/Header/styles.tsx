import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  header: {
    background: '#eff3f6',
    boxShadow: 'none',
  },
  chip: {
    backgroundColor: 'white',
  },
  hoverButton: {
    color: 'inherit',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  toolBar: {
    justifyContent: 'space-between',
  },
  shareIcon: {
    transform: 'scaleX(-1) translateY(-1px)',
  },
  shareButton: {
    backgroundColor: 'white',
  },
}))

export default useStyles
