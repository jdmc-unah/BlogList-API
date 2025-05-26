var _ = require('lodash');
const Blog = require('../models/blog')



const listWithManyBlogs = [
  {
    "_id": "682377f69d10cd8043103638",
    "title": "Blog Title",
    "author": "Blog author",
    "url": "https://www.bbc.com/sport/football/articles/c5y8vvrx7xro",
    "likes": 5,
    "__v": 0
  },
  {
    "_id": "682378269d10cd804310363a",
    "title": "Blog Title 2",
    "author": "Blog author",
    "url": "fake url",
    "likes": 10,
    "__v": 0
  },
  {
    "_id": "68237920079c144c3dd2b6a2",
    "title": "Blog Title 3",
    "author": "Blog author 4",
    "url": "fake url 2",
    "likes": 15,
    "__v": 0
  },
  {
    "_id": "68238a95fa684eb5c2a1ef33",
    "title": "Blog Title 5",
    "author": "Blog author 4",
    "url": "fake url 4",
    "likes": 1,
    "userID": "682b51c6a0a4a1808d726c32",
    "__v": 0
  }
]

const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    }
]

const listWithTwoBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f9',
      title: 'Test article',
      author: 'Test Author',
      url: 'https://testurl.com',
      likes: 5,
      __v: 0
    }
]



const getBlogs = async () =>{ 
  const blogs = await Blog.find({}) 

  return blogs.map(blog => blog.toJSON())   
}

const dummy = (blogs) =>{
  return Math.pow( blogs.length,0)     
}


const totalLikes  = (blogList)=>{
  
  const reducer = (totalLikes, currentVal)=>{
    return totalLikes + currentVal.likes 
  }
  
  return blogList.reduce(reducer,0)

}


const favoriteBlog  = (blogList) =>{
  const likeList = blogList.map( blog => blog.likes )

  return blogList.find( blog => blog.likes === Math.max(...likeList)  )

}


const mostBlogs = (blogList) =>{
  const authorsCount =  _.countBy(blogList, 'author')

  const [authorMax, countMax] = Object.entries(authorsCount).reduce( (max, actual) =>
     actual[1] > max[1] ? actual : max
  )

  const maxAuthor = {
    author: authorMax,
    blogs: countMax
  }

  return maxAuthor

}


const mostLikes = (blogList) =>{
    
  const oAuthorLikes = blogList.reduce((acc, blog) => {
    acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
  
    return acc;
  }, {});

  const listAuthorLikes = Object.entries(oAuthorLikes).map(([author, likes]) => ({ author, likes }));

  return listAuthorLikes.reduce((max, actual) => actual.likes > max.likes ? actual : max);

}





module.exports = {
 listWithManyBlogs, listWithTwoBlogs, listWithOneBlog, dummy, totalLikes , favoriteBlog, mostBlogs, mostLikes ,getBlogs
}