import React from 'react'
import { useContext , useState} from 'react'
import taskContext from '../context/tasks/taskContext'


const About = () => {
  const context = useContext(taskContext)
  const { creadentials, addFeedback} = context
  const [feedbacks, setfeedbacks] = useState({name:"",desc:""})
  const [cars, setcars] = useState({model:""})
  const handleSubmit = (e)=>{
      e.preventDefault()
      addFeedback(feedbacks.name, feedbacks.desc)
      setfeedbacks({name:"",desc:""})
      setcars({model:""})
      // props.showAlert("Task Added Successfully", "success")

  }
  const onChange = (e) =>{
    setfeedbacks({...feedbacks,[e.target.name]:e.target.value})
    setcars({...cars, [e.target.name]:e.target.value})
    console.log(feedbacks)
    console.log(cars)
  }
  let k
  const handleSelect = ()=>{
    // k = cars.model
    // // console.log(cars.model)
    // console.log(k)
  }


  return (

    <>
      <h1 >Hi {creadentials.name}</h1>
      <h3>We'd Love some feedback</h3>
      <br />
      <br />
      <br />
      <form >

        <div className="mb-3">
            <label htmlFor="task"  className="form-label">Name</label>
            <input type="text" className="form-control" onChange={onChange}required value={feedbacks.name}   name="name" id="name"/>
        </div>

        <div className="mb-3">
          <input type="date" />
        </div>

        <div className="mb-3">
            <label htmlFor="task"  className="form-label">Feedbacks</label>
            <input type="textarea" className="form-control" onChange={onChange}required value={feedbacks.desc}   name="desc" id="desc"/>
        </div>

        <div className="mb-3">
            <label htmlFor="model"  className="form-label">Select the option</label>
            <select  onChange={onChange} onClick={handleSelect} value={cars.model} name="model" id="model">
              <option value="volvo" >volvo</option>
              <option value="slavia" >slavia</option>
              <option value="superb" >superb</option>
              <option value="taigun" >taigun</option>
              <option value="enyaq" >enyaq</option>

            </select>
            <p></p>
        </div>


        {/* <div className="form-floating">
        Enter your feedback: <textarea name="feedback" id="feedback" cols="70" rows="10" value={feedbacks.desc} onChange={onChange}></textarea>
        </div> */}
        <button type="submit"  className="btn btn-primary my-2" onClick={handleSubmit}>Submit</button>
      
      </form>
    </>
  )
}

export default About