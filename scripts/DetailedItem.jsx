import * as React from 'react';
import { useEffect, useState } from 'react';
import Socket from './Socket';
import LineGraph from './LineGraph';
import '../style/DetailedItem.css';

export default function DetailedView() {
  const [pricehistory, setPricehistory] = useState([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState('');
  const [imgurl, setImgurl] = useState('');
  const [user, setUser] = useState('');
  const [profpic, setProfpic] = useState('');
  const [time, setTime] = useState('');
  const [error, setError] = useState(true)
  const [graphurl, setGraphurl] = useState('');
  const [asin, setAsin] = useState('');
  const [mean, setMean] = useState(0);
  const [variance, setVariance] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const [likes, setLikes ] = useState(0);
  const [dataset, setDataset] = useState([]);
  const [datapts, setDatapts] = useState([]);
  useEffect(() => {
    Socket.on('detail view response', (data) => {
        setTitle(data.itemname);
        setImgurl(data.imgurl);
        setPricehistory(data.pricehistory);
        setUser(data.username);
        setProfpic(data.pfp);
        setGraphurl(data.graphurl);
        setMean(data.mean);
        setVariance(data.variance);
        setMin(data.min_price);
        setMax(data.max_price);
        setAsin(data.asin);
        setLikes(data.likes);
        setDataset(data.dataset);
        setDatapts(data.datapts);
    });

  }, []);

  return (
    <div> Historical Price: {pricehistory} <br />
    Visualization Graph: <br />
    <LineGraph 
    datapts = {datapts}
    dataset = {dataset}
    />
    <h4>Mean: {mean}, Variance: {variance} , Historical low: ${min}, Historical high: ${max}</h4>
        <h4>Posted by: {user} <img className="user-photo" src={profpic} alt={ user } /> </h4>
    Likes: {likes} <button type="button"> Like </button>
    <a href={"https://www.amazon.com/dp/" + asin} >Buy it on Amazon!</a></div>
  );
}