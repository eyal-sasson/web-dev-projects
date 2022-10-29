marked.setOptions({
    breaks: true
});

const placeholder = `
# Markdown previewer
## It has some cool features:
Most simply, **bolded text**!
It can have [links](https://www.freecodecamp.org/eyals).
As well as \`inline code\`.
Code blocks are also supported:
\`\`\`
const text = marked(this.state.input);
\`\`\`
* Lists
* can
* also
* be
    * inserted

> Blockquotes too!

And of course, images: 

![This is an alt text](https://images.unsplash.com/photo-1615807713086-bfc4975801d0?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y2F0JTIwZmFjZXxlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=200&q=80)
`

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            input: placeholder
        }
    }

    handleChange = (event) => {
        event.preventDefault();
        this.setState({ input: event.target.value });
    }

    render() {
        const textMd = marked(this.state.input);
        return (
            <main>
                <div id="editorSection">
                    <div className="bar"><h1>Editor</h1></div>
                    <textarea id="editor" onChange={this.handleChange} value={this.state.input} />
                </div>
                <div id="previewSection">
                    <div className="bar"><h1>Preview</h1> </div>
                    <div id="preview" dangerouslySetInnerHTML={{ __html: textMd }} />
                </div>
            </main>
        )
    }
}

ReactDOM.render(<App />, document.querySelector('body'))