// import { useState, useEffect } from 'react'
// import axios from 'axios'
// import { useParams } from 'react-router-dom'
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// } from 'chart.js'
// import { Line } from 'react-chartjs-2'
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Coinchart = () => {
//   // For
//   const [chartdata, setChartdata] = useState([])
//   const { id } = useParams()
//   //for 365 days 
//   const [days,setDays]= useState(1)
//   const fetchCoinchartData = async () => {
//     try {
//       const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`)
//       // console.log(data)
//       setChartdata(data.prices)
//     } catch {
//       console.log('Error Fetching coin chart data', error)
//     }
//   }

//   useEffect(() => {
//     fetchCoinchartData()
//   }, [id,days])

//   // For Chartjs
//   const myData={
//     lables:chartdata.map((value)=>{
//     //For date
//     const date = new Date(value[0])
//     //For time
    
//     const time = date.getHours() > 12
//      ? `${date.getHours() -12} : ${date.getMinutes()} PM`
//      : `${date.getHours()} : ${date.getMinutes()} AM`
//      return days == 1 ? time : date.toLocaleDateString()
//      console.log(date)
//     // in every clock after 12 pm it will start 13 14 15 so for that what i did,
//     // i have put condition ,let see , if clock will go 15 so 16 -12 = 4pm 
//     }),
//     // FOR PRICE
//     datesets:[{
//         lables:`Price in Past Days ${days}`,
//         data : chartdata.map((value)=>value[1]),
//         borderColor:'blue',
//         borderWidth:3
//       }]
//   }
//   return (
 
//     <div>
//       <Line data={myData}/>
//     </div>

//   )
// }

// export default Coinchart
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './Coinchart.css';
import Loader from '../Loader';
const Coinchart = ({currency}) => {
  const [chartdata, setChartdata] = useState([]);
  const { id } = useParams();
  const [days, setDays] = useState(1);

  const fetchCoinchartData = async () => {
    try {
      const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`);
      setChartdata(data.prices);
    } catch (error) {
      console.log('Error Fetching coin chart data', error);
    }
  };

  useEffect(() => {
    fetchCoinchartData();
  }, [id, days,currency]);

  const myData = {
    labels: chartdata.map(value => {
      const date = new Date(value[0]);
      const time = date.getHours() > 12
        ? `${date.getHours() - 12} : ${date.getMinutes()} PM`
        : `${date.getHours()} : ${date.getMinutes()} AM`;
      return days === 2 ? time : date.toLocaleDateString();
    }),
    datasets: [{
      label: `Price in Past Days ${days} in ${currency}`,
      data: chartdata.map(value => value[1]),
      borderColor: '#17a2b8',
      borderWidth: 3
    }]
  };

  return (
    <>
      {
       //FOR OTHERWISE CHART NAHE DEKHTA 
        chartdata.length === 0 ? (<Loader/>)
        :
        (
          <div>
   <Line data={myData} options={
        {
          elements:{
            point:{
              radius:1,
            }
          }
        }
      } style={{marginTop:"5rem", width:"60rem"}}/>

      <div className='btn' style={{marginTop:"30px"}}>
        <button onClick={() =>setDays(1)}>24 Hours</button>
        <button onClick={() =>setDays(30)}>1 Month</button>
        <button onClick={() =>setDays(365)}>1 Year</button>
      </div>
    </div>
        )
      }
    </>
  );
};

export default Coinchart;
