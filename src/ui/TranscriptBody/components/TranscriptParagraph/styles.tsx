import { makeStyles } from '@material-ui/core/styles'

type Props = {
  owner: 'Me' | string
  isActive: boolean
}

const useStyles = makeStyles((theme) => ({
  paragraph: ({ owner, isActive }: Props) => ({
    backgroundColor: isActive
      ? `${
          owner === 'Me'
            ? theme.palette.secondary.main
            : theme.palette.primary.main
        }0D`
      : 'transparent',
    padding: '24px',
  }),
  time: {
    paddingRight: '8px',
  },
  word: ({ owner }: Props) => ({
    whiteSpace: 'pre',
    '&:hover': {
      backgroundColor: `${
        owner === 'Me'
          ? theme.palette.secondary.main
          : theme.palette.primary.main
      }40`,
      cursor: 'pointer',
    },
  }),
  textWithDivider: ({ owner }: Props) => ({
    paddingLeft: '8px',
    borderLeft: `2px solid ${
      owner === 'Me' ? theme.palette.secondary.main : theme.palette.primary.main
    }40`,
  }),
}))

export default useStyles
