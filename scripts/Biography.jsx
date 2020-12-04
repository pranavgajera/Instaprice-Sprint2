import * as React from 'react';
import PropTypes from 'prop-types';
import Socket from './Socket';

export default function Biography(props) {
  const [totalLikes, setTotalLikes] = React.useState(0);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [totalComments, setTotalComments] = React.useState(0);

  function updateStats(data) {
    /* Catches fetching_comments signal from backend
      Collects comment info and puts them into arrays */
    const thisProfileName = props.name;
    const updatedProfileName = data.username;
    console.log("ThisName"+thisProfileName+" update:"+updatedProfileName);
    if (thisProfileName === updatedProfileName) {
      setTotalLikes(data.total_likes);
      setTotalPosts(data.total_posts);
      setTotalComments(data.total_comments);
    } else {
      // Not the same profile
    }
  }

  function getNewStats() {
    // Recieve Update from server
    React.useEffect(() => {
      Socket.on('update_profile_stats', updateStats);
      return () => {
        Socket.off('update_profile_stats', updateStats);
      };
    });
  }
  getNewStats();

  return (
    <div className="bio-content">
      <div>
        <img src={props.pfp} className="bio-pfp" />
      </div>
      <div className="bio-info">
        <div className="bio-name">{props.name}</div>
        <ul className="likes-posts">
          <li>
            {' '}
            Likes:
            {totalLikes}
          </li>
          <li>
            {' '}
            Posts:
            {totalPosts}
          </li>
          <li>
            {' '}
            Comments:
            {totalComments}
          </li>
        </ul>
      </div>
    </div>
  );
}

Biography.propTypes = {
  name: PropTypes.string.isRequired,
  pfp: PropTypes.string.isRequired,
  bio: PropTypes.string.isRequired,
};
