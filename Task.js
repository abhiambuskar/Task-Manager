const mongoose = require('mongoose')
const {Schema} = mongoose

const TaskSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
        unique:true
    },
    tag:{
        type:String,
        default:"General"
    },
    hours:{
        type:Number,
        required:true,
    },
    start_date:{
        type:Date,
        required:true
    },
    
    end_date:{
        type:Date,
        required:true
    },

    working_status:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default: Date.now
    }


});

const Task = mongoose.model('task', TaskSchema)


module.exports = Task