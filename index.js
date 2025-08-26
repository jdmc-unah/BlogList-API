const app = require('./app')
const logger = require('./utils/logger')
const config = require('./utils/config')

const http = require('http')
const server = http.createServer(app)

const PORT = config.PORT || 3003
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

