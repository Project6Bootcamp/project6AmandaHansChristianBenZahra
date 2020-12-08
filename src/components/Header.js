import { Component } from 'react';

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
            <header>
                <h1>Yes, you are definitely at the main page!</h1>
                {/* <h1>{this.props.headerText}</h1>
                <h2>{this.props.subheaderText}</h2> */}
            </header>
        )
    }
}

export default Header;
