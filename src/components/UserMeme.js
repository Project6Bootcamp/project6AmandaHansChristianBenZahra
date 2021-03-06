import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import { faThumbsDown , faThumbsUp } from "@fortawesome/free-regular-svg-icons";

library.add(faThumbsDown, faThumbsUp);


const UserMeme = ({ topText, bottomText, tags, image, alt, likes, dislikes, totalVotes, upVoteHandler, propertyKey, downVoteHandler }) => {

  let memeTags = `${tags}`.replace(/[^a-zA-Z]/g, " ").toLowerCase();
  let memeAlt = `${alt}`.replace(/[^a-zA-Z]/g, " ").toLowerCase();
  let memetopText = `${topText}`.replace(/[^a-zA-Z]/g, " ").toLowerCase();
  let memebottomText = `${bottomText}`.replace(/[^a-zA-Z]/g, " ").toLowerCase();

  return (
    <li className={`eachMemeStyleContainer ${memeTags} ${memeAlt} ${memetopText} ${memebottomText} `}>

      <div>
        <p>{topText}</p>
        <img src={image} alt={memeAlt} />
        <p>{bottomText}</p>
      </div>


      <div className="voteButtons">
        <div>
          <button className="totalBtn">Total {totalVotes}</button>
        </div>
        <div className="buttonContainer">
          <button className="upVote" aria-label="upvote this meme" onClick={() => { upVoteHandler(propertyKey, likes, totalVotes) }} >
            <p className="buttonText">{likes}</p>
            <FontAwesomeIcon icon={faThumbsUp} />
          </button>

          <button className="downVote" aria-label="downvote this meme" onClick={() => { downVoteHandler(propertyKey, dislikes, totalVotes) }} >
            <p className="buttonText">{dislikes}</p>
            <FontAwesomeIcon icon={faThumbsDown} />
          </button>
        </div>

      </div>

    </li>
  );
};

export default UserMeme;
