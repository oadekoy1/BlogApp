const express = require('express')
const usersModel = require('../models/UsersSchema')
const bcrypt = require('bcryptjs')

const router = express.Router()

// GET All Users 
router.get('/', async (req, res) => {
    try {
        const users = await usersModel.find({})
        res.send(users)
        
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not GET')
    }
})

router.get('/users', (req, res) => {
    User.find({}, (error, usersFromDB) => {
        if (error) {
            console.log(error);
        }
        console.log(usersFromDB);
        res.render('Users/Index', {users: usersFromDB})
    })
})


// Render a Signup From
router.get('/signup', (req, res) => {
    res.render('Users/Signup')
})

// Create a new user
router.post('/signup', async (req, res) => {
    
    try {
        // check if email exist
        const emailAlreadyExist = await usersModel.find({email: req.body.email})
        console.log(emailAlreadyExist);
        
        // If there is an object inside of the array
        if (emailAlreadyExist[0]) {
            return res.send('Email Already Exist!!!')
        }
        
        // check if username exist
        const usernameAlreadyExist = await usersModel.find({username: req.body.username})
        console.log(usernameAlreadyExist);
        
        // If there is an object inside of the array
        if (usernameAlreadyExist[0]) {
            return res.send("Username Already Exist!!!")
        }

        // Create a new user
        const SALT = await bcrypt.genSalt(10) // how secure your hash will be
        // re-assign the password to the hashed password
        req.body.password = await bcrypt.hash(req.body.password, SALT)
        
        const newUsers = await usersModel.create(req.body)
        res.redirect('/users/signin')
    } catch(error) {
        console.log(error);
        res.status(403).send('Can not CREATE user by ID')
        
    }
})

// Render the Signin Form
router.get('/signin', (req, res) => {
    res.render('Users/Signin')
})

// Signin an User
router.post('/signin', async (req, res) => {
    try {
        // Find user by email in DB
        const user = await usersModel.findOne({email: req.body.email})
        if (!user) return res.send('Please check your email and password')
        //Checks if passwords match
        const decodedPassword = await bcrypt.compare(req.body.password, user.password)
        if(!decodedPassword) return res.send("Please check your email and password!")  
        // set the user session
        // create a new username in the session obj using the user info from DB
        req.session.username = user.username
        req.session.loggedIn = true

        // redirect to /blogs
        res.redirect('/blog')
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not SIGNIN')
    }
})

// Signout User and destroy session
router.get('/signout', (req,res) => {
    try {
        req.session.destroy()
        res.redirect('/')
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not SIGNOUT')   
    }
})

// GET User by ID
router.get('/:id', async (req, res) => {
    try {
        const users = await usersModel.findById(req.params.id)
        res.render('Users/Signup')
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not GET user by ID')
    }
})

// PUT: Update by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedUsers = await usersModel.findByIdAndUpdate(req.params.id, req.body, {'returnDocument': 'after'})
        res.send(updatedUsers)
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not PUT user by ID')
        
    }
})


// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const deletedUsers = await usersModel.findByIdAndRemove(req.params.id)
        console.log(deletedUsers);
        res.send('USER DELETED')
    } catch (error) {
        console.log(error);
        res.status(403).send('Can not DELETE user by ID')
    }
})

module.exports = router