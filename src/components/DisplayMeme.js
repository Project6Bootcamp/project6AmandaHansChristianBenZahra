import firebase from '../firebase.js';
import { Component } from 'react';
import UserMeme from '../components/UserMeme.js'

class DisplayMeme extends Component {
    constructor() {
        super();
        this.state = {
            ogMemeArray: []
        }
    }
    
    componentDidMount() {

        firebase.database().ref();
        const dbRef = firebase.database().ref();

        dbRef.on('value', (data) => {
            const firebaseDataObj = data.val();

            let memeArray = [];

            // console.log("firebaseDataObj", firebaseDataObj);

            memeArray.push(firebaseDataObj);
            // console.log("memeArray", memeArray);

            for (let propertyKey in firebaseDataObj) {

                
                const formattedObj = {
                    id: propertyKey,
                    topText: firebaseDataObj[propertyKey].topText,
                    bottomText: firebaseDataObj[propertyKey].bottomText,
                    image: firebaseDataObj[propertyKey].image,
                    tags: firebaseDataObj[propertyKey].tags,
                    date: firebaseDataObj[propertyKey].date,

                } 

                memeArray.push(formattedObj)
                // console.log("formattedObj", formattedObj);
                // console.log("memeArray", memeArray);
            }

            console.log("memeArray", memeArray);
            this.setState({
                
                ogMemeArray: memeArray,
            })
            
        })
        
    }

    render() { 

        return (
            <div>
                {this.state.ogMemeArray.map((eachMeme) => {
                    return (

                        <UserMeme 
                            id={eachMeme.propertyKey}
                            topText={eachMeme.topText}
                            bottomText={eachMeme.bottomText}
                            image="https://media1.giphy.com/media/J1AqKD8BLFlDXOY0nZ/giphy.gif"
                            tags={eachMeme.tags}
                        
                        />
                        
                    );
            })}
            </div>
        )

    }
}

export default DisplayMeme;