const Search = () => {
  return (
    <form className="flexbox" id="memeSearchBar">
      <label htmlFor="memeSearch" className="srOnly">
        Search for Gif:
      </label>
      <input
        type="text"
        id="memeSearch"
        name="userGifSearch"
        placeholder="Search Memes"
        required
        onChange={}
      />
      <button>Find Meme</button>
    </form>
  );
};

export default Search;
