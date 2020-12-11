import { Component, Fragment } from "react";
import Header from "./Header";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (

      <div className="fillScreen">
        <Header headerText="Meme in a Giffy" subheaderText="" />


        <div className="fixHeaderText">
          <Header headerText="Meme in a Giffy" subheaderText="" />
        </div>

        <main >

          <Link to={"/search"}>
            <button className="glow-on-hover homeButton" type="button">
              Search Memes!
          </button>
          </Link>

          <Link to={"/memecreator"}>
            <button className="glow-on-hover homeButton" type="button">
              Create Memes!
          </button>
          </Link>

        </main>
   
      </div>
    );
  }
}

export default Home;
