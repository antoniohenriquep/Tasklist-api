const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true 
    },
    password:{
        type:String,
        required:true
    },
    tasks:[{
        type:Schema.Types.ObjectId,
        ref:'Task'
    }]
})

module.exports = model('User',UserSchema)