const mongoose = require('mongoose')
const {Schema} = mongoose

const FeedbackSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    date:{
        type:Date,
        default: Date.now
    }

});

const Feedback = mongoose.model('feedback', FeedbackSchema)


module.exports = Feedback