const pool = require('../config/db.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const register = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(403).json({Message:"E-mail and passowrd are required"})
        }

        const userExist = await pool.query("SELECT * FROM users WHERE email = $1",[email])

        if(userExist.rows.length > 0){
            return res.status(403).json({Error:"User already exist!!"})
        }

        const passwordHash = await bcrypt.hash(password,10)

        const user = await pool.query(
            "INSERT INTO users(email,password) VALUES ($1,$2)",
            [email,passwordHash]
        )

        res.status(200).json({
            Message:"User registered Successfully"
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({Error:"Server Error"})
    }
}

const login = async (req,res)=>{
    try{
        const {email,password} = req.body

        if(!email || !password){
            return res.status(403).json({Message:"E-mail and password required!!"})
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1",[email])

        if(user.rows.length == 0){
            return res.status(404).json({Error:"User not found"})
        }

        const validPassword = await bcrypt.compare(password,user.rows[0].password)

        if(!validPassword){
            return res.status(403).json({Error:"Invalid Password"})
        }

        const token = jwt.sign(
            {userId:user.rows[0].id},
            process.env.JWT_SECRET,
            {expiresIn:'7d'}
        );

        res.json({
            Message:"Login Successfully",
            token,
            User:{id:user.rows[0].id,email:user.rows[0].email}
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({Error:"Server Error"})
    }
}

module.exports = {register,login}