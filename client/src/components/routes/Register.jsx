
//Componentes
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Notification from '../home_components/Notification'


//Iconos
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


//Servicios
import blogService from '../../services/blogs'
import loginService from '../../services/login'
import registerService from '../../services/register'


import { useState, useEffect, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';

  

  const RegisterForm = () => {
    const [name, setName] = useState([])
    const [username, setUsername] = useState([])
    const [password, setPassword] = useState([])
    
    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(false)

    const {setUser} = useContext(AuthContext)
    const navigate = useNavigate();

     
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          
          blogService.setToken(user.token)

        }
    }, [])

    const clearMessage = () =>{
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }


    const handleRegister = async (event) => {
        event.preventDefault()
        
        try {
            await registerService.register({ username, password, name })

            try {
                const user = await loginService.login({username, password})
                window.localStorage.setItem('loggedUser', JSON.stringify(user))
                blogService.setToken(user.token)

                setUser(user)
                navigate('/') 
            } catch (exception) {
                setMessage('Error de login')
                setErrorMessage(true)
                clearMessage()
            }

        } catch (error) {
            setMessage(`Error de registro`)
            setErrorMessage(true)
            clearMessage()
        }
    }



    return(
        <>
    
            <Container maxWidth="sm">
            
            <Notification  message={message}  error= {errorMessage}/>

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-around"
                paddingLeft={2}
                marginTop={5}
                
            >
                <IconButton sx={{width:25, pb:5 }}  size='small' aria-label="" onClick={()=>{ navigate('/') } }>
                <ArrowBackIcon/>
                </IconButton>            
                <Typography variant="h4" gutterBottom>
                    Registro
                </Typography>
                
                <Typography variant="subtitle1" color='primary' gutterBottom>
                    Ingresa los datos debajo para poder ingresar
                </Typography>
                
            </Box>

            <Box
                onSubmit={handleRegister}

                component="form"
                sx={{ '& > :not(style)': { m: 1, width: '35ch' } }}
                noValidate
                autoComplete="off"
                display="flex"
                flexDirection="column"
                justifyContent="space-evenly"
                alignItems="center"
                minHeight="40vh"
            >
                
                <TextField value={name} label="Nombre" onChange={({ target }) => setName(target.value)}
                name="Name"
                variant="outlined" 
                size='small'
                type="text"
                slotProps={{
                    input: {
                    startAdornment:(
                        <InputAdornment position="start">
                        <SentimentVerySatisfiedIcon />
                        </InputAdornment>
                    )
                    },
                }} 
                />

                <TextField value={username} label="Usuario" onChange={({ target }) => setUsername(target.value)}
                name="Username"
                variant="outlined" 
                size='small'
                type="text"
                slotProps={{
                    input: {
                    startAdornment:(
                        <InputAdornment position="start">
                        <AccountCircle />
                        </InputAdornment>
                    )
                    },
                    }} 
                />

            
                <TextField value={password} label="Contraseña" onChange={({ target }) => setPassword(target.value)}
                name="password"
                variant="outlined" 
                size='small'
                type="password"
                slotProps={{
                    input: {
                    startAdornment:(
                        <InputAdornment position="start">
                        <LockIcon />
                        </InputAdornment>
                    )
                    },
                }} 
                />

                <Button variant="contained" type='submit'>Registrarse</Button>
            </Box>
            </Container>
        </>   
    ) 
    }
  


  export default RegisterForm