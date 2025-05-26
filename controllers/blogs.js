

const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')



blogRouter.get('/', async (request, response) => {
  
  
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
  
  response.json(blogs)

})

blogRouter.get('/:id', async (request, response)=>{
    const blog = await Blog.findById(request.params.id).populate('user', {username: 1, name: 1})
    
    if (!blog) {
      return response.status(400).json({ error: 'blog does not exist' })
    }
    
    response.json(blog)
})



blogRouter.post('/', async (request, response) => {  

  //validacion de token  
  if (!request.token) {
    return response.status(401).json({ error: 'token invalid' })
  }
  
  //busca el usuario por el id del token decodificado
  const user = request.user

  //valida que el usuario exista
  if (!user) {
    return response.status(400).json({error: "user not found"})
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: Number(request.body.likes) || 0  ,
    user: user.id
  })

  const addedBlog =  await blog.save()

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()

  response.status(201).json(addedBlog)

})


blogRouter.delete('/:id', async (request, response)=>{
 
  const blogID = request.params.id
  const sessionUser = request.user
  const blogtoDelete = await Blog.findById(blogID)

     //valida que el usuario y el blog a borrar exista
  if (!sessionUser) {
    
    return response.status(400).json({error: "user does not exist"})

  }else if(!blogtoDelete){
    return response.status(400).json({error: "blog does not exist"})
  }

  if (blogtoDelete.user.toString() === sessionUser._id.toString()  ) {
    const deletedBlog = await Blog.findByIdAndDelete(blogID)

    response.json(deletedBlog)
    
  }else{
    response.status(401).json({error: "you do not have permission to erase this blog"})
  }

  

})



blogRouter.put('/:id', async (request, response)=> {
  const {title, author, url, likes} = request.body
  const user = request.body.user.id
   
  const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,  {title, author, url, likes, user}, 
        { new: true, runValidators: true, context: 'query' }
      )

  updatedBlog === null ?  
  response.status(400).json({error: "contact doesn't exist"}) : 
  response.json(updatedBlog)

})



module.exports = blogRouter