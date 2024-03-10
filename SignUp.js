import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import taskContext from '../context/tasks/taskContext'



const SignUp = (props) => {
  let context = useContext(taskContext)
  const {creadentials, setcreadentials} = context
    let navigate =  useNavigate()
    const {name, email, password, type, cpassword, secret_key} = creadentials
    const handleSubmit  = async(e)=>{
      e.preventDefault()
      const response = await fetch(`http://localhost:5000/api/auth/createusers`,{
        method:'POST',
        headers:{
          'Content-type': 'application/json',
        } ,
        body: JSON.stringify({ name: creadentials.name, email: creadentials.email , password: creadentials.password, cpassword: creadentials.cpassword, type: creadentials.type, secret_key: creadentials.secret_key})
      })
      const json = await response.json()
      console.log(json)
  
     
      if(json.success && (password === cpassword) ){
        //save the auth a and redirect
        localStorage.setItem('token_sec', json.authtoken)
        localStorage.setItem('admin_token_sec', json.authtoken)
        props.showAlert("Logged in Successfully", "success")
        navigate("/")
  
      }else{
          props.showAlert("Login with Valid Credentials", "danger")
      }
      
    }
  
    const onChange =(e)=>{
      setcreadentials({...creadentials, [e.target.name]:e.target.value})
    }
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange} value={creadentials.name} id="name" name='name' aria-describedby="emailHelp"/>
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
            <label htmlFor="cpassword" className="form-label"> Confirm Password</label>
            <input type="password" className="form-control" onChange={onChange}value={creadentials.cpassword} id="cpassword" name='cpassword'/>
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

export default SignUp