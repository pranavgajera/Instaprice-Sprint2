import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import PostButton from './PostButton';

export default function PriceHistoryResults(props) {
  const [pricehistory, setPricehistory] = useState(null);
  const [title, setTitle] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [user, setUser] = useState('');
  const [profpic, setProfpic] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(true);
  const [min,setMin]=useState(0);
  const [max,setMax]=useState(0);
  const [mean,setMean]=useState(0);
  const [variance,setVariance]=useState(0);
  const [currprice, setCurrprice] = useState(0);
  useEffect(() => {
    // console.log('we in useeffects');
    Socket.on('price history response', (data) => {
      if (props.ASIN === data.ASIN) {
        setTitle(data.title);
        setImgurl(data.imgurl);
        setPricehistory(data.pricehistory);
        setProfpic(data.pfp);
        setError(data.error);
        setMin(data.min);
        setMax(data.max);
        setMean(data.mean_price);
        setVariance(data.var_price);
        setUser(data.username);
        setTime(data.time);
        setCurrprice(props.currentprice);
      }
    });
  }, []);

  return (
    <div>
      { pricehistory
        ? (
          <div>
            <h3>Price Change History For this Item</h3>
            {error
                ?(<div>Sorry no price history</div>)
                :
                (<ul>
                  {pricehistory.map((item) => (
                    <li>
                      {item.price_date}
                      -${item.price}
                    </li>
                  ))}
                  <li>Minimum Historical Price - ${min}</li>
                  <li>Maximum Historical Price - ${max}</li>
                  <li>Mean - {mean}</li>
                  <li>Variance - {variance}</li>

                </ul>)
            }
            <PostButton
              ASIN={props.ASIN}
              priceHistory={pricehistory}
              title={title}
              imgurl={imgurl}
              user={user}
              profpic={profpic}
              time = {time}
              min = {min}
              max = {max}
              mean = {mean}
              variance = {variance}
              currprice = {currprice}
            />
          </div>
        ) : "Loading..."}
    </div>
  );
}

PriceHistoryResults.propTypes = {
  ASIN: PropTypes.string.isRequired,
};