import { useState } from 'react'
import PropTypes from 'prop-types'

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Collapse, Fab } from '@mui/material';


const Toggable = (props) => {
  const [visible, setVisible] = useState(false)
  
  Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
        <Box  
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        marginTop={5}
        >
          {!visible ?  <Button  startIcon={<AddCircleOutlineIcon/>} variant='contained' size='small' color='warning' 
          onClick={toggleVisibility}>Agregar Nuevo Blog</Button> : 
          
          <Button  startIcon={<HighlightOffIcon/>} variant='contained' size='small' color='error' 
          onClick={toggleVisibility}>Cerrar</Button>  }
          
          {/* <Fab
            color="primary"
            aria-label=""  //todo>> cambiar el diseño para que quede con un floating button
            
          >
            +
             <Icon /> 
          </Fab> */}
        </Box>
      <Collapse in={visible}>
        
          <Box  
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          >
            {props.children}  {/*muestra los elementos del child component */}
        </Box>
        
      </Collapse>

    </div>
  )

}

export default Toggable