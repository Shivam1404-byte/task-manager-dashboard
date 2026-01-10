import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Login = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e)=>{
        e.preventDefault()
        try{
            const res = await api.post('/auth/login',{email,password})
            localStorage.setItem('token',res.data.token)
            navigate('/task')
        }
        catch(err){
            alert(err.response?.data?.err || "Login Failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="password" type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Login