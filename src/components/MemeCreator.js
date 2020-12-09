import { Component } from 'react';
import firebase from '../firebase.js';

class MemeCreator extends Component{
    constructor(){
        super();
        this.state = {
            userMemes:'',
        }
    }

    userGeneratedMemes = (e) =>{
        e.preventDefault();

        const dbRef = firebase.database().ref();

        const time = document.getElementById('date').value = Date();

        const userTagsInput = this.tags.value;
        const userMemeTags = userTagsInput.split(/[\s,]+/)
        const userMeme = {
            memeDate:time,
            memeTop:this.topText.value,
            memeBot:this.bottomText.value,
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
            <div>
                <form action="" onSubmit={this.userGeneratedMemes}>

                    {/* <img src={} alt={} /> */}

                    <input id="date" name="date" className="hiddenDate"></input>

                    <div>
                        <label htmlFor="topText" className="srOnly">Top Text</label>
                        <input type="text" id="topText" required="true" placeholder="Top Text" ref={top => this.topText = top}/>
                    </div>

                    <div>
                        <label htmlFor="bottomText" className="srOnly">Bottom Text</label>
                        <input type="text" id="bottomText" required="true" placeholder="Bottom Text" ref={bottom => this.bottomText = bottom}/>
                    </div>

                    <div>
                        <label htmlFor="tags" className="srOnly">Tags</label>
                        <input type="text" id="tags" required="true" placeholder="Tags" ref={tags => this.tags = tags}/>
                    </div>

                    <input type="submit" className="submit" value="Submit Entry!"></input>
                </form>
            </div>
        )
    }
}

export default MemeCreator;