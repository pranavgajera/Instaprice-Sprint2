import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import { Link } from 'react-router-dom';
import LineGraph from './LineGraph';
import '../style/DetailedItem.css';

export default function DetailedView(props) {
  const [pricehistory, setPricehistory] = useState([]);
  const [title, setTitle] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [user, setUser] = useState('');
  const [profpic, setProfpic] = useState('');
  const [time, setTime] = useState('');
  const [asin, setAsin] = useState('');
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [likes, setLikes ] = useState(0);
  const [dataset, setDataset] = useState([]);
  const [datapts, setDatapts] = useState([]);
  
  function updateItems(data) {
    setTitle(data.itemname);
    setImgurl(data.imgurl);
    setPricehistory(data.pricehistory);
    setUser(data.username);
    setProfpic(data.pfp);
    setMean(data.mean);
    setVariance(data.variance);
    setMin(data.min_price);
    setMax(data.max_price);
    setAsin(data.asin);
    setLikes(data.likes);
    setDataset(data.dataset);
    setDatapts(data.datapts);
  }
  
  function getNewItems() {
    React.useEffect(() => {
      let isMounted = true;
      Socket.on('detail view response', (data) => {
        if (isMounted) updateItems(data);
      })
      return () => { isMounted = false };
      })
    }
  
  getNewItems();
  
  function handleBack(e) {
    Socket.emit('go back');
  }          

  return (
    <div>
    <Link to='/' onClick={handleBack}> Go back to searches </Link> <br />
    Historical Price: {pricehistory} <br />
    Visualization Graph: <br />
    <LineGraph 
    datapts = {datapts}
    dataset = {dataset}
    />
    Mean: {mean} <br />
    Variance: {variance} <br />
    Historical low: ${min} <br />
    Historical high: ${max} <br />
    Posted by: {user} <img className="user-photo" src={profpic} alt={ user } />
    Likes: {likes} <button type="button"> Like </button>
    <a href={"https://www.amazon.com/dp/" + asin} >Buy it on Amazon!</a></div>
  );
}