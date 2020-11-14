import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';
import PriceHistoryResults from './PriceHistoryResults';
import './ResultItem.css';

export default function ResultItem({
  ASIN, title, imageUrl, username, pfp,
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
        username: pfp,
        pfp,
      });
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>
        <span>
          <img className="itempicture" src={imageUrl} alt="item" />
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
  username: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
};
