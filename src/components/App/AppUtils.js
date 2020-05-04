export function doesCurrentNumberContainDecimal(expressionArray) {
    let decimalStatus = false;
    let positionCounter = expressionArray.length - 1;

    while (expressionArray[positionCounter] !== '/' && expressionArray[positionCounter] !== '*'
    && expressionArray[positionCounter] !== '+' && expressionArray[positionCounter] !== '-') {

        if (expressionArray[positionCounter] === '.') {
            decimalStatus = true;
            break;
        }

        if (positionCounter > 0) {
            positionCounter--;
        } else {
            break;
        }

    }

    return decimalStatus;
}

export function getNumberBeforeOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter - 1;
    let numberBeforeOperation = [];
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberBeforeOperation.push(expressionArray[counter]);
        counter = counter - 1;
    }
    numberBeforeOperation = numberBeforeOperation.reverse();
    numberBeforeOperation = numberBeforeOperation.toString();
    numberBeforeOperation = numberBeforeOperation.replace(/,/g, '');

    return numberBeforeOperation;
}

export function getNumberAfterOperation(operationPosition, expressionArray) {
    let counter = operationPosition;
    counter = counter + 1;
    let numberAfterOperation = [];
    
    while (!isNaN(expressionArray[counter]) || expressionArray[counter] === '.') {
        numberAfterOperation.push(expressionArray[counter]);
        counter = counter + 1;
    }
    numberAfterOperation = numberAfterOperation.toString();
    numberAfterOperation = numberAfterOperation.replace(/,/g, '');

    return numberAfterOperation;
}

export function calculatePercentage(num1, num2) {
    return (num2/100) * num1;
}
