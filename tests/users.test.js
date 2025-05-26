const { test ,after ,describe, beforeEach} = require('node:test')
const assert = require('node:assert')

const usersHelper = require('./users_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const mongoose = require('mongoose')
const User = require('../models/user')
const Blog = require('../models/blog')

/**
 * {
      "title": "Testing Entry Blog 1",
      "author": "Testing entry Author",
      "url": "https://www.bbc.com/sport/football/articles/c5y8vvrx7xro",      
      "likes": 10,
      "userID": "6828b9aeca144c84a551f2dc"
}
 */



beforeEach( async ()=>{
    await User.deleteMany({})

    for (let user of usersHelper.userList) {
        user.password = await usersHelper.encryptPassword(user.password)
        let oUser = new User(user)   
        await oUser.save()
    }
})


describe('users CRUD', () => {
    
    test('get list of users', async ()=>{
        await api
        .get('/api/users')
        .expect(200)
        .expect('Content-type', /application\/json/)

        
        const usersAtEnd = await usersHelper.getUsers()
        assert.strictEqual(usersAtEnd.length, usersHelper.userList.length )
        assert.deepStrictEqual(usersAtEnd[0].username, usersHelper.userList[0].username)
    })


    test('create new user', async ()=>{
        const newUser = {
            username: "newUser",
            password: "userpasswordtest",
            name: "new user"
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)

        const usersAtEnd = await usersHelper.getUsers()
        assert.deepStrictEqual(usersAtEnd.length, usersHelper.userList.length + 1)
        assert.deepStrictEqual(usersAtEnd[2].username, newUser.username)

    })


    test('error test missing user, should return 400', async ()=>{
        await api.post('/api/users').send(usersHelper.noUser).expect(400)
    })

    
    test('error test missing password, should return 400', async ()=>{        
        await api.post('/api/users').send(usersHelper.noPassword).expect(400)
    })


    test('error test repeated user, should return 400', async ()=>{
        await api.post('/api/users').send(usersHelper.repeatedUser).expect(400)
    })

    
    test('error test user has less than 3 chars, should return 400', async ()=>{
        await api.post('/api/users').send(usersHelper.oneCharUser).expect(400)
    })

    
    test('error test password has less than 3 chars, should return 400', async ()=>{
        await api.post('/api/users').send(usersHelper.repeatedUser).expect(400)
    })






})





after(async () => {
  await mongoose.connection.close()
    console.log('connection has ended');

})
