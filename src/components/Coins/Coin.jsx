import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import Header from '../Header/Header';
import {Link} from 'react-router-dom'
import './Coin.css'
const Coin = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [currency, setCurrency] = useState('inr');

  const [search,setSearch] = useState('')
  useEffect(() => {
    const getCoinsData = async () => {
      try {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`);
        setCoins(data);
        setLoading(false);
      } catch (error) {
        // console.error("Error fetching coins data:", error);
        setLoading(false);
        throw error;
      }
    };

    getCoinsData();
  }, [currency]); // Run effect when currency changes

  return (
    <>
      {loading ? <Loader /> : (
        <>
          <Header />
         {/* For searchbar */}
         <div className='search-bar'>
          <input type='text'
          placeholder='search Your Coins'
          onChange={(e)=>setSearch(e.target.value)}  
          />
          
         </div>
          <div className='btns'>
            <button onClick={() => setCurrency('inr')}>INR</button>
            <button onClick={() => setCurrency('usd')}>USD</button>
          </div>
 
          <div className='coin-list'>
          {/* Filter method use we can get bitcoin Search*/}
            {coins.filter((data)=>{
                if(data == ''){
                  return data
                }
                else if(data.name.toLowerCase().includes(search.toLowerCase())){
                  return data
                }
            }).map((coinsdata, index) => (
              <CoinCard
                key={index}
                coinsdata={coinsdata}
                id ={coinsdata.id}
                currency={currency}
              />
            ))}
          </div>
        </>
      )}
    </>
  );
};

const CoinCard = ({ coinsdata, currency ,id}) => {
  const currencysymbol = currency === 'inr' ? '₹' : '$';
  const profit = coinsdata.price_change_percentage_24h > 0
  return (
    <Link to={`/coins/${id}`} style={{color:'white' , textDecoration: 'none'}}>
    <div className='ex-cards'>
      <div className='image'>
        <img height={"80px"} src={coinsdata.image} alt='' />
      </div>
      <div className='name'>
        {coinsdata.name}
      </div>
      <div className='price'>
        {currencysymbol} {coinsdata.current_price.toFixed(1)}
      </div>
      <div style={profit? {color:"green"} : {color:"red"}}className='rank'>
        {profit ? "+" + coinsdata.price_change_percentage_24h.toFixed(2): coinsdata.price_change_percentage_24h.toFixed(2)}
      </div>
    </div>
    </Link>
  );
};

export default Coin;


