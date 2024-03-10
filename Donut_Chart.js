import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import {Chart as ChartJS} from "chart.js/auto"

const Donut_Chart = ({chartData}) => {
  return (
        <Doughnut data={chartData}/>
    )
}

export default Donut_Chart

// data:required_data.map((data) => data(filter_type.category)),
