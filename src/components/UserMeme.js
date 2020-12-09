const UserMeme= ({ topText, bottomText, tags, image})=> {
    return (
                <div className="eachMemeStyle">               
                    
                    <p>{topText}</p>
                    <img src={image} />
                    <p>{bottomText}</p>
                    <p>{tags}</p>

                </div>
        )
}

export default UserMeme;
