const User = require('../models/User')
const bcrypt = require('bcrypt')
const {sign} = require('jsonwebtoken')
const {jwtSecret} = require('../config/jwtSecret')

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
    let user = await User.find().populate('tasks')
    return res.json(user)      
}

async function login(req,res)
{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if(!user)
    {
        return res.json({message:"Email ou senha incorretos"})
    }

    const passwordMatch = await bcrypt.compare(password,user.password)

    if(!passwordMatch)
    {
        return res.json({message:"Email ou senha incorretos"})
    }

    const token = sign(
        {
        name: user.name,
        email:user.email,
        tasks:user.tasks
        },
        jwtSecret,
        {
            subject:String(user._id),
            expiresIn:'30d'
        }
    )

    return res.json({
        id: user._id,
        name: user.name,
        email:user.email,
        tasks:user.tasks,
        token
    })
}

module.exports = {store,index,login}