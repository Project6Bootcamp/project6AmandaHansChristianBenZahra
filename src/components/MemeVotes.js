import { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import { faThumbsDown , faThumbsUp } from "@fortawesome/free-regular-svg-icons";

library.add(faThumbsDown, faThumbsUp);

class MemeVotes extends Component {
  constructor() {
    super();
    this.state = {
      likes: 0,
      dislikes: 0,
      total: 0,
    };
  }

  upVote = () => {
    this.setState({
      likes: this.state.likes + 1,
      total: this.state.total + 1,
    });
  };

  downVote = () => {
    this.setState({
      dislikes: this.state.dislikes + 1,
      total: this.state.total - 1,
    });
  };

  render() {
    return (
      <div className="voteBtns">
        <button aria-label="upvote this meme" onClick={this.upVote}>
          <p>{this.state.likes}</p>
          <FontAwesomeIcon icon={faThumbsUp} />
        </button>

        <button>{this.state.total}</button>

        <button aria-label="downvote this meme" onClick={this.downVote}>
          <p>{this.state.dislikes}</p>
          <FontAwesomeIcon icon={faThumbsDown} />
        </button>
      </div>
    );
  }
}

export default MemeVotes;
