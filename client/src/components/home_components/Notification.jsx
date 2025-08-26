import Alert from '@mui/material/Alert';

const Notification = ({ message , error }) => {
 
  if (!message) {
    return null
  }

  return (
    error ?
    
      <Alert sx={{mt:2, mb:2}} variant="filled" severity="error">
          {message}
      </Alert>

    :
      <Alert sx={{mt:2, mb:2}} variant="filled" severity="success">
        {message}
      </Alert>
  )
}
export default Notification