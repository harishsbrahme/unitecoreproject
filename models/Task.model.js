const mongoose = require("mongoose");

const TaskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    status:{
        type:String,
        enum:['pending','in-progress','completed'],
        default:'pending'
    },
    priority:{
        type:Number,
        required:true,
        enum:[1,2,3]
    },
    dueDate:{
        type:Date
    }
},{
    timeStam:true
})