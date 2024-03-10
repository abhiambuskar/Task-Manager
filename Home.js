import React from 'react'
import Navbar from './Navbar'
import Table from './Table'
import { useContext } from 'react'
import taskContext from '../context/tasks/taskContext'
import Task from './Task'
import Footer from './Footer'

function Home(props) {
  const context = useContext(taskContext)
  const {tasks, setTasks, creadentials} = context
  
  const {showAlert} = props

  return (
    <>
    <div className='container'>
      <h1>Hi {creadentials.name}</h1>
      <p>Type is {creadentials.type} </p>
      <Task showAlert = {showAlert}/>

      <Table showAlert = {showAlert}/>
      <br/>
      <br/>
    </div>
    <Footer/>
    </>
  )
}

export default Home