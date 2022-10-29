const numbers = {
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
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            result: '0'
        }
    }

    clear = () => {
        this.setState({ result: '0' });
    }

    inputNumber = (event) => {
        if (typeof this.state.result == 'number') this.clear();
        this.setState(prevState => ({ result: (prevState.result == '0' ? '' : prevState.result) + event.target.value }));
    }

    inputOperator = (event) => {
        const val = event.target.value;
        const isReplaceable = ['+', '-', '*', '/'].includes(this.state.result.toString().slice(-1)) && val != '-';
        this.setState(prevState => ({ result: (isReplaceable ? prevState.result.replace(/[\+\-\*\/]*$/, '') : prevState.result) + val }));
    }

    calculate = () => {
        this.setState(prevState => ({ result: eval(prevState.result) }))
    }

    appendDecimal = () => {
        if (typeof this.state.result == 'number') this.clear();
        this.setState(prevState => ({
            result: ['+', '-', '*', '/'].includes(prevState.result.slice(-1)) ? prevState.result + '0.'
                : prevState.result.split(/[\+\-\*\/]/g).at(-1).includes('.') ? prevState.result : prevState.result + '.'
        }))
    }

    render() {
        const numbersJSX = Object.keys(numbers).map(n => <Digit num={n} key={n} handleClick={this.inputNumber} />)
        return <div id="calc">
            <div id="display"><p>{this.state.result}</p></div>
            {numbersJSX}
            <button id="equals" onClick={this.calculate}>=</button>
            <button id="add" value='+' onClick={this.inputOperator}>+</button>
            <button id="subtract" value='-' onClick={this.inputOperator}>-</button>
            <button id="multiply" value='*' onClick={this.inputOperator}>×</button>
            <button id="divide" value='/' onClick={this.inputOperator}>÷</button>
            <button id="decimal" onClick={this.appendDecimal}>.</button>
            <button id="clear" onClick={this.clear}>C</button>
        </div>;
    }
}

function Digit(props) {
    return (
        <button id={numbers[props.num]} className='num' value={props.num} onClick={props.handleClick} >
            {props.num}
        </button>
    )
}

ReactDOM.render(<App />, document.querySelector('main'))