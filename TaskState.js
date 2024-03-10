import React from "react";
import taskContext from "./taskContext";
import Alert from "../../components/Alert";
import { useState } from "react";
import {useContext} from "react"


const TaskState = (props) =>{
  const host = "http://localhost:5000"
  // const taskssInitial = []
  //   const [notes, setNotes] = useState(notesInitial)
  const {showAlert} = props
  const [creadentials, setcreadentials] = useState({name:"",email:"", password:"",cpassword:"", type:"", secret_key:""})


    const identity = "Abhishek"
    const id_proof = []

    const [details, setdetails] = useState(id_proof)
    const [start_date, setstart_date] = useState("") 
    const [end_date, setend_date] = useState("")


    const tasksInitial = []
    const [tasks, setTasks] = useState(tasksInitial)
    const [feed, setfeed] = useState([])

    let x = []


    const getDetails = async () =>{
      // todd d dd
      
      const response = await fetch(`${host}/api/auth/getuser_details`,{
        method:'GET',
        headers:{
          'Content-type': 'application/json',
          'auth-token': localStorage.getItem('token_sec')
        }  
      })

      const json = await response.json()
      
      console.log(json)
      setdetails(json)
      // x = my_obj['data']
      // console.log(details)      
    }


      const getTasks = async () =>{
        // todd d dd
        
        const response = await fetch(`${host}/api/tasks/fetchalltasks`,{
          method:'GET',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          } 
        })
  
        const json = await response.json()
        // console.log(json)
        // setNotes(json)
        setTasks(json)
        // console.log(tasks)

      }

      

      //Add a Task

      const addTask = async (title, description, tag, hours, start_date, end_date, working_status)=>{
        const response = await fetch(`${host}/api/tasks/addtasks`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          } ,
          body: JSON.stringify({title, description, tag ,hours, start_date, end_date, working_status})
        })
        // const json = response.json()

        console.log("adding a new task")
        let task = await response.json()

        setTasks(tasks.concat(task))
      }


      //Add a Feedback

      const addFeedback = async (name,description)=>{
        {description.length === 0? console.log("description has no lenght"):console.log("description has lenght")}
    
        const response = await fetch(`${host}/api/feedbacks/addfeedback`,{
          method:'POST',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          } ,
          body: JSON.stringify({name,description})
        })
        // const json = response.json()

        console.log("adding a new feeback")
        let x = await response.json()
        console.log(x)

        setfeed(feed.concat(x))
      }

  

      //Delete a Task
      const deleteTask =async (id)=>{
        const response = await fetch(`${host}/api/tasks/deletetask/${id}`,{
          method:'DELETE',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          } 
        })
        const json = response.json()
        console.log("deleting task"+ id)
        let newtasks = tasks.filter((task) => { return task._id !== id});
        setTasks(newtasks)
        showAlert("Task Deleted Successfully", "success")
      }


      // Edit a Task
      
      const editTask = async (id, title, description, tag, hours, start_date, end_date, working_status)=>{

       const response = await fetch(`${host}/api/tasks/updatetask/${id}`,{
          method:'PUT',
          headers:{
            'Content-type': 'application/json',
            'auth-token': localStorage.getItem('token_sec')
          } ,
          body: JSON.stringify({title, description, tag ,hours, start_date, end_date, working_status})
        })
        const json = await response.json()

        let newtasks = JSON.parse(JSON.stringify(tasks))
  
        for(let index = 0; index < tasks.length; index++){
          const element = newtasks[index]
          if(element._id === id){
            newtasks[index].title = title
            newtasks[index].description = description
            newtasks[index].tag = tag
            newtasks[index].hours = hours
            newtasks[index].start_date = start_date
            newtasks[index].end_date = end_date
            newtasks[index].working_status = working_status

            break;
          }
        }
        // console.log(id , tasks)
        setTasks(newtasks)
      }

      
    return (
        <taskContext.Provider value={{tasks, x,setTasks, identity,addTask, editTask, deleteTask,getTasks, creadentials,getDetails, setcreadentials,details, setdetails, addFeedback, setend_date, end_date, setstart_date, start_date}}>
            {props.children}
        </taskContext.Provider>

    )
}


export default TaskState