import { Component } from 'react';
import firebase from '../firebase.js';

class MemeCreator extends Component{
    constructor(){
        super();
        this.state = {
            userMemes:'',
            topText: '',
            bottomText: ''
        }
    }

    userGeneratedMemes = (e) =>{
        e.preventDefault();

        const dbRef = firebase.database().ref();

        const time = document.getElementById('date').value = Date();

        const userTagsInput = this.tags.value;
        const userMemeTags = userTagsInput.split(/[\s,]+/)
        const userMeme = {
            memeImage:this.props.gifUrlProps,
            memeAltText:this.props.gifAltProps,
            memeDate:time,
            memeTop:this.topText.value,
            memeBottomText:this.bottomText.value,
            memeTags:userMemeTags
        }

        this.topText.value = ''
        this.bottomText.value = ''
        this.tags.value = ''

        dbRef.push(userMeme);

        this.setState({
            userMemes:userMeme,
        })
    }


    render(){
        return(
            <div className="createMemeSection" id="createMemeSection">
                <div className="gifAndForm">
                    <div className="selectedGif">
                        <img src={this.props.gifUrlProps} alt={this.props.gifAltProps}/>
                    </div>

                    <form action="" onSubmit={this.userGeneratedMemes} className="createMemeForm">

                        {/* <input className="srOnly" id="date" name="date" className="hiddenDate"></input> */}

                        <div>
                            <label htmlFor="topText">Top Text</label>
                            <input type="text" id="topText" required placeholder="Top Text" ref={top => this.topText = top} />
                        </div>

                        <div>
                            <label htmlFor="bottomText">Bottom Text</label>
                            <input type="text" id="bottomText" required placeholder="Bottom Text" ref={bottom => this.bottomText = bottom} />
                        </div>

                        <div>
                            <label htmlFor="tags">Tags</label>
                            <input type="text" id="tags" required placeholder="Tags" ref={tags => this.tags = tags} />
                        </div>

                        <input type="submit" className="submit" value="Submit!"></input>
                    </form>

                </div>

            </div>
        )
    }
}

export default MemeCreator;