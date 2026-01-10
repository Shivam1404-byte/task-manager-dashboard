import { useState } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const CreateTask = ()=>{
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        try{
            const res = await api.post('/task',{title,description})
            navigate('/task')
        }
        catch(err){
            console.warn("Task not created")
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input placeholder="Enter title" type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
            <textarea placeholder="Enter description" type="text" onChange={(e)=>{setDescription(e.target.value)}}></textarea>
            <button type="Submit">Submit</button>
        </form>
    )
}

export default CreateTask
