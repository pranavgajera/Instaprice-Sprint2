import * as React from "react";
import { Link } from "react-router-dom";
import Socket from "./Socket";
import PropTypes from "prop-types";
import '../style/ProfilePage.css'

export default function Biography(props) {
  const [totalLikes, setTotalLikes] = React.useState(0);
  const [totalPosts, setTotalPosts] = React.useState(0);
  const [totalComments, setTotalComments] = React.useState(0);
  const [pfp, setPfp] = React.useState("");

  function handleBack(e) {
    Socket.emit("go back");
  }

  function updateStats(data) {
    /* Catches fetching_comments signal from backend
      Collects comment info and puts them into arrays */
    const thisProfileName = props.name;
    const updatedProfileName = data.username;
    if (thisProfileName === updatedProfileName) {
      setTotalLikes(data.total_likes);
      setTotalPosts(data.total_posts);
      setTotalComments(data.total_comments);
      setPfp(data.pfp);
    } else {
      // Not the same profile
    }
  }

  function getNewStats() {
    // Recieve Update from server
    React.useEffect(() => {
      Socket.on("update_profile_stats", updateStats);
      return () => {
        Socket.off("update_profile_stats", updateStats);
      };
    });
  }
  getNewStats();

  return (
    <div className="bio-content">
      <div class="backButton">
        <Link to="/" onClick={handleBack}>
          {" "}
          Go back to searches{" "}
        </Link>
      </div>
      <div>
        <img src={pfp} className="bio-pfp" alt="Profile" />
      </div>
      <div className="bio-info">
        <div className="bio-name">{props.name}</div>
        <ul className="likes-posts">
          <li>
            {" "}
            Likes:
            {totalLikes}
          </li>
          <li>
            {" "}
            Posts:
            {totalPosts}
          </li>
          <li>
            {" "}
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
  bio: PropTypes.string.isRequired,
};
