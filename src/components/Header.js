import { Component, Fragment } from 'react';

class Header extends Component {
    constructor() {
        super();
        this.state = {
            headerText: '',
            subheaderText: ''
        }
    }

    render() {
        return (
            <Fragment>
                <header>
                    <h1>{this.props.headerText}</h1>
                    <h2>{this.props.subheaderText}</h2>
                </header>

                <button className="glow-on-hover" type="button">HOVER ME, THEN CLICK ME!</button>

                <a className="btn-slice" href="#">
                    <div className="top"><span>Sliced Button</span></div>
                    <div className="bottom"><span>Sliced Button</span></div>
                </a>

            </Fragment>
        )
    }
}

export default Header;
