import MemeVotes from './MemeVotes'

const UserMeme= ({ topText, bottomText, tags, image, alt})=> {
    return (
        <li className="eachMemeStyleContainer">  
            <div>
                <p>{topText}</p>
                <img src={image} alt={alt}/>
                <p>{bottomText}</p>
                {/* <p>{tags}</p> */}
            </div>       
            <MemeVotes />
        </li>
        )
}

export default UserMeme;
