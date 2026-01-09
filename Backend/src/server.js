const express = require('express')
require('dotenv').config
const cors = require('cors')


const app = express()

const port = process.env.PORT || 5000

app.get('/',(req,res)=>{
    res.status(200).json({Message:"Server is at port 5000"})
})

app.listen(port,()=>{
    console.log(`App is running on port ${port}`) 
})