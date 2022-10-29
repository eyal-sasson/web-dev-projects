var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var pads = {
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
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleClick = function (event) {
            event.target.firstChild.play();
            _this.updateDisplay(pads[event.target.innerText].name);
        };

        _this.state = {
            currentPad: ''
        };
        return _this;
    }

    _createClass(App, [{
        key: 'updateDisplay',
        value: function updateDisplay(name) {
            this.setState({ currentPad: name });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var padsJSX = Object.keys(pads).map(function (key) {
                return React.createElement(Pad, { pad: key, onClick: _this2.handleClick, updateDisplay: _this2.updateDisplay });
            });
            return React.createElement(
                'div',
                { id: 'drum-machine' },
                padsJSX,
                React.createElement(
                    'div',
                    { id: 'display' },
                    this.state.currentPad
                )
            );
        }
    }]);

    return App;
}(React.Component);

var Pad = function (_React$Component2) {
    _inherits(Pad, _React$Component2);

    function Pad(props) {
        _classCallCheck(this, Pad);

        var _this3 = _possibleConstructorReturn(this, (Pad.__proto__ || Object.getPrototypeOf(Pad)).call(this, props));

        _this3.handleKey = function (event) {
            var key = event.key.toUpperCase();
            if (key == _this3.props.pad) {
                ReactDOM.findDOMNode(_this3).click();
            }
        };

        _this3.state = {};
        return _this3;
    }

    _createClass(Pad, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            document.addEventListener('keydown', this.handleKey);
        }
    }, {
        key: 'render',
        value: function render() {
            var id = pads[this.props.pad].name.replace(/\s/g, '-');
            var audio = pads[this.props.pad].audio;
            return React.createElement(
                'div',
                { className: 'drum-pad', id: id, onClick: this.props.onClick },
                React.createElement('audio', { src: audio, className: 'clip', id: this.props.pad }),
                this.props.pad
            );
        }
    }]);

    return Pad;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.body);