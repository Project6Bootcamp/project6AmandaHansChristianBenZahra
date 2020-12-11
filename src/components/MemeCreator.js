
import { Component } from 'react';
import { Link } from "react-router-dom";
import firebase from '../firebase.js';

class MemeCreator extends Component{
    constructor(){
        super();
        this.state = {
            userMemes:'',
            userTopText: '',
            userBottomText: '',
            likes: 0,
            dislikes: 0,
            total: 0
        }
    }

    // What gets added to the top of the image by the user
    handleInputChangeTopText = (e) => {
        this.setState({
            userTopText: e.target.value
        })
    }

    // What gets added to the bottom of the image by the user
    handleInputChangeBottomText = (e) => {
        this.setState({
            userBottomText: e.target.value
        })
    }

    userGeneratedMemes = (e) =>{
        e.preventDefault();

        const dbRef = firebase.database().ref();

        const time = document.getElementById('date').value = Date();

        const userTagsInput = this.tags.value;
        const userMemeTags = userTagsInput.split(/[\s,]+/);

        // The data that gets pushed to the firebase database
        const userMeme = {
            memeImage:this.props.gifUrlProps,
            memeAltText:this.props.gifAltProps,
            memeDate:time,
            memeTopText:this.topText.value,
            memeBottomText:this.bottomText.value,
            memeTags:userMemeTags,
            memeLikes:this.state.likes,
            memeDislikes: this.state.dislikes, 
            memeTotalVotes:this.state.total,
        }

        this.topText.value = ''
        this.bottomText.value = ''
        this.tags.value = ''

        dbRef.push(userMeme);

        this.setState({
            userMemes:userMeme,
        })

        // clear the elements associated with the create meme page and display the button allowing user to view created meme
        // fires when user submits their created meme
        document.getElementById("selectedGif").style.display = "none";
        document.getElementById("createMemeForm").style.display = "none";
        document.getElementById('displayedGifsId').style.marginTop = '20px';
        document.getElementById('searchGifId').style.display = 'flex';
        document.getElementById('postCreationMeme').style.display = 'flex';
    }

    // function to hide the create meme section. function fires when user selects anywhere on the screen that is NOT in the create meme section
    hideCreateMemeSection = (e) => {
        if (e.target.id === "createMemeSection") {
            this.closeMemeSection();
        }
    }

    // function that runs to hide everything create meme related, and show everything that's relevant to the search gif page, fires when user selects the X button
    closeMemeSection = () => {
        document.getElementById("createMemeSection").style.display = "none";
        document.getElementById('header').style.display = 'block';
        document.getElementById('displayedGifsId').style.marginTop = '20px';
        document.getElementById('searchGifId').style.display = 'flex';
    }

    clearMemeForm = () =>{
        document.getElementById("selectedGif").style.display = "none";
        document.getElementById("createMemeForm").style.display = "none";
        document.getElementById('displayedGifsId').style.marginTop = '20px';
        document.getElementById('searchGifId').style.display = 'flex';
        document.getElementById('postCreationMeme').style.display = 'block';
    }

    render(){
        return(

            <div className="createMemeSection" id="createMemeSection" onClick={this.hideCreateMemeSection}>

                <div className="wrapperCreateMemePage">
                    <div className="buttonContainer">
                        <button className="closeMemeButton" onClick={this.closeMemeSection}>X</button>
                    </div>

                    <div className="gifAndForm" id="gifAndForm">

                        <div className="selectedGif" id="selectedGif">
                            <h5 className="memeText memeTextTop">{this.state.userTopText}</h5>
                            <img src={this.props.gifUrlProps} alt={this.props.gifAltProps} />
                            <h5 className="memeText memeTextBottom">{this.state.userBottomText}</h5>
                        </div>

                        {/* post creation screen - gets displayed after user submits meme */}
                        <div className="postCreationMeme" id="postCreationMeme">
                            <p className="creatingMemeText">⚙Creating Your Meme Now⚙</p>
                            <Link to={"/search"}>                         
                                <button className="glow-on-hover searchGifButton" type="button">
                                    View your Meme!
                                </button>
                            </Link>
                        </div>

                        <form action="" onSubmit={this.userGeneratedMemes}                      
                        className="createMemeForm" id="createMemeForm">

                            <input className="srOnly" id="date" name="date" className="hiddenDate"></input>

                            <label htmlFor="topText">Top Text</label>
                            <input type="text" id="topText" className="userInput" required placeholder="Top Text" maxLength="30" ref={top => this.topText = top} onChange={this.handleInputChangeTopText}/>

                            <label htmlFor="bottomText">Bottom Text</label>
                            <input type="text" id="bottomText" className="userInput" required placeholder="Bottom Text" maxLength="30" ref={bottom => this.bottomText = bottom} onChange={this.handleInputChangeBottomText}/>

                            <label htmlFor="tags">Tags</label>
                            <input type="text" id="tags" className="userInput" required placeholder="Separate tags by commas or spaces" ref={tags => this.tags = tags} />

                            <input type="submit" className="submit" value="Submit!" ></input>
                        </form>

                    </div>

                </div>

            </div>
        );
    }
}

export default MemeCreator;
