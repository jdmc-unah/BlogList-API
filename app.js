
//Importar Modulos
const express = require('express')
const app = express()

const cors = require('cors')

const mongoose = require('mongoose')

const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
		



//Conexion a MongoDB
logger.info('connecting to', config.MONGODB_URI )

mongoose.connect(config.MONGODB_URI )
  .then(result => {
    logger.info('connected to MongoDB')
  })
  .catch(error => {
    logger.error('error connecting to MongoDB:', error.message)
})

//Uso de Middlewares
app.use(cors())
app.use(express.json())

app.use(middleware.requestLogger)




app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

app.use(middleware.tokenExtractor)
app.use( middleware.userExtractor)

app.use('/api/blogs', blogRouter)


app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app