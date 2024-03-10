import './App.css';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes
}from "react-router-dom";
import Navbar from './components/Navbar';
import SignUp from './components/SignUp';
import About from './components/About'
import Login from './components/Login';
import TaskState from './context/tasks/TaskState'
import Alert from './components/Alert';
import Admin from './components/Admin';
import { useState } from 'react';
import User_data from './components/User_data';
import Calendar_pic from './components/Calendar';
import Feedbacks from './components/Feedbacks';
import Filter from './components/Filter';
import Chart from './components/Chart';

function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(()=>{
      setAlert(null)
    }, 9500)
  }
  return (
    <TaskState showAlert = {showAlert}>
      <div className="App">
        <Router> 
            <Navbar/>
            <Alert alert={alert}/>
            <div className="container">
            <Routes>
            <Route exact path='/' element = {<Home showAlert = {showAlert}/> }/>
              <Route exact path='/about' element = {<About showAlert = {showAlert}/>}/>
              <Route exact path='/login' element = {<Login showAlert = {showAlert}/>}/>
              <Route exact path='/signup' element = {<SignUp showAlert = {showAlert}/>}/>
              <Route exact path='/admin' element = {<Admin />}/>
              <Route exact path='/user_data/:id' element = {<User_data />}/>
              <Route exact path='/calendar' element = {<Calendar_pic />}/>
              <Route exact path='/feedbacks' element = {<Feedbacks />}/>
              <Route exact path='/filter' element = {<Filter />}/>
              <Route exact path='/chart' element = {<Chart />}/>



            </Routes> 
            </div>
        </Router>

      </div>
    </TaskState>
  );
}

export default App;
