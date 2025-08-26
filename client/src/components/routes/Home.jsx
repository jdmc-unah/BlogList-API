

import { useState, useEffect, useContext } from 'react'
import {AuthContext} from '../../context/AuthContext'

import blogService from '../../services/blogs'


//Componentes
import Blog from '../home_components/Blog'
import BlogForm from '../home_components/BlogForm'
import Toggable from '../home_components/Toggable'
import Notification from '../home_components/Notification'
import HomeAppBar from '../home_components/HomeAppBar'
import Grid from '@mui/material/Grid'


const Home = ()=>{
    const [blogs, setBlogs] = useState([])
    const { user, setUser } = useContext(AuthContext);
    
    const [filter, setFilter] = useState({filter: 'all', order: 'popular' , cat: 'all' }) //*

    const [message, setMessage] = useState(null)
    const [errorMessage, setErrorMessage] = useState(false)
    

    useEffect(() => {
        sortBlogs().then((blogs) => setBlogs(blogs) )
    }, [filter])

    const clearMessage = () =>{
        setTimeout(() => {
            setMessage(null)
        }, 3000)
    }

    
    const createBlog = async (newBlog)=>{
        try {    
        const blogCreated = await blogService.create(newBlog)
        console.log(blogCreated);
        
        setBlogs( blogs.concat(blogCreated))
        
        setMessage('El blog fue creado con exito')
        setErrorMessage(false)
        clearMessage()

        

        } catch (error) {
        setMessage('Debe llenar todos los campos')
        setErrorMessage(true)
        clearMessage()
        }

    }
    
    const likeBlog = async(blogID, blogToUpdate) =>{
        const blogsNoUpdate = blogs.filter(blog => blog.id !== blogID )
        const updatedBlog =  await blogService.update(blogID, blogToUpdate) 
        
        const updatedBlogList = blogsNoUpdate.concat(updatedBlog)
        setBlogs(updatedBlogList.sort ( (a, b) => b.likes - a.likes ) )

    }

    const deleteBlog = async(blogToDelete)=>{
    
      try {
      const deletedBlog = await blogService.deleteBlog(blogToDelete.id)  
          
      setBlogs(  blogs.filter( blog => blog.id !== deletedBlog.id ) )

      setMessage(`El blog ${deletedBlog.title} fue borrado con exito `)
      setErrorMessage(false)
      clearMessage()
      
      } catch (error) {
      setMessage(`Error: no tiene autorización para borrar el blog`)
      setErrorMessage(true)
      clearMessage()
      }

    }

      
    const sortBlogs = async ()=>{
    
      const filteredBlogs = await blogService.filterBlogs(filter)
      return filteredBlogs

    }

     const logout = ()=>{
        window.localStorage.clear()
        setUser(null)
    } 

    return(
        <div>
          
         
          <HomeAppBar logout={logout} userName={user.name} setFilter={setFilter} filter={filter}   />
          <br /><br /><br />

          <Notification  message={message}  error= {errorMessage} />
    
          {/*Muestra el form para crear los blogs nuevos  */}

          <Toggable  buttonLabel={'Agregar Nuevo Blog'}>
            
            <BlogForm  
              createBlog = {createBlog}
            />
                
          </Toggable>

          <br /><br />

          {/* Muestra los blogs */}

          <Grid
            container
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap" 
          >
              {blogs.map(blog =>
                <Grid key={blog.id} size={{sm:6, lg: 4, md:6, xl: 4, xs: 12  }}  >
                  <Blog key={blog.id} blog={blog} userID={user.id} likeBlog ={likeBlog} deleteBlog= {deleteBlog} /> 
                  
                     
                </Grid>
              )}
            
          </Grid>

          

        </div>
    )

}


export default Home