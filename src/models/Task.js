const {Schema, model} = require('mongoose')

const TaskSchema = new Schema({
    name:{
        type: String,
        required:true
    },
    date:String,
    done:{
        type: Boolean,
        default: false
    },
    priority:{
        type: String,
        default:'normal'
    }
})

/*
Priority List:
normal - green
important - yellow
urgent - red
*/
module.exports = model('Task',TaskSchema)