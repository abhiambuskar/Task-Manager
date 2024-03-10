import React, { useEffect, useState, useRef } from 'react'
import {Link,  useParams, useNavigate} from 'react-router-dom'
import Task from './Task';
import { useContext } from "react";
import taskContext from '../context/tasks/taskContext';
import Filter from './Filter';

const User_data = (props) => {
  const context = useContext(taskContext)
  let navigate = useNavigate()
  const [filter_type, setfilter_type] = useState({category:""})

  const {editTask, deleteTask} = context

  const onChanged = (e) =>{
    setfilter_type(filter_type.category)
    console.log(filter_type.category)
    console.log(filter_type)
}

  const ref = useRef(null)
  const refClose = useRef(null)

  const [task, settask] = useState({id: "",etitle:"", edescription:"", etag:"",ehours:""})



    const {id } = useParams();
    let cnt = 0
    const [required_data, setRequiredData] = useState([])
    const [filter_check, setfilter_check] = useState(false)
    let clicked = false
    const check_click = ()=>{
      if(clicked === false){
        clicked = true
        setfilter_check(clicked)
        console.log(filter_check)
      }else{
        clicked = false
        setfilter_check(clicked)
        console.log(filter_check)

      }
      console.log(clicked)
      // navigate('./filter')

    }

    useEffect(() => {
        (async function() {

            const response = await fetch(`http://localhost:5000/api/auth/getTasksadmin`,{
            method:'GET',
            headers:{
                'Content-type': 'application/json',
                'auth-token': localStorage.getItem('token_sec')
            } 
            })
    
            const json = await response.json()
           
    
            // let newtasks = JSON.parse(JSON.stringify(user_tasks))
            const temp = [];
            for(let index = 0; index < json.allTasks.length; index++){
              const element = json.allTasks[index]
            //   console.log(element.user)
              if(element.user === id){
                temp.push(element)
              }
            }
            setRequiredData([...temp]);
            console.log(temp)        
        


        })();
    
        
    }, []);

    const updateTask = (currentTask) =>{
      console.log(currentTask)
      ref.current.click()
      settask({id: currentTask._id,etitle: currentTask.title, edescription: currentTask.description, etag: currentTask.tag, ehours: currentTask.hours})
      console.log("the value should be in the pannel ")
    }

    const handleClick = (e)=>{
      console.log("updating the task ", task)
      editTask(task.id, task.etitle, task.edescription, task.etag, task.ehours)
      refClose.current.click()
      // props.showAlert("Task Updated Successfully", "success")
      e.preventDefault()
    }
    const onChange = (e) =>{
        settask({...task,[e.target.name]:e.target.value})
    }
  
  return (

    <>
        <Task/>
              
        <button type="button"ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>


        <div className="modal fade" id="exampleModal" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Title</label>
                    <input type="text" className="form-control" name="etitle" id="etitle"onChange={onChange} aria-describedby="emailHelp" required minLength={5} value={task.etitle}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription"  className="form-label">Task</label>
                    <input type="text" className="form-control" onChange={onChange} name="edescription" id="edescription"value={task.edescription} required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag"  className="form-label">Tag</label>
                    <input type="text" className="form-control" onChange={onChange} value={task.etag} name="etag" id="etag"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="ehours" className="form-label">Hours</label>
                    <input type="number" className="form-control"  onChange={onChange} value={task.ehours} name="ehours" id="ehours"/>
                </div>  
              </form>

              </div>
              <div className="modal-footer">
                <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button"   onClick={handleClick} className="btn btn-primary" data-dismiss="modal">Update Task</button>
              </div>
            </div>
          </div>
        </div>
        <br />
        <br />
        <table className="table">
        <thead>
            <tr>
            <th scope="col">Sr.No</th>
            <th scope="col">Title</th>
            <th scope="col">Task</th>
            <th scope="col">Tag</th>
            <th scope="col">Hours</th>
            <th scope="col">Start Date</th>
            <th scope="col">End Date</th>
            <th scope="col">Status</th>

            </tr>
        </thead>
        <tbody>

            { required_data.map((i)=>{
                cnt += 1
                return (
                    <tr>
                        <th >{cnt}</th>
                        <td scope="row">{i.title}</td>
                        <td>{i.description}</td>
                        <td>{i.tag}</td>
                        <td>{i.hours}</td>
                        <td>{i.start_date}</td>
                        <td>{i.end_date}</td>
                        <td>{i.working_status}</td>

                        <i className="far fa-trash-alt mx-2"  onClick={()=>{deleteTask(i._id)}}  ></i>
                        <i className="far fa-edit mx-2" data-bs-target="#exampleModal" onClick={()=>{updateTask(i._id)}}data-bs-toggle ="modal" ></i>
                    </tr>
        
                )
            })}

        </tbody>
        </table>

        <button className='btn btn-primary my-2' onClick={check_click}>Apply Filter</button>

        {/* <Filter/> */}
        {filter_check === true?
        <div className="mb-3">
          {/* <div className="mb-3">
            <label htmlFor="category"  className="form-label my-2">Select the option</label>
            <select  onChange={onChanged} value={filter_type.category}  name="category" id="category">
              <option value="star_end" >Start Date and End Date</option>
              <option value="title" >Title</option>
              <option value="task" >Task</option>
              <option value="hours" >Hours</option>
              <option value="tags" >Tags</option>
              <option value="status" >Status</option>
            </select>
            <p> Type is {filter_type.type}</p>
          </div> */}



          <Filter  required_data={required_data}/>
        </div>
        :
        <div></div>
        } 


        <Link className="btn btn-primary mx-2" role="button" to="/admin">Back</Link>
    </>
  )
}

export default User_data