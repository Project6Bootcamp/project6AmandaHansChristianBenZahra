import { Component } from "react";
import firebase from "../firebase.js";

class MemeCreator extends Component {
  constructor() {
    super();
    this.state = {
      userMemes: "",
      userTopText: "Top Text",
      userBottomText: "Bottom Text",
    };
  }

  handleInputChangeTopText = (e) => {
    this.setState({
      userTopText: e.target.value,
    });
  };

  handleInputChangeBottomText = (e) => {
    this.setState({
      userBottomText: e.target.value,
    });
  };

  userGeneratedMemes = (e) => {
    e.preventDefault();

    const dbRef = firebase.database().ref();

    const time = (document.getElementById("date").value = Date());

    const userTagsInput = this.tags.value;
    const userMemeTags = userTagsInput.split(/[\s,]+/);
    const userMeme = {
      memeImage: this.props.gifUrlProps,
      memeAltText: this.props.gifAltProps,
      memeDate: time,
      memeTopText: this.topText.value,
      memeBottomText: this.bottomText.value,
      memeTags: userMemeTags,
    };

    this.topText.value = "";
    this.bottomText.value = "";
    this.tags.value = "";

    dbRef.push(userMeme);

    this.setState({
      userMemes: userMeme,
    });
  };

  hideCreateMemeSection = (e) => {
    if (e.target.id === "createMemeSection") {
      document.getElementById("createMemeSection").style.display = "none";
      document.getElementById("displayedGifsId").style.marginTop = "20px";
      window.removeEventListener("scroll", this.props.stopScroll);
      document.getElementById("searchGifId").style.display = "flex";
    }
  };

  closeMemeSection = () => {
    document.getElementById("createMemeSection").style.display = "none";
    document.getElementById("displayedGifsId").style.marginTop = "20px";
    window.removeEventListener("scroll", this.props.stopScroll);
    document.getElementById("searchGifId").style.display = "flex";
  };

  render() {
    return (
      <div
        className="createMemeSection"
        id="createMemeSection"
        onClick={this.hideCreateMemeSection}
      >
        <div className="wrapperCreateMemePage">
          <div className="buttonContainer">
            <button className="closeMemeButton" onClick={this.closeMemeSection}>
              X
            </button>
          </div>

          <div className="gifAndForm">
            <div className="selectedGif">
              <h5 className="memeText">{this.state.userTopText}</h5>
              <img src={this.props.gifUrlProps} alt={this.props.gifAltProps} />
              <h5 className="memeText">{this.state.userBottomText}</h5>
            </div>

            <form
              action=""
              onSubmit={this.userGeneratedMemes}
              className="createMemeForm"
            >
              <input id="date" name="date" className="hiddenDate"></input>

              <label htmlFor="topText">Top Text</label>
              <input
                type="text"
                id="topText"
                className="userInput"
                required
                placeholder="Top Text"
                ref={(top) => (this.topText = top)}
                onChange={this.handleInputChangeTopText}
                maxLength=""
              />

              <label htmlFor="bottomText">Bottom Text</label>
              <input
                type="text"
                id="bottomText"
                className="userInput"
                required
                placeholder="Bottom Text"
                ref={(bottom) => (this.bottomText = bottom)}
                onChange={this.handleInputChangeBottomText}
              />

              <label htmlFor="tags">Tags</label>
              <input
                type="text"
                id="tags"
                className="userInput"
                required
                placeholder="Tags"
                ref={(tags) => (this.tags = tags)}
              />

              <input type="submit" className="submit" value="Submit!"></input>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default MemeCreator;
