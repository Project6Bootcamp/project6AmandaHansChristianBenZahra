import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import firebase from './firebase.js';
import './styles/App.scss';
import axios from 'axios';
import Header from './components/Header.js';
import memeCreator from './memeCreator.js';
import Footer from './components/Footer';

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
      - User can upvote / downvote
        - Total votes are displayed
      - Save meme for later ( STRETCH GOAL )
  Gallery View on Meme Viewing Section: 
    - User query based off of title and tags entered during meme creation 
    - display memes onto page based off of the search query above
    - 
*/

class App extends Component{
  constructor() {
    super();
    this.state = {
      images:'',
      userInput: '',
      upVotes: 0,
      downVotes: 0,
      totalVotes: 0,
    }
  }

  componentDidMount() {

    this.giphyAPICall('dog');
    this.giphyTrendingAPICall();
    

    const dbRef = firebase.database().ref();
    console.log(`This is your firebase database:`, dbRef);
    
  }

  giphyAPICall = (query) => {
    axios({
      url: 'https://api.giphy.com/v1/gifs/search',
      method: 'GET',
      responseType: 'json',
      params: {
        api_key: 'AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa',
        q: query,
        rating: 'g'
      }
    }).then((apiResponse) => {

      const apiResults = apiResponse.data.data;
      console.log(apiResults);

      const results = apiResults[0].images.downsized_large;

      this.setState({
        images: results.url,
      })
    })
  }

  giphyTrendingAPICall = () => {
    axios({
      url: 'https://api.giphy.com/v1/gifs/trending',
      method: 'GET',
      responseType: 'json',
      params: {
        api_key: 'AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa',
        limit: 10,
        rating: 'g'
      }
    }).then((apiResponse) => {
      console.log('trending', apiResponse);
    })
  }

  render(){
    return (
      <Router>
        {/* HEADER SECTION */}
        <Header headerText="Meme in a Giffy" subheaderText="" />
        <img src={ this.state.images } alt=""/>

          {/* <Route exact path="/" component={ } /> */}
          <Route path="/memecreator" component ={ memeCreator } />

        {/* FOOTER SECTION */}
        <Footer />
      </Router>
    );
  }
}

export default App;