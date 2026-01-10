import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const Register = ()=>{
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            const res = await api.post('/auth/register',{email,password})
            navigate('/login')
            alert("User Registered Successfully")
        }
        catch(err){
            alert(err.response?.data?.err || "Registration Failed")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Email" type="text" onChange={(e)=>{setEmail(e.target.value)}}/>
            <input placeholder="Passowrd" type="password" onChange={setPassword(e.target.value)}/>
            <button type="submit">Submit</button>
        </form>
    )
}

export default Register