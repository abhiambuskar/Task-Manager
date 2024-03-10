import React , { useState } from 'react'
import Bar_Chart from './Bar_Chart'
import Pie_Chart from './Pie_Chart'
import Line_Chart from './Line_Chart'
import Donut_Chart from './Donut_Chart'

const Chart = (props) => {
    const {required_data,filter_type} = props
    const [userData, setuserData] = useState({
        labels: required_data.map((data) => data.title),
        datasets:[{
            label:"Time consumed by the Employees",
            data:required_data.map((data) => data[filter_type.category]),

        }]
    })
    const [chart_type, setchart_type] = useState({type:""})
    
    const onChange = (e) =>{
        setchart_type({...chart_type, [e.target.name]:e.target.value})
    }
  return (
    <div>
        <div className="mb-3">
            <label htmlFor="category"  className="form-label my-2 mx-2">Select the type of Pictorial representation </label>
            <select onChange={onChange}  value={chart_type.type}  name="type" id="type">
                <option value="pie_chart" >Pie Chart</option>
                <option value="bar_chart" >Bar Chart</option>
                <option value="line_chart" >Line Chart</option>
                <option value="donut_chart" >Donut Chart</option>

            </select>
            <p> Type is {chart_type.type}</p>
            {chart_type.type == 'bar_chart'?
                <div className="mb-3">
                    <Bar_Chart chartData={userData}/>
                </div>:
            null}

            {chart_type.type == 'pie_chart'?
                <div className="mb-3">
                    <Pie_Chart chartData={userData}/>
                </div>:
                null
            }
            
            {chart_type.type == 'line_chart'?
                <div className="mb-3">
                    <Line_Chart chartData={userData}/>
                </div>:
                null
            }

            {chart_type.type == 'donut_chart'?
                <div className="mb-3">
                    <Donut_Chart chartData={userData}/>
                </div>:
                null
            }
            </div>

    </div>
  )
}

export default Chart