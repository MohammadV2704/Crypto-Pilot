
import React, { useEffect, useState } from 'react';
import Loader from '../Loader';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';
import { IoPulseOutline } from 'react-icons/io5';
import Coinchart from '../CoinChartF/Coinchart';
import './Coindetail.css';
import logo from '../../assets/bg3.webp'
function Coindetails() {
  const [coin, setCoin] = useState(null); // Initialize with null instead of []
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const profit = coin?.market_data?.price_change_percentage_24h > 0;

  // for button INR or USD
  const [currency, setCurrency] = useState('inr');
  const currencysymbol = currency === 'inr' ? '₹' : '$';

  useEffect(() => {
    const getCoin = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);
        console.log(data);
        setCoin(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getCoin();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {coin ? ( // Check if coin is not null
        <div className="coin-detail">
        {/* <img src={logo} alt=''></img> */}
          <div className="coin-info">
            <div className="btn">
              <button onClick={() => setCurrency('inr')}>INR</button>
              <button onClick={() => setCurrency('usd')}>USD</button>
            </div>

            <div className="time">{coin?.last_updated}</div>

            <div className="coin-image">
              <img height="150px" src={coin?.image?.large || coinImage} alt="" /> {/* Provide a fallback image */}
            </div>

            <div className="coin-name">{coin.name}</div>

            <div className="coin-price">
              {currencysymbol} {coin.market_data.current_price[currency]}
            </div>

            <div className="coin-profit">
              {profit ? <BiSolidUpArrow color="green" /> : <BiSolidDownArrow color="red" />}
              {coin.market_data?.price_change_percentage_24h}
            </div>

            <div className="coin-market-rank">
              <IoPulseOutline color="#17a2b8" />
              # {coin.market_cap_rank}
            </div>

            <div className="coin-desc">
              <p>{coin.description['en'].split('.')[0]}</p>
            </div>
          </div>
          {/* props  */}
          <Coinchart
           currency ={currency} />
        </div>
       
      ) : (
        <div>Error: Unable to fetch coin data.</div> // Render an error message if coin data is not available
      )}
      {/* <Coinchart/> */}
    </>
  );
}

export default Coindetails;
