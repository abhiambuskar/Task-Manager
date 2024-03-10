import React from 'react'
import Row from './Row'
import { useContext , useRef, useState, useEffect} from "react";
import taskContext from '../context/tasks/taskContext';
import {useNavigate} from 'react-router-dom'
import Calendar_pic from './Calendar';

const Table = (props) => {
  const context = useContext(taskContext)
  const {tasks, addTask,editTask, showAlert, getTasks} = context
  let cnt = 0
  let navigate =  useNavigate()

  const ref = useRef(null)
  const refClose = useRef(null)

  const [task, settask] = useState({id: "",etitle:"", edescription:"", etag:"",ehours:"",e_start_date:"",e_end_date:"",eworking_status:""})


  const updateTask = (currentTask) =>{
    console.log(currentTask)
    ref.current.click()
    settask({id: currentTask._id,etitle: currentTask.title, edescription: currentTask.description, etag: currentTask.tag, ehours: currentTask.hours, e_start_date: currentTask.start_date, e_end_date: currentTask.end_date, eworking_status: currentTask.working_status})
  }



  const handleClick = (e)=>{
      console.log("updating the task ", task)
      editTask(task.id, task.etitle, task.edescription, task.etag, task.ehours, task.e_start_date, task.e_end_date, task.eworking_status)
      refClose.current.click()
      props.showAlert("Task Updated Successfully", "success")
      e.preventDefault()
  }
  const onChange = (e) =>{
      settask({...task,[e.target.name]:e.target.value})
  }

  
  return (
    <>


    <button type="button"ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal2">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal2" tabIndex="-1"  aria-labelledby="exampleModalLabel" aria-hidden="true">
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

            <div className="mb-3">
                <label htmlFor="e_start_date" className="form-label">Start Date</label>
                <input type="date" className="form-control" onChange={onChange} value={tasks.e_start_date} name="e_start_date" id="e_start_date"/>
            </div>
            <div className="mb-3">
                <label htmlFor="end_date" className="form-label">End Date</label>
                <input type="date" className="form-control" onChange={onChange} value={tasks.e_end_date} name="e_end_date" id="e_end_date"/>
            </div>

            {/* THIS IS FOR THE START BUTTON  (We have change the display from modal to dropdown if you want to see how the modal works it is in the below commented part) */}  
            {/* <div className="mb-3">
              <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal"   data-bs-target="#exampleModal1">
                Start Date
              </button>
              <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Select Start Date</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Calendar_pic onChange={onChange} value={task.e_start_date} name="e_start_date" id="e_start_date" />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                    </div>
                  </div>
                </div>
              </div> 
            </div> */}


              {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle my-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  Start Date
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Calendar_pic onChange={onChange} value={task.e_start_date} name="e_start_date" id="e_start_date" /></li>
                </ul>
              </div> */}





            {/* THIS IS FOR THE END BUTTON */}
            {/* <div className="mb-3">
              <button type="button" className="btn btn-primary mx-2" data-bs-toggle="modal"   data-bs-target="#exampleModal1">
                End Date
              </button>
              <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Select End Date</h5>
                      <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <Calendar_pic onChange={onChange} value={task.e_end_date} name="e_end_date" id="e_end_date" />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                      <button type="button" className="btn btn-primary"data-bs-dismiss="modal">Save changes</button>
                    </div>
                  </div>
                </div>
              </div> 
            </div> */}
              {/* <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle my-2" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                  End Date
                </button>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                  <li><Calendar_pic onChange={onChange} value={task.e_end_date} name="e_end_date" id="e_end_date" /></li>
                </ul>
              </div> */}

            <div className="mb-3">
                <label htmlFor="eworking_status" className="form-label">Status</label>
                <input type="text" className="form-control"  onChange={onChange} value={task.eworking_status} name="eworking_status" id="eworking_status"/>
            </div>

              
          </form>

          </div>
          <div className="modal-footer">
            <button type="button" ref={refClose} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" disabled={task.etitle.length < 5 || task.edescription.length < 5}  onClick={handleClick} className="btn btn-primary" data-dismiss="modal">Update Task</button>
          </div>
        </div>
      </div>
    </div>
    <h2 >Your Tasks</h2>
    {tasks.length === 0 && "No tasks to Display"}

    <div className='container '>
        <table className="table ">
            <thead>
                <tr>
                <th scope="col">Sr. No.</th>
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
              {tasks.map((task)=>{
                cnt += 1
                return <Row key={task._id} task={task}  cnt= {cnt} showAlert={showAlert} updateTask={updateTask}/>
                
              })}
            </tbody>
        </table>
    </div>

    </>
  )
}

export default Table