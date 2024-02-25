const {Router} = require('express')

const SessionController = require('../controllers/SessionController')
const TaskController = require('../controllers/TaskController')
const {isAuthenticated} = require('../middlewares/isAuthenticated')
const routes = Router()

//Sessions
routes.get('/users',SessionController.index)
routes.post('/register',SessionController.store)
routes.post('/login',SessionController.login)

//Tasks
routes.get('/tasks',isAuthenticated, TaskController.index)
routes.post('/tasks',isAuthenticated, TaskController.store)
routes.get('/tasks/:id', isAuthenticated, TaskController.show)
routes.put('/tasks/:id', isAuthenticated, TaskController.update)
routes.delete('/tasks/:id', isAuthenticated, TaskController.remove)

module.exports = routes