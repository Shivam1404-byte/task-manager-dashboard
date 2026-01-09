const express = require('express')
const {createTask,getTask,updateTask,deleteTask} = require('../controllers/taskControllers')
const middleware = require('../middleware/authMiddleware')

const router = express.Router()

router.post('/',middleware,createTask)
router.get('/',middleware,getTask)
router.put('/:id',middleware,updateTask)
router.delete('/:id',middleware,deleteTask)


module.exports = router