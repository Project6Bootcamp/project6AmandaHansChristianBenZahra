import { Component } from 'react';

class memeCreator extends Component{
    render(){
        return(
            <div>
                <form action="">
                    <div>
                        <label htmlFor="topText">Top Text</label>
                        <input type="text" id="topText"/>
                    </div>

                    <div>
                        <label htmlFor="bottomText">Bottom Text</label>
                        <input type="text" id="bottomText"/>
                    </div>

                    <div>
                        <label htmlFor="tags">Tags</label>
                        <input type="text" id="tags"/>
                    </div>

                    <div>
                        <submit>Create Meme!</submit>
                    </div>
                </form>
            </div>
        )
    }
}

export default memeCreator;