import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate()
    
    return(
        <>
            <h1>Task Manager</h1>
            <button onClick={navigate('/register')}>Register</button>
            <button onClick={navigate('/login')}>Login</button>
        </>
    )
}

export default Home;