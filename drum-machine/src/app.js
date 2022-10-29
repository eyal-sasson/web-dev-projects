const pads = {
    'Q': {
        name: 'Heater 1',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
    },
    'W': {
        name: 'Heater 2',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
    },
    'E': {
        name: 'Heater 3',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
    },
    'A': {
        name: 'Heater 4',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
    },
    'S': {
        name: 'Clap',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
    },
    'D': {
        name: 'Open HH',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
    },
    'Z': {
        name: 'Kick n\' Hat',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
    },
    'X': {
        name: 'Kick',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
    },
    'C': {
        name: 'Closed HH',
        audio: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPad: ''
        }
    }

    handleClick = (event) => {
        event.target.firstChild.play();
        this.updateDisplay(pads[event.target.innerText].name);
    }

    updateDisplay(name) {
        this.setState({ currentPad: name })
    }

    render() {
        const padsJSX = Object.keys(pads).map(key => <Pad pad={key} onClick={this.handleClick} updateDisplay={this.updateDisplay} />)
        return (
            <div id="drum-machine">
                {padsJSX}
                <div id="display">{this.state.currentPad}</div>
            </div>
        );
    }
}

class Pad extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleKey);
    }

    handleKey = (event) => {
        const key = event.key.toUpperCase();
        if (key == this.props.pad) {
            ReactDOM.findDOMNode(this).click()
        }
    }

    render() {
        const id = pads[this.props.pad].name.replace(/\s/g, '-');
        const audio = pads[this.props.pad].audio;
        return (
            <div className="drum-pad" id={id} onClick={this.props.onClick}>
                <audio src={audio} className="clip" id={this.props.pad} />
                {this.props.pad}
            </div>
        )
    }
}


ReactDOM.render(<App />, document.body)