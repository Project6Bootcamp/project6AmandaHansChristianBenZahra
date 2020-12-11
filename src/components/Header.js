import { Component } from "react";

class Header extends Component {
  constructor() {
    super();
    this.state = {
      headerText: "",
      subheaderText: "",
    };
  }

  render() {
    return (
      <header id='header'>

        <div className='container projects'><h1>{this.props.headerText}</h1>

          <div className="overlay"></div>
        </div>


        <h2>{this.props.subheaderText}</h2>
      </header>
    );
  }
}

export default Header;
