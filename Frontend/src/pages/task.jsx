import { useState,useEffect } from "react";
import api from "../api/api";
import { useNavigate } from "react-router-dom";

const Task = () =>{
    const [task,setTask] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()
    const [showModal,setShowModal] = useState(false)
    const [currentTask,setCurrentTask] = useState(null) 

    useEffect(()=>{
        api.get('/task')
            .then(res=>{
                if(res.data.Tasks && Array.isArray(res.data.Tasks)){
                    setTask(res.data.Tasks)
                }
                else{
                    console.log("Unexpected response format ",res.data)
                    setTask([])
                }
            })
            .catch(err => {console.error("Error fetching the task ",err)
                setTask([])})
            .finally(()=>{
                setLoading(false)
            })
    },[])

    const handleDelete = async (id)=>{
        try{
            await api.delete(`/task/${id}`)
            setTask(task.filter(t => t.id != id))
        }
        catch(err){
            alert("Error deleting the task: ",err)
        }
    }

    const formatDate = (dateString)=>{
        if(!dateString) return "No Date"
        try{
            const date = new Date(dateString)
            return date.toLocaleDateString()
        }
        catch(err){
            return "Invalid Date"
        }
    }

    if(loading){
        return <div>Loading Task</div>
    }

    const link = ()=>{
        navigate('/createTask')
    }

    const openEditModal = (task)=>{
        setCurrentTask(task)
        setShowModal(true)
    }

    const handleModalSave = async()=>{
        try{
            const res = await api.put(`/task/${currentTask.id}`,{
                title:currentTask.title,
                description:currentTask.description
            });

            setTask(prev => 
                prev.map(t=> t.id === currentTask.id ? res.data : t)
            );

            setShowModal(false)
        }
        catch(err){
            console.log("Update failed",err)
        }
    }
    return (
        <>
            <h2>My Tasks</h2>

            {task.length == 0 ? (<p>No Tasks yet Create a new task <button onClick={link}>Create Task</button></p>):
            
            (task.map(task => (
                <div key={task.id}>
                    <p><strong>{task.title}</strong></p>
                    <p>{task.description}</p>
                    <p><small>Created at : {formatDate(task.created_at)}</small></p>
                    <label>
                        <input type="checkbox" 
                        checked={task.completed}
                        onChange={async (e)=>{
                        const res = await api.put(`/task/${task.id}`,{
                            completed:e.target.checked
                        });
                        setTask((prev=> prev.map(t=>t.id === task.id ? res.data : t)))
                        }}
                        />{task.completed?"Completed":"Pending"}
                    </label>
                    <button onClick={()=>{handleDelete(task.id)}}>Delete</button>
                    <button onClick={link}>Add Task</button>
                    <button onClick={()=>{openEditModal(task)}}>Edit</button>

                    {showModal && (
                        <div style={{
                            position: "fixed",
                            top: 0,
                            left: 0,
                            width: "100vw",
                            height: "100vh",
                            background: "rgba(0,0,0,0.4)",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                            <div style={{
                            background: "#fff",
                            padding: "20px",
                            width: "350px",
                            borderRadius: "8px"
                            }}>
                                <h3>Edit Task</h3>

                                <input
                                     style={{ width: "100%", marginBottom: "10px" }}
                                     value={currentTask.title}
                                     onChange={(e) =>
                                        setCurrentTask({ ...currentTask, title: e.target.value })
                                        }
                                    />

                                <textarea 
                                    style={{ width: "100%", marginBottom: "10px" }}
                                    value={currentTask.description}
                                    onChange={(e) =>
                                        setCurrentTask({...currentTask,description:e.target.value})
                                    }
                                />

                                <button onClick={handleModalSave}>Save</button>
                                <button onClick={()=>setShowModal(false)}>Cancel</button>
                            </div>
                        </div>
                    )}
                </div>
            )))
            }
        </>
    )
}

export default Task