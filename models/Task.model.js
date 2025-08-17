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
    timestamps:true
});
TaskSchema.pre('save', function(next) {
    if (this.status === 'completed') {
        this.dueDate = null;
        this.updatedAt = Date.now();
    }
    next();
});

TaskSchema.pre('updateOne', function(next) {
    if (this._update.status === 'completed') {
        this._update.dueDate = null;
        this._update.updatedAt = Date.now();
    }
    next();
});
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;