import { Component, Fragment } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <Fragment>
        <Header headerText="Meme in a Giffy" subheaderText="" />

        <Link to={"/search"}>
          <button className="glow-on-hover" type="button">
            Search Memes!
          </button>
        </Link>

        <Link to={"/memecreator"}>
          <button className="glow-on-hover" type="button">
            Create Memes!
          </button>
        </Link>
      </Fragment>
    );
  }
}

export default Home;
