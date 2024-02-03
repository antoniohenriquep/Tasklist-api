const Task = require('../models/Task')
const User = require('../models/User')

async function index(req,res)
{
    const tasks = await Task.find()
    return res.json(tasks)
}

async function store(req,res)
{
    const {name, date} = req.body
    const {user_id} = req.headers

    let task = await Task.create({
        name,
        date
    })

    let user = await User.findOneAndUpdate({_id:user_id},{$push:{tasks:task._id}})

    return res.json({task,user})
}

module.exports = {index,store}