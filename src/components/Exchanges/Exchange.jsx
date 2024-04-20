import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import axios from "axios";
import { Baseurl } from '../Baseurl';
import Loader from '../Loader';
import './Exchange.css';
import Eth from '../../assets/wall5.png'
const Exchange = () => {
  const [loading, setLoading] = useState(true);
  const [exchanges, setExchanges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getExchanges = async () => {
      try {
        const { data } = await axios.get(`${Baseurl}/`);
        setExchanges(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exchanges:", error);
        setError("Error fetching exchanges. Please try again later.");
        setLoading(false);
      }
    };
    getExchanges();
  }, []);

  return (
    <>
      {loading && <Loader />}

      {!loading && !error && (
        <>
          <Header />
          <img className='img2' src={Eth} alt=''></img>
          <div className="exchange-container">
            {exchanges.map(item => (
              <div key={item.id} className='ex-cards'>
                <div className='image'>
                  <img style={{ height: "80px" }} src={item.image} alt='' />
                </div>
                <div className='name'>
                  {item.name}
                </div>
                <div className='price'>
                  {item.trade_volume_24h_btc.toFixed(0)}
                </div>
                <div className='rank'>
                  {item.trust_score_rank}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {error && <div>Error: {error}</div>}
    </>
  );
}

export default Exchange;
