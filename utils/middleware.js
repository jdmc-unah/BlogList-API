const logger = require('./logger')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



//Imprime en consola data de cada operacion http
const requestLogger = (request, response, next) => {
  if (process.env.NODE_ENV === 'production') {
    logger.info('Method:', request.method)
    logger.info('Path:  ', request.path)
    logger.info('Body:  ', request.body)
    logger.info('---')
    
  }
  
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return response.status(400).json({error: error.message})
  }else if (error.name ===  'JsonWebTokenError') {
    return response.status(401).json({ error: 'token invalid' })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({
      error: 'token expired'
    })
  }
  
  next(error)
}


const tokenExtractor = (request, response, next) => {

  const authorization = request.headers.authorization // request.get('authorization') //se obtiene el header authorization
  if (authorization && authorization.startsWith('Bearer ')) { //se valida que exista y sea de tipo Bearer
    request.token = authorization.replace('Bearer ', '')    
  }else {
    request.token = null
  }

  next()
}


//OJO con este, si falla lo del jwt verify se crashea y tira un codigo de error
const userExtractor = async (request, response, next)=>{

  //validacion de token

  if (request.token) {
    console.log(request.token); //todo >> quitar esto para produccion 
    
    const decodedToken = jwt.verify(request.token, process.env.SECRET)  
    console.log('decodoedtoken',decodedToken);
    
    if (decodedToken.id) {
      const user = await User.findById(decodedToken.id)    
      request.user = user
    }else{
      request.user = null
    }  
  
  }

  next()
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}
