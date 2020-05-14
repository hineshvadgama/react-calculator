import React from 'react';
import Button from '../Button/Button';
import Screen from '../Screen/Screen';
import './App.css';
import { getNumberBeforeOperation, getNumberAfterOperation, doesCurrentNumberContainDecimal } from './AppUtils.js';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            screenValue: '',
            prevNumber: null,
            expression: []
        }

        this.handleNumber = this.handleNumber.bind(this);
        this.handleOperation = this.handleOperation.bind(this);
        this.handleNegativeSymbol = this.handleNegativeSymbol.bind(this);
        this.clearExpression = this.clearExpression.bind(this);
        this.bidmasCalulator = this.bidmasCalulator.bind(this);
        this.calculateExpression = this.calculateExpression.bind(this);
        this.handlePercentage = this.handlePercentage.bind(this);
    }

    handleNumber(buttonValue) {

        let currentNumberDecimalStatus;

        if (buttonValue === '.') {
            currentNumberDecimalStatus = doesCurrentNumberContainDecimal(this.state.expression);
        }

        if (!currentNumberDecimalStatus) {

            if (isNaN(this.state.screenValue) && !isNaN(buttonValue)) {
                this.setState({screenValue: buttonValue});
            }

            if (this.state.prevNumber === null || !isNaN(this.state.prevNumber) || this.state.prevNumber === '.' ) {
                this.setState({screenValue: `${this.state.screenValue}${buttonValue}`});
            }

            this.setState({prevNumber: buttonValue});
            this.setState({expression: this.state.expression.concat(buttonValue)});

        }

    }

    handleOperation(buttonValue) {

        if (!isNaN(this.state.prevNumber) && this.state.prevNumber !== null) {

            switch (buttonValue) {
                case '*':
                    this.setState({screenValue: '×', prevNumber: '*'});
                break;
                case '/':
                    this.setState({screenValue: '÷', prevNumber: '÷'});
                break;
                default:
                    this.setState({screenValue: buttonValue, prevNumber: buttonValue});
            }

            this.setState({expression: this.state.expression.concat(buttonValue)});

        }

    }

    // Need to think long and hard about handling negative values
    // Especially when you want to do something like 10 - -5 = 
    handleNegativeSymbol(buttonValue) {

        if (this.state.prevNumber === '÷' || this.state.prevNumber === '*' || this.state.prevNumber === '+' ||
        this.state.prevNumber === '-' || this.state.prevNumber === null) {
            
            this.setState({expression: this.state.expression.concat(buttonValue)});
            this.setState({screenValue: buttonValue});

        }
    }

    handlePercentage(buttonValue) {

        // This causes a problem
        // 6*19.2%-3*6

        // We're going to get the current number that the percentage applies to and divide it by 100
        // We'll then add that to the state expression

        if (!isNaN(this.state.prevNumber)) {
            
            this.setState({screenValue: `${this.state.screenValue}${buttonValue}`});
            
            let expressionArrayCopy = this.state.expression;
            let percentageNumber = [];
            let counter = this.state.expression.length - 1;

            while (!isNaN(expressionArrayCopy[counter])) {
                percentageNumber.unshift(this.state.expression[counter]);
                expressionArrayCopy.pop();
                counter--;
            }

            let percentageNumberAsString = percentageNumber.toString();
            percentageNumberAsString = percentageNumberAsString.replace(/,/g, '');
            percentageNumberAsString = percentageNumberAsString / 100;
            percentageNumberAsString = percentageNumberAsString.toString().split('').join(',');
            percentageNumber = percentageNumberAsString.split(',');

            for (let i = 0; i < percentageNumber.length; i++) {
                expressionArrayCopy.push(percentageNumber[i]);
            }

            this.setState({expression: expressionArrayCopy});

        }

    }

    clearExpression() {
        this.setState({screenValue: ''});
        this.setState({prevNumber: null});
        this.setState({expression: []});
    }

    calculateExpression() {
        let stateExpressionAsString = this.state.expression.toString();
        stateExpressionAsString = stateExpressionAsString.replace(/,/g, '');

        const divisionCheck = stateExpressionAsString.match(/[/]/g);
        if (divisionCheck !== null) {
            const numberOfDivisions = divisionCheck.length;
            this.bidmasCalulator('/', numberOfDivisions);
        }

        const multiplicationCheck = stateExpressionAsString.match(/[*]/g);
        if (multiplicationCheck !== null) {
            const numberOfMultiplications = multiplicationCheck.length;
            this.bidmasCalulator('*', numberOfMultiplications);
        }

        const additionCheck = stateExpressionAsString.match(/[+]/g);
        if (additionCheck !== null) {
            const numberOfAdditions = additionCheck.length;
            this.bidmasCalulator('+', numberOfAdditions);
        }

        const subtractionCheck = stateExpressionAsString.match(/[-]/g);
        if (subtractionCheck !== null) {
            const numberOfSubtractions = subtractionCheck.length;
            this.bidmasCalulator('-', numberOfSubtractions);
        }
    
        this.setState({screenValue: this.state.expression});
    }

    bidmasCalulator(operation, noOfOperations) {
        let stateExpressionArrayCopy = this.state.expression;
        let outputValue;

        ////////////////////////////////////////////////////////////////////////
        // In case our first number is a negative number,
        // we don't want to confuse that for a subtraction symbol
        let j = 0;
        let i = 0;
        let negativeStatus = false;

        if (operation === '-' && stateExpressionArrayCopy[0] === '-') {
            j = 1;
            i = 1;
            negativeStatus = true;
        }

        ////////////////////////////////////////////////////////////////////////

        for (j; j < noOfOperations; j++) {

            for (i; i < stateExpressionArrayCopy.length; i++) {

                // This tells us that we've hit a point in the array that has our operation
                if (stateExpressionArrayCopy[i] === operation) {
                    const numberBeforeOperation = getNumberBeforeOperation(i, stateExpressionArrayCopy);
                    const numberAfterOperation = getNumberAfterOperation(i, stateExpressionArrayCopy);
                    switch (operation) {
                        case '/':
                            outputValue = numberBeforeOperation / numberAfterOperation;
                        break;
                        case '*':
                            outputValue = numberBeforeOperation * numberAfterOperation;
                        break;
                        case '+':
                            outputValue = +numberBeforeOperation + +numberAfterOperation;
                        break;
                        case '-':
                            outputValue = numberBeforeOperation - numberAfterOperation;
                        break;
                        default:
                    }
                    // Replace the number before the operation, the operation, and the number after the operation with outputValue
                    this.replaceNumberBeforeAndAfterOperationWithOutputValue(
                        stateExpressionArrayCopy, i, numberBeforeOperation.length, numberAfterOperation.length, outputValue
                    );
                    
                    if (negativeStatus === true) {
                        i = 1;
                    } else {
                        i = 0;
                    }

                    break;
                }
            }

        }

    }

    replaceNumberBeforeAndAfterOperationWithOutputValue(stateExpressionArray, positionOfOperation, lengthOfPreviousNumberToRemove, lengthOfAfterNumberToRemove, outputValue) {

        // Remove the number before the operation
        let firstElementToRemove = positionOfOperation - lengthOfPreviousNumberToRemove;
        stateExpressionArray.splice(firstElementToRemove, lengthOfPreviousNumberToRemove);

        // Update the position of the operation after removing the number before it
        positionOfOperation = positionOfOperation - lengthOfPreviousNumberToRemove;

        // Remove the number after the operation
        let secondElementToRemove = positionOfOperation + lengthOfAfterNumberToRemove;
        stateExpressionArray.splice(positionOfOperation + 1, secondElementToRemove);

        // Remove the operation from the array
        stateExpressionArray.splice(positionOfOperation, 1);

        // Make the output value an array so we can add it back into the array for the main expression
        outputValue = outputValue.toString().split("").join(",");
        let outputValueAsArray = outputValue.split(",");

        // Add outputValueAsArray to arrayWithNumber
        for (let i = 0; i < outputValueAsArray.length; i++) {
            stateExpressionArray.splice(positionOfOperation, 0, outputValueAsArray[i]);
            positionOfOperation++;
        }
        

        this.setState({expression: stateExpressionArray});
    }

    render() {

        return (
            <div className='container'>
                <div className='calculator-container'>
                    <div className='calculator'>
                        <Screen display={this.state.screenValue} />
                        <div className='calculator-grid'> 
                            <Button display='AC' onClick={() => this.clearExpression()} />
                            <Button display='+/-' onClick={() => this.handleNegativeSymbol('-')} />
                            <Button display='%' onClick={() => this.handlePercentage('%')} />
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
