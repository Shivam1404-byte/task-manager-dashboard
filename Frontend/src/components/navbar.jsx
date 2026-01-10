import { Link,useNavigate } from "react-router-dom";

const Navbar = ()=>{
    const Navigate = useNavigate()
    const token = localStorage.getItem('token')

    const logout = ()=>{
        localStorage.removeItem('token')
        Navigate('/login')
    }

    return (
        <nav
            style={{
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            display: "flex",
            justifyContent: "space-between"}}>
                <h3>Task Manager</h3>
                <div>
                    {!token ? (
                        <>
                            <Link to="/register" style={{ marginRight: "10px" }}>Register</Link>
                            <Link to="/login">Login</Link>
                        </>
                    ):(
                        <button onClick={logout}>Logout</button>
                    )}
                </div>
        </nav>
    )
}

export default Navbar