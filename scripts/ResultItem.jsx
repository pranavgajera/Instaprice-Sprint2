import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import PriceHistoryResults from './PriceHistoryResults';
import '../style/ResultItem.css';

export default function ResultItem({
  ASIN, title, imageUrl, username, pfp,price,rating,totalReviews
}) {
  const [clicked, setClicked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    setClicked((clicked) => !clicked);
    if (!clicked) {
      Socket.emit('price history request', {
        ASIN,
        title,
        imgurl: imageUrl,
        username,
        pfp,
      });
    }
  }

  return (
    <div className="Result">
      <button type="button" onClick={handleClick}>
        <div className="ResultGrid">
          <div className="ResultImage">
            <img src={imageUrl} alt="item" />
          </div>
          <div className="ResultInfo">
            <span>
              <h4>Title - { title }</h4>
              <h4>Current Price - {price}</h4>
              <h4>Total Reviews - {totalReviews}</h4>
              <h4>Rating - {rating}</h4>
            </span>
          </div>
        </div>
      </button>
      { clicked
        ? (
          <div>
            <PriceHistoryResults
              ASIN={ASIN}
              currentprice={price}
            />
          </div>
        ) : (null)}
    </div>
  );
}

ResultItem.propTypes = {
  ASIN: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
};
