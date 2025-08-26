
//Componentes
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import Typography from '@mui/material/Typography';

import Notification from '../home_components/Notification'

//Servicios
import blogService from '../../services/blogs'
import loginService from '../../services/login'

import { useState, useEffect, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom';




  const LoginForm = () => {
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


    const handleLogin = async (event) => {
        event.preventDefault()
        
        try {
        const user = await loginService.login({
            username, password,
        })

        window.localStorage.setItem('loggedUser', JSON.stringify(user))

        
        blogService.setToken(user.token)

        setUser(user)
        setUsername('')
        setPassword('')

                //   navigate('/')

        } catch (exception) {
        
        setMessage('Credenciales Incorrectas')
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
            marginTop={10}
        >
            <Typography variant="h4" gutterBottom>
            Hola, <br /> Bienvenido!
            </Typography>
            
            <Typography variant="subtitle1" color='primary' gutterBottom>
            Ingresa tus credenciales para empezar a navegar
            </Typography>
            
            
        </Box>
        <Box
            onSubmit={handleLogin}
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
            name="Username"
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
           
            <Button variant="contained" type='submit'>Entrar</Button>
        </Box>

        <Box sx={{display:'flex', flexDirection:'column', alignItems:'center' }} >
            <Typography variant="body1" color="initial">
                ¿No tienes una cuenta? 
                <Button color="primary" onClick={()=>{ navigate('/register')}} > Regístrate</Button> 
            </Typography>
        </Box>
        </Container>
        </>   
    ) 
    }
  


  export default LoginForm