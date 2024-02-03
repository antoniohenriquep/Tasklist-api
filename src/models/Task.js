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
    }
})

module.exports = model('Task',TaskSchema)