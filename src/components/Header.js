import { Component, Fragment } from "react";

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
      <Fragment>
        <header>
          <h1>{this.props.headerText}</h1>
          <h2>{this.props.subheaderText}</h2>
        </header>

        <a className="btn-slice" href="#">
          <div class="top">
            <span>Sliced Button</span>
          </div>
          <div className="bottom">
            <span>Sliced Button</span>
          </div>
        </a>
      </Fragment>
    );
  }
}

export default Header;
