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


            for (let propertyKey in firebaseDataObj) {

                
                const formattedObj = {
                    id: propertyKey,
                    topText: firebaseDataObj[propertyKey].memeTopText,
                    bottomText: firebaseDataObj[propertyKey].memeBottomText,
                    image: firebaseDataObj[propertyKey].memeImage,
                    alt: firebaseDataObj[propertyKey].memeAltText,
                    tags: firebaseDataObj[propertyKey].memeTags,
                    date: firebaseDataObj[propertyKey].memeDate,

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
                <ul className="eachMemeStyle">
                {this.state.ogMemeArray.map((eachMeme) => {
                    return (
                        
                            <UserMeme 
                                id={eachMeme.propertyKey}
                                topText={eachMeme.topText}
                                bottomText={eachMeme.bottomText}
                                image={eachMeme.image}
                                alt={eachMeme.alt}
                                tags={eachMeme.tags}
                            
                            />
                        
                        
                    );
            })}
                </ul>
            </div>
        )

    }
}

export default DisplayMeme;