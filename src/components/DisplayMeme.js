import firebase from "../firebase.js";
import { Component } from "react";
import UserMeme from "../components/UserMeme.js";

class DisplayMeme extends Component {
  constructor() {
    super();
    this.state = {
      ogMemeArray: [],
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
          id: propertyKey,
          topText: firebaseDataObj[propertyKey].memeTopText,
          bottomText: firebaseDataObj[propertyKey].memeBottomText,
          image: firebaseDataObj[propertyKey].memeImage,
          alt: firebaseDataObj[propertyKey].memeAltText,
          tags: firebaseDataObj[propertyKey].memeTags,
          date: firebaseDataObj[propertyKey].memeDate,
        };

        memeArray.push(formattedObj);

        const sortedMemeArray = memeArray.sort(callback);
        function callback(a, b) {
          return new Date(b.date) - new Date(a.date);
        }
      }

      this.setState({
        ogMemeArray: memeArray,
      });
    });
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {

            let elements = document.getElementsByClassName("eachMemeStyleContainer");

            for (let i = 0; i < elements.length; i++) {
              elements[i].style.display = "none";
            }

            let nextElement = document.getElementsByClassName("cat");
            for (let n = 0; n < nextElement.length; n++) {
              nextElement[n].style.display = "block";
            }
          }}
        >
          Search
        </button>
        <ul className="eachMemeStyle">
          {this.state.ogMemeArray.map((eachMeme) => {
            return (
              <div>
                <UserMeme
                  id={eachMeme.propertyKey}
                  topText={eachMeme.topText}
                  bottomText={eachMeme.bottomText}
                  image={eachMeme.image}
                  alt={eachMeme.alt}
                  tags={eachMeme.tags}
                />
              </div>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default DisplayMeme;
