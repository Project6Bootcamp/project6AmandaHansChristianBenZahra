// SearchGifs Class Component
// Functionality: This component is used to get the results from a Giphy API call and allow the user to create a meme using one of the returned gifs.

// importing npm installs
import { Component, Fragment } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";
// importing created pages & styles
import MemeCreator from "./MemeCreator.js";
import Header from "./Header.js";
import "../styles/App.scss";

class SearchGifs extends Component {
    constructor() {
        super();
        this.state = {
            userInput: "",
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

    // api call to GIPHY that gets returns based off of a user search query (the userInput state), this api function gets fired off of the user submitting their search 
    giphyAPICall = (query) => {
        axios({
            url: "https://api.giphy.com/v1/gifs/search",
            method: "GET",
            responseType: "json",
            params: {
                api_key: "AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa",
                q: query,
                limit: 50,
                rating: "g"
            }
        }).then((apiResponse) => {
            // conditional statement to handle error of no gifs being found from query. errorMsgGifObj is a array of objects in the same structure as the return from the api call, creating this structure replica allows the map function in the render lifecycle to iterate with no problems
            if (apiResponse.data.data.length === 0) {
                const errorMsgGifObj = [{
                    id: "123ABC",
                    images: {
                        downsized_large: {
                            url: "https://media1.giphy.com/media/gfO3FcnL8ZK9wVgr6t/giphy.gif?…0f423ee6unrij1gzkfdf27jyfmh9v3oxbgftbq88ajrpq0&rid=giphy.gif"
                        }
                    }
                }]

                this.setState({
                    displayedGifs: errorMsgGifObj
                })

            // else statement catching results from api call and storing result in the displayed Gifs state
            } else {
                console.log(apiResponse.data.data);
                this.setState({
                    displayedGifs: apiResponse.data.data,
                })
            }
        })
    }
    // end of query based api call


    // api call to GIPHY that returns the top 12 gifs that are trending from Giphy right now
    giphyTrendingAPICall = () => {
        axios({
            url: "https://api.giphy.com/v1/gifs/trending",
            method: "GET",
            responseType: "json",
            params: {
                api_key: "AiDUd8ngqnIcqZ5dXnGV8r4Aymleu4wa",
                limit: 12,
                rating: "g"
            }
        }).then((apiResponse) => {
            // storing result in the displayedGif state
            this.setState({
                displayedGifs: apiResponse.data.data
            })
        })
    }
    // end of trending api call


    // function which passes the url as a state to the MemeCreator component called in the render lifecycle. function also hides certain aspects of the page while displaying the create meme modal
    passUrl = (e) => {

        // conditional statement to get the src of the gif regardless of if the user is clicking on the li containing the image or the image itself
        if (e.target.firstChild != null){
            console.log(e.target)
            this.setState({          
                gifUrl: e.target.firstChild.src,
                gifAlt: e.target.firstChild.alt
            })
        } else {
            this.setState({
                gifUrl: e.target.src,
                gifAlt: e.target.alt
            })
        }
        
        // displaying divs containing create meme page
        document.getElementById("createMemeSection").style.display = "flex";
        document.getElementById("selectedGif").style.display = "flex";
        document.getElementById("createMemeForm").style.display =  "flex";
        
        // hiding search and navigation bar when create meme page pops up
        document.getElementById("searchGifId").style.display = "none";
        document.getElementById("header").style.display = "none";
        document.getElementById("postCreationMeme").style.display = "none";
        document.getElementById("displayedGifsId").style.marginTop = 0;
    }


    // render statment loading content onto the page.
    render() {
        return (
            <Fragment>
                <Header headerText="Meme in a Giffy" subheaderText="Search for Gifs to create your very own meme!" />

                {/* Calling the component MemeCreator to allow user to create their own Meme
                - passes component the url and the alt text of the gif  
                    **this is not visible until a user actually clicks a gif */}
                <MemeCreator gifUrlProps={this.state.gifUrl} gifAltProps={this.state.gifAlt}/>

                <section className="wrapper">
                 
                    {/* Div containing the search/navigation bar above displayed gifs */}
                    <div className="flexboxSearchGifs" id="searchGifId">
                        {/* div containing the search feature */}
                        <form onSubmit={this.handleSubmit} className="flexbox searchGifForm">
                            <label htmlFor="userGifSearch" className="srOnly">Search for Gif:</label>
                            <input type="text" id="userGifSearch" name="userGifSearch" placeholder="Search Gifs" onChange={this.handleInputChange} required />
                            <button className="glow-on-hover searchGifButton">Find Gif</button>
                        </form>

                        {/* div containing button to navigate to meme search page */}
                        <div className="viewMemesButtonContainer">
                            <Link to={"/search"}>
                                <button className="glow-on-hover" type="button">View Created Memes</button>
                            </Link>
                        </div>
                    </div>
                
                    {/* Ul containing all gifs */}
                    <ul className="gifs flexbox" id="displayedGifsId">
                        
                        {
                            // mapping over the state containing which is set from axios (api call)
                            this.state.displayedGifs.map((eachGif) => {

                                // Conditional statement for error handling if no results are found after a user searches, adds additional text to the page that the regular render wouldn't display
                                if (eachGif.id === "123ABC") {
                                    return (
                                        <li className="gifContainer noPointer" key={eachGif.id}>
                                            <p className="noGifFoundText">Sorry No GIFs found, search again!</p>
                                            <img src={eachGif.images.downsized_large.url} alt={eachGif.title}/>
                                        </li>
                                    )
                                } else {
                                    return (
                                        <li className="gifContainer normalPointer" key={eachGif.id} onClick={this.passUrl}>
                                            <img src={eachGif.images.downsized_large.url} alt={eachGif.title}  />
                                        </li>
                                    )
                                }
                            })
                            // end of map statement
                        }

                    </ul>

                </section>
                
            </Fragment>
        )
    }
}

export default SearchGifs;
