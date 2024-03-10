import React, { useEffect, useState } from 'react'

const Feedbacks = () => {
  const [feedbacks, setfeedbacks] = useState([])

  const getfeedbacks = async () =>{
    
    const response = await fetch(`http://localhost:5000/api/feedbacks/fetchallfeedbacks`,{
      method:'GET',
      headers:{
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token_sec')
      }  
    })

    const json = await response.json()
    // x = JSON.stringify(json)
    // console.log(json)
    // setfeedbacks(json.allfeedbacks)
    // console.log(json)
    // console.log(feedbacks)
    const temp = [];
    for(let index = 0; index < json.allfeedbacks.length; index++){
      const element = json.allfeedbacks[index]
    //   console.log(element.user)
        temp.push(element)
      
    }
    setfeedbacks([...temp]);
    console.log(temp)        



    // setcollect(json.allUser)
    // setdetails(json.allUser)

  }
  let cnt = 0

  useEffect(() => {
    getfeedbacks()
  }, [])
  

  return (

    <>
      <h1>These are the feedbacks</h1>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Sr.No.</th>
                <th scope="col">Name</th>
                <th scope="col">Feedbacks</th>
                <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>

            { feedbacks.map((i)=>{
                cnt += 1
                return (
                    <tr>
                        <th >{cnt}</th>
                        <td scope="row">{i.name}</td>
                        <td>{i.description}</td>
                        <td>{(i.date).slice(0,10)}</td>



                    </tr>
        
                )
            })}
            </tbody>
        </table>
    </>
  )
}

export default Feedbacks




{/* <div className="mb-3">
<label htmlFor="vech" onChange={onChange} value={cars.model} className="form-label">Select the option</label>
<select >
  <option value="volvo"  >volvo</option>
  <option value="slavia" >slavia</option>
  <option value="superb" >superb</option>
  <option value="taigun" >taigun</option>
  <option value="enyaq" >enyaq</option>
</select>
<p value={cars.model}></p>
</div>
 */}
