import React from 'react';
import Button from '../Button/Button';
import Screen from '../Screen/Screen';
import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screenValue: '',
            prevNumber: null,
            expression: []
        }

        this.handleNumber = this.handleNumber.bind(this);
    }

    handleNumber(buttonValue) {

        if (isNaN(this.state.screenValue) && !isNaN(buttonValue)) {
            this.setState({screenValue: buttonValue});
        }

        if (this.state.prevNumber === null || !isNaN(this.state.prevNumber) || this.state.prevNumber === '.' ) {
            this.setState({screenValue: `${this.state.screenValue}${buttonValue}`});
        }
        this.setState({prevNumber: buttonValue});
        this.setState({expression: this.state.expression.concat(buttonValue)});

    }

    handleOperation(buttonValue) {

        switch (buttonValue) {
            case '*':
                this.setState({screenValue: '×', prevNumber: '*'});
            break;
            case '/':
                this.setState({screenValue: '÷', prevNumber: '÷'});
            break;
            default: {
                this.setState({screenValue: buttonValue, prevNumber: buttonValue});
            }
        }

        this.setState({expression: this.state.expression.concat(buttonValue)});

    }

    clearExpression() {
        this.setState({screenValue: ''});
        this.setState({prevNumber: null});
        this.setState({expression: []});
    }

    calculateExpression() {
        // The easy way to do it
        let answer = eval(this.state.expression.join(''));
        this.setState({screenValue: answer});
    }
 
    render() {

        return (
            <div className='container'>
                <div className='calculator-container'>
                    <div className='calculator'>
                        <Screen display={this.state.screenValue} />
                        <div className='calculator-grid'> 
                            <Button display='AC' onClick={() => this.clearExpression()} />
                            <Button display='+/-' />
                            <Button display='%' onClick={() => this.handleOperation('%')} />
                            <Button display='÷' onClick={() => this.handleOperation('/')} />
                            <Button display='7' onClick={() => this.handleNumber('7')} />
                            <Button display='8' onClick={() => this.handleNumber('8')} />
                            <Button display='9' onClick={() => this.handleNumber('9')} />
                            <Button display='×' onClick={() => this.handleOperation('*')} />
                            <Button display='4' onClick={() => this.handleNumber('4')} />
                            <Button display='5' onClick={() => this.handleNumber('5')} />
                            <Button display='6' onClick={() => this.handleNumber('6')} />
                            <Button display='-' onClick={() => this.handleOperation('-')} />
                            <Button display='1' onClick={() => this.handleNumber('1')} />
                            <Button display='2' onClick={() => this.handleNumber('2')} />
                            <Button display='3' onClick={() => this.handleNumber('3')} />
                            <Button display='+' onClick={() => this.handleOperation('+')} />
                            <Button display='0' onClick={() => this.handleNumber('0')} />
                            <Button display='.' onClick={() => this.handleNumber('.')} />
                            <Button display='=' onClick={() => this.calculateExpression()} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;