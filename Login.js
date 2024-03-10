import React, { useContext } from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import taskContext from '../context/tasks/taskContext'
const Login = (props) => {
  let context = useContext(taskContext)
  const {creadentials, getDetails, setcreadentials} = context
  let navigate =  useNavigate()
  

  const handleSubmit  = async(e)=>{
    console.log(creadentials.type)
    if(creadentials.type !== "admin" && creadentials.type !== "employee" ){
      alert('Enter Proper Type for Login')
      e.preventDefault()
      navigate("/login")
    }

    else if( creadentials.type === "admin" && creadentials.secret_key !== "admin"){
      alert('Invalid Credentials')
      e.preventDefault()
      
      navigate("/login")

    }else{

    
      e.preventDefault()
      const response = await fetch(`http://localhost:5000/api/auth/logined`,{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
        } ,
        body: JSON.stringify({email: creadentials.email , password: creadentials.password, type: creadentials.type})
      })
      const json = await response.json()
      console.log(json)
      getDetails()

      if(json.success){
        //save the auth a and redirect
        localStorage.setItem('token_sec', json.authtoken)
        props.showAlert("Logged in Successfully", "success")
        navigate("/")

      }else{
          props.showAlert("Login with Valid Credentials", "danger")
      }
  }
  }

  const onChange =(e)=>{
    setcreadentials({...creadentials, [e.target.name]:e.target.value})
  }
  const secret_key = "admin"


  
  return (
    <div >



      <form onSubmit={handleSubmit}>
        <div className="mb-3 my-3">
          <label htmlFor="email" className="form-label ">Name</label>
          <input type="text" className="form-control" onChange={onChange} value={creadentials.name} id="name" name='name' />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" onChange={onChange} value={creadentials.email} id="email" name='email' aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" onChange={onChange}value={creadentials.password} id="password" name='password'/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Type</label>
          <input type="text" className="form-control" onChange={onChange} value={creadentials.type} id="type" name='type' />
        </div> 
        

       {creadentials.type === "admin"?
        <div className="mb-3">
          <label htmlFor="secret_key" className="form-label">Secret Key</label>
          <input type="password" className="form-control" onChange={onChange} value={creadentials.secret_key} id="secret_key" name='secret_key' />
        </div>:
        null
       }
 
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>     
</div>
  )
}

export default Login