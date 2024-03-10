import React, { useState } from 'react';
import Calendar from 'react-calendar';

const Calendar_pic = props => {
    const {value, onDateChange} = props
    // const [value, onChange] = useState(new Date())
  return (
    <div>
        <Calendar onChange={onDateChange} value={value} />
        {/* {value.toString()} */}
  </div>
  )
}

export default Calendar_pic