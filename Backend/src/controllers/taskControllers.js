const pool = require('../config/db')

const createTask = async (req,res)=>{
    try{
        const {title,description} = req.body
        const userId = req.userId

        if(!title){
            return res.status(402).json({Message:"Title required"})
        }

        const task = await pool.query(
            "INSERT INTO tasks(title,description,user_id) VALUES ($1,$2,$3) RETURNING *",
            [title,description,userId]
        )

        res.json({
            Message:"Task created Successfully",
            Task:task.rows[0]
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

const getTask = async (req,res)=>{
    try{
        const userId = req.userId

        const task = await pool.query("SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC",[userId]);

        res.json({
            Tasks:task.rows
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json("Server Error")
    }
}

const updateTask = async (req,res)=>{
    try{
        const {id} = req.params
        const {title,description,completed} = req.body
        const userId = req.userId

        const task = await pool.query("SELECT * FROM tasks WHERE id = $1 AND user_id = $2",[id, userId])

        if(task.rows.length === 0){
            return res.status(404).json({Messsage:"Task not found"})
        }

        const oldtasks = task.rows[0]

        const updatedTitle = title !== undefined ? title : oldtasks.title
        const updatedDescription = description !== undefined ? description : oldtasks.description
        const updatedCompleted = completed !== undefined ? completed : oldtasks.completed 

        const updatedTask = await pool.query(
            "UPDATE tasks SET title = $1, description = $2, completed = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [
                updatedTitle,
                updatedDescription,
                updatedCompleted,
                id,
                userId
            ]
        )

        res.json(updatedTask.rows[0])
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

const deleteTask = async (req,res)=>{
    try{
        const {id} = req.params
        const userId = req.userId

        const task = await pool.query(
            "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",[id,userId]
        )

        if(!task){
            return res.status(404).json({Error:"No task found"})
        }

        await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *",[id,userId]
        )

        res.json({
            Message:"Task deleted Successfully"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

module.exports = {createTask,getTask,updateTask,deleteTask}