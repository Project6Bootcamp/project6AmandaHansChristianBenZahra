import MemeVotes from "./MemeVotes";

const UserMeme = ({ topText, bottomText, tags, image, alt }) => {
  let memeTags = `${tags}`.replace(/[^a-zA-Z ]/g, " ");
  let memeAlt = `${alt}`.replace(/[^a-zA-Z ]/g, " ");
  return (
    <li className={`eachMemeStyleContainer ${memeTags} ${memeAlt}`}>
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
