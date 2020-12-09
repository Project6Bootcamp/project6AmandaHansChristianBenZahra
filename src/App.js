import { Component, Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import firebase from "./firebase.js";
import "./styles/App.scss";
import axios from "axios";
import Header from "./components/Header.js";
import MemeCreator from "./components/MemeCreator.js";
import Create from "./components/CreateMeme";
import DisplayMeme from "./components/DisplayMeme";
import Footer from "./components/Footer.js";
import SearchGifs from "./components/SearchGifs.js";
import Home from "./components/Home";

/* 
Components to create: 
Meme Creation Page
  - User query to get results and display images
    - if no results get found let user know
  - Limit results to 10 
  - When user selects Gif to create meme, window pops open with form and gif
  Custom Meme Component
  - Form has three inputs *all required, and submit button 
    - Top text, bottom text, tag(s)
  - On submit, prevent default behaviour and display on page 
    - Redirect user to the meme viewing section 
    
    
Meme Viewing Section:
  Component for Customized Finished Meme:   
      - User can upvotebpm / downvote
        - Total votes are displayed
      - Save meme for later ( STRETCH GOAL )
  Gallery View on Meme Viewing Section: 
    - User query based off of title and tags entered during meme creation 
    - display memes onto page based off of the search query above
    - 
*/

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    const dbRef = firebase.database().ref();

    console.log(`This is your firebase database:`, dbRef);
  }

  render() {
    return (
      <Router>
        {/* HEADER SECTION */}

        {/* <img src={ this.state.images } alt=""/>
        {/* <SearchGifs /> */}
        {/* <img src={this.state.images} alt="" /> */}
        {/* <Route exact path="/" component={ } />
          <Route path="" component ={ } /> */}
        {/* <Create /> */}
        {/* <DisplayMeme /> */}

        <Route exact path="/" component={Home} />
        <Route path="/memecreator" component={SearchGifs} />
        <Route path="/search" component={DisplayMeme} />

        {/* FOOTER SECTION */}
        <Footer />
      </Router>
    );
  }
}

export default App;
