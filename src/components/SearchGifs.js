// importing npm installs
import { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

// importing created pages & styles
import MemeCreator from './MemeCreator.js';
import Header from './Header.js';
import '../styles/App.scss';


class SearchGifs extends Component {
    constructor() {
        super();
        this.state = {
            userInput: '',
            displayedGifs: [],
            gifUrl: [],
            gifAlt: [],
        }   
    }

    // On mount, run axios (api call) function to display all the currently trending Gifs
    componentDidMount() {
        this.giphyTrendingAPICall();
    }

    // When search field (Search Gifs Field) is being used, update state to record string value
    handleInputChange = (e) => {
        this.setState({
            userInput: e.target.value
        })
    }

    // When user submits search query by pressing button (Find Gif Button), run axios (giphyAPICall) function that takes the userInput value from the search field and uses it in the api query field
    handleSubmit = (e) => {
        e.preventDefault();
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
                rating: 'g'
            }
        }).then((apiResponse) => {

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
        this.setState({
            gifUrl: e.target.src,
            gifAlt: e.target.alt
        })
        document.getElementById('createMemeSection').style.display = 'flex';
        document.getElementById("selectedGif").style.display = 'flex';
        document.getElementById("createMemeForm").style.display =  'flex';
        document.getElementById('displayedGifsId').style.marginTop = 0;
        document.getElementById('root').style.backgroundColor = 'rgba(1, 1, 1, 0.9)';
        document.getElementById('searchGifId').style.display = 'none';
        document.getElementById('header').style.display = 'none';
        document.getElementById('postCreationMeme').style.display = 'none';
    }


    render() {
        return (
            <Fragment>
                <Header headerText="Meme in a Giffy" subheaderText="Search for Gifs to create your very own meme!" />

                <section className="wrapper" id="wrapper">
                 
                    <div className="flexboxSearchGifs" id="searchGifId" >
                    <form onSubmit={this.handleSubmit} className="flexbox searchGifForm" >

                        <label htmlFor="userGifSearch" className="srOnly">Search for Gif:</label>
                        <input
                            type="text"
                            id="userGifSearch"
                            name="userGifSearch"
                            placeholder="Search Gifs"
                            required
                            onChange={this.handleInputChange}
                        />
                        <button >Find Gif</button>


                    </form>
                    <div className="viewMemesButtonContainer">
                            <Link to={"/search"}>
                                <button className="glow-on-hover" type="button">View Created Memes</button>
                            </Link>
                    </div>

                 </div>


                    <div>          
                        <MemeCreator 
                            gifUrlProps={this.state.gifUrl}
                            gifAltProps={this.state.gifAlt}
                        />

                    </div>

                    <ul className="gifs flexbox" id="displayedGifsId">
                        {
                            this.state.displayedGifs.map((eachGif) => {
                                // Conditional statement to check the id of the gif - if id of gif matches id for 'no results found' then return some additional text, else display all gifs with matching query
                                if (eachGif.id === '123ABC') {
                                    return (
                                        <li className="gifContainer noPointer" key={eachGif.id} >
                                            <p className="noGifFoundText">Sorry No GIFs found, search again!</p>
                                            <img src={eachGif.images.downsized_large.url} alt={eachGif.title}/>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="gifContainer normalPointer" key={eachGif.id} >
                                            <img className="gifs" src={eachGif.images.downsized_large.url} alt={eachGif.title} onClick={this.passUrl} />
                                        </li>
                                    )
                                }
  
                            })
                        }
                    </ul>

                </section>
                
            </Fragment>
        )
    }
}

export default SearchGifs;
