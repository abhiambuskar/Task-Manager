import React from 'react'
import User_data from './User_data'

const Admin_Table = (props) => {
    // let clicked = false
    const {details,handleClick, required_data, clicked} = props
    // const onClick = ()=>{
    //     if(clicked === false){
    //         clicked = true
    //         navigate('/user_data')
    //     }else{
    //         clicked = false
    //     }
    // }
    let cnt = 0
  return (
    
       <table className='table'>
            <thead>
                <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Tag</th>
                <th scope="col">Get Info</th>
                </tr>
            </thead>
        <tbody>

        {details.map((x) => (
            
            <tr>
            <td scope="row" >{x.name}</td>
            <td>{x.email}</td>
            <td>{x.type}</td>
            <a type='button' onClick={()=>{handleClick(x._id)}}  className='btn btn-primary my-1'>Click Here</a >
        </tr>
        ))}
            
        </tbody>
        </table>
        


  )
}

export default Admin_Table