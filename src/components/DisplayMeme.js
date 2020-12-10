import firebase from "../firebase.js";
import { Component } from "react";
import UserMeme from "../components/UserMeme.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faThumbsDown, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
// import { faThumbsDown , faThumbsUp } from "@fortawesome/free-regular-svg-icons";

library.add(faThumbsDown, faThumbsUp);

class DisplayMeme extends Component {
  constructor() {
    super();
    this.state = {
      ogMemeArray: [],
      userMemeSearch: "",
    };
  }

  componentDidMount() {
    firebase.database().ref();
    const dbRef = firebase.database().ref();

    dbRef.on("value", (data) => {
      const firebaseDataObj = data.val();

      let memeArray = [];

      for (let propertyKey in firebaseDataObj) {
        const formattedObj = {
          propertyKey: propertyKey,
          topText: firebaseDataObj[propertyKey].memeTopText,
          bottomText: firebaseDataObj[propertyKey].memeBottomText,
          image: firebaseDataObj[propertyKey].memeImage,
          alt: firebaseDataObj[propertyKey].memeAltText,
          tags: firebaseDataObj[propertyKey].memeTags,
          date: firebaseDataObj[propertyKey].memeDate,
          likes: firebaseDataObj[propertyKey].memeLikes,
          dislikes: firebaseDataObj[propertyKey].memeDislikes,
          totalVotes: firebaseDataObj[propertyKey].memeTotalVotes,
        };

        memeArray.push(formattedObj);

        memeArray.sort(callback);
        function callback(a, b) {
          return new Date(b.date) - new Date(a.date);
        }
      }

      this.setState({
        ogMemeArray: memeArray,
      });
    });
  }

  handleMemeInputChange = (e) => {
    console.log(e.target.value);

    this.setState({
      userMemeSearch: e.target.value,
    });
  };

  handleMemeSubmit = (e) => {
    e.preventDefault();

    let elements = document.getElementsByClassName("eachMemeStyleContainer");

    for (let i = 0; i < elements.length; i++) {
      elements[i].style.display = "none";
    }

    let nextElement = document.getElementsByClassName(
      `${this.state.userMemeSearch}`
    );

    // console.log(nextElement);
    for (let n = 0; n < nextElement.length; n++) {
      nextElement[n].style.display = "flex";
    }
  };

  upVote = (propertyKey, likes, totalVotes) => {
    const dbRef = firebase.database().ref();

    dbRef.child(propertyKey).update({
      memeLikes: likes + 1,
      memeTotalVotes: totalVotes + 1,
    });
  };

  downVote = (propertyKey, dislikes, totalVotes) => {
    const dbRef = firebase.database().ref();

    dbRef.child(propertyKey).update({
      memeDislikes: dislikes + 1,
      memeTotalVotes: totalVotes - 1,
    });
  };

  render() {
    return (
      // Search Memes
      <div>
        <form
          className="flexbox"
          id="memeSearchBar"
          onSubmit={this.handleMemeSubmit}
        >
          <label htmlFor="memeSearch" className="srOnly">
            Search for Meme:
          </label>
          <input
            type="text"
            id="memeSearch"
            name="userMemeSearch"
            placeholder="Search Memes"
            required
            onChange={this.handleMemeInputChange}
          />
          <button>Search</button>
        </form>

        <ul className="eachMemeStyle">
          {this.state.ogMemeArray.map((eachMeme) => {
            return (
              <UserMeme
                propertyKey={eachMeme.propertyKey}
                topText={eachMeme.topText}
                bottomText={eachMeme.bottomText}
                image={eachMeme.image}
                alt={eachMeme.alt}
                tags={eachMeme.tags}
                likes={eachMeme.likes}
                dislikes={eachMeme.dislikes}
                totalVotes={eachMeme.totalVotes}
                upVoteHandler={this.upVote}
                downVoteHandler={this.downVote}
              />
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DisplayMeme;
