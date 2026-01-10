import { BrowserRouter,Routes,Route } from "react-router-dom"
import Home from "./pages/home"
import CreateTask from "./pages/createTask"
import Register from "./pages/register"
import Login from "./pages/login"
import Task from "./pages/task"
import Navbar from "./components/navbar"

function App() {
  const token = localStorage.getItem('token')
  return (
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/createTask' element={<CreateTask/>}/>
        <Route path="/task" element={<Task/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
