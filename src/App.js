import { Component, Fragment } from 'react';
import firebase from './firebase.js';
import './styles/App.scss';
import axios from 'axios';
import Header from './components/Header.js';
import Footer from './components/Footer';

class App extends Component{
  constructor() {
    super();
    this.state = {
      images:'',
    }
  }

  componentDidMount() {
    axios({
      url: 'https://api.giphy.com/v1/gifs/search',
      method: 'GET',
      responseType: 'json',
      params: {
        api_key: 'AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa',
        q: 'bear'
      }
    }).then((apiResponse) => {
      console.log(apiResponse);
      this.setState({
        images: apiResponse.data.data[0].images.downsized_large.url,
      })
      // const imageUrl = 
    })

    

    const dbRef = firebase.database().ref();
    console.log(`This is your firebase database:`, dbRef);
  }
  
  render(){
    return (
      <Fragment>
        {/* HEADER SECTION */}
        <Header headerText="Meme in a Giffy" subheaderText="" />
        <img src={ this.state.images } alt=""/>


        {/* FOOTER SECTION */}
        <Footer />
      </Fragment>
    );
  }
}

export default App;
 