
const userRouter = require('express').Router()
const User = require('../models/user')

const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {  
  const users = await User.find({}).populate('blogs',{ title: 1, url: 1, author:1 })
  response.json(users)

})


userRouter.post('/', async (request, response) => {

  const body = request.body 
  

  if (!body.password) { 
    return response.status(400).json({error: "password is missing"}).end()
  }else if(body.password.length < 3){
    return response.status(400).json({error: "password should be at least 3 chars long"}).end()
  }

  
  
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    password: passwordHash,
    name: body.name
  })

  const addedUser =  await user.save()
  response.status(201).json(addedUser)

})


module.exports = userRouter