import React from 'react'
import {Link, useNavigate,useLocation} from 'react-router-dom'
import { useContext } from 'react'
import taskContext from '../context/tasks/taskContext'

const Navbar = () => {
  let navigate = useNavigate()
  const context = useContext(taskContext)
  const {login_details,setid_details, getDetails,creadentials, setcreadentials} = context
  let location = useLocation()
  const clearState = () =>{
    creadentials.name = ''
    creadentials.email = ''
    creadentials.password = ''
    creadentials.cpassword = ''
    creadentials.type = ''
    creadentials.secret_key = ''
  }
  const handleLogout = ()=>{
    localStorage.removeItem('token_sec')
    // console.log(creadentials.name)
    // creadentials = {name:"",email:"", password:"",cpassword:"", type:"", secret_key:""}
    clearState()
    navigate("/login")
  }
  
  const handleAdmin = async (e)=>{
    e.preventDefault()
    navigate("/admin")

    // const response = await fetch(`http://localhost:5000/api/auth/getuser_details`,{
    //   method:'GET',
    //   headers:{
    //     'Content-type': 'application/json',
    //     'auth-token':  localStorage.getItem('token_sec')
    //   } ,
    // })
    // const json = await response.json()
    // console.log(json)
    getDetails()
  }

  const handleFeedbacks = async (e)=>{
    e.preventDefault()
    navigate("/feedbacks")
  }
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Task Manager</Link>
    
    
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className={`nav-link ${location.pathname === ""?"active":""}`}>
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        

      {creadentials.type === "employee"?
        <li className={`nav-link ${location.pathname === "/about"?"active":""}`}>
          <Link className="nav-link" to="/about">About</Link>
        </li>:
      
        <>
          <li className={`nav-link ${location.pathname === "/admin" ? "active" : ""}`}>
            <Link className="nav-link" to="/admin" onClick={handleAdmin}>Admin</Link>
          </li>
          <li className={`nav-link ${location.pathname === "/feedbacks" ? "active" : ""}`}>
            <Link className="nav-link" to="/feedbacks" onClick={handleFeedbacks}>Feedbacks</Link>
          </li>
        </>
      }
      </ul>
      {!localStorage.getItem("token_sec")?
        <form className="d-flex mb-2 mb-lg-0">
        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
        <Link className="btn btn-primary mx-2" to="/signup" role="button">Sign Up</Link>
      </form>:
      <button className="btn btn-primary mx-2" onClick={handleLogout} >Logout</button>
      }
    </div>
  </div>
</nav>
    </div>
  )
}

export default Navbar