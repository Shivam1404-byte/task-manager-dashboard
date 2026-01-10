const express = require('express')
require('dotenv').config
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const taskRoutes = require('./routes/taskRoutes')


const app = express()

const port = process.env.PORT || 5000

app.use(cors({
    origin:process.env.URL,
    methods:["POST","GET","PUT","DELETE","OPTIONS"],
    allowedHeaders:["Content-Type","Authorization"]
}))

app.use(express.json())

app.use('/auth',authRoutes)
app.use('/task',taskRoutes)

app.get('/',(req,res)=>{
    res.status(200).json({Message:"Server is at port 5000"})
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`) 
})