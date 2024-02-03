const User = require('../models/User')
const bcrypt = require('bcrypt')

async function store(req,res)
{
    const {name,email,password} = req.body
    let user = await User.findOne({email})

    if(!user)
    {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        user = await User.create({
            name,
            email,
            password: hash
        })
    }
    
    return res.json(user)

}

async function index(req,res)
{
    let user = await User.find()
    return res.json(user)      
}

module.exports = {store,index}