const Task = require('../models/Task')
const User = require('../models/User')

async function index(req,res)
{
    const {user_id} = req
    const user = await User.findOne({_id: user_id}).populate('tasks')
    return res.json(user.tasks)
}

async function store(req,res)
{
    const {name, date} = req.body
    const {user_id} = req

    let task = await Task.create({
        name,
        date
    })

    let user = await User.findOneAndUpdate({_id:user_id},{$push:{tasks:task._id}})

    return res.json({task,user})
} 

async function show(req,res)
{
    const {id} = req.params
    const {user_id} = req.headers

    try{
    var user = await User.findById(user_id)
    }catch(err){
        return res.json({message:"Usuario nao existe"})
    }

    let task = await Task.findById(id)

    if(!user.tasks.includes(String(task._id)))
    {
        return res.status(400).json({message:"Nao autorizado"})
    }

    return res.json(task)
}

async function update(req,res)
{
    const {id} = req.params
    const {name,date} = req.body

    await Task.updateOne({_id:id},{
        name,
        date
    })

    return res.status(200).json({message:"ok"})
}

async function complete(req,res)
{
    const {id} = req.params
    const {done} = req.body

    await Task.updateOne({_id:id},{
        done
    })

    const {user_id} = req
    const user = await User.findOne({_id: user_id}).populate('tasks')
    console.log(user.tasks)
    return res.json(user.tasks)

}


async function remove(req,res)
{
    const {id} = req.params
    await Task.findByIdAndDelete(id)

    const {user_id} = req
    const user = await User.findOne({_id: user_id}).populate('tasks')
    console.log(user.tasks)
    return res.json(user.tasks)


}

module.exports = {index,store,show,update,remove,complete}