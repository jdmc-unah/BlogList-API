

const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const categories = require('../localdata/categories')



blogRouter.post('/filter', async (request, response) => {
  var blogs = await Blog.find({}).populate('user', {username: 1, name: 1})  

  const {filter, order, cat} = request.body

  
  if (filter == 'my blogs') {
    //validacion de token  
    if (!request.token) {
      return response.status(401).json({ error: 'token invalid' })
    }
    const user = request.user
  
    blogs = blogs.filter((blog)=> blog.user.id.toString() == user.id.toString() )       
  } 


  //* Filtra por categoria
  if (cat != '') {
    blogs = blogs.filter((blog) => blog.category.toString().trim().toLowerCase() === cat.toString().trim().toLowerCase())        
  }

        
  //* Ordena
  if (order == 'popular' ) {
    blogs = blogs.sort ( (a, b) => b.likes - a.likes ) 
  }

  if (order == 'title' ) {
    blogs = blogs.sort ( (a, b) =>{ 
      const titleA = a.title.toUpperCase()
      const titleB = b.title.toUpperCase()

      if (titleA < titleB) {
        return -1
      }
      if (titleA > titleB) {
        return 1
      }

      return 0

    } ) 
  }

  if (order == 'author' ) {
    blogs = blogs.sort ( (a, b) =>{ 
      const authorA = a.author.toUpperCase()
      const authorB = b.author.toUpperCase()

      if (authorA < authorB) {
        return -1
      }
      if (authorA > authorB) {
        return 1
      }

      return 0
    } ) 
  }

  response.json(blogs)
})



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

  console.log(user);
  

  //valida que el usuario exista
  if (!user) {
    return response.status(400).json({error: "user not found"})
  }

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: Number(request.body.likes) || 0  ,
    user: user.id,
    picUrl: request.body.picUrl,
    description: request.body.description,
    category: request.body.category
  })

  const addedBlog =  await blog.save()

  user.blogs = user.blogs.concat(addedBlog._id)
  await user.save()

  response.status(201).json(addedBlog)

})


blogRouter.delete('/:id', async (request, response)=>{
 
  const blogID = request.params.id  

  //validacion de token  
  if (!request.token) {  
    return response.status(401).json({ error: 'token invalid' })
  }

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
  const {title, author, url, likes, picUrl, description, category} = request.body
  const user = request.body.user.id
   
  const updatedBlog = await Blog.findByIdAndUpdate(
        request.params.id,  {title, author, url, likes, user, picUrl, description, category}, 
        { new: true, runValidators: true, context: 'query' }
      )

  updatedBlog === null ?  
  response.status(400).json({error: "blog doesn't exist"}) : 
  response.json(updatedBlog)

})





module.exports = blogRouter