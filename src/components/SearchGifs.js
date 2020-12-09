import { Component, Fragment } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Footer from './Footer.js';
import '../styles/App.scss';

class SearchGifs extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            searchedGifs: [],
            displayedGifs: [],
            gifUrl: [],
            gifAlt: []
        }
    }

    componentDidMount() {
        this.giphyTrendingAPICall();
    }

    handleInputChange = (e) => {
        //console.log('handle input change', e.target.value);
        this.setState({
            userInput: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        //console.log('handle submit', e);
        this.giphyAPICall(this.state.userInput);
    }



    giphyAPICall = (query) => {
        axios({
            url: 'https://api.giphy.com/v1/gifs/search',
            method: 'GET',
            responseType: 'json',
            params: {
                api_key: 'AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa',
                q: query,
                limit: 50,
                rating: 'g',
            }
        }).then((apiResponse) => {
           // console.log(apiResponse.data.data.length);

            if (apiResponse.data.data.length === 0) {
                const errorMsg = [{
                    id: '123ABC',
                    images: {
                        downsized_large: {
                            url: 'https://media1.giphy.com/media/gfO3FcnL8ZK9wVgr6t/giphy.gif?…0f423ee6unrij1gzkfdf27jyfmh9v3oxbgftbq88ajrpq0&rid=giphy.gif'
                        }
                    }
                }]

                this.setState({
                    displayedGifs: errorMsg
                })

            } else {
                console.log(apiResponse.data.data);
                this.setState({
                    displayedGifs: apiResponse.data.data,
                })
            }
        })
    }


    giphyTrendingAPICall = () => {
        axios({
            url: 'https://api.giphy.com/v1/gifs/trending',
            method: 'GET',
            responseType: 'json',
            params: {
                api_key: 'AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa',
                limit: 12,
                rating: 'g'
            }
        }).then((apiResponse) => {
            this.setState({
                displayedGifs: apiResponse.data.data
            })
        })
    }

    passUrl = (e) => {
        console.log(e.target.src);

        this.setState({
            gifUrl:e.target.src,
            gifUrl:e.target.alt
        })
    
        console.log(this.state.gifUrl, this.state.gifAlt);
    }


    render() {
        return ( 
            <Fragment>
                <section>
                    <form onSubmit={this.handleSubmit} className="flexbox">
                        <label htmlFor="userGifSearch" className="srOnly">Search for Gif:</label>
                        <input
                            type="text"
                            id="userGifSearch"
                            name="userGifSearch"
                            placeholder="Search Gifs"
                            required
                            onChange={this.handleInputChange}
                        />
                        <button>Find Gif</button>
                    </form>

                    <ul className="gifs flexbox" id="displayedGifsId">
                        {
                            this.state.displayedGifs.map((trendingGif) => {
                                return (
                                    <li className="gifContainer" key={trendingGif.id} onClick={this.passUrl}>
                                        <img src={trendingGif.images.downsized_large.url} alt={trendingGif.title} />
                                    </li>
                                )
                            })
                        }
                    </ul>
                </section>
                

            </Fragment>
        )
    }
}

export default SearchGifs;
