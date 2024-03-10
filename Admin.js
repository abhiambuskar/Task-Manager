import React from 'react'
import { useContext, useEffect, useState } from 'react'
import taskContext from '../context/tasks/taskContext'
import Admin_Table from './Admin_Table'
import {useNavigate} from 'react-router-dom'


const Admin = () => {

    let cnt = 0    
    let navigate = useNavigate()

    
    const context = useContext(taskContext)

    const [collect, setcollect] = useState([]);
    const [details, setdetails] = useState([])
    const [user_tasks, setuser_tasks] = useState([])
    const [ required_data, setRequiredData] = useState([]);
    const [ adminView, setAdminView] = useState(true);

    let x = []
    const getDetails = async () =>{
        // todd d dd
        
        const response = await fetch(`http://localhost:5000/api/auth/getuser_details`,{
          method:'GET',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          }  
        })
  
        const json = await response.json()
        x = JSON.stringify(json)
        // console.log(json)
        setcollect(json.allUser)
        setdetails(json.allUser)
        // console.log(collect)
        // x = my_obj['data']
        // console.log(details)      
        // console.log(x)
      }




    useEffect(() => {
        getDetails()
    }, [])


    let clicked = false
    const handleClick = async (id)=>{
        navigate(`/user_data/${id}`)
    }
    

    
  return (
    <div>
    <p>{x}</p>

   
            {/* {x.length === 0? console.log("no elements present"): console.log("elements are present")} */}
            {/* {collect.length === 0? console.log("no elements present"): console.log("elements are present")} */}

 
            <Admin_Table key= {details._id}clicked={adminView} required_data={required_data} handleClick={handleClick} details={details} cnt={cnt}></Admin_Table>
               
    </div>
  )
}

export default Admin