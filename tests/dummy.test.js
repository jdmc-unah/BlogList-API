const { test , describe} = require('node:test')
const assert = require('node:assert')

const listHelper = require('./blogList_helper')
const supertest = require('supertest')
const app = require('../app')



//Pruebas anteriores con logica de progra

describe( "dummy", ()=>{

  test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

})


describe("totalLikes ", ()=>{

    test('total likes with one blog entry ', ()=>{
      
      const result = listHelper.totalLikes(listHelper.listWithOneBlog)
      assert.strictEqual(result, 5)
    })

    test('total likes with many blog entries ', ()=>{
      
      const result = listHelper.totalLikes(listHelper.listWithManyBlogs)
      assert.strictEqual(result, 31)
    })

})



describe("favoriteBlog", ()=>{
  
  test('favorite blog with just one blog entry', ()=>{
    const result = listHelper.favoriteBlog(listHelper.listWithOneBlog)
    assert.deepStrictEqual(result,listHelper.listWithOneBlog[0])
  })

  test('fav blog with 2 blog entries, they both have the same qty of likes', ()=>{
    const result = listHelper.favoriteBlog(listHelper.listWithTwoBlogs)
    assert.deepStrictEqual(result, listHelper.listWithTwoBlogs[0])
  })

  test('fav blog with 4 blog entries all with different qty of likes', ()=>{
    const result = listHelper.favoriteBlog(listHelper.listWithManyBlogs)
    assert.deepStrictEqual(result, listHelper.listWithManyBlogs[2])
  })

})



describe('most blogs', ()=> {
  
  test('using 4 blogs, each author wrote 2 blogs, should return the first one ', ()=>{
  const result = listHelper.mostBlogs(listHelper.listWithManyBlogs)

  const maxAuthor = {
    author: 'Blog author',
    blogs: 2
  }

  assert.deepStrictEqual(result, maxAuthor)
  })


  test('using 2 blogs with different author', ()=>{
    const result = listHelper.mostBlogs(listHelper.listWithTwoBlogs)

    const maxAuthor = {
      author: 'Edsger W. Dijkstra',
      blogs: 1
    }

    assert.deepStrictEqual(result, maxAuthor)

  })


})



describe('most likes', ()=>{
  
  const answer1 = { author: 'Blog author 4', likes: 16 }

  test('using 4 blogs with 2 blogs for each author', ()=>{

      const result = listHelper.mostLikes(listHelper.listWithManyBlogs)

      assert.deepStrictEqual(result, answer1)

  })

})

  




