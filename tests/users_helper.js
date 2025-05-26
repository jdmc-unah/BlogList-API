
const User = require('../models/user')
const bcrypt = require('bcrypt')


//Methods
const getUsers = async ()=>{
    const users = await User.find({})
    
    return users.map(user => user.toJSON())   
}


const encryptPassword = async (password) =>{
    const newPassword = await bcrypt.hash(password, 10)
    return newPassword
}



//User lists

const userList = [
    {
        "_id": "682cdf1dd1a3cd442186018a",
        "username": "admin",
        "password": "1111",
        "name": "admin",
        "__v": 0
    },
    {
        "_id": '682b51c6a0a4a1808d726c32',
        "username": "admin2",
        "password": "0000",
        "name": "test user 02",
        "__v": 0

    }

]

const noUser = {
    password: "userpasswordtest",
    name: "new user"
}

const noPassword = {
    username: "newUser",
    name: "new user"
}

const oneCharUser = {
    username: "newUser",
    name: "new user"
}


const oneCharPw = {
    username: "newUser",
    name: "new user"
}

const repeatedUser = {
    username: "testuser01",
    password: "testpw01",
    name: "test user 01"
}



module.exports = {
   getUsers , encryptPassword, noUser, noPassword, oneCharUser, oneCharPw,
   repeatedUser, userList
}