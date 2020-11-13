import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import PriceHistoryResults from './PriceHistoryResults';

export default function ResultItem({ ASIN, title, imageUrl }) {
  const [clicked, setClicked] = useState(false);

  function handleClick(e) {
    e.preventDefault();
    // console.log(`this is: ${ASIN}`);
    setClicked((clicked) => !clicked);
    if (!clicked) {
      Socket.emit('price history request', {
        ASIN,
        title,
        imgurl: imageUrl,
      });
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        <span>
          <img src={imageUrl} alt="item" />
          { title }
        </span>
      </button>
      { clicked
        ? (
          <div>
            <PriceHistoryResults
              ASIN={ASIN}
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
};
