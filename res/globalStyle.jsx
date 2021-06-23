import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme) => ({
  root: {

  },
  paper: {
    padding: theme.spacing(2),
  },
  marginDefault: {
    marginBottom: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(8),
    right: theme.spacing(4),
  },
  childTextField: {
    '& .MuiTextField-root': {
      marginBottom: theme.spacing(2),
    },
    padding: theme.spacing(4),
  },
}))

export default useStyles
