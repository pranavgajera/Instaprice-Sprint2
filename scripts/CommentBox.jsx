import React, { useState } from 'react';
import Socket from './Socket';
import PostCommentButton from './PostCommentButton'

export default function Feed() {
  const [itemnames, setItemname] = useState([]);
  const [imageurls, setImageurl] = useState([]);
  const [pricehists, setPricehist] = useState([]);
  const [usernames, setUsername] = useState([]);
  const [pfps, setPfp] = useState([]);
  const [times, setTime] = useState([]);
  const [clicked, setClicked] = useState(false);

  function updateItems(data) {
    setItemname(data.allItemnames);
    setImageurl(data.allImageurls);
    setPricehist(data.allPricehists);
    setUsername(data.allUsernames);
    setPfp(data.allPfps);
    setTime(data.allTimes);
  }

  function getNewItems() {
    React.useEffect(() => {
      Socket.on('comments request', updateItems);
      return () => {
        Socket.off('comments request', updateItems);
      };
    });
  }

  getNewItems();

  return (
    <div className="feedbox" id="feedBody">
    
        blahblahblah
  
    </div>
  );
}
