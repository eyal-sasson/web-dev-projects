var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var numbers = {
    0: "zero",
    1: "one",
    2: "two",
    3: "three",
    4: "four",
    5: "five",
    6: "six",
    7: "seven",
    8: "eight",
    9: "nine"
};

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.clear = function () {
            _this.setState({ result: '0' });
        };

        _this.inputNumber = function (event) {
            if (typeof _this.state.result == 'number') _this.clear();
            _this.setState(function (prevState) {
                return { result: (prevState.result == '0' ? '' : prevState.result) + event.target.value };
            });
        };

        _this.inputOperator = function (event) {
            var val = event.target.value;
            var isReplaceable = ['+', '-', '*', '/'].includes(_this.state.result.toString().slice(-1)) && val != '-';
            _this.setState(function (prevState) {
                return { result: (isReplaceable ? prevState.result.replace(/[\+\-\*\/]*$/, '') : prevState.result) + val };
            });
        };

        _this.calculate = function () {
            _this.setState(function (prevState) {
                return { result: eval(prevState.result) };
            });
        };

        _this.appendDecimal = function () {
            if (typeof _this.state.result == 'number') _this.clear();
            _this.setState(function (prevState) {
                return {
                    result: ['+', '-', '*', '/'].includes(prevState.result.slice(-1)) ? prevState.result + '0.' : prevState.result.split(/[\+\-\*\/]/g).at(-1).includes('.') ? prevState.result : prevState.result + '.'
                };
            });
        };

        _this.state = {
            result: '0'
        };
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var _this2 = this;

            var numbersJSX = Object.keys(numbers).map(function (n) {
                return React.createElement(Digit, { num: n, key: n, handleClick: _this2.inputNumber });
            });
            return React.createElement(
                "div",
                { id: "calc" },
                React.createElement(
                    "div",
                    { id: "display" },
                    React.createElement(
                        "p",
                        null,
                        this.state.result
                    )
                ),
                numbersJSX,
                React.createElement(
                    "button",
                    { id: "equals", onClick: this.calculate },
                    "="
                ),
                React.createElement(
                    "button",
                    { id: "add", value: "+", onClick: this.inputOperator },
                    "+"
                ),
                React.createElement(
                    "button",
                    { id: "subtract", value: "-", onClick: this.inputOperator },
                    "-"
                ),
                React.createElement(
                    "button",
                    { id: "multiply", value: "*", onClick: this.inputOperator },
                    "\xD7"
                ),
                React.createElement(
                    "button",
                    { id: "divide", value: "/", onClick: this.inputOperator },
                    "\xF7"
                ),
                React.createElement(
                    "button",
                    { id: "decimal", onClick: this.appendDecimal },
                    "."
                ),
                React.createElement(
                    "button",
                    { id: "clear", onClick: this.clear },
                    "C"
                )
            );
        }
    }]);

    return App;
}(React.Component);

function Digit(props) {
    return React.createElement(
        "button",
        { id: numbers[props.num], className: "num", value: props.num, onClick: props.handleClick },
        props.num
    );
}

ReactDOM.render(React.createElement(App, null), document.querySelector('main'));