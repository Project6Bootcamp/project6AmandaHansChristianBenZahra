import MemeVotes from "./MemeVotes";

const UserMeme = ({ topText, bottomText, tags, image, alt }) => {
  let memeTags = `${tags}`.replace(/[^a-zA-Z ]/g, " ");
  let memeAlt = `${alt}`.replace(/[^a-zA-Z ]/g, " ");
  let memetopText = `${topText}`.replace(/[^a-zA-Z ]/g, " ");
  let memebottomText = `${bottomText}`.replace(/[^a-zA-Z ]/g, " ");

  return (
    <li className={`eachMemeStyleContainer ${memeTags} ${memeAlt} ${memetopText} ${memebottomText}`}>
      <div>
        <p>{topText}</p>
        <img src={image} alt={memeAlt} />
        <p>{bottomText}</p>
        {/* <p>{tags}</p> */}
      </div>
      <MemeVotes />
    </li>
  );
};

export default UserMeme;
