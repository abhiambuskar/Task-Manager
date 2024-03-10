const express = require('express')
const router = express.Router()
const fetchUser = require('../middleware/fetchUser')
const {body, validationResult} = require('express-validator')

const Task = require('../models/Task')

// ROUTE 1: Fetch all User tasks GET "/api/auth/fetchusertask"  login required

router.get('/fetchalltasks',fetchUser, async (req, res)=>{

    try {
        const tasks = await Task.find({user:req.user.id})
        res.json(tasks)        
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }


})


// ROUTE 2: Add User tasks POST "/api/task/addtask"  login required

router.post('/addtasks',fetchUser, 
    [
        body('title', 'Enter a valid title').isLength({min:3}),
        body("description", 'Description must be atleast 5 characters').isLength({min:5}),  
    ],async (req, res)=>{
        try {
            
        const {title, description, tag, hours, start_date, end_date, working_status} = req.body
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }

        const task = new Task({
            title,description, tag,hours, user:req.user.id, start_date, end_date, working_status
        })
        const savedNote = await task.save()
    
        res.json(savedNote)
    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }

})


// ROUTE 3: Update an existing task PUT "/api/task/updatetask"  login required


router.put('/updatetask/:id',fetchUser, async (req, res)=>{
        try {
           
        //Create a new task     
        const {title, description, tag, hours, start_date, end_date, working_status} = req.body
        const newtask = {}
        if(title){newtask.title = title}
        if(description){newtask.description = description}
        if(tag){newtask.tag = tag}
        if(tag){newtask.hours = hours}
        if(tag){newtask.start_date = start_date}
        if(tag){newtask.end_date = end_date}
        if(tag){newtask.working_status = working_status}



        //Find the note to be updated
        let task1 =await Task.findById(req.params.id)
        if(!task1){
            return res.status(404).send("Not Found")
        }

        if(task1.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }

        task1 = await Task.findByIdAndUpdate(req.params.id, {$set:newtask}, {new:true})
        res.json({task1})


    }catch(error){
        console.log(error.message)
        res.status(500).send("Some error occurred")
    }

})



// ROUTE 4: Delete existing task DELETE "/api/task/deletetask"  login required


router.delete('/deletetask/:id',fetchUser, async (req, res)=>{
    try {
       
    //Create a new task     
    const {title, description, tag,hours} = req.body

    //Find the note to be deleted
    let task1 =await Task.findById(req.params.id)
    if(!task1){
        return res.status(404).send("Not Found")
    }

    //Allow deletion only if user owns this note
    if(task1.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed")
    }

    task1 = await Task.findByIdAndDelete(req.params.id)
    res.json({ Success: "Note has been delete", task1: task1 });


}catch(error){
    console.log(error.message)
    res.status(500).send("Some error occurred")
}

})






module.exports = router