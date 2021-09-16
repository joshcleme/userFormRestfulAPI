const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const bcrypt = require('bcryptjs')
const signUpTemplate = require('../models/signUp')
const listFilter = require('../models/listFilter')
const jwt = require('jsonwebtoken')
const { db } = require('../models/signUp')

const jwtSecret = '3tc278t341ty30n7t942ntv5g4t64tmct1h78c9nueld3845gnerk'

//sign up posting
router.post('/signUp', async (req, res) =>{
    const signedUpUsers = new signUpTemplate ({
        //recieving information
        name: req.body.name,
        email: req.body.email,
        //password is hashed and salted
        password: await bcrypt.hash(req.body.password, 10),
        permission: req.body.permission
    })
    //store info
    signedUpUsers.save()
    .then(data =>{
        res.json(data)
        console.log(data)
    })
    .catch(error => {
        if(error.code == 11000){
            //check for duplicate email
            return res.json({status: 'error', error: 'email already in use'})
        }
        res.json(error)
        console.log(JSON.stringify(error))
    })

    //Sign Up parameters
    //checking for valid email
    if(!email || typeof email !== 'string'){
        return res.json({status: 'error', error: 'Invalid email'})
    }
    //^^ valid password
    if(!password || typeof password !== 'string'){
        return res.json({status: 'error', error: 'Invalid password'})
    }
    //^^ valid name
    if(!name || typeof name !== 'string'){
        return res.json({status: 'error', error: 'Invalid name'})
    }
    //min characters in password
    if(password.length < 8){
        return res.json({status: 'error', error: 'Password must be a minimum of 8 characters'})
    }
    //making sure permission is one of 4 categories provided
    if(permission !== 'administrator' || 'community moderator' || 'content creator' || 'unprivileged') {
        return res.json({status: 'error', error: 'Permission must be one of four options (i.e. administrator, community moderator, content creator, or underprivileged.'})
    }
})

//Validate email & password match account in database
router.post('/login', async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    //find email & password in DB
    const user = await signUpTemplate.findOne({email}).lean()
    
    if(!user) {
        return res.json({status: 'error', error: 'invalid username and/or password'})
    }

    //email & password combination is successful
    if(await bcrypt.compare(password, user.password)) {
        //email & password combination is successful

        const token = jwt.sign(
            {
                id:user._id, 
                email:user.email
            }, 
            jwtSecret
        )

        return res.json({status: 'ok', data: 'logged in!'})
    }

    res.json({status: 'error', error: 'invalid username and/or password'})

})

router.put('/testing', (req, res) => {
    res.send('Got a PUT request at /user')
})

//edit user information
router.put('/editUserInfo/:id', async (req, res, next) => {
    const hashedpassword = await bcrypt.hash(req.body.password, 10)

    signUpTemplate.findByIdAndUpdate({_id: req.params.id}, {name: req.body.name, email: req.body.email, password: hashedpassword, permission: req.body.permission})
    .then(() => {
        signUpTemplate.findById({_id: req.params.id})
    })
    .then((data) => {
        res.send(data)
    })
})

//recieve list of users with filter
router.post('/usersList', (req, res) => {
    const users = {}
    const queryPermission = req.body.queryPermission;

    //get list of content creators
    if(queryPermission == 'content creator'){

        signUpTemplate.find({permission: 'content creator'}, (err, users) => {
            res.json(users)
        }) 
    } 
    //get list of unprivileged users
    if(queryPermission == 'unprivileged'){

        signUpTemplate.find({permission: 'unprivileged'}, (err, users) => {
            res.json(users)
        }) 
    } 
    //get list of community moderators
    if(queryPermission == 'community moderator'){

        signUpTemplate.find({permission: 'community moderator'}, (err, users) => {
            res.json(users)
        }) 
    } 
    //get list of administrators
    if(queryPermission == 'administrator'){

        signUpTemplate.find({permission: 'administrator'}, (err, users) => {
            res.json(users)
        }) 
    } 
    //no input? get all users
    else {
        signUpTemplate.find({}, (err, users) => {
            res.json(users)
        })
    }
})

router.post('/deleteUser', async (req, res) =>{
    mongoose.connect(process.env.databaseAccess, () => console.log("MongoDB connected"))
    const user = req.body.queryEmail
    try{
        await signUpTemplate.deleteOne({email: user}) .then(function(){
            console.log("data deleted")
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router