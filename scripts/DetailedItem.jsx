import * as React from 'react';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function DetailedView(props) {
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
  const [stdv, setStdv] = useState(0);
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(0);
  const { open, onClose } = props; 
  
  useEffect(() => {
    Socket.on('detail view response', (data) => {
        setTitle(data.itemname);
        setImgurl(data.imgurl);
        setPricehistory(data.pricehistory);
        setProfpic(data.pfp);
        setGraphurl(data.graphurl);
        setMean(data.mean);
        setStdv(data.stdv);
        setMin(data.min_price);
        setMax(data.max_price);
        setAsin(data.asin);
        setShow(true);
        setError(data.error);
      
    });
  }, []);

  return (
    { title }
  );
}
