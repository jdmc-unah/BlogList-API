const { test ,after ,describe, beforeEach} = require('node:test')
const assert = require('node:assert')

const listHelper = require('./blogList_helper')
const userHelper = require('./users_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')


let token;

beforeEach( async ()=>{

    await Blog.deleteMany({})
    await User.deleteMany({})

    for (const user of userHelper.userList) {
        await api.post('/api/users').send(user).expect(201)
    }

    const  res = await api.post('/api/login')
      .send({username: "admin", password: "1111"})
      .expect(200)

    token = res.body.token

    for (let blog of listHelper.listWithManyBlogs) {
      await api.post('/api/blogs')
        .set('Authorization', `Bearer ${token} `)
        .send(blog)
        .expect(201)
    }

})


describe('tests with supertest', ()=>{


  test('checks blogs qty', async ()=>{
    await api
      .get('/api/blogs').set('Authorization', `Bearer ${token} `)
      .expect(200)
      .expect('Content-type', /application\/json/)
  
    const blogsAtEnd = await listHelper.getBlogs()   
    assert.strictEqual(blogsAtEnd.length, listHelper.listWithManyBlogs.length)
  
  })

  
  test('checks blogs id property', async ()=>{

    const blogs = await listHelper.getBlogs()       
    assert.strictEqual( blogs[0].hasOwnProperty("id"), true )
  
  })


  test('checks that new posts are created properly', async ()=>{
    const newBlog = {
      title: 'Testing Entry Blog',
      author: 'Testing entry Author',
      url: 'https://www.bbc.com/sport/football/articles/c5y8vvrx7xro',
      likes: 10,
      userID: '682cdf1dd1a3cd442186018a'
    }

    await api.post('/api/blogs').set('Authorization', `Bearer ${token} `).send(newBlog).expect(201)

    const blogs = await listHelper.getBlogs()
    assert.strictEqual(blogs.length, listHelper.listWithManyBlogs.length + 1)
    assert.deepStrictEqual(blogs[4].title, newBlog.title)

  })

    
  test('checks if likes is missing then likes: 0', async ()=>{
    const newBlog = {
      title: 'Testing Likes',
      author: 'Testing Likes Author',
      url: 'https://www.bbc.com/sport/football/articles/c5y8vvrx7xro',
      userID: '682cdf1dd1a3cd442186018a'
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token} `)
      .send(newBlog)
      .expect(201)

    const blogs = await listHelper.getBlogs()
    assert.deepStrictEqual(blogs[4].likes , 0 )

  })


  test('checks if title or url is missing then status should be 400', async ()=>{
    const newBlog = {
      title: "Title",
      author: 'Testing No title and url Author',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token} `)
      .send(newBlog)
      .expect(400)

  })


  test('checks delete with unexistent id, should provide error 400', async ()=>{
    
    await api
      .delete('/api/blogs/68238a95fa684eb5c2a1ef32')
      .set('Authorization', `Bearer ${token} `)
      .expect(400)

  })

  test('checks delete incorrect userID, should provide error 401', async ()=>{
    
    await api
      .delete('/api/blogs/68238a95fa684eb5c2a1ef33')
      .set('Authorization', `Bearer ${token} `)
      .expect(401)

  })


})



after(async () => {
  await mongoose.connection.close()
    console.log('connection has ended');

})

