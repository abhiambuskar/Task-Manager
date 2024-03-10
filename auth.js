const express = require('express')
const router = express.Router()
const User = require('../models/User')
const Task = require('../models/Task')
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const JWT_SECRET = "PROJECTFORME"
const fetchUser = require('../middleware/fetchUser')
const jwt = require('jsonwebtoken') 

// ROUTE 1: Create a user using POST "/api/auth/createusers"  No login required
router.post('/createusers',[
    body('email', 'Enter a valid email').isEmail(),
    body("name", 'Enter a valid name').isLength({min:3}),
    body("password").isLength({min:5}),
    body("type", "Select type of Employee").exists()

], async(req, res) =>{
    const errors = validationResult(req)
    let success = false
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()}, success)
    }
    
    // console.log(req.body)
    // const user = User(req.body)
    // user.save()

    //Check whether the user with the same email exists already
    try{

        let user = await User.findOne({email:req.body.email})
        if(user){
            return res.status(400).json({error:"Sorry a user with this email already exists"}, success)
        }

        const salt =  await bcrypt.genSalt(10)
        const secured_pass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secured_pass,
            type: req.body.type
        })
        // .then(user => res.json(user))
        // .catch(err =>{console.log(err)},
        // res.json({error:"Please enter  a unique value"}))
        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        // console.log(jwtData) 
        success = true
        res.send({authtoken ,success} )
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }

})


// ROUTE 2: Authenticate a user using POST : "/api/auth/logined" login required

router.post('/logined',[
    body('email', 'Enter a valid email').isEmail(),
    // body("name", 'Enter a valid name').isLength({min:3}),
    body("password", "Password cannot be blank").exists(),
    body("type", "Select type of Employee").exists()
], async(req, res) =>{
    const errors = validationResult(req)
    let success = false

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array(), success})
    }
    
    const {email, password, type} = req.body
    //Check whether the user with the same email exists already
    try{

        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({error:"Please login with correct credentials", success})
        }

        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({error:"Please login with correct credentials", success})   
        }

        const data = {
            user:{
                id:user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET)
        success = true
        res.send({authtoken, userId:data.user.id, success})
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal error occured")
    }

})


// ROUTE 3: Get logged in User tasks POST "/api/auth/getusertask"  login required

router.post('/getuser_task',fetchUser, async(req, res) =>{
 
    //Check whether the user with the same email exists already
    try{
        let userId = req.user.id

        const user = await User.findById(userId).select("-password")
        
        res.send({user})
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal error occured")
    }

})



// ROUTE 4: Get logged in User tasks GET "/api/auth/getuser_details"  login required

router.get('/getuser_details',fetchUser, async(req, res) =>{
 
    //Check whether the user with the same email exists already
    try{
        let userId = req.user.id

        const allUser = await User.find({})
        res.send({allUser})
        
        // res.send({user})
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal error occured")
    }

})

// ROUTE 5: Get logged in User tasks GET "/api/auth/getuser_details"  login required

router.get('/getTasksadmin',fetchUser, async(req, res) =>{
 
    //Check whether the user with the same email exists already
    try{
        let userId = req.user.id

        const allTasks = await Task.find({})
        res.send({allTasks})
        
        // res.send({user})
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal error occured")
    }

})





module.exports = router