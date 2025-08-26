import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null


const setToken = newToken =>{  
  token = `Bearer ${newToken}`
  
}

const getAll = async () => {
  const response = await axios.get(baseUrl)  
  return  response.data
}


const filterBlogs = async (filter) =>{
   const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(`${baseUrl}/filter`, filter, config)
  
  return response.data

}


const getBlog = async (id)=>{
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}


const create = async newObject => {

  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  
  
  return response.data
  
}

const update = async (id, newObject) =>{
  const response = await axios.put(`${baseUrl}/${id}`,newObject)
  return response.data
}

const deleteBlog = async(id) =>{
   const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config) 
   
  return response.data
}



export default {setToken, getAll,getBlog, create , update, deleteBlog, filterBlogs}