const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const {body, validationResult} = require('express-validator')

const Feed = require('../models/Feedback')


// ROUTE 1: Fetch all User Feedbacks GET "/api/auth/fetchusertask" only for admin 

router.get('/fetchallfeedbacks',fetchUser, async (req, res)=>{

    try {
        // const tasks = await Feed.find({user:req.user.id})
        // res.json(tasks)     
        
        
        let userId = req.user.id

        const allfeedbacks = await Feed.find({})
        res.send({allfeedbacks})
        
    }catch(error){
        console.log(error.message)
        res.status(500).send("Internal error occured")
    }


})



// ROUTE 2: Add User feedback POST "/api/feeds/addfeedback"  login required

router.post('/addfeedback',fetchUser, 
    [
        body("description", 'Description must be atleast 5 characters').isLength({min:5}),  
    ],async (req, res)=>{
        try {
            
        const {name, description} = req.body
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const reply = new Feed({
           name, description, user:req.user.id
        })
        const savedreply = await reply.save()
    
        res.json(savedreply)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }

})


module.exports = router