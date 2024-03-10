import React, { useRef } from 'react'
import { Context } from 'react'
import { useContext } from "react";
import taskContext from '../context/tasks/taskContext';


const Row = (props) => {
  const {task, cnt,updateTask} = props
  const context = useContext(taskContext)
  const {deleteTask } = context
  const checkstatus = ()=>{
    let d1 = new Date()
    if(d1.getTime() > task.start_date){
      return "Not Yet Started"
    }else if(task.start_date > d1.getTime() && task.end_date > d1.getTime()){
      return "Ongoing"
    }else if(task.start_date < d1.getTime() && task.end_date < d1.getTime() ){
      return "Running Late"
    }else{
      return "Done"
    }
  }
  return (
    
        <tr>
            {/* {console.log((task.start_date).slice(0, 10))} */}
            <th >{cnt}</th>
            <td scope="row">{task.title}</td>
            <td>{task.description}</td>
            <td>{task.tag}</td>
            <td>{task.hours}</td>
            <td>{task.start_date}</td>
            <td>{task.end_date}</td>
            {/* <td>{(task.date).slice(0,10)}</td>
            <td>{(task.date).slice(0,10)}</td> */}
            <td>{task.working_status}</td> 
            {/* <td>{checkstatus()}</td> */}
            <i className="far fa-trash-alt mx-2"  onClick={()=>{deleteTask(task._id)}}></i>

            <i className="far fa-edit mx-2" onClick={()=>{updateTask(task);}} data-bs-target= "#exampleModal" data-bs-toggle ="modal" ></i>
        </tr>
  
  )
}

export default Row