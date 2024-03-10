import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Chart from './Chart'

const Filter = (props) => {
    const {required_data} = props
    const [filter_type, setfilter_type] = useState({category:""})
    const [chart_type, setchart_type] = useState({type:""})

    const [checking_status, setchecking_status] = useState({title:"", task:"", tags:"",hours:"", start_date:"", end_date:"", status:""})
    const onChange = (e) =>{
        setfilter_type({...filter_type,[e.target.name]:e.target.value})
        console.log(filter_type.category)
        console.log(filter_type)
    }

    const getChartType = (e) =>{
        setchart_type({...chart_type, [e.target.name]:e.target.value})
    }
      let k
      const handleSelect = ()=>{
            // setfilter_type(filter_type.category)
            // console.log(filter_type.category)
            // console.log(filter_type)
            // setfilter_type(filter_type.category)
            // console.log(filter_type.category)
            // console.log(filter_type)
      }
      let cnt = 0
      const check = (e)=>{
        setchecking_status({...checking_status,[e.target.name]:e.target.value})
      }
      const [getData, setgetData] = useState([])
      const show_result = () =>{
        let temp = []

        if(filter_type.category === "start_end"){
            console.log(filter_type)
            console.log((checking_status.start_date))
            console.log(checking_status.end_date)
            const temp = [];
            for(let index = 0; index < required_data.length; index++){
              const element = required_data[index]
            //   console.log(element.user)
              if( Date(element.date) < filter_type.category.start_date && Date(element.date) > filter_type.category.end_date){
                temp.push(element)
              }
            }
            setgetData([...temp]);
            console.log(temp)        
        }

        if(filter_type.category === "title"){
            for(let i = 0; i < required_data.length; i++){
                const element = required_data[i]
                    if(element.title == checking_status.title){
                        temp.push(element)
                    }
            }
            setgetData([...temp]);
            console.log(temp) 
        }

        if(filter_type.category === "task"){
            for(let i = 0; i < required_data.length; i++){
                const element = required_data[i]
                    if(element.description == checking_status.task){
                        temp.push(element)
                    }
            }
            setgetData([...temp]);
            // console.log(temp) 
        }

        if(filter_type.category === "hours"){
            // console.log(filter_type)
            // console.log(checking_status.hours)
            for(let i = 0; i < required_data.length; i++){
                const element = required_data[i]
                // console.log(element.hours)
                    if(element.hours == checking_status.hours){
                        temp.push(element)
                    }
            }
            setgetData([...temp]);
            // console.log(temp) 
            // console.log(getData)
            
        }

        if(filter_type.category === "tags"){
            console.log(filter_type)
            console.log(checking_status.tags)
            for(let i = 0; i < required_data.length; i++){
                const element = required_data[i]
                    if(element.tag == checking_status.tags){
                        temp.push(element)
                    }
            }
            setgetData([...temp]);
            console.log(temp) 
            console.log(getData)            
        }

        if(filter_type.category == "status"){
            for(let i = 0; i < required_data.length; i++){
                const element = required_data[i]
                    if(element.working_status === checking_status.status){
                        temp.push(element)
                    }
            }
            setgetData([...temp]);
            console.log(temp) 
        }    
      }

      const clear_states = (e) =>{
        e.preventDefault()
        setgetData([])
        setchecking_status({title:"", task:"", tag:"",hours:"", start_date:"", end_date:"", status:""})

    }
  return (
    <div>

        <div className="mb-3">
            <label htmlFor="category"  className="form-label my-2">Select the option</label>
            <select onChange={onChange}  value={filter_type.category} onClick={handleSelect} name="category" id="category">
              <option value="start_end" >Start Date and End Date</option>
              <option value="title" >Title</option>
              <option value="task" >Task</option>
              <option value="hours" >Hours</option>
              <option value="tags" >Tags</option>
              <option value="status" >Status</option>
            </select>
            <p> Type is {filter_type.category}</p>
        </div>

        {/* THIS IS FOR THE FILTERING START AND END DATE */}
        {filter_type.category === "start_end"?
            <>
                <div className="mb-3">
                    <label htmlFor="start_date" className="form-label">Start Date</label>
                    <input type="date" className="form-control" value={checking_status.start_date} onChange={check} name="start_date" id="start_date"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="start_date" className="form-label">End Date</label>
                    <input type="date" className="form-control" value={checking_status.end_date} onChange={check} name="end_date" id="end_date"/>
                </div>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </>
            :
        null}

        {/* THIS IS FOR THE FILTERING Hours*/}
        {filter_type.category === "hours"?
            <div className="mb-3">
                <label htmlFor="hours" className="form-label">Hours</label>
                <input type="number" className="form-control"value={checking_status.hours}onChange={check}  name="hours" id="hours"/>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </div>:
            null
        }

        {/* THIS IS FOR THE FILTERING TITLE*/}
        {filter_type.category === "title"?
            <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" value={checking_status.title} onChange={check} name="title" id="title"/>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </div>:
            null
        }

        {/* THIS IS FOR THE FILTERING TASKS*/}
        {filter_type.category === "task"?
            <div className="mb-3">
                <label htmlFor="task" className="form-label">Tasks</label>
                <input type="text" className="form-control"value={checking_status.task} onChange={check} name="task" id="task"/>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </div>:
            null
        }


        {/* THIS IS FOR THE FILTERING TASKS*/}
        {filter_type.category === "tags"?
            <div className="mb-3">
                <label htmlFor="tags" className="form-label">Tag</label>
                <input type="text" className="form-control" value={checking_status.target} onChange={check} name="tags" id="tags"/>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </div>:
            null
        }
        

        {/* THIS IS FOR THE FILTERING STATUS*/}
        {filter_type.category === "status"?
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status</label>
                <input type="text" className="form-control" value={checking_status.status} onChange={check}  name="status" id="status"/>
                <button className='btn btn-primary my-2' onClick={show_result}>Show Results</button>

            </div>:
            null
        }

        {getData.length !== 0 ?
        <><table className="table">
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
                      {getData.map((x) => {
                          cnt += 1
                          return (
                              <tr>
                                  <th>{cnt}</th>
                                  <td scope="row">{x.title}</td>
                                  <td>{x.description}</td>
                                  <td>{x.tag}</td>
                                  <td>{x.hours}</td>
                                  <td>{x.start_date}</td>
                                  <td>{x.end_date}</td>
                                  <td>{x.working_status}</td>

                              </tr>
                          )
                      })}

                  </tbody>
                </table><button className='btn btn-primary' onClick={clear_states}>Clear Filter</button>
                {/* <p>Do you want Pictorial presentation</p>
                <Link className="btn btn-primary mx-2" to="/chart" role="button">Yes</Link>
                <Link className="btn btn-primary mx-2"  role="button">No</Link> */}
                <Chart required_data={required_data} filter_type={filter_type} />
                {/* <div className="mb-3">
                    <label htmlFor="category"  className="form-label my-2">Select the type of Pictorial representation</label>
                    <select onChange={getChartType}  value={chart_type.type} onClick={handleSelect} name="type" id="type">
                        <option value="pie_chart" >Pie Chart</option>
                        <option value="bar_chart" >Bar Chart</option>
                        <option value="line_chart" >Line Chart</option>
                        <option value="donut_chart" >Donut Chart</option>

                    </select>
                    <p> Type is {filter_type.category}</p>
                </div> */}



              </>
              :
        null}
    </div>
  )
}

export default Filter