const {Router} = require('express')

const SessionController = require('../controllers/SessionController')
const TaskController = require('../controllers/TaskController')

const routes = Router()

//Sessions
routes.get('/users',SessionController.index)
routes.post('/register',SessionController.store)
routes.post('/login',SessionController.login)

//Tasks
routes.get('/tasks',TaskController.index)
routes.post('/tasks',TaskController.store)
routes.get('/tasks/:id', TaskController.show)

module.exports = routes