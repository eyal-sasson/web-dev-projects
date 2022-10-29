var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

marked.setOptions({
    breaks: true
});

var placeholder = "\n# Markdown previewer\n## It has some cool features:\nMost simply, **bolded text**!\nIt can have [links](https://www.freecodecamp.org/eyals).\nAs well as `inline code`.\nCode blocks are also supported:\n```\nconst text = marked(this.state.input);\n```\n* Lists\n* can\n* also\n* be\n    * inserted\n\n> Blockquotes too!\n\nAnd of course, images: \n\n![This is an alt text](https://images.unsplash.com/photo-1615807713086-bfc4975801d0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=200&q=80)\n";

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        _this.handleChange = function (event) {
            event.preventDefault();
            _this.setState({ input: event.target.value });
        };

        _this.state = {
            input: placeholder
        };
        return _this;
    }

    _createClass(App, [{
        key: "render",
        value: function render() {
            var textMd = marked(this.state.input);
            return React.createElement(
                "main",
                null,
                React.createElement(
                    "div",
                    { id: "editorSection" },
                    React.createElement(
                        "div",
                        { className: "bar" },
                        React.createElement(
                            "h1",
                            null,
                            "Editor"
                        )
                    ),
                    React.createElement("textarea", { id: "editor", onChange: this.handleChange, value: this.state.input })
                ),
                React.createElement(
                    "div",
                    { id: "previewSection" },
                    React.createElement(
                        "div",
                        { className: "bar" },
                        React.createElement(
                            "h1",
                            null,
                            "Preview"
                        ),
                        " "
                    ),
                    React.createElement("div", { id: "preview", dangerouslySetInnerHTML: { __html: textMd } })
                )
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.querySelector('body'));