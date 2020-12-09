import firebase from '../firebase.js';
import { Component } from 'react';

class Create extends Component {

    componentDidMount() {

        firebase.database().ref();
    }

    render() { 
        return (
            <form>

                <label htmlFor="topText">Top Text</label>
                <input type="text" id="topText" required />

                <label htmlFor="bottomText">Bottom Text</label>
                <input type="text" id="bottomText" required />

                <label htmlFor="tag">Tag</label>
                <input type="text" id="tag" required />

                <input id="date" name="date" className="srOnly"></input>

                <button id="submit" type="submit" onClick={(event) => {
                        event.preventDefault();

                        const time = document.getElementById('date').value = Date();
                        const inputObject = {
                            topText: "Top Text",
                            bottomText: "Bottom Text",
                            tags: ["cat", "happy"],
                            image: "url",
                            date: time
                        };

                        const dbRef = firebase.database().ref();
                        dbRef.push(inputObject);

                }}>Submit</button>
                
            </form>
        )
    }
}

export default Create;